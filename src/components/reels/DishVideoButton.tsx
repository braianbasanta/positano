"use client";

import { getReel, orderedReelSlugs } from "@/data/reels";
import { useReelViewer } from "./ReelViewerProvider";
import type { Locale } from "@/lib/i18n";

/**
 * Glifo discreto de "ver vídeo" junto al nombre del plato en /menu.
 * Abre el visor inmersivo recorriendo toda la carta.
 */
export default function DishVideoButton({
  slug,
  name,
  lang = "es",
}: {
  slug: string;
  name: string;
  lang?: Locale;
}) {
  const { open } = useReelViewer();

  if (!getReel(slug)) return null;

  return (
    <button
      type="button"
      onClick={() => open(orderedReelSlugs, orderedReelSlugs.indexOf(slug))}
      aria-label={lang === "en" ? `Watch video of ${name}` : `Ver vídeo de ${name}`}
      className="inline-flex h-5 w-5 shrink-0 translate-y-px items-center justify-center rounded-full border border-lemon/40 text-lemon/70 transition-colors duration-300 hover:border-lemon hover:bg-lemon hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
        <path d="M8 5l11 7-11 7V5z" fill="currentColor" />
      </svg>
    </button>
  );
}
