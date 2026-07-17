"use client";

import { useEffect } from "react";
import Link from "next/link";

// Banner de cookies + Google Consent Mode v2.
//
// El Consent Mode arranca en "denied" (ver GtmScript en Analytics.tsx). Aquí:
// - Si el usuario ya decidió antes, reaplicamos su elección en cada carga
//   (el default vuelve a "denied" en cada página, hay que re-conceder).
// - Si no ha decidido, mostramos el banner.
// Al aceptar/rechazar enviamos la señal de consentimiento a GTM y la
// persistimos en localStorage.

import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "positano_consent";

const COPY: Record<
  Locale,
  { text: string; accept: string; reject: string; link: string; href: string }
> = {
  es: {
    text: "Usamos cookies para mejorar tu experiencia y entender qué te gusta. Acéptalas y nos ayudas a seguir mejorando.",
    accept: "Aceptar",
    reject: "Rechazar",
    link: "Más información",
    href: "/politica-de-cookies-ue",
  },
  ca: {
    text: "Utilitzem galetes per millorar la teva experiència i entendre què t'agrada. Accepta-les i ens ajudes a seguir millorant.",
    accept: "Acceptar",
    reject: "Rebutjar",
    link: "Més informació",
    // La política de cookies no existe en CA: la ES es más natural que la EN.
    href: "/politica-de-cookies-ue",
  },
  en: {
    text: "We use cookies to improve your experience and understand what you like. Accept them and help us keep getting better.",
    accept: "Accept",
    reject: "Decline",
    link: "Learn more",
    href: "/en/cookie-policy",
  },
  it: {
    text: "Usiamo i cookie per migliorare la tua esperienza e capire cosa ti piace. Accettali e aiutaci a migliorare sempre di più.",
    accept: "Accetta",
    reject: "Declino",
    link: "Scopri di più",
    href: "/en/cookie-policy",
  },
  fr: {
    text: "Nous utilisons des cookies pour améliorer votre expérience et mieux cerner vos préférences. Acceptez-les et aidez-nous ainsi à continuer à nous améliorer.",
    accept: "Accepter",
    reject: "Refus",
    link: "En savoir plus",
    href: "/en/cookie-policy",
  },
  de: {
    text: "Wir verwenden Cookies, um Ihr Nutzererlebnis zu verbessern und zu verstehen, was Ihnen gefällt. Bitte akzeptieren Sie diese, damit wir uns weiter verbessern können.",
    accept: "Akzeptieren",
    reject: "Rückgang",
    link: "Erfahren Sie mehr",
    href: "/en/cookie-policy",
  },
  nl: {
    text: "We gebruiken cookies om je ervaring te verbeteren en te begrijpen wat je leuk vindt. Accepteer ze en help ons zo om steeds beter te worden.",
    accept: "Accepteren",
    reject: "Afname",
    link: "Meer informatie",
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

export default function ConsentBanner({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];

  // Solo side-effects: si el visitante ya decidió antes, reaplicamos su
  // elección en cada carga (el consent default vuelve a "denied" siempre).
  // La visibilidad del banner NO pasa por aquí (ver comentario del wrapper).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage puede fallar en modo privado; el banner queda visible.
    }
    if (stored === "granted") {
      pushConsentUpdate(true);
    }
    // "denied": el default ya es denied; no hace falta reenviar.
  }, []);

  function decide(granted: boolean) {
    pushConsentUpdate(granted);
    // Tras conceder, recuperamos la vista de la página actual que se perdió por
    // el default "denied" (ver pushPageView). Solo en el clic, no al reaplicar.
    if (granted) {
      pushPageView();
      // Avisa a Clarity (u otros) para que arranquen en esta misma sesión.
      window.dispatchEvent(new Event("positano-consent-granted"));
    }
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      // ignoramos: la elección valdrá para esta sesión.
    }
    // La visibilidad vive en el DOM, no en estado React (ver wrapper).
    const el = document.getElementById("positano-consent");
    if (el) el.hidden = true;
  }

  return (
    <>
      {/* La visibilidad NO es estado de React: el HTML llega con `hidden`, el
          <script> de abajo lo destapa AL PARSEAR si no hay decisión guardada,
          y decide() vuelve a ocultarlo. Antes el banner solo aparecía tras
          hidratar todo el JS y, al ser el bloque más grande del viewport
          móvil, se convertía en el elemento LCP (~6 s medidos). Pintándolo
          con el primer paint, el LCP vuelve a ser el hero. Este componente no
          tiene estado, así que React nunca re-renderiza el subtree y el
          atributo del DOM manda; suppressHydrationWarning evita que la
          hidratación lo "corrija". */}
      <div id="positano-consent" hidden suppressHydrationWarning>
      {/* Oscurecemos la web para que la decisión no pase desapercibida: el
          banner anterior era tan discreto que casi nadie aceptaba, y sin
          consentimiento GA4/Ads no cuentan la visita. */}
      <div className="fixed inset-0 z-[99] bg-ink/70 backdrop-blur-sm" aria-hidden />
      <div
        role="dialog"
        aria-live="polite"
        aria-label={
          lang === "es"
            ? "Aviso de cookies"
            : lang === "ca"
              ? "Avís de galetes"
              : "Cookie notice"
        }
        className="fixed inset-x-0 bottom-0 z-[100] border-t-2 border-lemon/50 bg-ink px-6 py-6 text-cream shadow-[0_-12px_44px_rgba(0,0,0,0.55)] md:py-7"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <p className="text-center font-serif text-base leading-relaxed sm:text-left md:text-lg">
            {t.text}{" "}
            <Link
              href={t.href}
              className="text-lemon underline underline-offset-2 hover:text-cream"
            >
              {t.link}
            </Link>
          </p>
          <div className="flex w-full shrink-0 gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => decide(false)}
              className="flex-1 rounded-full border border-cream/40 px-7 py-3 text-base font-medium text-cream transition-colors hover:border-cream sm:flex-none"
            >
              {t.reject}
            </button>
            <button
              type="button"
              onClick={() => decide(true)}
              className="flex-1 rounded-full bg-lemon px-9 py-3 text-base font-semibold text-ink transition-opacity hover:opacity-90 sm:flex-none"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
      </div>
      {/* Corre al parsear el HTML (mucho antes de hidratar): destapa el banner
          solo para quien aún no ha decidido. Los recurrentes no ven flash. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var s=null;try{s=localStorage.getItem('${STORAGE_KEY}')}catch(e){}if(!s){var b=document.getElementById('positano-consent');if(b)b.hidden=false}})();`,
        }}
      />
    </>
  );
}
