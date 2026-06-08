"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { generateDraft } from "@/lib/reviews/draftEngine";
import {
  listItems,
  setDraft,
  setEditedReply,
  setStatus,
  upsertReviews,
  getItem,
} from "@/lib/reviews/store";
import type { Review } from "@/lib/reviews/types";

const COOKIE = "positano_admin";

export async function isAuthed(): Promise<boolean> {
  const token = process.env.ADMIN_REVIEWS_TOKEN;
  // Sin token configurado: abierto SOLO en desarrollo local. En producción
  // queda cerrado (sin token no se puede entrar) para no exponer el panel.
  if (!token) return process.env.NODE_ENV !== "production";
  const c = await cookies();
  return c.get(COOKIE)?.value === token;
}

export async function login(formData: FormData): Promise<{ error?: string }> {
  const token = process.env.ADMIN_REVIEWS_TOKEN;
  const value = String(formData.get("token") || "");
  if (!token || value !== token) {
    return { error: "Contraseña incorrecta." };
  }
  const c = await cookies();
  c.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
  revalidatePath("/admin/reviews");
  return {};
}

// Añade una reseña pegada a mano y genera su borrador.
export async function addManualReview(formData: FormData): Promise<{ error?: string }> {
  if (!(await isAuthed())) return { error: "No autorizado." };

  const authorName = String(formData.get("authorName") || "").trim();
  const rating = Number(formData.get("rating") || 5);
  const text = String(formData.get("text") || "").trim();
  if (!authorName) return { error: "Falta el nombre del cliente." };

  const review: Review = {
    id: crypto.randomUUID(),
    authorName,
    rating: Math.min(5, Math.max(1, rating)),
    text,
    createdAt: new Date().toISOString(),
  };

  await upsertReviews([review]);

  try {
    const result = await generateDraft(review);
    await setDraft(review.id, {
      reviewId: review.id,
      reply: result.reply,
      detectedLanguage: result.detectedLanguage,
      model: result.model,
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    revalidatePath("/admin/reviews");
    return { error: e instanceof Error ? e.message : "Error generando el borrador." };
  }

  revalidatePath("/admin/reviews");
  return {};
}

export async function regenerate(reviewId: string): Promise<{ error?: string }> {
  if (!(await isAuthed())) return { error: "No autorizado." };
  const item = await getItem(reviewId);
  if (!item) return { error: "Reseña no encontrada." };
  try {
    const result = await generateDraft(item.review);
    await setDraft(reviewId, {
      reviewId,
      reply: result.reply,
      detectedLanguage: result.detectedLanguage,
      model: result.model,
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error generando el borrador." };
  }
  revalidatePath("/admin/reviews");
  return {};
}

export async function saveReply(reviewId: string, reply: string): Promise<void> {
  if (!(await isAuthed())) return;
  await setEditedReply(reviewId, reply);
  revalidatePath("/admin/reviews");
}

export async function approve(reviewId: string): Promise<void> {
  if (!(await isAuthed())) return;
  await setStatus(reviewId, "approved");
  revalidatePath("/admin/reviews");
}

export async function skip(reviewId: string): Promise<void> {
  if (!(await isAuthed())) return;
  await setStatus(reviewId, "skipped");
  revalidatePath("/admin/reviews");
}

export async function reopen(reviewId: string): Promise<void> {
  if (!(await isAuthed())) return;
  await setStatus(reviewId, "pending");
  revalidatePath("/admin/reviews");
}

export async function fetchItems() {
  if (!(await isAuthed())) return [];
  return listItems();
}
