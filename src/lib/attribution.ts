// Atribución "first-touch" para reservas.
//
// Vercel Web Analytics solo muestra en su panel los `utm_*` que vengan en la
// URL de la VISITA. Problemas que esto deja sin medir:
//   - Tráfico de Google Ads que llega con `gclid` (no `utm_*`) → Vercel no lo lee.
//   - UTM que se "pierde" al navegar internamente (entras con UTM a la home y
//     pasas a /reservas con la URL ya limpia).
//
// Solución: en el PRIMER aterrizaje de la sesión guardamos en sessionStorage
// los utm_*, el gclid, el referrer externo y un `source` legible. Al confirmar
// una reserva, el DishReservationTracker adjunta estos datos como propiedades
// del evento `submit_reservation`, así el origen aparece en la tabla de Events
// de Vercel aunque el visitante haya navegado por el sitio antes de reservar.
//
// El campo clave para el panel es `source`: un valor de BAJA cardinalidad
// (google_ads, instagram, direct…) que Vercel SÍ puede agrupar. El gclid es
// único por clic (no agrupa) y el utm_* puede no venir nunca (Ads usa gclid).

const STORAGE_KEY = "positano:attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  gclid?: string;
  referrer?: string;
  landing?: string;
  source?: string;
};

// Deriva un canal legible y de baja cardinalidad a partir de lo que traiga la
// URL. Es el campo que se agrupa en el panel de Events de Vercel.
function deriveSource(params: URLSearchParams, data: Attribution): string {
  // Google Ads (auto-tagging): deja gclid, o wbraid/gbraid en iOS/app.
  if (data.gclid || params.get("wbraid") || params.get("gbraid")) {
    return "google_ads";
  }

  // UTM manual: si el medium es de pago, lo marcamos como *_ads.
  if (data.utm_source) {
    const medium = (data.utm_medium ?? "").toLowerCase();
    if (/cpc|ppc|paid/.test(medium)) return `${data.utm_source}_ads`;
    return data.utm_source;
  }

  // Sin parámetros: clasificamos por el dominio del referrer externo.
  if (data.referrer) {
    let host = "";
    try {
      host = new URL(data.referrer).hostname.replace(/^www\./, "");
    } catch {
      host = "";
    }
    if (host.includes("google")) return "google_organic"; // incluye Maps/GBP
    if (host.includes("instagram")) return "instagram";
    if (host.includes("facebook") || host.includes("fb.")) return "facebook";
    if (host.includes("tripadvisor")) return "tripadvisor";
    if (host.includes("bing")) return "bing_organic";
    if (host.includes("duckduckgo")) return "duckduckgo";
    if (host) return host;
  }

  return "direct";
}

// Captura la atribución la primera vez que se carga una página en la sesión.
// Idempotente: si ya hay datos guardados, no los sobreescribe (first-touch).
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) data[key] = value;
    }

    const gclid = params.get("gclid");
    if (gclid) data.gclid = gclid;

    // Solo nos interesa el referrer EXTERNO (de dónde llegó al sitio), no la
    // navegación interna entre nuestras páginas.
    const ref = document.referrer;
    if (ref && !ref.includes(window.location.hostname)) {
      data.referrer = ref;
    }

    // Canal legible para agrupar en Vercel (google_ads / instagram / direct…).
    data.source = deriveSource(params, data);

    // Guardamos SIEMPRE (incluido el tráfico "direct"): así TODA reserva lleva
    // un `source` adjunto, no solo las que traen utm/gclid/referrer en la URL.
    data.landing = window.location.pathname;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage puede fallar (modo privado, bloqueos). No es crítico.
  }
}

// Lee la atribución guardada para adjuntarla a un evento de conversión.
export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
