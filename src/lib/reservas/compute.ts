// Funciones puras de agregación (sin imports de datos) para que sirvan igual en
// el server y en el cliente: el dashboard filtra por rango de meses y recalcula
// todo en el navegador a partir de los arrays crudos (DISH 686 + TheFork 92).
import type { DishMonthRow, DishReserva, ForkMonthRow, MonthStats } from "./types";

const MESES_ABR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MESES_LARGO = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function monthOf(date: string): string {
  return date.slice(0, 7);
}

// "2025-04" → "abr 2025"
export function monthLabel(period: string): string {
  const [y, m] = period.split("-").map(Number);
  return `${MESES_ABR[m - 1]} ${y}`;
}

export function monthName(monthIndex0: number): string {
  return MESES_LARGO[monthIndex0];
}

export function weekdayOf(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

// Lista de meses "YYYY-MM" presentes en cualquiera de las fuentes, ordenada.
export function allMonths(dish: DishReserva[], fork: ForkMonthRow[], dishMeses: DishMonthRow[] = []): string[] {
  const set = new Set<string>();
  for (const r of dish) set.add(monthOf(r.date));
  for (const r of fork) set.add(r.period);
  for (const r of dishMeses) set.add(r.period);
  return [...set].sort();
}

export function inRange(period: string, from: string, to: string): boolean {
  return period >= from && period <= to;
}

export function filterDish(dish: DishReserva[], from: string, to: string): DishReserva[] {
  return dish.filter((r) => inRange(monthOf(r.date), from, to));
}
export function filterFork(fork: ForkMonthRow[], from: string, to: string): ForkMonthRow[] {
  return fork.filter((r) => inRange(r.period, from, to));
}

export function monthStats(
  period: string,
  dish: DishReserva[],
  fork: ForkMonthRow[],
  dishMeses: DishMonthRow[] = [],
): MonthStats {
  const d = dish.filter((r) => monthOf(r.date) === period);
  const f = fork.filter((r) => r.period === period);
  const sum = (k: keyof ForkMonthRow) => f.reduce((a, r) => a + (r[k] as number), 0);
  const cancel = sum("cancellations") + sum("lateCancellations");
  const bookings = sum("bookings");
  // Visitantes: manda el dato oficial del panel de DISH; si un mes no está en
  // la matriz, se cae al sumatorio de guests del export del widget.
  const oficial = dishMeses.find((r) => r.period === period)?.visitors;
  return {
    period,
    dishReservas: d.length,
    dishComensales: oficial ?? d.reduce((a, r) => a + r.guests, 0),
    forkCovers: sum("covers"),
    forkBookings: bookings,
    forkCena: f.filter((r) => r.service === "Cena").reduce((a, r) => a + r.covers, 0),
    forkComida: f.filter((r) => r.service === "Comida").reduce((a, r) => a + r.covers, 0),
    forkConDescuento: f.filter((r) => r.offer > 0).reduce((a, r) => a + r.covers, 0),
    forkNoShows: sum("noShows"),
    forkCancelaciones: cancel,
    forkSolicitadas: bookings + cancel + sum("noShows"),
  };
}

export function monthSeries(
  dish: DishReserva[],
  fork: ForkMonthRow[],
  from: string,
  to: string,
  dishMeses: DishMonthRow[] = [],
): MonthStats[] {
  return allMonths(dish, fork, dishMeses)
    .filter((p) => inRange(p, from, to))
    .map((p) => monthStats(p, dish, fork, dishMeses));
}

export interface Totals {
  dishReservas: number;
  dishComensales: number;
  forkCovers: number;
  forkBookings: number;
  forkCena: number;
  forkComida: number;
  forkConDescuento: number;
  forkNoShows: number;
  forkCancelaciones: number;
  forkSolicitadas: number;
  pctDescuento: number;
  tasaCancelacion: number;
}

export function totalsFrom(stats: MonthStats[]): Totals {
  const acc = stats.reduce(
    (a, s) => ({
      dishReservas: a.dishReservas + s.dishReservas,
      dishComensales: a.dishComensales + s.dishComensales,
      forkCovers: a.forkCovers + s.forkCovers,
      forkBookings: a.forkBookings + s.forkBookings,
      forkCena: a.forkCena + s.forkCena,
      forkComida: a.forkComida + s.forkComida,
      forkConDescuento: a.forkConDescuento + s.forkConDescuento,
      forkNoShows: a.forkNoShows + s.forkNoShows,
      forkCancelaciones: a.forkCancelaciones + s.forkCancelaciones,
      forkSolicitadas: a.forkSolicitadas + s.forkSolicitadas,
    }),
    {
      dishReservas: 0, dishComensales: 0, forkCovers: 0, forkBookings: 0, forkCena: 0,
      forkComida: 0, forkConDescuento: 0, forkNoShows: 0, forkCancelaciones: 0, forkSolicitadas: 0,
    },
  );
  return {
    ...acc,
    pctDescuento: acc.forkCovers ? (acc.forkConDescuento / acc.forkCovers) * 100 : 0,
    tasaCancelacion: acc.forkSolicitadas ? ((acc.forkCancelaciones + acc.forkNoShows) / acc.forkSolicitadas) * 100 : 0,
  };
}

export function forkByChannel(fork: ForkMonthRow[]): { channel: string; covers: number; bookings: number }[] {
  const map = new Map<string, { covers: number; bookings: number }>();
  for (const r of fork) {
    const cur = map.get(r.channel) ?? { covers: 0, bookings: 0 };
    cur.covers += r.covers;
    cur.bookings += r.bookings;
    map.set(r.channel, cur);
  }
  return [...map.entries()].map(([channel, v]) => ({ channel, ...v })).sort((a, b) => b.covers - a.covers);
}

export function forkByOffer(fork: ForkMonthRow[]): { offer: number; covers: number }[] {
  const map = new Map<number, number>();
  for (const r of fork) map.set(r.offer, (map.get(r.offer) ?? 0) + r.covers);
  return [...map.entries()].map(([offer, covers]) => ({ offer, covers })).sort((a, b) => b.covers - a.covers);
}

export function dishByWeekday(dish: DishReserva[]): { weekday: number; reservas: number; comensales: number }[] {
  const out = Array.from({ length: 7 }, (_, weekday) => ({ weekday, reservas: 0, comensales: 0 }));
  for (const r of dish) {
    const w = weekdayOf(r.date);
    out[w].reservas += 1;
    out[w].comensales += r.guests;
  }
  return out;
}

export function dishByHour(dish: DishReserva[]): { hour: string; reservas: number }[] {
  const map = new Map<string, number>();
  for (const r of dish) {
    const h = `${r.time.slice(0, 2)}:00`;
    map.set(h, (map.get(h) ?? 0) + 1);
  }
  return [...map.entries()].map(([hour, reservas]) => ({ hour, reservas })).sort((a, b) => a.hour.localeCompare(b.hour));
}

export function dishByPartySize(dish: DishReserva[]): { size: number; reservas: number }[] {
  const map = new Map<number, number>();
  for (const r of dish) map.set(r.guests, (map.get(r.guests) ?? 0) + 1);
  return [...map.entries()].map(([size, reservas]) => ({ size, reservas })).sort((a, b) => a.size - b.size);
}

// Comparativa interanual: visitantes DISH (panel oficial) por mes del año, una
// serie por año. Filas {monthIndex, label, "2023", "2024", ...} para un line chart.
export interface YoYRow {
  monthIndex: number;
  label: string;
  [year: string]: number | string;
}
export function dishYoY(dishMeses: DishMonthRow[]): { rows: YoYRow[]; years: string[] } {
  const years = [...new Set(dishMeses.map((r) => r.period.slice(0, 4)))].sort();
  const rows: YoYRow[] = Array.from({ length: 12 }, (_, i) => {
    const row: YoYRow = { monthIndex: i, label: MESES_ABR[i] };
    return row;
  });
  for (const r of dishMeses) {
    const y = r.period.slice(0, 4);
    const mi = Number(r.period.slice(5, 7)) - 1;
    rows[mi][y] = ((rows[mi][y] as number) ?? 0) + r.visitors;
  }
  return { rows, years };
}

// Media móvil de 3 meses sobre una serie numérica (para línea de tendencia).
export function movingAvg(values: number[], window = 3): (number | null)[] {
  return values.map((_, i) => {
    if (i < window - 1) return null;
    let s = 0;
    for (let j = i - window + 1; j <= i; j++) s += values[j];
    return Math.round(s / window);
  });
}
