"use client";

import { useEffect } from "react";

// Microsoft Clarity — grabaciones de sesión + mapas de calor.
//
// Carga SOLO tras el consentimiento de analítica (mismo criterio que GA4/Ads en
// el ConsentBanner), para no soltar cookies de Clarity sin permiso. Hardcodeamos
// el Project ID igual que GTM_ID en Analytics.tsx; vacío = Clarity desactivado.
// El ID se saca de clarity.microsoft.com → Settings → Overview.
const CLARITY_ID = "x8ljp6raac";

const STORAGE_KEY = "positano_consent";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

export default function Clarity() {
  useEffect(() => {
    if (!CLARITY_ID) return;

    function load() {
      if (window.clarity) return;
      // Stub global (encola comandos hasta que el tag termine de cargar) + tag async.
      const fn = ((...args: unknown[]) => {
        (fn.q = fn.q || []).push(args);
      }) as ClarityFn;
      window.clarity = fn;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
      document.head.appendChild(script);
    }

    let consent: string | null = null;
    try {
      consent = localStorage.getItem(STORAGE_KEY);
    } catch {
      // modo privado: si no podemos leer, esperamos al evento de aceptación.
    }

    if (consent === "granted") {
      load();
      return;
    }

    // Visitante que acepta en esta sesión: el ConsentBanner emite este evento al
    // conceder y arrancamos Clarity en el momento (sin esperar a recargar).
    window.addEventListener("positano-consent-granted", load);
    return () => window.removeEventListener("positano-consent-granted", load);
  }, []);

  return null;
}
