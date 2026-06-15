// Persistencia de la facturación diaria en Vercel Blob. El store de este proyecto
// NO soporta blobs privados, así que usamos blob público (como reviews) pero con
// una RUTA secreta no adivinable (solo existe en el servidor; nunca se envía al
// cliente). No es cifrado: si en el futuro se quiere máxima seguridad, mover a una
// base de datos. Un único JSON con todos los días (volumen trivial). 1 admin, sin locking.
import { list, put } from "@vercel/blob";
import type { DayRecord } from "./types";

// Ruta no adivinable (server-only). NO cambiar sin migrar los datos existentes.
const STATE_KEY = "facturacion/c7f1a9e3b264d5-caja.json";

async function readState(): Promise<DayRecord[]> {
  const { blobs } = await list({ prefix: STATE_KEY, limit: 1 });
  const blob = blobs.find((b) => b.pathname === STATE_KEY);
  if (!blob) return [];
  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) return [];
  try {
    const parsed = await res.json();
    return Array.isArray(parsed) ? (parsed as DayRecord[]) : [];
  } catch {
    return [];
  }
}

async function writeState(days: DayRecord[]): Promise<void> {
  await put(STATE_KEY, JSON.stringify(days, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}

// Días ordenados cronológicamente (antiguos → recientes).
export async function listDays(): Promise<DayRecord[]> {
  const days = await readState();
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getDay(date: string): Promise<DayRecord | undefined> {
  const days = await readState();
  return days.find((d) => d.date === date);
}

// Inserta o actualiza un día por fecha. Devuelve el registro guardado.
export async function upsertDay(record: DayRecord): Promise<DayRecord> {
  const days = await readState();
  const idx = days.findIndex((d) => d.date === record.date);
  const next = { ...record, updatedAt: new Date().toISOString() };
  if (idx === -1) days.push(next);
  else days[idx] = next;
  await writeState(days);
  return next;
}

// Inserta/actualiza muchos días de golpe (importación pegada). Una sola escritura.
export async function upsertManyDays(records: DayRecord[]): Promise<number> {
  if (!records.length) return 0;
  const days = await readState();
  const byDate = new Map(days.map((d) => [d.date, d]));
  const now = new Date().toISOString();
  for (const r of records) {
    byDate.set(r.date, { ...r, updatedAt: now });
  }
  await writeState([...byDate.values()]);
  return records.length;
}

export async function deleteDay(date: string): Promise<void> {
  const days = await readState();
  const next = days.filter((d) => d.date !== date);
  if (next.length !== days.length) await writeState(next);
}
