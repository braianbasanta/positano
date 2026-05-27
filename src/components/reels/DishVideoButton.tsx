"use client";

import { getReel, orderedReelSlugs } from "@/data/reels";
import { useReelViewer } from "./ReelViewerProvider";

/**
 * Glifo discreto de "ver vídeo" junto al nombre del plato en /carta.
 * Abre el visor inmersivo recorriendo toda la carta.
 */
export default function DishVideoButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const { open } = useReelViewer();

  if (!getReel(slug)) return null;

  return (
    <button
      type="button"
      onClick={() => open(orderedReelSlugs, orderedReelSlugs.indexOf(slug))}
      aria-label={`Ver vídeo de ${name}`}
      className="inline-flex h-5 w-5 shrink-0 translate-y-px items-center justify-center rounded-full border border-lemon/40 text-lemon/70 transition-colors duration-300 hover:border-lemon hover:bg-lemon hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
        <path d="M8 5l11 7-11 7V5z" fill="currentColor" />
      </svg>
    </button>
  );
}
