import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Series,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import type { MenuDelDiaData, MenuDelDiaItem } from "../../src/data/menuDelDia";

const { fontFamily: playfair } = loadPlayfair();
const { fontFamily: cormorant } = loadCormorant();
const { fontFamily: montserrat } = loadMontserrat();

// ── Paleta de marca (azul royal + dorado del logo Positano) ──────────────
const BLUE_DEEP = "#0d2a6b";
const BLUE = "#163b91";
const BLUE_LIGHT = "#234fb0";
const GOLD = "#e7b65f";
const GOLD_SOFT = "#f2d49a";
const CREAM = "#fcf5e7";

// ── Duraciones de cada escena (frames @30fps) ────────────────────────────
const INTRO = 135;
const PRIMEROS = 175;
const SEGUNDOS = 175;
const POSTRES_OUTRO = 205;
// Fade in/out del contenido de cada escena (evita solapar textos).
const SCENE_FADE = 16;

export const menuReelDuration = (_data: MenuDelDiaData) =>
  INTRO + PRIMEROS + SEGUNDOS + POSTRES_OUTRO;

// ─────────────────────────────────────────────────────────────────────────
//  Fondo compartido: azul royal + skyline dorado con leve Ken Burns
// ─────────────────────────────────────────────────────────────────────────
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // Ken Burns sutil: la ilustración 9:16 llena el cuadro completo.
  const scale = interpolate(frame, [0, durationInFrames], [1.04, 1.12]);

  return (
    <AbsoluteFill style={{ background: BLUE }}>
      <Img
        src={staticFile("hero/positano-azul-9x16.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center bottom",
          transform: `scale(${scale})`,
          transformOrigin: "center bottom",
        }}
      />
      {/* velo azul uniforme: atenúa el dorado para que el texto resalte */}
      <AbsoluteFill style={{ background: "rgba(13,42,107,0.32)" }} />
      {/* viñeta + oscurecido arriba/abajo para legibilidad del texto */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(7,19,54,0.55) 0%, rgba(7,19,54,0.12) 26%, rgba(7,19,54,0.12) 64%, rgba(7,19,54,0.5) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(115% 78% at 50% 40%, rgba(0,0,0,0) 48%, rgba(6,18,52,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Marco dorado fino que envuelve todo el reel (por encima de las escenas).
// El doble trazo (contorno oscuro + dorado) lo mantiene visible incluso
// sobre las líneas doradas del skyline.
const GoldFrame: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        inset: 44,
        border: `2px solid ${GOLD_SOFT}`,
        borderRadius: 28,
        opacity: 0.85,
        boxShadow:
          "0 0 0 1px rgba(6,18,52,0.5), inset 0 0 0 1px rgba(6,18,52,0.4)",
      }}
    />
  </AbsoluteFill>
);

// Envoltorio que hace fade-in al entrar y fade-out al salir de la escena,
// de modo que el contenido nunca se solapa entre escenas consecutivas.
const SceneFade: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, SCENE_FADE, durationInFrames - SCENE_FADE, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// Separador decorativo: línea — diamante — línea
const Divider: React.FC<{ width?: number }> = ({ width = 120 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <span style={{ height: 1, width, background: GOLD, opacity: 0.7 }} />
    <span
      style={{
        width: 9,
        height: 9,
        background: GOLD,
        transform: "rotate(45deg)",
      }}
    />
    <span style={{ height: 1, width, background: GOLD, opacity: 0.7 }} />
  </div>
);

// Reveal con entrada suave (fade + subida)
const useReveal = (delay: number, dur = 28) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: dur,
  });
  return {
    opacity: e,
    transform: `translateY(${interpolate(e, [0, 1], [26, 0])}px)`,
  };
};

const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const r = useReveal(delay);
  return (
    <span
      style={{
        ...r,
        fontFamily: montserrat,
        fontSize: 30,
        fontWeight: 600,
        letterSpacing: 10,
        textTransform: "uppercase",
        color: GOLD,
      }}
    >
      {children}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────
//  Escena de portada
// ─────────────────────────────────────────────────────────────────────────
const IntroScene: React.FC<{ data: MenuDelDiaData }> = ({ data }) => {
  const brand = useReveal(4);
  const titulo = useReveal(18);
  const sub = useReveal(38);
  const precio = useReveal(60, 32);
  const linea = useReveal(80);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 90px",
        gap: 34,
      }}
    >
      <span
        style={{
          ...brand,
          fontFamily: playfair,
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: 18,
          color: CREAM,
        }}
      >
        POSITANO
      </span>
      <div style={{ ...titulo, display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: playfair,
            fontSize: 130,
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1,
            letterSpacing: 4,
          }}
        >
          MENÚ
        </span>
        <span
          style={{
            fontFamily: cormorant,
            fontStyle: "italic",
            fontSize: 96,
            color: GOLD,
            lineHeight: 1,
            marginTop: -6,
          }}
        >
          Mediodía
        </span>
      </div>
      <div style={sub}>
        <Divider />
      </div>
      <span
        style={{
          ...sub,
          fontFamily: montserrat,
          fontSize: 30,
          letterSpacing: 4,
          color: GOLD_SOFT,
          textTransform: "uppercase",
        }}
      >
        {data.semana}
      </span>
      <span
        style={{
          ...precio,
          fontFamily: playfair,
          fontWeight: 700,
          fontSize: 150,
          color: CREAM,
          lineHeight: 1,
        }}
      >
        {data.precio}
      </span>
      <span
        style={{
          ...linea,
          fontFamily: montserrat,
          fontSize: 33,
          fontWeight: 500,
          color: CREAM,
          letterSpacing: 1,
        }}
      >
        Primero · Segundo · Pan · Bebida · Postre
      </span>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
//  Item de un plato
// ─────────────────────────────────────────────────────────────────────────
const CourseItem: React.FC<{ item: MenuDelDiaItem; delay: number }> = ({
  item,
  delay,
}) => {
  const r = useReveal(delay);
  return (
    <div style={{ ...r, textAlign: "center", maxWidth: 860 }}>
      <span
        style={{
          fontFamily: montserrat,
          fontSize: 42,
          fontWeight: 500,
          color: CREAM,
          lineHeight: 1.3,
        }}
      >
        {item.name}
        {item.surcharge ? (
          <span
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              fontSize: 26,
              fontWeight: 700,
              color: BLUE_DEEP,
              background: GOLD,
              borderRadius: 999,
              padding: "5px 18px",
              letterSpacing: 1,
              marginLeft: 14,
              whiteSpace: "nowrap",
            }}
          >
            {item.surcharge}
          </span>
        ) : null}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
//  Escena de un grupo de platos (Primeros / Segundos)
// ─────────────────────────────────────────────────────────────────────────
const CourseScene: React.FC<{
  label: string;
  items: MenuDelDiaItem[];
}> = ({ label, items }) => {
  const num = useReveal(2);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0 90px",
        gap: 40,
      }}
    >
      <div
        style={{
          ...num,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: playfair,
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: CREAM,
          }}
        >
          {label}
        </span>
        <Divider width={90} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 34,
          width: "100%",
          alignItems: "center",
        }}
      >
        {items.map((it, i) => (
          <CourseItem key={it.name} item={it} delay={22 + i * 14} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────
//  Escena final: postres + cierre con precio y CTA
// ─────────────────────────────────────────────────────────────────────────
const PostresOutroScene: React.FC<{ data: MenuDelDiaData }> = ({ data }) => {
  const head = useReveal(4);
  const card = useReveal(82, 30);
  const cta = useReveal(112);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0 90px",
        gap: 46,
      }}
    >
      <div
        style={{
          ...head,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: playfair,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: CREAM,
          }}
        >
          Postres
        </span>
        <Divider width={90} />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px 50px",
          maxWidth: 820,
        }}
      >
        {data.postres.map((p, i) => (
          <CourseItemInline key={p.name} name={p.name} delay={24 + i * 13} />
        ))}
      </div>

      <div
        style={{
          ...card,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: "34px 70px",
          borderRadius: 26,
          border: `2px solid ${GOLD}`,
          background: "rgba(8,22,60,0.45)",
        }}
      >
        <span
          style={{
            fontFamily: montserrat,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: GOLD_SOFT,
          }}
        >
          Menú completo
        </span>
        <span
          style={{
            fontFamily: playfair,
            fontWeight: 700,
            fontSize: 132,
            color: CREAM,
            lineHeight: 1,
          }}
        >
          {data.precio}
        </span>
        <span
          style={{
            fontFamily: montserrat,
            fontSize: 26,
            color: CREAM,
            letterSpacing: 1,
          }}
        >
          Bebida y postre incluidos · Suplemento terraza{" "}
          {data.suplementoTerraza}
        </span>
      </div>

      <div
        style={{
          ...cta,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: montserrat,
            fontSize: 36,
            fontWeight: 600,
            color: GOLD,
            letterSpacing: 2,
          }}
        >
          @positanopizzeriabcn
        </span>
        <span
          style={{
            fontFamily: montserrat,
            fontSize: 27,
            color: CREAM,
            letterSpacing: 1,
          }}
        >
          De martes a viernes · Reserva tu mesa
        </span>
      </div>
    </AbsoluteFill>
  );
};

const CourseItemInline: React.FC<{ name: string; delay: number }> = ({
  name,
  delay,
}) => {
  const r = useReveal(delay);
  return (
    <span
      style={{
        ...r,
        fontFamily: montserrat,
        fontSize: 38,
        fontWeight: 500,
        color: CREAM,
        letterSpacing: 0.5,
      }}
    >
      {name}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────
//  Composición
// ─────────────────────────────────────────────────────────────────────────
export const MenuReel: React.FC<{ data: MenuDelDiaData }> = ({ data }) => {
  return (
    <AbsoluteFill>
      <Background />
      <Series>
        <Series.Sequence durationInFrames={INTRO}>
          <SceneFade durationInFrames={INTRO}>
            <IntroScene data={data} />
          </SceneFade>
        </Series.Sequence>
        <Series.Sequence durationInFrames={PRIMEROS}>
          <SceneFade durationInFrames={PRIMEROS}>
            <CourseScene label="Primeros" items={data.primeros} />
          </SceneFade>
        </Series.Sequence>
        <Series.Sequence durationInFrames={SEGUNDOS}>
          <SceneFade durationInFrames={SEGUNDOS}>
            <CourseScene label="Segundos" items={data.segundos} />
          </SceneFade>
        </Series.Sequence>
        <Series.Sequence durationInFrames={POSTRES_OUTRO}>
          <SceneFade durationInFrames={POSTRES_OUTRO}>
            <PostresOutroScene data={data} />
          </SceneFade>
        </Series.Sequence>
      </Series>
      <GoldFrame />
    </AbsoluteFill>
  );
};
