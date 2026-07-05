// Cálculos puros sobre los registros de facturación. Sin estado, testeables.
import {
  type Canales,
  type Canal,
  type DayRecord,
  CANALES,
  addCanales,
  dayChannels,
  dayTotal,
  emptyCanales,
  hasSplit,
  sumCanales,
} from "./types";

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DIAS_SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
// Orden de presentación (semana operativa: martes → domingo, lunes al final).
export const WEEKDAY_ORDER = [2, 3, 4, 5, 6, 0, 1];

// Parsea "YYYY-MM-DD" a Date local (mediodía) para evitar desfases de zona horaria.
export function parseLocal(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

export function weekdayOf(date: string): number {
  return parseLocal(date).getDay();
}

export function dayOfMonth(date: string): number {
  return Number(date.split("-")[2]);
}

export function monthLabel(monthIndex: number): string {
  return MESES_ES[monthIndex];
}

export function weekdayLabel(weekday: number): string {
  return DIAS_SEMANA[weekday];
}

// Clave "YYYY-MM" de un mes concreto.
export function monthKey(year: number, monthIndex: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
}

export function recordsInMonth(days: DayRecord[], year: number, monthIndex: number): DayRecord[] {
  const key = monthKey(year, monthIndex);
  return days.filter((d) => d.date.startsWith(key)).sort((a, b) => a.date.localeCompare(b.date));
}

// Suma del mes completo.
export function monthTotal(days: DayRecord[], year: number, monthIndex: number): number {
  return recordsInMonth(days, year, monthIndex).reduce((s, d) => s + dayTotal(d), 0);
}

// Suma del mes hasta el día `cutoffDay` inclusive (para comparar mismos tramos).
export function monthTotalUpTo(
  days: DayRecord[],
  year: number,
  monthIndex: number,
  cutoffDay: number,
): { total: number; operatingDays: number } {
  const recs = recordsInMonth(days, year, monthIndex).filter((d) => dayOfMonth(d.date) <= cutoffDay);
  const total = recs.reduce((s, d) => s + dayTotal(d), 0);
  const operatingDays = recs.filter((d) => !d.closed && dayTotal(d) > 0).length;
  return { total, operatingDays };
}

// Mapa día-del-mes → total del mismo mes pero un año antes (para superponer
// una línea de comparación interanual en la gráfica diaria). Los días
// cerrados el año pasado quedan fuera del mapa (hueco en la línea): puede
// pasar aunque el día no esté cerrado ESTE año, si el día de la semana no
// coincide (ej. este año cae en sábado, el año pasado cayó en lunes).
export function yearAgoByDay(days: DayRecord[], year: number, monthIndex: number): Map<number, number> {
  const map = new Map<number, number>();
  for (const r of recordsInMonth(days, year - 1, monthIndex)) {
    if (r.closed) continue;
    map.set(dayOfMonth(r.date), dayTotal(r));
  }
  return map;
}

export type ChannelBreakdown = Canales;

export function channelBreakdown(days: DayRecord[], year: number, monthIndex: number): ChannelBreakdown {
  return recordsInMonth(days, year, monthIndex).reduce<Canales>(
    (acc, d) => (d.closed ? acc : addCanales(acc, dayChannels(d))),
    emptyCanales(),
  );
}

export interface WeekdayAverage {
  weekday: number;
  label: string;
  average: number;
  count: number;
}

// Media de facturación por día de la semana en un mes (solo días con caja > 0).
export function weekdayAverages(days: DayRecord[], year: number, monthIndex: number): WeekdayAverage[] {
  const sums = new Map<number, { sum: number; count: number }>();
  for (const d of recordsInMonth(days, year, monthIndex)) {
    if (d.closed) continue;
    const t = dayTotal(d);
    if (t <= 0) continue;
    const wd = weekdayOf(d.date);
    const cur = sums.get(wd) ?? { sum: 0, count: 0 };
    cur.sum += t;
    cur.count += 1;
    sums.set(wd, cur);
  }
  return WEEKDAY_ORDER.filter((wd) => sums.has(wd)).map((wd) => {
    const { sum, count } = sums.get(wd)!;
    return { weekday: wd, label: weekdayLabel(wd), average: count ? sum / count : 0, count };
  });
}

export interface LunchDinner {
  lunch: number;
  dinner: number;
  daysWithSplit: number;
}

// Reparto mediodía/cena del mes (solo días con desglose por servicio).
export function lunchVsDinner(days: DayRecord[], year: number, monthIndex: number): LunchDinner {
  let lunch = 0;
  let dinner = 0;
  let daysWithSplit = 0;
  for (const d of recordsInMonth(days, year, monthIndex)) {
    if (d.closed || !hasSplit(d)) continue;
    lunch += sumCanales(d.lunch);
    dinner += sumCanales(d.dinner);
    daysWithSplit += 1;
  }
  return { lunch, dinner, daysWithSplit };
}

// Nº de días del mes que NO son lunes (estimación de días operativos del mes).
export function nonMondayDays(year: number, monthIndex: number): number {
  const last = new Date(year, monthIndex + 1, 0).getDate();
  let n = 0;
  for (let d = 1; d <= last; d++) {
    if (new Date(year, monthIndex, d).getDay() !== 1) n++;
  }
  return n;
}

// Proyección de cierre de mes según el ritmo por día operativo transcurrido.
export function projectMonth(
  days: DayRecord[],
  year: number,
  monthIndex: number,
): { projected: number; perOperatingDay: number; operatingDaysElapsed: number; operatingDaysTotal: number } {
  const recs = recordsInMonth(days, year, monthIndex).filter((d) => !d.closed && dayTotal(d) > 0);
  const total = recs.reduce((s, d) => s + dayTotal(d), 0);
  const operatingDaysElapsed = recs.length;
  const operatingDaysTotal = nonMondayDays(year, monthIndex);
  const perOperatingDay = operatingDaysElapsed ? total / operatingDaysElapsed : 0;
  return {
    projected: perOperatingDay * operatingDaysTotal,
    perOperatingDay,
    operatingDaysElapsed,
    operatingDaysTotal,
  };
}

export interface BestDay {
  date: string;
  total: number;
}

export function bestDay(days: DayRecord[], year: number, monthIndex: number): BestDay | null {
  const recs = recordsInMonth(days, year, monthIndex);
  let best: BestDay | null = null;
  for (const d of recs) {
    const t = dayTotal(d);
    if (!best || t > best.total) best = { date: d.date, total: t };
  }
  return best && best.total > 0 ? best : null;
}

export interface WeekSummary {
  weekStart: string; // lunes de la semana, "YYYY-MM-DD"
  weekEnd: string; // domingo de la semana, "YYYY-MM-DD"
  startDay: number; // primer día del mes con registro en este tramo
  endDay: number; // último día del mes con registro en este tramo
  total: number;
  operatingDays: number;
  avgPerDay: number;
  delta: number | null; // % de la media diaria vs la semana anterior (null en la primera)
  objetivo: number; // suma de objetivos diarios de los días de la semana en el mes (0 si no se pasa la función)
  metGoal: boolean; // total >= objetivo (con objetivo > 0)
}

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Desglosa el mes en semanas naturales (lunes→domingo). Cada semana suma SOLO
// los días del mes seleccionado, de modo que la suma de las semanas == total
// del mes. La primera semana puede ser parcial si el mes no empieza en lunes.
export function weeklySummary(
  days: DayRecord[],
  year: number,
  monthIndex: number,
  objetivoDelDia?: (date: string) => number | null,
): WeekSummary[] {
  const recs = recordsInMonth(days, year, monthIndex);
  const groups = new Map<string, DayRecord[]>();
  for (const r of recs) {
    const d = parseLocal(r.date);
    const diffToMonday = (d.getDay() + 6) % 7; // lunes=0 … domingo=6
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - diffToMonday, 12);
    const key = toISODate(monday);
    const arr = groups.get(key) ?? [];
    arr.push(r);
    groups.set(key, arr);
  }
  const out: WeekSummary[] = [];
  let prevAvg: number | null = null;
  for (const key of [...groups.keys()].sort()) {
    const arr = groups.get(key)!.sort((a, b) => a.date.localeCompare(b.date));
    const total = arr.reduce((s, d) => s + dayTotal(d), 0);
    const operatingDays = arr.filter((d) => !d.closed && dayTotal(d) > 0).length;
    const avgPerDay = operatingDays ? total / operatingDays : 0;
    const monday = parseLocal(key);
    const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6, 12);
    // Objetivo de la semana = suma de los objetivos diarios de TODOS sus días
    // (lunes→domingo) que caen dentro del mes seleccionado, haya o no registro
    // todavía. Así la semana en curso muestra su meta completa.
    let objetivo = 0;
    if (objetivoDelDia) {
      for (let i = 0; i < 7; i++) {
        const dd = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i, 12);
        if (dd.getFullYear() === year && dd.getMonth() === monthIndex) {
          objetivo += objetivoDelDia(toISODate(dd)) ?? 0;
        }
      }
    }
    out.push({
      weekStart: key,
      weekEnd: toISODate(sunday),
      startDay: dayOfMonth(arr[0].date),
      endDay: dayOfMonth(arr[arr.length - 1].date),
      total,
      operatingDays,
      avgPerDay,
      // Δ sobre la media diaria: justo aunque las semanas tengan distinto nº de días.
      delta: prevAvg && prevAvg > 0 && avgPerDay > 0 ? ((avgPerDay - prevAvg) / prevAvg) * 100 : null,
      objetivo,
      metGoal: objetivo > 0 && total >= objetivo,
    });
    if (avgPerDay > 0) prevAvg = avgPerDay;
  }
  return out;
}

export interface MonthPoint {
  year: number;
  monthIndex: number;
  label: string; // "jun 2026"
  total: number;
}

// Serie de los últimos `count` meses hasta (incl.) year/monthIndex.
export function monthlyTrend(
  days: DayRecord[],
  year: number,
  monthIndex: number,
  count: number,
): MonthPoint[] {
  const out: MonthPoint[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(year, monthIndex - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    out.push({
      year: y,
      monthIndex: m,
      label: `${MESES_ES[m].slice(0, 3)} ${y}`,
      total: monthTotal(days, y, m),
    });
  }
  return out;
}

export function pct(curr: number, prev: number): number | null {
  if (!prev) return null;
  return ((curr - prev) / prev) * 100;
}

export const CHANNELS = CANALES as readonly Canal[];
