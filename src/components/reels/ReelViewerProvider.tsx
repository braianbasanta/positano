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
import type { Locale } from "@/lib/i18n";

// El visor es pesado y solo se usa tras una interacción: se carga aparte del
// bundle inicial y nunca en el servidor.
const ReelViewer = dynamic(() => import("./ReelViewer"), { ssr: false });

type ViewerState = { slugs: string[]; index: number } | null;

type ReelViewerContextValue = {
  /** Abre el visor inmersivo con una lista de slugs, empezando en `index`. */
  open: (slugs: string[], index: number) => void;
};

const ReelViewerContext = createContext<ReelViewerContextValue | null>(null);

export function useReelViewer(): ReelViewerContextValue {
  const ctx = useContext(ReelViewerContext);
  if (!ctx) {
    throw new Error("useReelViewer debe usarse dentro de <ReelViewerProvider>");
  }
  return ctx;
}

export default function ReelViewerProvider({
  children,
  lang = "es",
}: {
  children: ReactNode;
  lang?: Locale;
}) {
  const [state, setState] = useState<ViewerState>(null);

  const open = useCallback((slugs: string[], index: number) => {
    if (slugs.length === 0) return;
    setState({ slugs, index });
  }, []);

  const value = useMemo<ReelViewerContextValue>(() => ({ open }), [open]);

  return (
    <ReelViewerContext.Provider value={value}>
      {children}
      {state ? (
        <ReelViewer
          slugs={state.slugs}
          startIndex={state.index}
          onClose={() => setState(null)}
          lang={lang}
        />
      ) : null}
    </ReelViewerContext.Provider>
  );
}
