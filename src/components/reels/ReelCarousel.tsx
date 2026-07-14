"use client";

import { useEffect, useRef, useState } from "react";
import type { FeaturedDish } from "@/data/menu";
import type { Locale } from "@/lib/i18n";

const NAV_LABELS: Record<Locale, { prev: string; next: string }> = {
  es: { prev: "Anterior", next: "Siguiente" },
  en: { prev: "Previous", next: "Next" },
  it: { prev: "Precedente", next: "Avanti" },
  fr: { prev: "Précédent", next: "Suivant" },
  de: { prev: "Zurück", next: "Weiter" },
  nl: { prev: "Vorige", next: "Volgende" },
};
import ReelCard from "./ReelCard";

export default function ReelCarousel({
  items,
  lang = "es",
}: {
  items: FeaturedDish[];
  lang?: Locale;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth - 1;
      setCanPrev(el.scrollLeft > 1);
      setCanNext(el.scrollLeft < max);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((dish) => (
          <div
            key={dish.slug}
            className="w-[60vw] shrink-0 snap-start sm:w-[232px]"
          >
            <ReelCard slug={dish.slug} lang={lang} />
          </div>
        ))}
      </div>

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
