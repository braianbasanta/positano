// Parser del texto pegado desde el Excel "ricavi positano". Pega tal cual filas
// del Excel: las celdas llegan separadas por tabuladores. Estructura conocida
// del Excel (columnas A–G):
//   A=Fecha · B=TOTALE(rojo, vacía) · C=Glovo · D=Tarjeta · E=Cash · F=Uber/TheFork · G=TOTALE
// El histórico no separa mediodía/cena → se guarda en `total`.
import type { DayRecord } from "./types";
import { emptyCanales } from "./types";

const MES_A_INDICE: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, setiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
  // por si el Excel está en italiano (la pestaña usa nombres italianos):
  gennaio: 0, febbraio: 1, marzo_it: 2, aprile: 3, maggio: 4, giugno: 5,
  luglio: 6, agosto_it: 7, settembre: 8, ottobre: 9, novembre: 10, dicembre: 11,
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

// Convierte un número en formato es-ES ("1.097,21", "44,9", "20", "") a number.
// Acepta también € y espacios. Vacío → 0.
export function parseNumberEs(raw: string): number {
  const s = (raw || "").replace(/[€\s]/g, "").trim();
  if (!s) return 0;
  // Quita puntos de miles y usa la coma como separador decimal.
  const normalized = s.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function isNumericCell(raw: string): boolean {
  const s = (raw || "").replace(/[€\s.]/g, "").replace(",", "").trim();
  return s.length > 0 && /^\d+$/.test(s);
}

// Parsea una celda de fecha: ISO (2026-06-01), es/it largo ("lunes, 1 de junio
// de 2026") o d/m/yyyy. Devuelve "YYYY-MM-DD" o null.
export function parseDateCell(raw: string): string | null {
  const s = (raw || "").trim().toLowerCase();
  if (!s) return null;

  // ISO directo
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  // "1 de junio de 2026" / "lunes, 1 de junio de 2026"
  const long = s.match(/(\d{1,2})\s+de\s+([a-záéíóúàèìòù]+)\s+de\s+(\d{4})/i);
  if (long) {
    const day = Number(long[1]);
    const mi = MES_A_INDICE[long[2]];
    const year = Number(long[3]);
    if (mi !== undefined && day >= 1 && day <= 31) return `${year}-${pad2(mi + 1)}-${pad2(day)}`;
  }

  // d/m/yyyy o dd/mm/yyyy
  const slash = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (slash) {
    const day = Number(slash[1]);
    const month = Number(slash[2]);
    const year = Number(slash[3]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) return `${year}-${pad2(month)}-${pad2(day)}`;
  }
  return null;
}

export interface ParseResult {
  records: DayRecord[];
  skipped: number; // líneas no reconocidas (cabeceras, vacías…)
}

// Parsea el bloque pegado. Cada línea con fecha válida produce un DayRecord
// (total/día). Filas sin importes → closed:true.
export function parsePastedRows(text: string): ParseResult {
  const lines = text.split(/\r?\n/);
  const records: DayRecord[] = [];
  let skipped = 0;
  const now = new Date().toISOString();

  for (const line of lines) {
    if (!line.trim()) continue;
    const cells = line.split("\t").map((c) => c.trim());
    const date = parseDateCell(cells[0]);
    if (!date) {
      skipped++;
      continue;
    }
    // Detecta la columna B (TOTALE rojo) vacía justo tras la fecha. Si la celda
    // siguiente a la fecha es un número, no hay columna B (pegaron sin ella).
    let base = 2;
    if (cells[1] !== undefined && cells[1] !== "" && isNumericCell(cells[1])) base = 1;

    const glovo = parseNumberEs(cells[base] ?? "");
    const tarjeta = parseNumberEs(cells[base + 1] ?? "");
    const efectivo = parseNumberEs(cells[base + 2] ?? "");
    const delivery = parseNumberEs(cells[base + 3] ?? "");

    const sum = glovo + tarjeta + efectivo + delivery;
    if (sum <= 0) {
      records.push({ date, closed: true, updatedAt: now });
      continue;
    }
    records.push({
      date,
      total: { ...emptyCanales(), glovo, tarjeta, efectivo, delivery },
      updatedAt: now,
    });
  }

  return { records, skipped };
}
