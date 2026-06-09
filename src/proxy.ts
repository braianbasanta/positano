import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Limpia las URLs heredadas de la web WordPress con parámetro `?lang=` (p. ej.
// `/?lang=en`, `/?lang=es`). La web nueva usa rutas `/en`, no query strings;
// esas URLs quedaron en Search Console como "rastreadas, sin indexar".
//
// No se pueden limpiar con `redirects()` de next.config: Next reenvía el query
// al destino, así que `/?lang=es` → `/` mantendría el `?lang=es` y entraría en
// bucle infinito. Aquí eliminamos el parámetro y redirigimos 308 a la ruta
// limpia: `lang=en` en la home va a `/en`; el resto se queda en su ruta sin el
// `?lang`. El matcher (abajo) hace que esto SOLO se ejecute cuando hay `?lang`,
// así que no añade coste al tráfico normal.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const lang = url.searchParams.get("lang");
  url.searchParams.delete("lang");

  if (lang === "en" && url.pathname === "/") {
    url.pathname = "/en";
  }

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [{ source: "/:path*", has: [{ type: "query", key: "lang" }] }],
};
