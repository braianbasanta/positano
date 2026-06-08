// Persistencia de la cola de reseñas+borradores en Vercel Blob.
// Guardamos todo el estado en un único JSON (suficiente para el volumen de un
// restaurante). Es 1 administrador, no necesitamos locking.
import { list, put } from "@vercel/blob";
import type { Review, ReviewItem, Draft, ReviewStatus } from "./types";

const STATE_KEY = "reviews/state.json";

async function readState(): Promise<ReviewItem[]> {
  const { blobs } = await list({ prefix: STATE_KEY, limit: 1 });
  const blob = blobs.find((b) => b.pathname === STATE_KEY);
  if (!blob) return [];
  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) return [];
  try {
    return (await res.json()) as ReviewItem[];
  } catch {
    return [];
  }
}

async function writeState(items: ReviewItem[]): Promise<void> {
  await put(STATE_KEY, JSON.stringify(items, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}

export async function listItems(): Promise<ReviewItem[]> {
  const items = await readState();
  // Más recientes primero.
  return items.sort(
    (a, b) => new Date(b.review.createdAt).getTime() - new Date(a.review.createdAt).getTime(),
  );
}

// Inserta reseñas nuevas sin pisar las que ya tienen borrador/estado.
// Devuelve las que realmente eran nuevas.
export async function upsertReviews(reviews: Review[]): Promise<Review[]> {
  const items = await readState();
  const byId = new Map(items.map((it) => [it.review.id, it]));
  const now = new Date().toISOString();
  const added: Review[] = [];
  for (const review of reviews) {
    if (byId.has(review.id)) continue;
    const item: ReviewItem = { review, status: "pending", updatedAt: now };
    items.push(item);
    byId.set(review.id, item);
    added.push(review);
  }
  if (added.length) await writeState(items);
  return added;
}

export async function getItem(id: string): Promise<ReviewItem | undefined> {
  const items = await readState();
  return items.find((it) => it.review.id === id);
}

async function patchItem(
  id: string,
  patch: (item: ReviewItem) => ReviewItem,
): Promise<ReviewItem | undefined> {
  const items = await readState();
  const idx = items.findIndex((it) => it.review.id === id);
  if (idx === -1) return undefined;
  items[idx] = { ...patch(items[idx]), updatedAt: new Date().toISOString() };
  await writeState(items);
  return items[idx];
}

export async function setDraft(id: string, draft: Draft): Promise<ReviewItem | undefined> {
  return patchItem(id, (it) => ({ ...it, draft, status: "pending" }));
}

export async function setEditedReply(
  id: string,
  editedReply: string,
): Promise<ReviewItem | undefined> {
  return patchItem(id, (it) =>
    it.draft ? { ...it, draft: { ...it.draft, editedReply } } : it,
  );
}

export async function setStatus(
  id: string,
  status: ReviewStatus,
): Promise<ReviewItem | undefined> {
  return patchItem(id, (it) => ({ ...it, status }));
}
