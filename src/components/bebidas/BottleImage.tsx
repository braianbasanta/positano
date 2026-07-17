"use client";

import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { useBottleViewer } from "./BottleViewerProvider";

const LABELS: Record<Locale, { alt: string; zoom: string }> = {
  es: { alt: "Botella de", zoom: "Ampliar foto de" },
  ca: { alt: "Ampolla de", zoom: "Amplia la foto de" },
  en: { alt: "Bottle of", zoom: "Zoom in on" },
  it: { alt: "Bottiglia di", zoom: "Ingrandisci la foto di" },
  fr: { alt: "Bouteille de", zoom: "Agrandir la photo de" },
  de: { alt: "Flasche", zoom: "Foto vergrößern von" },
  nl: { alt: "Fles", zoom: "Foto vergroten van" },
};

export default function BottleImage({
  image,
  name,
  className = "",
  sizes,
  lang = "es",
}: {
  image: string;
  name: string;
  className?: string;
  sizes: string;
  lang?: Locale;
}) {
  const { open } = useBottleViewer();
  const t = LABELS[lang];
  return (
    <button
      type="button"
      onClick={() => open(image)}
      aria-label={`${t.zoom} ${name}`}
      className={`group/btn relative block cursor-zoom-in overflow-hidden ${className}`}
    >
      <Image
        src={image}
        alt={`${t.alt} ${name}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover/btn:scale-105"
      />
    </button>
  );
}
