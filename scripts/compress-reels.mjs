// Comprime los 47 reels originales y extrae un póster por cada uno.
// Salida -> public/reels/{slug}.mp4  +  public/reels/{slug}.jpg
//
// Uso (una vez, en local):  node scripts/compress-reels.mjs
// Requiere ffmpeg (brew reinstall ffmpeg si está roto).
//
// Los reels de public/reels/ NO se versionan (ver .gitignore): sirven para
// desarrollo local. Para producción se suben a Vercel Blob con upload-reels.mjs.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { REELS, SOURCE_DIR } from "./reels-manifest.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const OUT_DIR = join(ROOT, "public", "reels");

mkdirSync(OUT_DIR, { recursive: true });

let done = 0;
let skipped = 0;
const total = REELS.length;

for (const [i, { file, slug }] of REELS.entries()) {
  const src = join(SOURCE_DIR, file);
  const mp4 = join(OUT_DIR, `${slug}.mp4`);
  const jpg = join(OUT_DIR, `${slug}.jpg`);
  const tag = `[${i + 1}/${total}] ${slug}`;

  if (!existsSync(src)) {
    console.error(`✗ ${tag} — FALTA el archivo origen: ${file}`);
    continue;
  }

  if (existsSync(mp4) && existsSync(jpg)) {
    skipped++;
    console.log(`· ${tag} — ya existe, saltado`);
    continue;
  }

  // 1) Comprimir vídeo: sin audio, 1080x1920, H.264, faststart.
  execFileSync(
    "ffmpeg",
    [
      "-i", src,
      "-an",
      "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
      "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-crf", "25", "-preset", "slow", "-r", "30",
      "-movflags", "+faststart",
      "-y", mp4,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );

  // 2) Póster: un frame ~1.5 s dentro del clip comprimido.
  execFileSync(
    "ffmpeg",
    ["-ss", "1.5", "-i", mp4, "-frames:v", "1", "-update", "1", "-q:v", "4", "-y", jpg],
    { stdio: ["ignore", "ignore", "inherit"] },
  );

  const mb = (statSync(mp4).size / 1024 / 1024).toFixed(1);
  done++;
  console.log(`✓ ${tag} — ${mb} MB`);
}

console.log(`\nListo: ${done} comprimidos, ${skipped} ya existían, ${total} total.`);
