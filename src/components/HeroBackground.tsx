"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Fondo del hero: vídeo del restaurante (vertical en móvil, horizontal en
 * desktop) sobre un poster que cubre el LCP al instante. El vídeo va muted,
 * en bucle y sin audio; si el usuario prefiere menos movimiento, se queda solo
 * el poster. La elección de fuente se hace en cliente con matchMedia para no
 * descargar los dos vídeos a la vez.
 */
export default function HeroBackground({ alt }: { alt: string }) {
  // null = aún sin decidir (SSR / primer paint): mostramos solo el poster.
  const [variant, setVariant] = useState<"mobile" | "desktop" | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setReduced(true);
      return;
    }
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setVariant(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const isMobile = variant === "mobile";
  const base = isMobile ? "/hero/positano-hero-mobile" : "/hero/positano-hero";
  const poster = isMobile
    ? "/hero/positano-hero-poster-mobile.jpg"
    : "/hero/positano-hero-poster.jpg";

  return (
    <div className="absolute inset-0">
      {/* Poster: cubre el LCP de inmediato y queda detrás del vídeo. */}
      <Image
        src="/hero/positano-hero-poster.jpg"
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_55%]"
      />

      {!reduced && variant && (
        <video
          key={variant}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
        >
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
