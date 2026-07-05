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

// Media diaria objetivo = promedio de los objetivos de los días operativos
// (lunes cerrado se ignora). Es el KPI maestro: comparable entre meses, no
// depende de cuántos días tenga cada mes. (3250 + 1500·2 + 1750 + 2750 + 3500)/6 = 2.375 €.
export function mediaDiariaObjetivo(): number {
  const vals = Object.values(OBJETIVO_DIARIO).filter((v): v is number => v != null);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

// Objetivo total de un mes = suma del objetivo diario de cada día real de ese
// mes (lunes cerrado no suma). A propósito NO es un número fijo: un mes con
// más findes de semana (sáb/dom pesan más que martes/miércoles) tiene un
// objetivo más alto, y eso es correcto — así queda siempre alineado con la
// suma de los objetivos semanales, en vez de una referencia congelada.
export function objetivoMensual(year: number, monthIndex: number): number {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  let total = 0;
  for (let day = 1; day <= lastDay; day++) {
    total += objetivoDia(new Date(year, monthIndex, day).getDay()) ?? 0;
  }
  return total;
}
