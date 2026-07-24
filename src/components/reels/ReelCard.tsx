"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { allDishes } from "@/data/menu";
import { getReel, orderedReelSlugs } from "@/data/reels";
import { useReelViewer } from "./ReelViewerProvider";
import { pickLang, type Locale } from "@/lib/i18n";

/**
 * Tarjeta de reel 9:16 con autoplay silenciado en loop perezoso.
 * Solo reproduce mientras está en viewport. Al pulsarla abre el visor
 * inmersivo recorriendo toda la carta.
 */
const VEGAN_LABEL: Record<Locale, string> = {
  es: "Vegano",
  ca: "Vegà",
  en: "Vegan",
  it: "Vegano",
  fr: "Végétalien",
  de: "Vegan",
  nl: "Veganistisch",
};

export default function ReelCard({
  slug,
  className,
  lang = "es",
  showDesc = false,
}: {
  slug: string;
  className?: string;
  lang?: Locale;
  /** Overlay completo (nombre, precio, descripción y régimen) — modo carta. */
  showDesc?: boolean;
}) {
  const { open } = useReelViewer();
  const videoRef = useRef<HTMLVideoElement>(null);
  // El póster (~120-150 KB) solo se descarga cuando la tarjeta se acerca al
  // viewport. La tira de reels va debajo del fold, así que sin esto los ~700 KB
  // de pósters competían con el LCP del hero en la carga inicial para nada.
  const [near, setNear] = useState(false);

  const dish = useMemo(
    () => allDishes.find((d) => d.slug === slug),
    [slug],
  );
  const reel = getReel(slug);

  // Póster servido por el optimizador de Next: el JPG crudo del Blob (~120-150 KB)
  // sale redimensionado a 640px y en AVIF/WebP (~30-50 KB). La tarjeta se ve a
  // 60vw / 232px, así que 640px cubre retina de sobra.
  const posterSrc = reel
    ? `/_next/image?url=${encodeURIComponent(reel.posterUrl)}&w=640&q=50`
    : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true); // engancha el póster al acercarse
          if (!reduced) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "0px 300px 0px 300px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (!reel || !dish) return null;

  const dishName = pickLang(dish, "name", lang) ?? dish.name;
  const WATCH: Record<Locale, string> = {
    es: "Ver vídeo de",
    ca: "Veure el vídeo de",
    en: "Watch video of",
    it: "Guarda il video di",
    fr: "Voir la vidéo de",
    de: "Video ansehen von",
    nl: "Bekijk de video van",
  };

  return (
    <button
      type="button"
      onClick={() => open(orderedReelSlugs, orderedReelSlugs.indexOf(slug))}
      aria-label={`${WATCH[lang]} ${dishName}`}
      className={`group relative block aspect-[9/16] w-full overflow-hidden bg-ink outline-none ring-lemon/0 transition-all duration-300 hover:ring-2 hover:ring-lemon/70 focus-visible:ring-2 focus-visible:ring-lemon ${className ?? ""}`}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={near ? posterSrc : undefined}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {/* Glifo de "ver a pantalla completa" */}
      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/55 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path
            d="M8 5l11 7-11 7V5z"
            fill="currentColor"
          />
        </svg>
      </span>

      {/* Degradado + nombre y precio (con descripción en modo carta) */}
      {showDesc ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-ink via-ink/55 to-transparent px-4 pb-4 pt-16 text-left sm:px-5 sm:pb-5">
          <span className="flex items-baseline justify-between gap-3">
            <span className="font-display text-lg leading-tight text-cream sm:text-xl">
              {dishName}
            </span>
            <span className="shrink-0 font-serif text-base text-lemon">
              {dish.price}
            </span>
          </span>
          {pickLang(dish, "desc", lang) ? (
            <span className="mt-1.5 block font-serif text-[0.82rem] italic leading-snug text-cream/80">
              {pickLang(dish, "desc", lang)}
            </span>
          ) : null}
          {dish.diet ? (
            <span
              className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] ${
                dish.diet === "vegan"
                  ? "bg-emerald-600 text-cream"
                  : "border border-emerald-300/70 text-emerald-200"
              }`}
            >
              {dish.diet === "vegan" ? VEGAN_LABEL[lang] : "Veg"}
            </span>
          ) : null}
        </span>
      ) : (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink via-ink/45 to-transparent px-4 pb-4 pt-14 text-left">
          <span className="font-display text-base leading-tight text-cream">
            {dishName}
          </span>
          <span className="shrink-0 font-serif text-sm text-lemon">
            {dish.price}
          </span>
        </span>
      )}
    </button>
  );
}
