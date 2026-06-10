"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { readAttribution } from "@/lib/attribution";

// El widget de reservas de DISH es un iframe (origin reservation.dish.co) que
// confirma la reserva DENTRO de sí mismo: no redirige a una "página de gracias"
// en nuestro dominio, así que no podemos medir la conversión con una pageview.
//
// DISH emite un postMessage al window padre cuando se envía una reserva.
// Inspeccionando su bundle (widget.body.mod.min.js) el mensaje es:
//   window.parent.postMessage(
//     { type: "iFrameTrackingMessage",
//       payload: JSON.stringify({ event: "submit_reservation", params: {...} }) },
//     "*")
//
// IMPORTANTE — qué hace y qué NO hace este componente:
//   - Google Ads / GA4 YA capturan esta conversión a través del contenedor GTM
//     (tag "HTML - Dish PostMessage Listener" + trigger "Reserva Confirmada" →
//     AW-11173169649/FjogCIHMprYcEPGT5M8p). Eso vive en GTM, NO aquí. NO lo
//     tocamos ni duplicamos: no empujamos nada al dataLayer.
//   - Lo único que faltaba era VERCEL ANALYTICS: este componente escucha el
//     mismo postMessage y emite un custom event "submit_reservation". Al ser
//     cookieless y por sesión, Vercel lo atribuye al canal/UTM con el que entró
//     el visitante → permite ver "X reservas de Google Ads, Y de IG" en el panel
//     (requiere plan con custom events; en dev/preview track() solo loguea).

const DISH_ORIGIN = "https://reservation.dish.co";

type DishTrackingPayload = {
  event?: string;
  params?: Record<string, string | number | boolean | null>;
};

export default function DishReservationTracker() {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      // Solo escuchamos al iframe de DISH (el postMessage usa targetOrigin "*").
      if (e.origin !== DISH_ORIGIN) return;

      const data = e.data;
      if (!data || data.type !== "iFrameTrackingMessage") return;

      // payload llega como string JSON (DISH hace JSON.stringify), pero lo
      // tratamos defensivamente por si en alguna versión llega ya como objeto.
      let payload: DishTrackingPayload;
      try {
        payload =
          typeof data.payload === "string"
            ? JSON.parse(data.payload)
            : data.payload;
      } catch {
        return;
      }

      if (payload?.event !== "submit_reservation") return;

      // Custom event a Vercel Analytics. Además de los datos de la reserva que
      // manda DISH (date, people, timeslot...), adjuntamos la atribución
      // first-touch (utm_*, gclid, referrer) guardada al aterrizar: así el
      // origen aparece en la tabla de Events aunque Vercel no lo capte en la
      // URL de /reservas (gclid de Ads, o UTM perdido al navegar internamente).
      track("submit_reservation", {
        ...(payload.params ?? {}),
        ...readAttribution(),
      });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
