"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent as ReactTransitionEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { allDishes } from "@/data/menu";
import { getReel } from "@/data/reels";
import { pickLang, type Locale } from "@/lib/i18n";

type ReelViewerProps = {
  slugs: string[];
  startIndex: number;
  onClose: () => void;
  lang?: Locale;
};

const DRAG_RATIO = 0.18; // fracción del ancho para confirmar el cambio
const SLIDE_MS = 340;
const WHEEL_COOLDOWN_MS = 700;

export default function ReelViewer({
  slugs,
  startIndex,
  onClose,
  lang = "es",
}: ReelViewerProps) {
  const dishName = (d: { name: string; nameEn?: string }) =>
    pickLang(d, "name", lang) ?? d.name;
  const dishDesc = (d: { desc?: string; descEn?: string }) =>
    pickLang(d, "desc", lang);
  const LABELS: Record<
    Locale,
    { close: string; closeVideo: string; prev: string; next: string; dishFallback: string; videoOf: string }
  > = {
    es: { close: "Cerrar", closeVideo: "Cerrar vídeo", prev: "Plato anterior", next: "Plato siguiente", dishFallback: "Vídeo del plato", videoOf: "Vídeo de" },
    ca: { close: "Tancar", closeVideo: "Tancar el vídeo", prev: "Plat anterior", next: "Plat següent", dishFallback: "Vídeo del plat", videoOf: "Vídeo de" },
    en: { close: "Close", closeVideo: "Close video", prev: "Previous dish", next: "Next dish", dishFallback: "Dish video", videoOf: "Video of" },
    it: { close: "Chiudi", closeVideo: "Chiudi il video", prev: "Piatto precedente", next: "Piatto successivo", dishFallback: "Video del piatto", videoOf: "Video di" },
    fr: { close: "Fermer", closeVideo: "Fermer la vidéo", prev: "Plat précédent", next: "Plat suivant", dishFallback: "Vidéo du plat", videoOf: "Vidéo de" },
    de: { close: "Schließen", closeVideo: "Video schließen", prev: "Vorheriges Gericht", next: "Nächstes Gericht", dishFallback: "Video des Gerichts", videoOf: "Video von" },
    nl: { close: "Sluiten", closeVideo: "Video sluiten", prev: "Vorige gerecht", next: "Volgend gerecht", dishFallback: "Video van het gerecht", videoOf: "Video van" },
  };
  const base = LABELS[lang];
  const t = { ...base, videoOf: (name: string) => `${base.videoOf} ${name}` };
  const n = slugs.length;
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(startIndex, 0), n - 1),
  );
  const [dragPx, setDragPx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [stageW, setStageW] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<{ x: number; id: number } | null>(null);
  const pendingDir = useRef(0);
  const lastWheel = useRef(0);
  const reducedMotion = useRef(false);

  const dishBySlug = useMemo(
    () => new Map(allDishes.map((d) => [d.slug, d])),
    [],
  );

  // Mide el ancho del escenario para los anchos de slot y el desplazamiento.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageW(el.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Bloquea el scroll del fondo mientras el visor está abierto.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const commitNav = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + n) % n);
      setAnimating(false);
      setDragPx(0);
    },
    [n],
  );

  // dir: 1 = siguiente, -1 = anterior, 0 = volver a su sitio.
  const navigate = useCallback(
    (dir: number) => {
      if (dir === 0) {
        setAnimating(true);
        setDragPx(0);
        return;
      }
      if (pendingDir.current !== 0) return; // ya hay un cambio en curso
      if (reducedMotion.current || stageW === 0) {
        commitNav(dir);
        return;
      }
      pendingDir.current = dir;
      setAnimating(true);
      setDragPx(dir > 0 ? -stageW : stageW);
    },
    [commitNav, stageW],
  );

  const onTransitionEnd = useCallback(
    (event: ReactTransitionEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      if (pendingDir.current !== 0) {
        const dir = pendingDir.current;
        pendingDir.current = 0;
        commitNav(dir);
      } else {
        setAnimating(false);
      }
    },
    [commitNav],
  );

  // Teclado: Esc cierra, flechas navegan.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" || event.key === "ArrowDown")
        navigate(1);
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
        navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, onClose]);

  // Foco inicial en el botón de cierre (accesibilidad del diálogo).
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const busy = animating || pendingDir.current !== 0;

  // --- Arrastre con puntero (ratón + táctil unificados) ---
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (busy) return;
    pointerStart.current = { x: event.clientX, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    setAnimating(false);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;
    setDragPx(event.clientX - start.x);
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;
    pointerStart.current = null;
    const dx = event.clientX - start.x;
    const threshold = Math.max(stageW * DRAG_RATIO, 48);
    if (dx <= -threshold) navigate(1);
    else if (dx >= threshold) navigate(-1);
    else if (Math.abs(dx) < 2) {
      setDragPx(0);
      setAnimating(false);
    } else {
      navigate(0);
    }
  };

  // --- Trackpad: swipe horizontal de dos dedos ---
  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (busy) return;
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    if (Math.abs(event.deltaX) < 30) return;
    const now = Date.now();
    if (now - lastWheel.current < WHEEL_COOLDOWN_MS) return;
    lastWheel.current = now;
    navigate(event.deltaX > 0 ? 1 : -1);
  };

  const transition = animating
    ? `transform ${reducedMotion.current ? 0 : SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
    : "none";

  const trio = [
    slugs[(index - 1 + n) % n],
    slugs[index],
    slugs[(index + 1) % n],
  ];
  const currentDish = dishBySlug.get(slugs[index]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={
        currentDish ? t.videoOf(dishName(currentDish)) : t.dishFallback
      }
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Fondo — clic fuera del reel cierra */}
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/95 backdrop-blur-md"
      />

      {/* Escenario — carrusel deslizable */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onWheel={onWheel}
        style={{ touchAction: "none" }}
        className="relative aspect-[9/16] h-full max-h-[90svh] w-auto max-w-[94vw] cursor-grab touch-none select-none overflow-hidden bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)] active:cursor-grabbing"
      >
        <div
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translateX(${-stageW + dragPx}px)`,
            transition,
          }}
          className="flex h-full"
        >
          {trio.map((slug) => {
            const reel = getReel(slug);
            const dish = dishBySlug.get(slug);
            return (
              <div
                key={slug}
                style={{ width: stageW || "100%" }}
                className="relative h-full shrink-0 bg-black"
              >
                {reel ? (
                  <video
                    src={reel.videoUrl}
                    poster={reel.posterUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                ) : null}

                {dish ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/55 to-transparent px-6 pb-7 pt-20">
                    <h2 className="font-display text-2xl leading-tight text-cream md:text-3xl">
                      {dishName(dish)}
                    </h2>
                    <p className="mt-1 font-serif text-lg text-lemon">
                      {dish.price}
                    </p>
                    {dishDesc(dish) ? (
                      <p className="mt-2 max-w-md font-serif text-base italic leading-snug text-cream/75">
                        {dishDesc(dish)}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contador */}
      <span className="absolute left-5 top-5 font-display text-sm tracking-[0.3em] text-lemon">
        {String(index + 1).padStart(2, "0")} / {n}
      </span>

      {/* Cerrar */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.closeVideo}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-300 hover:border-lemon hover:text-lemon"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Anterior */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label={t.prev}
        className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/70 transition-colors duration-300 hover:text-lemon sm:left-5 md:h-14 md:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Siguiente */}
      <button
        type="button"
        onClick={() => navigate(1)}
        aria-label={t.next}
        className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/70 transition-colors duration-300 hover:text-lemon sm:right-5 md:h-14 md:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
          <path
            d="M9 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
