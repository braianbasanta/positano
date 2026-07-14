"use client";

import { useBottleViewer } from "./BottleViewerProvider";
import type { Locale } from "@/lib/i18n";

const VIEW_PHOTO: Record<Locale, string> = {
  es: "Ver foto de",
  ca: "Veure la foto de",
  en: "View photo of",
  it: "Vedi la foto di",
  fr: "Voir la photo de",
  de: "Foto ansehen von",
  nl: "Bekijk de foto van",
};

/**
 * Glifo discreto de "ver foto" junto al nombre de la bebida en /bebidas.
 * Mismo lenguaje visual que el botón de vídeo de /menu.
 */
export default function BottleViewButton({
  image,
  name,
  lang = "es",
}: {
  image: string;
  name: string;
  lang?: Locale;
}) {
  const { open } = useBottleViewer();

  return (
    <button
      type="button"
      onClick={() => open(image)}
      aria-label={`${VIEW_PHOTO[lang]} ${name}`}
      className="inline-flex h-5 w-5 shrink-0 translate-y-px items-center justify-center rounded-full border border-lemon/40 text-lemon/70 transition-colors duration-300 hover:border-lemon hover:bg-lemon hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
        <path d="M8 5l11 7-11 7V5z" fill="currentColor" />
      </svg>
    </button>
  );
}
