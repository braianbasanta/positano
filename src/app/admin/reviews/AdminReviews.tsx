"use client";

import { useState, useTransition } from "react";
import type { ReviewItem } from "@/lib/reviews/types";
import { finalReply } from "@/lib/reviews/types";
import {
  addManualReview,
  approve,
  regenerate,
  reopen,
  saveReply,
  skip,
} from "./actions";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-lemon" aria-label={`${rating} de 5`}>
      {"★".repeat(rating)}
      <span className="text-ink/20">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendiente",
  approved: "Aprobada",
  published: "Publicada",
  skipped: "Descartada",
};

function ReviewCard({ item }: { item: ReviewItem }) {
  const { review, draft, status } = item;
  const [reply, setReply] = useState(draft ? finalReply(draft) : "");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const run = (fn: () => Promise<{ error?: string } | void>) => {
    setError(null);
    start(async () => {
      const res = await fn();
      if (res && "error" in res && res.error) setError(res.error);
    });
  };

  const copyAndApprove = async () => {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* el navegador puede bloquear clipboard; el texto sigue visible */
    }
    run(() => approve(review.id));
  };

  return (
    <div className="rounded-xl border border-ink/10 bg-white/70 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg font-semibold text-ink">{review.authorName}</div>
          <div className="text-sm">
            <Stars rating={review.rating} />{" "}
            <span className="font-sans text-ink/40">
              {new Date(review.createdAt).toLocaleDateString("es-ES")}
            </span>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 font-sans text-xs font-medium ${
            status === "approved"
              ? "bg-emerald-100 text-emerald-700"
              : status === "skipped"
                ? "bg-ink/10 text-ink/50"
                : "bg-lemon/20 text-[#8a6d28]"
          }`}
        >
          {STATUS_LABEL[status] ?? status}
        </span>
      </div>

      {review.text && (
        <p className="mt-2 rounded-lg bg-cream-deep p-2 text-sm text-ink/70">{review.text}</p>
      )}

      <div className="mt-3">
        <label className="font-sans text-xs font-medium text-ink/50">
          Borrador de respuesta
          {draft && (
            <span className="ml-2 font-normal text-ink/40">
              {draft.detectedLanguage} · {draft.model}
            </span>
          )}
        </label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          placeholder={draft ? "" : "Aún no hay borrador. Pulsa Generar."}
          className="mt-1 w-full resize-y rounded-lg border border-ink/15 bg-white p-2 font-sans text-sm text-ink focus:border-lemon focus:outline-none"
        />
      </div>

      {error && <p className="mt-2 font-sans text-sm text-red-600">{error}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => run(() => regenerate(review.id))}
          disabled={pending}
          className="rounded-lg border border-ink/20 px-3 py-1.5 font-sans text-sm font-medium text-ink/70 transition hover:border-lemon hover:text-ink disabled:opacity-50"
        >
          {draft ? "Regenerar" : "Generar"}
        </button>
        {draft && (
          <button
            onClick={() => run(() => saveReply(review.id, reply))}
            disabled={pending}
            className="rounded-lg border border-ink/20 px-3 py-1.5 font-sans text-sm font-medium text-ink/70 transition hover:border-lemon hover:text-ink disabled:opacity-50"
          >
            Guardar edición
          </button>
        )}
        {draft && (
          <button
            onClick={copyAndApprove}
            disabled={pending || !reply.trim()}
            className="rounded-lg bg-ink px-3 py-1.5 font-sans text-sm font-medium text-cream transition hover:bg-ink-soft disabled:opacity-50"
          >
            {copied ? "¡Copiado! ✓" : "Copiar y aprobar"}
          </button>
        )}
        {status === "skipped" ? (
          <button
            onClick={() => run(() => reopen(review.id))}
            disabled={pending}
            className="rounded-lg px-3 py-1.5 font-sans text-sm text-ink/40 transition hover:text-ink"
          >
            Reabrir
          </button>
        ) : (
          <button
            onClick={() => run(() => skip(review.id))}
            disabled={pending}
            className="rounded-lg px-3 py-1.5 font-sans text-sm text-ink/40 transition hover:text-ink"
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  );
}

function AddReviewForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) => {
        setError(null);
        start(async () => {
          const res = await addManualReview(fd);
          if (res?.error) setError(res.error);
          else (document.getElementById("add-review-form") as HTMLFormElement)?.reset();
        });
      }}
      id="add-review-form"
      className="rounded-xl border border-dashed border-ink/20 bg-white/50 p-4"
    >
      <div className="font-sans text-sm font-semibold text-ink/70">Añadir reseña a mano</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          name="authorName"
          placeholder="Nombre del cliente"
          className="rounded-lg border border-ink/15 bg-white p-2 font-sans text-sm text-ink outline-none focus:border-lemon"
        />
        <select name="rating" defaultValue="5" className="rounded-lg border border-ink/15 bg-white p-2 font-sans text-sm text-ink outline-none focus:border-lemon">
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} ★
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="text"
        rows={2}
        placeholder="Texto de la reseña (déjalo vacío si es solo estrellas)"
        className="mt-2 w-full rounded-lg border border-ink/15 bg-white p-2 font-sans text-sm text-ink outline-none focus:border-lemon"
      />
      {error && <p className="mt-2 font-sans text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-ink px-3 py-1.5 font-sans text-sm font-medium text-cream transition hover:bg-ink-soft disabled:opacity-50"
      >
        {pending ? "Generando borrador…" : "Añadir y generar borrador"}
      </button>
    </form>
  );
}

export default function AdminReviews({
  items,
  devMode,
}: {
  items: ReviewItem[];
  devMode: boolean;
}) {
  const pending = items.filter((i) => i.status === "pending");
  const done = items.filter((i) => i.status !== "pending");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <a href="/admin" className="font-sans text-xs text-ink/40 transition hover:text-lemon">
        ← Panel
      </a>
      <h1 className="font-display text-3xl font-semibold text-ink">Respuestas a reseñas</h1>
      <p className="mt-1 text-base text-ink/60">
        Claude genera el borrador, tú revisas, editas y apruebas. Modo manual: copia la
        respuesta y pégala en Google.
      </p>

      {devMode && (
        <div className="mt-4 rounded-lg bg-amber-50 p-3 font-sans text-sm text-amber-800">
          ⚠️ Modo dev sin contraseña (falta <code>ADMIN_REVIEWS_TOKEN</code>). Configúralo antes
          de subir esto a producción.
        </div>
      )}

      <div className="mt-6">
        <AddReviewForm />
      </div>

      <div className="mt-6 space-y-3">
        {pending.length === 0 && (
          <p className="font-sans text-sm text-ink/40">No hay reseñas pendientes.</p>
        )}
        {pending.map((item) => (
          <ReviewCard key={item.review.id} item={item} />
        ))}
      </div>

      {done.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer font-sans text-sm font-medium text-ink/50">
            Procesadas ({done.length})
          </summary>
          <div className="mt-3 space-y-3">
            {done.map((item) => (
              <ReviewCard key={item.review.id} item={item} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
