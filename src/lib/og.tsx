import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagen Open Graph / Twitter generada con la marca (navy + wordmark dorado).
// Se genera en build y se cachea; sirve de imagen para compartir en X,
// WhatsApp, Slack, etc. 1200×630 es el tamaño recomendado.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1d2750";
const CREAM = "#f3ecdc";
const LEMON = "#c6a253";

export async function renderOgImage(tagline: string) {
  const wordmark = await readFile(
    join(process.cwd(), "public/positano-wordmark.png"),
    "base64",
  );
  const wordmarkSrc = `data:image/png;base64,${wordmark}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: INK,
          padding: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: `2px solid ${LEMON}`,
            opacity: 0.45,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmarkSrc} width={640} alt="Positano" />
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ width: 60, height: 2, background: CREAM, opacity: 0.4 }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: LEMON }} />
          <div style={{ width: 60, height: 2, background: CREAM, opacity: 0.4 }} />
        </div>
        <div
          style={{
            marginTop: 28,
            color: CREAM,
            fontSize: 40,
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
