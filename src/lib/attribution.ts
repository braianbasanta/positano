// Atribución "first-touch" para reservas.
//
// Vercel Web Analytics solo muestra en su panel los `utm_*` que vengan en la
// URL de la VISITA. Problemas que esto deja sin medir:
//   - Tráfico de Google Ads que llega con `gclid` (no `utm_*`) → Vercel no lo lee.
//   - UTM que se "pierde" al navegar internamente (entras con UTM a la home y
//     pasas a /reservas con la URL ya limpia).
//
// Solución: en el PRIMER aterrizaje de la sesión guardamos en sessionStorage
// los utm_*, el gclid y el referrer externo. Al confirmar una reserva, el
// DishReservationTracker adjunta estos datos como propiedades del evento
// `submit_reservation`, así el origen aparece en la tabla de Events de Vercel
// aunque el visitante haya navegado por el sitio antes de reservar.

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
};

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

    // Solo guardamos si hay algo útil que atribuir.
    if (Object.keys(data).length > 0) {
      data.landing = window.location.pathname;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
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
