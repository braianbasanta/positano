"use client";

import Image from "next/image";
import { useBottleViewer } from "./BottleViewerProvider";

export default function BottleImage({
  image,
  name,
  className = "",
  sizes,
}: {
  image: string;
  name: string;
  className?: string;
  sizes: string;
}) {
  const { open } = useBottleViewer();
  return (
    <button
      type="button"
      onClick={() => open(image)}
      aria-label={`Ampliar foto de ${name}`}
      className={`group/btn relative block cursor-zoom-in overflow-hidden ${className}`}
    >
      <Image
        src={image}
        alt={`Botella de ${name}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover/btn:scale-105"
      />
    </button>
  );
}
