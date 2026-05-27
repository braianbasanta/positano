import { allDishes } from "./menu";

export type Reel = {
  /** URL del .mp4 vertical 9:16 (sin audio). */
  videoUrl: string;
  /** URL del póster .jpg (primer frame representativo). */
  posterUrl: string;
};

/**
 * Mapa slug -> reel.
 *
 * DESARROLLO: se sirven desde public/reels/ (generado por
 * scripts/compress-reels.mjs; esa carpeta no se versiona).
 *
 * PRODUCCIÓN: scripts/upload-reels.mjs sube los vídeos a Vercel Blob y
 * reescribe este archivo con un objeto estático de URLs de Blob.
 */
export const reels: Record<string, Reel> = Object.fromEntries(
  allDishes.map((dish) => [
    dish.slug,
    {
      videoUrl: `/reels/${dish.slug}.mp4`,
      posterUrl: `/reels/${dish.slug}.jpg`,
    },
  ]),
);

export const getReel = (slug: string): Reel | undefined => reels[slug];

/** Slugs en orden de carta — recorrido del visor de reels (prev/next). */
export const orderedReelSlugs: string[] = allDishes
  .filter((dish) => reels[dish.slug])
  .map((dish) => dish.slug);
