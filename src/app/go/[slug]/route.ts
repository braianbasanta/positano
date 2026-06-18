// Redirect de tracking: /go/<slug>  →  web real (con UTM + gclid preservado).
//
// Se pone como "URL final" en los anuncios. Cada acceso:
//   1. Registra el clic en Supabase ANTES de que importe el consentimiento de
//      cookies o si hay JS (lo hace el servidor). → conteo fiable de Google Ads.
//   2. Redirige al destino conservando gclid/utm para que Ads case la conversión
//      y la atribución client-side existente siga funcionando.
//
// El INSERT va dentro de `after()` para no retrasar el redirect (best-effort).
import { NextResponse, after } from "next/server";
import { GO_TARGETS, buildDestination, SITE } from "@/lib/clics/config";
import { recordClick, isBotUA } from "@/lib/clics/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const incoming = new URL(request.url).searchParams;
  const target = GO_TARGETS[slug];

  // Slug desconocido: no perdemos al visitante, lo mandamos a la home.
  const destination = target ? buildDestination(target, incoming) : SITE;

  // Extraemos los datos del request ahora (síncrono) y guardamos tras responder.
  const ua = request.headers.get("user-agent") ?? "";
  const gclid =
    incoming.get("gclid") ??
    incoming.get("gbraid") ??
    incoming.get("wbraid") ??
    null;
  const click = {
    slug,
    target: destination,
    gclid,
    query: incoming.toString() || null,
    referer: request.headers.get("referer"),
    country: request.headers.get("x-vercel-ip-country"),
    user_agent: ua || null,
    // Un clic de Ads real SIEMPRE trae gclid/gbraid/wbraid (auto-tagging). Sin
    // ninguno = acceso directo a la URL del anuncio (verificadores de Google,
    // crawlers tipo pageburst, curl…): no es un clic pagado, lo marcamos bot.
    is_bot: isBotUA(ua) || gclid === null,
  };
  after(() => recordClick(click));

  // 302 + no-store: redirect temporal y no cacheable, así CADA clic vuelve a
  // pasar por aquí y se cuenta (un 301 quedaría cacheado y dejaría de contar).
  return NextResponse.redirect(destination, {
    status: 302,
    headers: { "Cache-Control": "no-store" },
  });
}
