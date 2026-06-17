// Configuración de los redirects de tracking /go/<slug>.
//
// Idea: en los anuncios (Google Ads, etc.) NO ponemos la URL de la web directa,
// sino una URL nuestra tipo positanopizzeriabcn.com/go/ad-es. El servidor cuenta
// el clic (ver store.ts) y luego redirige a la web real con sus UTM. Así medimos
// los clics SERVER-SIDE, sin depender de que el visitante acepte cookies ni de JS.
//
// Para añadir un nuevo origen: una entrada más en GO_TARGETS. Nada más.

export const SITE = "https://positanopizzeriabcn.com";

export interface GoTarget {
  // Ruta destino dentro de la web (sin dominio).
  path: string;
  // Etiqueta legible para el panel /admin/clics.
  label: string;
  // UTM por defecto que se añaden al destino. Sirven para que la atribución
  // client-side (src/lib/attribution.ts) y el panel de Vercel también lo vean.
  utm: Record<string, string>;
}

// Slugs activos. ad-es / ad-en separan Google Ads en español vs inglés.
export const GO_TARGETS: Record<string, GoTarget> = {
  "ad-es": {
    path: "/reservas",
    label: "Google Ads · Español",
    utm: { utm_source: "google", utm_medium: "cpc", utm_campaign: "ads_es" },
  },
  "ad-en": {
    path: "/en/book-a-table",
    label: "Google Ads · English",
    utm: { utm_source: "google", utm_medium: "cpc", utm_campaign: "ads_en" },
  },
};

// Parámetros que, si llegan en la URL del anuncio, se preservan hacia el destino.
// gclid/gbraid/wbraid los añade Google con auto-tagging y son imprescindibles
// para que Google Ads case el clic con la conversión. Los utm_* entrantes (si se
// usa un tracking template) tienen prioridad sobre los del target.
const PASSTHROUGH = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

// Construye la URL final preservando los parámetros de Ads entrantes.
export function buildDestination(
  target: GoTarget,
  incoming: URLSearchParams,
): string {
  const url = new URL(target.path, SITE);
  // Primero los UTM por defecto del target…
  for (const [key, value] of Object.entries(target.utm)) {
    url.searchParams.set(key, value);
  }
  // …y luego los entrantes (gclid y, si vinieran, utm) que mandan sobre ellos.
  for (const key of PASSTHROUGH) {
    const value = incoming.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}
