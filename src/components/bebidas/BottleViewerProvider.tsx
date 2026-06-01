"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { wines, beers, type Wine } from "@/data/wines";
import type { Locale } from "@/lib/i18n";

const BottleViewer = dynamic(() => import("./BottleViewer"), { ssr: false });

// Lista de botellas con foto, en el mismo orden en que se muestran en la carta.
const BOTTLES: Wine[] = [...wines, ...beers]
  .flatMap((c) => c.items)
  .filter((w) => w.image);

type BottleViewerContextValue = {
  /** Abre el visor en la botella cuya foto es `image`. */
  open: (image: string) => void;
};

const BottleViewerContext = createContext<BottleViewerContextValue | null>(null);

export function useBottleViewer(): BottleViewerContextValue {
  const ctx = useContext(BottleViewerContext);
  if (!ctx) {
    throw new Error(
      "useBottleViewer debe usarse dentro de <BottleViewerProvider>",
    );
  }
  return ctx;
}

export default function BottleViewerProvider({
  children,
  lang = "es",
}: {
  children: ReactNode;
  lang?: Locale;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((image: string) => {
    const i = BOTTLES.findIndex((b) => b.image === image);
    if (i >= 0) setIndex(i);
  }, []);

  const value = useMemo<BottleViewerContextValue>(() => ({ open }), [open]);

  return (
    <BottleViewerContext.Provider value={value}>
      {children}
      {index !== null ? (
        <BottleViewer
          bottles={BOTTLES}
          startIndex={index}
          onClose={() => setIndex(null)}
          lang={lang}
        />
      ) : null}
    </BottleViewerContext.Provider>
  );
}
