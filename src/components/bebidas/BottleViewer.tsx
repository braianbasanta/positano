"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent as ReactTransitionEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import Image from "next/image";
import type { Wine } from "@/data/wines";
import type { Locale } from "@/lib/i18n";

type BottleViewerProps = {
  bottles: Wine[];
  startIndex: number;
  onClose: () => void;
  lang?: Locale;
};

const DRAG_RATIO = 0.18;
const SLIDE_MS = 340;
const WHEEL_COOLDOWN_MS = 700;

export default function BottleViewer({
  bottles,
  startIndex,
  onClose,
  lang = "es",
}: BottleViewerProps) {
  const LABELS: Record<Locale, { close: string; prev: string; next: string; photo: string }> = {
    es: { close: "Cerrar", prev: "Anterior", next: "Siguiente", photo: "Foto de la botella" },
    en: { close: "Close", prev: "Previous", next: "Next", photo: "Bottle photo" },
    it: { close: "Chiudi", prev: "Precedente", next: "Avanti", photo: "Foto della bottiglia" },
    fr: { close: "Fermer", prev: "Précédent", next: "Suivant", photo: "Photo de la bouteille" },
    de: { close: "Schließen", prev: "Zurück", next: "Weiter", photo: "Foto der Flasche" },
    nl: { close: "Sluiten", prev: "Vorige", next: "Volgende", photo: "Foto van de fles" },
  };
  const t = LABELS[lang];
  const n = bottles.length;
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(startIndex, 0), Math.max(n - 1, 0)),
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

  const navigate = useCallback(
    (dir: number) => {
      if (dir === 0) {
        setAnimating(true);
        setDragPx(0);
        return;
      }
      if (pendingDir.current !== 0) return;
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

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const busy = animating || pendingDir.current !== 0;

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

  if (n === 0) return null;

  const trio = [
    bottles[(index - 1 + n) % n],
    bottles[index],
    bottles[(index + 1) % n],
  ];
  const current = bottles[index];
  const meta = [current.region, current.grape].filter(Boolean).join(" · ");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current ? `${t.photo}: ${current.name}` : t.photo}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/95 backdrop-blur-md"
      />

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onWheel={onWheel}
        style={{ touchAction: "none" }}
        className="relative aspect-[2/3] h-full max-h-[90svh] w-auto max-w-[94vw] cursor-grab touch-none select-none overflow-hidden rounded-xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)] active:cursor-grabbing"
      >
        <div
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translateX(${-stageW + dragPx}px)`,
            transition,
          }}
          className="flex h-full"
        >
          {trio.map((bottle, i) => (
            <div
              key={`${bottle.image}-${i}`}
              style={{ width: stageW || "100%" }}
              className="relative h-full shrink-0 bg-black"
            >
              {bottle.image ? (
                <Image
                  src={bottle.image}
                  alt={`Botella de ${bottle.name}`}
                  fill
                  sizes="(max-width: 768px) 94vw, 60vh"
                  draggable={false}
                  className="object-cover"
                  priority={i === 1}
                />
              ) : null}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/55 to-transparent px-6 pb-7 pt-20">
                <h2 className="font-display text-2xl leading-tight text-cream md:text-3xl">
                  {bottle.name}
                </h2>
                {bottle.price ? (
                  <p className="mt-1 font-serif text-lg text-lemon">
                    {bottle.price}
                  </p>
                ) : null}
                {meta && bottle === current ? (
                  <p className="mt-1 text-sm uppercase tracking-[0.16em] text-cream/70">
                    {meta}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="absolute left-5 top-5 font-display text-sm tracking-[0.3em] text-lemon">
        {String(index + 1).padStart(2, "0")} / {n}
      </span>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.close}
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
