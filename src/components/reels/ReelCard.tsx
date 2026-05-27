"use client";

import { useEffect, useMemo, useRef } from "react";
import { allDishes } from "@/data/menu";
import { getReel, orderedReelSlugs } from "@/data/reels";
import { useReelViewer } from "./ReelViewerProvider";

/**
 * Tarjeta de reel 9:16 con autoplay silenciado en loop perezoso.
 * Solo reproduce mientras está en viewport. Al pulsarla abre el visor
 * inmersivo recorriendo toda la carta.
 */
export default function ReelCard({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { open } = useReelViewer();
  const videoRef = useRef<HTMLVideoElement>(null);

  const dish = useMemo(
    () => allDishes.find((d) => d.slug === slug),
    [slug],
  );
  const reel = getReel(slug);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (!reel || !dish) return null;

  return (
    <button
      type="button"
      onClick={() => open(orderedReelSlugs, orderedReelSlugs.indexOf(slug))}
      aria-label={`Ver vídeo de ${dish.name}`}
      className={`group relative block aspect-[9/16] w-full overflow-hidden bg-ink outline-none ring-lemon/0 transition-all duration-300 hover:ring-2 hover:ring-lemon/70 focus-visible:ring-2 focus-visible:ring-lemon ${className ?? ""}`}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.posterUrl}
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

      {/* Degradado + nombre y precio */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink via-ink/45 to-transparent px-4 pb-4 pt-14 text-left">
        <span className="font-display text-base leading-tight text-cream">
          {dish.name}
        </span>
        <span className="shrink-0 font-serif text-sm text-lemon">
          {dish.price}
        </span>
      </span>
    </button>
  );
}
