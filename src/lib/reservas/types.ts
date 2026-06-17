// Modelo de datos de reservas online. Dos fuentes con granularidad distinta:
//  - DISH (widget de la web): una fila por RESERVA (date/time/guests). Histórico
//    2024→2026, solo cena, export filtrado a "Confirmado" (sin canceladas).
//  - TheFork (marketplace): agregado MENSUAL por servicio/canal/descuento, con
//    cubiertos, reservas, no-shows y cancelaciones. Abr-2025 en adelante.
// El dashboard normaliza ambas a vista MENSUAL (el mes es la unidad común).

export interface DishReserva {
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  name: string | null; // null = reserva sin nombre en el export
  guests: number;
  status: string; // "Confirmado" (único estado del export)
  notes: string | null;
}

export type ForkService = "Cena" | "Comida";

export interface ForkMonthRow {
  period: string; // "YYYY-MM"
  service: ForkService;
  channel: string; // "TheFork Network" | "TheFork Partners" | "TripAdvisor"
  offer: number; // % de descuento aplicado (0, 30, 50)
  covers: number; // cubiertos servidos
  bookings: number; // reservas cumplidas
  noShows: number;
  cancellations: number;
  lateCancellations: number;
}

// Métricas agregadas de un mes (combinando ambas fuentes).
export interface MonthStats {
  period: string; // "YYYY-MM"
  dishReservas: number;
  dishComensales: number;
  forkCovers: number;
  forkBookings: number;
  forkCena: number; // cubiertos cena
  forkComida: number; // cubiertos comida (mediodía)
  forkConDescuento: number; // cubiertos con offer > 0
  forkNoShows: number;
  forkCancelaciones: number; // cancellations + lateCancellations
  forkSolicitadas: number; // bookings + canceladas + noshows (denominador real)
}
