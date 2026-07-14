"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { DISH_WIDGET_URL } from "@/lib/dish";
import DishReservationTracker from "@/components/DishReservationTracker";

const COPY: Record<
  Locale,
  { href: string; label: string; aria: string; title: string; close: string; iframe: string }
> = {
  es: {
    href: "/reservas",
    label: "Reservar",
    aria: "Reservar mesa",
    title: "Reserva tu mesa",
    close: "Cerrar",
    iframe: "Reservar mesa en Positano",
  },
  en: {
    href: "/en/book-a-table",
    label: "Book",
    aria: "Book a table",
    title: "Book your table",
    close: "Close",
    iframe: "Book a table at Positano",
  },
  it: {
    href: "/it/prenota-un-tavolo",
    label: "Prenota",
    aria: "Prenota un tavolo",
    title: "Prenota il tuo tavolo",
    close: "Chiudi",
    iframe: "Prenota un tavolo a Positano",
  },
  fr: {
    href: "/fr/reserver-une-table",
    label: "Réserver",
    aria: "Réserver une table",
    title: "Réservez votre table",
    close: "Fermer",
    iframe: "Réservez une table au Positano",
  },
  de: {
    href: "/de/tisch-reservieren",
    label: "Reservieren",
    aria: "Einen Tisch reservieren",
    title: "Reservieren Sie Ihren Tisch",
    close: "Schließen",
    iframe: "Reservieren Sie einen Tisch im „Positano“",
  },
  nl: {
    href: "/nl/tafel-reserveren",
    label: "Reserveer",
    aria: "Reserveer een tafel",
    title: "Reserveer je tafel",
    close: "Sluiten",
    iframe: "Reserveer een tafel bij Positano",
  },
};

export default function FloatingReserva({ lang = "es" }: { lang?: Locale }) {
  const pathname = usePathname();
  const copy = COPY[lang];
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // El botón flotante solo aparece al hacer scroll y NUNCA cuando hay un CTA de
  // reserva del contenido visible en pantalla (evita dos "Reservar" juntos, p.ej.
  // sobre el hero). Detectamos esos CTA automáticamente: cualquier enlace a la
  // página de reserva dentro de <main> (el header y este propio botón quedan
  // fuera de <main>, así que no cuentan). Funciona en todas las páginas sin
  // marcar nada a mano. Re-observamos en cada cambio de ruta.
  const ctaInViewRef = useRef(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    function update() {
      setVisible(scrolledRef.current && !ctaInViewRef.current);
    }

    const onScroll = () => {
      scrolledRef.current = window.scrollY > 60;
      update();
    };
    onScroll();

    const inView = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inView.add(e.target);
        else inView.delete(e.target);
      }
      ctaInViewRef.current = inView.size > 0;
      update();
    });

    // Esperamos al pintado del contenido de la nueva ruta antes de buscar los CTA.
    const raf = requestAnimationFrame(() => {
      document
        .querySelectorAll(`main a[href="${copy.href}"]`)
        .forEach((el) => io.observe(el));
      update();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, copy.href]);

  // Bloquea el scroll del fondo mientras el modal está abierto + cierre con Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // No mostrar el botón en la propia página de reserva (ahí ya está el widget).
  if ((pathname ?? "") === copy.href) return null;

  return (
    <>
      {/* href real como fallback sin JS; con JS abrimos el widget en un modal. */}
      <a
        href={copy.href}
        aria-label={copy.aria}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
        className={`group fixed right-5 z-30 flex items-center gap-2 rounded-full bg-[linear-gradient(160deg,#d6b579_0%,#c49b5a_52%,#b68b46_100%)] px-5 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.2em] text-ink ring-1 ring-ink/5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_26px_-8px_rgba(29,39,80,0.5),0_3px_10px_-2px_rgba(29,39,80,0.32)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_38px_-10px_rgba(29,39,80,0.55),0_6px_16px_-3px_rgba(29,39,80,0.4)] active:scale-95 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_16px_-6px_rgba(29,39,80,0.45)] lg:hidden ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-90 opacity-0"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M3 9h18M8 2v4M16 2v4" />
        </svg>
        {copy.label}
      </a>

      {/* Modal con el widget de reservas DISH */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col justify-end transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label={copy.close}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
          className={`relative flex max-h-[88vh] flex-col rounded-t-3xl bg-cream shadow-[0_-12px_44px_rgba(0,0,0,0.45)] transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <span className="font-display text-lg uppercase tracking-[0.12em] text-ink">
              {copy.title}
            </span>
            <button
              type="button"
              aria-label={copy.close}
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          {/* El iframe solo se monta al abrir, para no cargar DISH en cada página. */}
          {open && (
            <div
              className="overflow-y-auto px-3 pt-3"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
            >
              <iframe
                src={DISH_WIDGET_URL}
                title={copy.iframe}
                className="block h-[560px] w-full border-0"
              />
              <DishReservationTracker />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
