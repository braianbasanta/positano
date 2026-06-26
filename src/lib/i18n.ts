import type { Metadata } from "next";

export type Locale = "es" | "en";

export const SITE_URL = "https://positanopizzeriabcn.com";

/**
 * Equivalencias de ruta ES ↔ EN. El español vive en la raíz (sin prefijo) y
 * el inglés bajo /en/. Esta tabla alimenta tanto los `hreflang` como el
 * selector de idioma del header. Los slugs EN están optimizados por keyword.
 */
export const ROUTE_PAIRS: { es: string; en: string }[] = [
  { es: "/", en: "/en" },
  { es: "/menu", en: "/en/menu" },
  { es: "/bebidas", en: "/en/drinks" },
  { es: "/pizza-napolitana-barcelona", en: "/en/neapolitan-pizza-barcelona" },
  { es: "/pizzeria-eixample", en: "/en/italian-restaurant-eixample" },
  {
    es: "/restaurante-italiano-barcelona",
    en: "/en/italian-restaurant-barcelona",
  },
  { es: "/menu-del-dia", en: "/en/lunch-menu-barcelona" },
  { es: "/pizza-domicilio", en: "/en/pizza-delivery-barcelona" },
  { es: "/reservas", en: "/en/book-a-table" },
  { es: "/trabaja-con-nosotros", en: "/en/careers" },
  { es: "/aviso-legal", en: "/en/legal-notice" },
  { es: "/politica-de-privacidad", en: "/en/privacy-policy" },
  { es: "/politica-de-cookies-ue", en: "/en/cookie-policy" },
];

/** Devuelve la ruta equivalente en el otro idioma (o la home si no hay par). */
export function alternatePath(pathname: string, target: Locale): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (target === "en") {
    const pair = ROUTE_PAIRS.find((p) => p.es === clean);
    return pair ? pair.en : "/en";
  }
  const pair = ROUTE_PAIRS.find((p) => p.en === clean);
  return pair ? pair.es : "/";
}

/**
 * Construye los `alternates` (canonical + hreflang) de una página con par
 * ES↔EN. `path` es la ruta del idioma actual. x-default apunta al español
 * (idioma por defecto, audiencia local de Barcelona).
 */
export function alternatesFor(esPath: string): Metadata["alternates"] {
  const pair = ROUTE_PAIRS.find((p) => p.es === esPath);
  // Página ES sin par EN (p.ej. /nuestra-historia): no declarar un hreflang
  // cruzado erróneo a la home EN; solo canonical + x-default self.
  if (!pair) {
    return {
      canonical: esPath,
      languages: { "es-ES": esPath, "x-default": esPath },
    };
  }
  return {
    canonical: esPath,
    languages: {
      "es-ES": esPath,
      en: pair.en,
      "x-default": esPath,
    },
  };
}

export function alternatesForEn(enPath: string): Metadata["alternates"] {
  const esPath = alternatePath(enPath, "es");
  const hasEsPair = esPath !== "/" || enPath === "/en";
  return {
    canonical: enPath,
    languages: hasEsPair
      ? { "es-ES": esPath, en: enPath, "x-default": esPath }
      : { en: enPath, "x-default": enPath },
  };
}
