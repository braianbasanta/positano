// Persistencia de la facturación diaria en Vercel Blob PRIVADO. La facturación
// es dato sensible del negocio → blob privado (requiere auth para leerse; el
// cliente nunca recibe la URL). Un único JSON con todos los días (volumen
// trivial para un restaurante). 1 administrador, sin locking.
import { get, put } from "@vercel/blob";
import type { DayRecord } from "./types";

const STATE_KEY = "facturacion/state.json";

async function readState(): Promise<DayRecord[]> {
  const res = await get(STATE_KEY, { access: "private", useCache: false });
  if (!res || !res.stream) return [];
  try {
    const text = await new Response(res.stream).text();
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? (parsed as DayRecord[]) : [];
  } catch {
    return [];
  }
}

async function writeState(days: DayRecord[]): Promise<void> {
  await put(STATE_KEY, JSON.stringify(days, null, 2), {
    access: "private",
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
