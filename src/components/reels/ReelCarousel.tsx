"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Dish } from "@/data/menu";
import type { Locale } from "@/lib/i18n";

const NAV_LABELS: Record<Locale, { prev: string; next: string }> = {
  es: { prev: "Anterior", next: "Siguiente" },
  ca: { prev: "Anterior", next: "Següent" },
  en: { prev: "Previous", next: "Next" },
  it: { prev: "Precedente", next: "Avanti" },
  fr: { prev: "Précédent", next: "Suivant" },
  de: { prev: "Zurück", next: "Weiter" },
  nl: { prev: "Vorige", next: "Volgende" },
};

const HINT_LABELS: Record<Locale, string> = {
  es: "Desliza para ver más",
  ca: "Llisca per veure'n més",
  en: "Swipe to see more",
  it: "Scorri per vederne di più",
  fr: "Faites glisser pour en voir plus",
  de: "Wischen für mehr",
  nl: "Veeg om meer te zien",
};
import ReelCard from "./ReelCard";

export default function ReelCarousel({
  items,
  lang = "es",
  itemClassName = "w-[60vw] sm:w-[232px]",
  cardClassName,
  showDesc = false,
  hint = false,
  trackClassName,
}: {
  items: Dish[];
  lang?: Locale;
  /** Ancho del hueco de cada tarjeta en el track. */
  itemClassName?: string;
  /** Clases extra para la tarjeta (p. ej. esquinas redondeadas en la carta). */
  cardClassName?: string;
  /** Overlay completo con descripción en cada tarjeta — modo carta. */
  showDesc?: boolean;
  /** Barra de progreso + texto "desliza" bajo el track (afordancia móvil). */
  hint?: boolean;
  /** Padding extra del track (p. ej. `px-6 scroll-px-6` cuando va full-bleed). */
  trackClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1 del scroll horizontal
  // Arranca en 0 (= "desborda") para que el SSR pinte la fila alineada a la
  // izquierda: centrar una fila que desborda cortaría las primeras tarjetas.
  const [visibleRatio, setVisibleRatio] = useState(0); // viewport/contenido

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 1);
      setCanNext(el.scrollLeft < max - 1);
      setVisibleRatio(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // Se re-mide al cambiar la lista (los filtros de la carta alteran el ancho).
  }, [items]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" +
          // Si las tarjetas no llenan el ancho, la fila se centra.
          (visibleRatio >= 1 ? " justify-center" : "") +
          (trackClassName ? ` ${trackClassName}` : "")
        }
      >
        {items.map((dish) => (
          <div
            key={dish.slug}
            className={`${itemClassName} shrink-0 snap-start`}
          >
            <ReelCard
              slug={dish.slug}
              lang={lang}
              showDesc={showDesc}
              className={cardClassName}
            />
          </div>
        ))}
      </div>

      {hint && visibleRatio > 0 && visibleRatio < 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <div
            className="relative h-1 w-28 overflow-hidden rounded-full bg-ink/15"
            aria-hidden
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-lemon"
              style={{
                width: `${visibleRatio * 100}%`,
                transform: `translateX(${progress * (1 / visibleRatio - 1) * 100}%)`,
              }}
            />
          </div>
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-ink-soft">
            {HINT_LABELS[lang]}
          </p>
        </div>
      )}

      {/* Flechas laterales — solo desktop */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label={NAV_LABELS[lang].prev}
        className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur-sm transition-all duration-300 hover:bg-lemon hover:text-ink disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <Arrow direction="left" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label={NAV_LABELS[lang].next}
        className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur-sm transition-all duration-300 hover:bg-lemon hover:text-ink disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <Arrow direction="right" />
      </button>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}
