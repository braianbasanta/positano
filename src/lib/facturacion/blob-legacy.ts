// Lectura del store antiguo en Vercel Blob — se conserva SOLO para migrar los
// datos a Supabase una vez. Una vez migrado y verificado, este archivo y la
// acción de migración pueden borrarse (el blob queda como backup).
import { list } from "@vercel/blob";
import type { DayRecord } from "./types";

const STATE_KEY = "facturacion/c7f1a9e3b264d5-caja.json";

export async function readBlobDays(): Promise<DayRecord[]> {
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
