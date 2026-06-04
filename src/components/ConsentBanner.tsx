"use client";

import { useEffect, useState } from "react";

// Banner de cookies + Google Consent Mode v2.
//
// El Consent Mode arranca en "denied" (ver GtmScript en Analytics.tsx). Aquí:
// - Si el usuario ya decidió antes, reaplicamos su elección en cada carga
//   (el default vuelve a "denied" en cada página, hay que re-conceder).
// - Si no ha decidido, mostramos el banner.
// Al aceptar/rechazar enviamos la señal de consentimiento a GTM y la
// persistimos en localStorage.

const STORAGE_KEY = "positano_consent";

type Lang = "es" | "en";

const COPY: Record<
  Lang,
  { text: string; accept: string; reject: string; link: string; href: string }
> = {
  es: {
    text: "Usamos cookies para mejorar tu experiencia y entender qué te gusta. Acéptalas y nos ayudas a seguir mejorando.",
    accept: "Aceptar",
    reject: "Rechazar",
    link: "Más información",
    href: "/politica-de-cookies-ue",
  },
  en: {
    text: "We use cookies to improve your experience and understand what you like. Accept them and help us keep getting better.",
    accept: "Accept",
    reject: "Decline",
    link: "Learn more",
    href: "/en/cookie-policy",
  },
};

function pushConsentUpdate(granted: boolean) {
  const value = granted ? "granted" : "denied";
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  // Consent Mode solo reconoce el comando cuando llega al dataLayer como objeto
  // `arguments` (vía la función gtag), NO como un array literal. Reutilizamos el
  // gtag global que define GtmConsentDefault; si no existiera, creamos uno
  // equivalente que empuje `arguments` igual que aquél.
  const gtag: (...args: unknown[]) => void =
    w.gtag ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    };
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

// La vista de la página de entrada se envía al cargar con el consentimiento aún
// en "denied" (el visitante todavía no ha pulsado Aceptar), así que GA4 la
// descarta y NO la reenvía al conceder después. Resultado: la primera página de
// cada visitante que acepta (casi siempre la home) se pierde. Para recuperarla,
// reenviamos un page_view de la página actual JUSTO tras conceder. Solo se llama
// desde el clic en "Aceptar" (no al reaplicar una decisión guardada), de modo
// que un visitante recurrente —cuya vista inicial ya contó con consent granted—
// no genere un page_view duplicado.
function pushPageView() {
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  const gtag: (...args: unknown[]) => void =
    w.gtag ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    };
  gtag("event", "page_view", {
    page_location: window.location.href,
    page_title: document.title,
  });
}

export default function ConsentBanner({ lang = "es" }: { lang?: Lang }) {
  const [visible, setVisible] = useState(false);
  const t = COPY[lang];

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage puede fallar en modo privado; mostramos el banner.
    }

    if (stored === "granted") {
      pushConsentUpdate(true);
    } else if (stored === "denied") {
      // El default ya es denied; no hace falta reenviar.
    } else {
      setVisible(true);
    }
  }, []);

  function decide(granted: boolean) {
    pushConsentUpdate(granted);
    // Tras conceder, recuperamos la vista de la página actual que se perdió por
    // el default "denied" (ver pushPageView). Solo en el clic, no al reaplicar.
    if (granted) pushPageView();
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      // ignoramos: la elección valdrá para esta sesión.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={lang === "es" ? "Aviso de cookies" : "Cookie notice"}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-lemon/30 bg-ink/95 px-5 py-4 text-cream backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center font-serif text-sm leading-relaxed sm:text-left">
          {t.text}{" "}
          <a
            href={t.href}
            className="text-lemon underline underline-offset-2 hover:text-cream"
          >
            {t.link}
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-full border border-cream/40 px-5 py-2 text-sm font-medium text-cream transition-colors hover:border-cream"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-full bg-lemon px-6 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
