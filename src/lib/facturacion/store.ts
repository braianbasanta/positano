// Persistencia de la facturación diaria en Supabase (tabla positano_caja_diaria).
// Antes vivía en Vercel Blob (ver blob-legacy.ts, conservado para la migración).
// Acceso server-only vía PostgREST con la service_role key — nunca al cliente.
// Mantiene el MISMO interface que antes (listDays/getDay/upsert/delete) para que
// el dashboard y las actions no cambien.
import type { Canales, DayRecord } from "./types";

// La URL de Supabase NO es secreta (va en cualquier request del cliente), así
// que la fijamos aquí y evitamos depender de una env extra. La service_role key
// SÍ es secreta y viene de env (server-only).
const BASE = "https://ipxkhcyzycoktfassukz.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = "positano_caja_diaria";

function endpoint(qs = ""): string {
  return `${BASE}/rest/v1/${TABLE}${qs}`;
}
function headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: KEY ?? "",
    Authorization: `Bearer ${KEY ?? ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

interface Row {
  date: string;
  closed: boolean;
  lunch: Canales | null;
  dinner: Canales | null;
  total: Canales | null;
  note: string | null;
  updated_at: string;
}

function rowToRecord(r: Row): DayRecord {
  const rec: DayRecord = { date: r.date, updatedAt: r.updated_at };
  if (r.closed) rec.closed = true;
  if (r.lunch) rec.lunch = r.lunch;
  if (r.dinner) rec.dinner = r.dinner;
  if (r.total) rec.total = r.total;
  if (r.note) rec.note = r.note;
  return rec;
}
function recordToRow(r: DayRecord): Row {
  return {
    date: r.date,
    closed: !!r.closed,
    lunch: r.lunch ?? null,
    dinner: r.dinner ?? null,
    total: r.total ?? null,
    note: r.note ?? null,
    updated_at: r.updatedAt ?? new Date().toISOString(),
  };
}

// Días ordenados cronológicamente (antiguos → recientes).
export async function listDays(): Promise<DayRecord[]> {
  if (!BASE || !KEY) return [];
  const res = await fetch(endpoint("?select=*&order=date.asc"), { headers: headers(), cache: "no-store" });
  if (!res.ok) return [];
  const rows = (await res.json()) as Row[];
  return rows.map(rowToRecord);
}

export async function getDay(date: string): Promise<DayRecord | undefined> {
  if (!BASE || !KEY) return undefined;
  const res = await fetch(endpoint(`?date=eq.${date}&select=*`), { headers: headers(), cache: "no-store" });
  if (!res.ok) return undefined;
  const rows = (await res.json()) as Row[];
  return rows[0] ? rowToRecord(rows[0]) : undefined;
}

// Inserta o actualiza un día por fecha (upsert sobre la PK date).
export async function upsertDay(record: DayRecord): Promise<DayRecord> {
  const row = recordToRow({ ...record, updatedAt: new Date().toISOString() });
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: headers({ Prefer: "resolution=merge-duplicates,return=representation" }),
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase upsert falló (${res.status}): ${await res.text()}`);
  const rows = (await res.json()) as Row[];
  return rows[0] ? rowToRecord(rows[0]) : record;
}

// Inserta/actualiza muchos días de golpe (importación / migración).
export async function upsertManyDays(records: DayRecord[]): Promise<number> {
  if (!records.length) return 0;
  const now = new Date().toISOString();
  const rows = records.map((r) => recordToRow({ ...r, updatedAt: r.updatedAt ?? now }));
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: headers({ Prefer: "resolution=merge-duplicates" }),
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`Supabase upsert masivo falló (${res.status}): ${await res.text()}`);
  return records.length;
}

export async function deleteDay(date: string): Promise<void> {
  const res = await fetch(endpoint(`?date=eq.${date}`), { method: "DELETE", headers: headers() });
  if (!res.ok) throw new Error(`Supabase delete falló (${res.status})`);
}
