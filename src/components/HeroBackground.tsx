"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Fondo del hero: vídeo del restaurante (vertical en móvil, horizontal en
 * desktop) sobre un poster que cubre el LCP al instante. El vídeo va muted,
 * en bucle y sin audio.
 *
 * Clave de rendimiento: el vídeo NO se monta hasta que la página ha cargado lo
 * crítico (evento `load` + idle). Así el poster (que es el LCP) no compite por
 * ancho de banda con los ~2-4 MB del vídeo en redes móviles lentas. Además se
 * omite del todo si el usuario pide menos movimiento, activa "ahorro de datos"
 * o está en 2G.
 */
export default function HeroBackground({ alt }: { alt: string }) {
  const [variant, setVariant] = useState<"mobile" | "desktop" | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const slow =
      conn?.saveData === true ||
      /(^|\b)(slow-2g|2g)$/.test(conn?.effectiveType ?? "");
    if (reduced || slow) return; // solo poster

    const mq = window.matchMedia("(min-width: 768px)");
    const applyVariant = () => setVariant(mq.matches ? "desktop" : "mobile");
    applyVariant();
    mq.addEventListener("change", applyVariant);

    let idleId: number | undefined;
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const start = () => {
      idleId = ric(() => setShowVideo(true)) as unknown as number;
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      mq.removeEventListener("change", applyVariant);
      window.removeEventListener("load", start);
      if (idleId !== undefined) {
        (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
      }
    };
  }, []);

  const isMobile = variant === "mobile";
  const base = isMobile ? "/hero/positano-hero-mobile" : "/hero/positano-hero";
  const poster = isMobile
    ? "/hero/positano-hero-poster-mobile.jpg"
    : "/hero/positano-hero-poster.jpg";

  // Art direction del poster: en móvil servimos el encuadre vertical (720x1280,
  // ~la mitad de peso) y en desktop el horizontal. `getImageProps` nos da los
  // srcSet optimizados de next/image para montarlos en un <picture>.
  const posterCommon = { alt, sizes: "100vw", priority: true };
  const {
    props: { srcSet: posterDesktop },
  } = getImageProps({
    ...posterCommon,
    src: "/hero/positano-hero-poster.jpg",
    width: 1920,
    height: 1080,
  });
  const {
    props: { srcSet: posterMobile, ...posterImg },
  } = getImageProps({
    ...posterCommon,
    src: "/hero/positano-hero-poster-mobile.jpg",
    width: 720,
    height: 1280,
  });

  return (
    <div className="absolute inset-0">
      {/* Poster: cubre el LCP de inmediato y queda detrás del vídeo. */}
      <picture>
        <source media="(min-width: 768px)" srcSet={posterDesktop} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt viene en posterImg */}
        <img
          {...posterImg}
          srcSet={posterMobile}
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
        />
      </picture>

      {showVideo && variant && (
        <video
          key={variant}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
