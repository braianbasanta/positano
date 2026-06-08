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
    <span className="text-amber-500" aria-label={`${rating} de 5`}>
      {"★".repeat(rating)}
      <span className="text-zinc-300">{"★".repeat(5 - rating)}</span>
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
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-zinc-900">{review.authorName}</div>
          <div className="text-sm">
            <Stars rating={review.rating} />{" "}
            <span className="text-zinc-400">
              {new Date(review.createdAt).toLocaleDateString("es-ES")}
            </span>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            status === "approved"
              ? "bg-green-100 text-green-700"
              : status === "skipped"
                ? "bg-zinc-100 text-zinc-500"
                : "bg-amber-100 text-amber-700"
          }`}
        >
          {STATUS_LABEL[status] ?? status}
        </span>
      </div>

      {review.text && (
        <p className="mt-2 rounded-lg bg-zinc-50 p-2 text-sm text-zinc-700">{review.text}</p>
      )}

      <div className="mt-3">
        <label className="text-xs font-medium text-zinc-500">
          Borrador de respuesta
          {draft && (
            <span className="ml-2 font-normal text-zinc-400">
              {draft.detectedLanguage} · {draft.model}
            </span>
          )}
        </label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          placeholder={draft ? "" : "Aún no hay borrador. Pulsa Generar."}
          className="mt-1 w-full resize-y rounded-lg border border-zinc-200 p-2 text-sm focus:border-zinc-400 focus:outline-none"
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => run(() => regenerate(review.id))}
          disabled={pending}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
        >
          {draft ? "Regenerar" : "Generar"}
        </button>
        {draft && (
          <button
            onClick={() => run(() => saveReply(review.id, reply))}
            disabled={pending}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
          >
            Guardar edición
          </button>
        )}
        {draft && (
          <button
            onClick={copyAndApprove}
            disabled={pending || !reply.trim()}
            className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            {copied ? "¡Copiado! ✓" : "Copiar y aprobar"}
          </button>
        )}
        {status === "skipped" ? (
          <button
            onClick={() => run(() => reopen(review.id))}
            disabled={pending}
            className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-700"
          >
            Reabrir
          </button>
        ) : (
          <button
            onClick={() => run(() => skip(review.id))}
            disabled={pending}
            className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-700"
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
      className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4"
    >
      <div className="text-sm font-semibold text-zinc-700">Añadir reseña a mano</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          name="authorName"
          placeholder="Nombre del cliente"
          className="rounded-lg border border-zinc-200 p-2 text-sm"
        />
        <select name="rating" defaultValue="5" className="rounded-lg border border-zinc-200 p-2 text-sm">
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
        className="mt-2 w-full rounded-lg border border-zinc-200 p-2 text-sm"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
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
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-xl font-bold text-zinc-900">Respuestas a reseñas · Positano</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Claude genera el borrador, tú revisas, editas y apruebas. Modo manual: copia la
        respuesta y pégala en Google.
      </p>

      {devMode && (
        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          ⚠️ Modo dev sin contraseña (falta <code>ADMIN_REVIEWS_TOKEN</code>). Configúralo antes
          de subir esto a producción.
        </div>
      )}

      <div className="mt-6">
        <AddReviewForm />
      </div>

      <div className="mt-6 space-y-3">
        {pending.length === 0 && (
          <p className="text-sm text-zinc-400">No hay reseñas pendientes.</p>
        )}
        {pending.map((item) => (
          <ReviewCard key={item.review.id} item={item} />
        ))}
      </div>

      {done.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer text-sm font-medium text-zinc-500">
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
