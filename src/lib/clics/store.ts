// Persistencia de los clics de /go/<slug> en Supabase (tabla positano_clics).
// Mismo patrón que facturacion/store.ts: PostgREST + service_role key, server-only.
// Append-only: cada clic es un INSERT (sin condiciones de carrera), la agregación
// se hace al leer en el panel /admin/clics.

const BASE = "https://ipxkhcyzycoktfassukz.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = "positano_clics";

function endpoint(qs = ""): string {
  return `${BASE}/rest/v1/${TABLE}${qs}`;
}
function headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: KEY ?? "",
    Authorization: `Bearer ${KEY ?? ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export interface ClickInsert {
  slug: string;
  target: string;
  gclid: string | null;
  query: string | null;
  referer: string | null;
  country: string | null;
  user_agent: string | null;
  is_bot: boolean;
}

export interface ClickRow extends ClickInsert {
  id: number;
  ts: string;
}

// UA de no-humanos conocidos. Incluye los rastreadores de Google que verifican
// la landing de un anuncio al crearlo/editarlo (AdsBot-Google, "Google",
// Google-Ads-Creatives-Assistant) y clientes de línea de comandos. NO descartamos
// la fila: la marcamos is_bot para poder excluirla al agregar.
// Nota: el clic REAL de Google Ads siempre trae gclid (auto-tagging); estas
// verificaciones nunca lo traen, así que gclid es la señal definitiva de "real".
const BOT_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|google|adsbot|curl|wget|python-requests|node-fetch|axios|ahrefs|semrush|dataforseo/i;

export function isBotUA(ua: string): boolean {
  return BOT_RE.test(ua);
}

// Inserta un clic. Nunca lanza: un fallo de tracking no debe afectar al redirect.
export async function recordClick(data: ClickInsert): Promise<void> {
  if (!KEY) return;
  try {
    await fetch(endpoint(), {
      method: "POST",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify(data),
    });
  } catch {
    // Tracking best-effort: si Supabase falla, el visitante ya fue redirigido.
  }
}

// Lee los clics desde una fecha ISO (por defecto, todos). Orden recientes→antiguos.
export async function listClicks(sinceISO?: string): Promise<ClickRow[]> {
  if (!KEY) return [];
  const filter = sinceISO ? `&ts=gte.${encodeURIComponent(sinceISO)}` : "";
  const res = await fetch(
    endpoint(`?select=*${filter}&order=ts.desc&limit=5000`),
    { headers: headers(), cache: "no-store" },
  );
  if (!res.ok) return [];
  return (await res.json()) as ClickRow[];
}
