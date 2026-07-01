// Objetivos de caja (confirmados con Antonio, jun 2026). Editables aquí.
// weekday: getDay() → 0=domingo, 1=lunes (cerrado), 2=martes … 6=sábado.

export const OBJETIVO_MENSUAL = 58500;

const OBJETIVO_DIARIO: Record<number, number | null> = {
  0: 3250, // domingo
  1: null, // lunes (cerrado)
  2: 1500, // martes
  3: 1500, // miércoles
  4: 1750, // jueves
  5: 3000, // viernes
  6: 3500, // sábado
};

export function objetivoDia(weekday: number): number | null {
  return OBJETIVO_DIARIO[weekday] ?? null;
}

// Media diaria objetivo = promedio de los objetivos de los días operativos
// (lunes cerrado se ignora). Es el KPI maestro: comparable entre meses, no
// depende de cuántos días tenga cada mes. (3250 + 1500·2 + 1750 + 3000 + 3500)/6 = 2.417 €.
export function mediaDiariaObjetivo(): number {
  const vals = Object.values(OBJETIVO_DIARIO).filter((v): v is number => v != null);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
