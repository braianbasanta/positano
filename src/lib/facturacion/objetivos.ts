// Objetivos de caja (confirmados con Antonio, jun 2026). Editables aquí.
// weekday: getDay() → 0=domingo, 1=lunes (cerrado), 2=martes … 6=sábado.

export const OBJETIVO_MENSUAL = 58500;

const OBJETIVO_DIARIO: Record<number, number | null> = {
  0: 3500, // domingo
  1: null, // lunes (cerrado)
  2: 1500, // martes
  3: 1500, // miércoles
  4: 1500, // jueves
  5: 3000, // viernes
  6: 3500, // sábado
};

export function objetivoDia(weekday: number): number | null {
  return OBJETIVO_DIARIO[weekday] ?? null;
}
