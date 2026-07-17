// Objetivos de caja (confirmados con Antonio, jun 2026).
// weekday: getDay() → 0=domingo, 1=lunes (cerrado), 2=martes … 6=sábado.
//
// HISTORIAL: cada vez que se sube/baja un objetivo, se AÑADE una entrada
// nueva con la fecha desde la que rige — NUNCA se edita una entrada vieja.
// Motivo: si simplemente pisamos el valor, un día que SÍ cumplió su objetivo
// en su momento pasa a verse como "no cumplido" en el histórico solo porque
// después subimos el listón (le compara contra el objetivo de hoy, no el de
// ese día). Con el historial, cada día se compara contra lo que regía ENTONCES.
interface VersionObjetivo {
  vigenteDesde: string; // "YYYY-MM-DD" inclusive, hasta la siguiente entrada
  valores: Record<number, number | null>;
}

const HISTORIAL_OBJETIVO_DIARIO: VersionObjetivo[] = [
  {
    // Objetivo original (creación del dashboard, commit 495dafb, 15-jun-2026).
    // Fecha "vigenteDesde" puesta antes del primer dato real (jun-2025) para
    // que cubra todo el histórico previo a la primera subida.
    vigenteDesde: "2025-01-01",
    valores: { 0: 3500, 1: null, 2: 1500, 3: 1500, 4: 1500, 5: 3000, 6: 3500 },
  },
  {
    // "Facturación: subir el objetivo del jueves a 1.750€" (commit 1415736).
    vigenteDesde: "2026-06-19",
    valores: { 0: 3500, 1: null, 2: 1500, 3: 1500, 4: 1750, 5: 3000, 6: 3500 },
  },
  {
    // "objetivo domingo 3250€" + "objetivo viernes 2750€" (commits 8cfb331 y
    // 3723e43, mismo día).
    vigenteDesde: "2026-07-01",
    valores: { 0: 3250, 1: null, 2: 1500, 3: 1500, 4: 1750, 5: 2750, 6: 3500 },
  },
];

// Objetivo VIGENTE HOY (la última entrada del historial). Usar en referencias
// genéricas que no dependen de una fecha concreta (la tabla de /admin/plan,
// la media diaria objetivo, "Media por día de la semana"). Para comparar un
// día real contra el objetivo que regía ENTONCES, usar objetivoDelDia().
const OBJETIVO_DIARIO = HISTORIAL_OBJETIVO_DIARIO[HISTORIAL_OBJETIVO_DIARIO.length - 1].valores;

export function objetivoDia(weekday: number): number | null {
  return OBJETIVO_DIARIO[weekday] ?? null;
}

function versionVigenteEn(date: string): VersionObjetivo {
  let actual = HISTORIAL_OBJETIVO_DIARIO[0];
  for (const v of HISTORIAL_OBJETIVO_DIARIO) {
    if (v.vigenteDesde <= date) actual = v;
  }
  return actual;
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
// está cerrado (lunes o semana de vacaciones), y si no, el objetivo que regía
// ESE día según el historial (no el de hoy). Usar esta función en vez de
// objetivoDia() en cualquier cálculo que tenga la fecha disponible (mensual,
// semanal, gráfica diaria, evolución por día de la semana).
export function objetivoDelDia(date: string): number | null {
  if (enCierreVacaciones(date)) return null;
  const [y, m, d] = date.split("-").map(Number);
  const weekday = new Date(y, m - 1, d, 12).getDay();
  return versionVigenteEn(date).valores[weekday] ?? null;
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
// `closedDates`: fechas con cierre puntual registrado en la caja (closed=true:
// festivo, semifinal...) — se descuentan del objetivo, igual que en el semanal.
export function objetivoMensual(
  year: number,
  monthIndex: number,
  closedDates?: ReadonlySet<string>,
): number {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  let total = 0;
  for (let day = 1; day <= lastDay; day++) {
    const date = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (closedDates?.has(date)) continue;
    total += objetivoDelDia(date) ?? 0;
  }
  return total;
}
