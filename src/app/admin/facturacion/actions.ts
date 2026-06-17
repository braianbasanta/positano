"use server";

import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/admin/auth";
import { upsertDay, upsertManyDays, deleteDay as removeDay } from "@/lib/facturacion/store";
import { parseNumberEs, parsePastedRows } from "@/lib/facturacion/parse";
import { type Canales, type DayRecord, emptyCanales, sumCanales } from "@/lib/facturacion/types";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function canalesFromForm(fd: FormData, prefix: string): Canales | undefined {
  const c: Canales = {
    ...emptyCanales(),
    glovo: parseNumberEs(String(fd.get(`${prefix}_glovo`) || "")),
    tarjeta: parseNumberEs(String(fd.get(`${prefix}_tarjeta`) || "")),
    efectivo: parseNumberEs(String(fd.get(`${prefix}_efectivo`) || "")),
    delivery: parseNumberEs(String(fd.get(`${prefix}_delivery`) || "")),
  };
  return sumCanales(c) > 0 ? c : undefined;
}

export async function saveDay(fd: FormData): Promise<{ error?: string }> {
  if (!(await isAuthed())) return { error: "No autorizado." };

  const date = String(fd.get("date") || "").trim();
  if (!DATE_RE.test(date)) return { error: "Fecha inválida (usa el selector)." };

  const closed = fd.get("closed") === "on";
  const note = String(fd.get("note") || "").trim() || undefined;

  const record: DayRecord = { date, updatedAt: new Date().toISOString() };
  if (closed) {
    record.closed = true;
  } else {
    const lunch = canalesFromForm(fd, "lunch");
    const dinner = canalesFromForm(fd, "dinner");
    if (lunch) record.lunch = lunch;
    if (dinner) record.dinner = dinner;
    if (!lunch && !dinner) return { error: "Mete algún importe en mediodía o cena, o marca el día como cerrado." };
  }
  if (note) record.note = note;

  await upsertDay(record);
  revalidatePath("/admin/facturacion");
  return {};
}

export async function importPaste(fd: FormData): Promise<{ error?: string; imported?: number; skipped?: number }> {
  if (!(await isAuthed())) return { error: "No autorizado." };
  const text = String(fd.get("paste") || "");
  if (!text.trim()) return { error: "Pega las filas del Excel primero." };

  const { records, skipped } = parsePastedRows(text);
  if (!records.length) {
    return { error: "No se reconoció ninguna fila con fecha. Revisa que copies desde la columna de la fecha." };
  }
  const imported = await upsertManyDays(records);
  revalidatePath("/admin/facturacion");
  return { imported, skipped };
}

export async function deleteDay(date: string): Promise<{ error?: string }> {
  if (!(await isAuthed())) return { error: "No autorizado." };
  await removeDay(date);
  revalidatePath("/admin/facturacion");
  return {};
}
