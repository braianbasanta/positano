// Objetivos de caja (confirmados con Antonio, jun 2026). Editables aquí.
// weekday: getDay() → 0=domingo, 1=lunes (cerrado), 2=martes … 6=sábado.

const OBJETIVO_DIARIO: Record<number, number | null> = {
  0: 3250, // domingo
  1: null, // lunes (cerrado)
  2: 1500, // martes
  3: 1500, // miércoles
  4: 1750, // jueves
  5: 2750, // viernes
  6: 3500, // sábado
};

export function objetivoDia(weekday: number): number | null {
  return OBJETIVO_DIARIO[weekday] ?? null;
}

// Semanas de cierre por vacaciones (además del lunes semanal). Rango
// [start, end] inclusive en "YYYY-MM-DD", normalmente lunes a lunes (el lunes
// límite ya cerraba de todos modos). Confirmadas con la caja real de Supabase
// (positano_caja_diaria.closed):
//   - Agosto 2025: 11→18 ago (la semana que contiene el 15, Asunción).
//   - Enero 2026: 19→26 ene.
// Las de 2026/2027 son una PROYECCIÓN (misma semana ISO que el año anterior)
// hecha el 05/07/2026 — confirmar con Antonio/Braian cuando se decidan las
// fechas reales y ajustar aquí si cambian.
export const CIERRES_VACACIONES: { start: string; end: string; label: string }[] = [
  { start: "2025-08-11", end: "2025-08-18", label: "Vacaciones agosto 2025" },
  { start: "2026-01-19", end: "2026-01-26", label: "Vacaciones enero 2026" },
  { start: "2026-08-10", end: "2026-08-17", label: "Vacaciones agosto 2026 (proyectado, confirmar)" },
  { start: "2027-01-25", end: "2027-02-01", label: "Vacaciones enero 2027 (proyectado, confirmar)" },
];

function enCierreVacaciones(date: string): boolean {
  return CIERRES_VACACIONES.some((c) => date >= c.start && date <= c.end);
}

// Objetivo de un día concreto (fecha real, no solo día de semana): null si
// está cerrado, sea por ser lunes o por caer en una semana de vacaciones.
// Usar esta función en vez de objetivoDia() en cualquier cálculo que tenga
// la fecha disponible (mensual, semanal, gráfica diaria).
export function objetivoDelDia(date: string): number | null {
  if (enCierreVacaciones(date)) return null;
  const [y, m, d] = date.split("-").map(Number);
  const weekday = new Date(y, m - 1, d, 12).getDay();
  return objetivoDia(weekday);
}

// Media diaria objetivo = promedio de los objetivos de los días operativos
// (lunes cerrado se ignora). Es el KPI maestro: comparable entre meses, no
// depende de cuántos días tenga cada mes. (3250 + 1500·2 + 1750 + 2750 + 3500)/6 = 2.375 €.
export function mediaDiariaObjetivo(): number {
  const vals = Object.values(OBJETIVO_DIARIO).filter((v): v is number => v != null);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

// Objetivo total de un mes = suma del objetivo diario de cada día real de ese
// mes (lunes y semanas de vacaciones no suman). A propósito NO es un número
// fijo: un mes con más findes de semana (sáb/dom pesan más que martes/
// miércoles) tiene un objetivo más alto, y eso es correcto — así queda
// siempre alineado con la suma de los objetivos semanales, en vez de una
// referencia congelada.
export function objetivoMensual(year: number, monthIndex: number): number {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  let total = 0;
  for (let day = 1; day <= lastDay; day++) {
    const date = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    total += objetivoDelDia(date) ?? 0;
  }
  return total;
}
