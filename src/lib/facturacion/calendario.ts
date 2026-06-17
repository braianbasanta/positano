// Festivos de Barcelona (autonómicos de Cataluña + nacionales + locales) para el
// pronóstico de caja. Medido en el histórico: los festivos y sus vísperas facturan
// ~-12 % / -11 % respecto a un día normal (la gente sale de la ciudad / come en
// casa). Es un efecto ortogonal al clima. ⚠️ Revisar/ampliar al cambiar de año.
const FESTIVOS = new Set<string>([
  // 2025 (rango de datos desde dic)
  "2025-12-06", "2025-12-08", "2025-12-25", "2025-12-26",
  // 2026
  "2026-01-01", "2026-01-06", "2026-04-03", "2026-04-06", "2026-05-01",
  "2026-06-24", "2026-08-15", "2026-09-11", "2026-09-24", "2026-10-12",
  "2026-11-01", "2026-12-06", "2026-12-08", "2026-12-25", "2026-12-26",
]);

function addDays(date: string, n: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + n);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

export function isHoliday(date: string): boolean {
  return FESTIVOS.has(date);
}
export function isHolidayEve(date: string): boolean {
  return FESTIVOS.has(addDays(date, 1));
}

// Factor multiplicativo sobre la caja esperada por festivo / víspera de festivo.
// Calibrado con el histórico (festivo ≈ -12 %, víspera ≈ -11 %).
export function holidayFactor(date: string): number {
  if (isHoliday(date)) return 0.88;
  if (isHolidayEve(date)) return 0.89;
  return 1;
}
