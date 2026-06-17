// Agregaciones para el dashboard de reservas. Todo se calcula en el servidor a
// partir de los JSON embebidos (histórico importado, no cambia a diario).
import dishData from "./data/dish.json";
import forkData from "./data/thefork-covers.json";
import type { DishReserva, ForkMonthRow, MonthStats } from "./types";

export const DISH: DishReserva[] = dishData as DishReserva[];
export const FORK: ForkMonthRow[] = forkData as ForkMonthRow[];

export function monthOf(date: string): string {
  return date.slice(0, 7);
}

// "2025-04" → "abr 2025"
const MESES_ABR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export function monthLabel(period: string): string {
  const [y, m] = period.split("-").map(Number);
  return `${MESES_ABR[m - 1]} ${y}`;
}

// Día de la semana (0=dom … 6=sáb) de una fecha "YYYY-MM-DD" en horario local.
export function weekdayOf(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

// Lista de meses presentes en cualquiera de las dos fuentes, ordenados.
export function allMonths(): string[] {
  const set = new Set<string>();
  for (const r of DISH) set.add(monthOf(r.date));
  for (const r of FORK) set.add(r.period);
  return [...set].sort();
}

export function monthStats(period: string): MonthStats {
  const dish = DISH.filter((r) => monthOf(r.date) === period);
  const fork = FORK.filter((r) => r.period === period);
  const sum = (k: keyof ForkMonthRow) => fork.reduce((a, r) => a + (r[k] as number), 0);
  const cancel = sum("cancellations") + sum("lateCancellations");
  const bookings = sum("bookings");
  return {
    period,
    dishReservas: dish.length,
    dishComensales: dish.reduce((a, r) => a + r.guests, 0),
    forkCovers: sum("covers"),
    forkBookings: bookings,
    forkCena: fork.filter((r) => r.service === "Cena").reduce((a, r) => a + r.covers, 0),
    forkComida: fork.filter((r) => r.service === "Comida").reduce((a, r) => a + r.covers, 0),
    forkConDescuento: fork.filter((r) => r.offer > 0).reduce((a, r) => a + r.covers, 0),
    forkNoShows: sum("noShows"),
    forkCancelaciones: cancel,
    forkSolicitadas: bookings + cancel + sum("noShows"),
  };
}

export function allMonthStats(): MonthStats[] {
  return allMonths().map(monthStats);
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
  pctDescuento: number; // % de cubiertos TheFork con descuento
  tasaCancelacion: number; // % de reservas TheFork solicitadas que no llegan
  mediaDishComensales: number; // comensales por reserva DISH
}

export function totals(): Totals {
  const stats = allMonthStats();
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
    tasaCancelacion: acc.forkSolicitadas
      ? ((acc.forkCancelaciones + acc.forkNoShows) / acc.forkSolicitadas) * 100
      : 0,
    mediaDishComensales: acc.dishReservas ? acc.dishComensales / acc.dishReservas : 0,
  };
}

// Reparto de cubiertos TheFork por canal (todo el periodo).
export function forkByChannel(): { channel: string; covers: number; bookings: number }[] {
  const map = new Map<string, { covers: number; bookings: number }>();
  for (const r of FORK) {
    const cur = map.get(r.channel) ?? { covers: 0, bookings: 0 };
    cur.covers += r.covers;
    cur.bookings += r.bookings;
    map.set(r.channel, cur);
  }
  return [...map.entries()]
    .map(([channel, v]) => ({ channel, ...v }))
    .sort((a, b) => b.covers - a.covers);
}

// Reparto de cubiertos TheFork por descuento (offer %).
export function forkByOffer(): { offer: number; covers: number }[] {
  const map = new Map<number, number>();
  for (const r of FORK) map.set(r.offer, (map.get(r.offer) ?? 0) + r.covers);
  return [...map.entries()].map(([offer, covers]) => ({ offer, covers })).sort((a, b) => b.covers - a.covers);
}

// DISH: comensales por día de la semana (todo el histórico).
export function dishByWeekday(): { weekday: number; reservas: number; comensales: number }[] {
  const out = Array.from({ length: 7 }, (_, weekday) => ({ weekday, reservas: 0, comensales: 0 }));
  for (const r of DISH) {
    const w = weekdayOf(r.date);
    out[w].reservas += 1;
    out[w].comensales += r.guests;
  }
  return out;
}

// DISH: reservas por franja horaria (HH:00).
export function dishByHour(): { hour: string; reservas: number }[] {
  const map = new Map<string, number>();
  for (const r of DISH) {
    const h = `${r.time.slice(0, 2)}:00`;
    map.set(h, (map.get(h) ?? 0) + 1);
  }
  return [...map.entries()].map(([hour, reservas]) => ({ hour, reservas })).sort((a, b) => a.hour.localeCompare(b.hour));
}

// DISH: tamaño de grupo (nº de comensales por reserva).
export function dishByPartySize(): { size: number; reservas: number }[] {
  const map = new Map<number, number>();
  for (const r of DISH) map.set(r.guests, (map.get(r.guests) ?? 0) + 1);
  return [...map.entries()].map(([size, reservas]) => ({ size, reservas })).sort((a, b) => a.size - b.size);
}
