// Sube los 47 reels comprimidos + pósters a Vercel Blob y reescribe
// src/data/reels.ts con las URLs de producción.
//
// REQUISITOS (una sola vez):
//   1. Tener los reels comprimidos:   node scripts/compress-reels.mjs
//   2. Crear un store Blob en el dashboard de Vercel (Storage -> Blob) y
//      conectarlo al proyecto.
//   3. Instalar la dependencia:        npm install @vercel/blob
//   4. Exportar el token de escritura: export BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
//      (o `vercel env pull .env.local` y `source` del token)
//
// USO:  node scripts/upload-reels.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";
import { REELS } from "./reels-manifest.mjs";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!TOKEN) {
  console.error(
    "✗ Falta BLOB_READ_WRITE_TOKEN. Crea el store Blob en Vercel y exporta el token.",
  );
  process.exit(1);
}

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const REELS_DIR = join(ROOT, "public", "reels");

async function uploadFile(localPath, blobPath, contentType) {
  const { url } = await put(blobPath, readFileSync(localPath), {
    access: "public",
    token: TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
  });
  return url;
}

/** @type {Record<string, { videoUrl: string; posterUrl: string }>} */
const manifest = {};

for (const [i, { slug }] of REELS.entries()) {
  const mp4 = join(REELS_DIR, `${slug}.mp4`);
  const jpg = join(REELS_DIR, `${slug}.jpg`);
  if (!existsSync(mp4) || !existsSync(jpg)) {
    console.error(`✗ Faltan archivos de ${slug} — ejecuta compress-reels.mjs primero.`);
    process.exit(1);
  }

  const videoUrl = await uploadFile(mp4, `reels/${slug}.mp4`, "video/mp4");
  const posterUrl = await uploadFile(jpg, `reels/${slug}.jpg`, "image/jpeg");
  manifest[slug] = { videoUrl, posterUrl };
  console.log(`✓ [${i + 1}/${REELS.length}] ${slug}`);
}

// Reescribe src/data/reels.ts con las URLs estáticas de Blob.
const entries = Object.entries(manifest)
  .map(
    ([slug, { videoUrl, posterUrl }]) =>
      `  "${slug}": {\n    videoUrl: "${videoUrl}",\n    posterUrl: "${posterUrl}",\n  },`,
  )
  .join("\n");

const file = `import { allDishes } from "./menu";

export type Reel = {
  /** URL del .mp4 vertical 9:16 (sin audio). */
  videoUrl: string;
  /** URL del póster .jpg. */
  posterUrl: string;
};

// Generado por scripts/upload-reels.mjs — URLs de Vercel Blob. No editar a mano.
export const reels: Record<string, Reel> = {
${entries}
};

export const getReel = (slug: string): Reel | undefined => reels[slug];

/** Slugs en orden de carta — recorrido del visor de reels (prev/next). */
export const orderedReelSlugs: string[] = allDishes
  .filter((dish) => reels[dish.slug])
  .map((dish) => dish.slug);
`;

writeFileSync(join(ROOT, "src", "data", "reels.ts"), file);
console.log(`\nListo: ${REELS.length} reels en Blob. src/data/reels.ts actualizado.`);
