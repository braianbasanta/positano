import type { MetadataRoute } from "next";
import { SITE_URL, alternatePath } from "@/lib/i18n";

// Páginas ES (raíz) con par EN. La home y las landings espejo declaran
// hreflang recíproco vía `alternates.languages`.
const PAIRED: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.8 },
  { path: "/reservas", priority: 0.9 },
  { path: "/bebidas", priority: 0.6 },
  { path: "/pizza-napolitana-barcelona", priority: 0.7 },
  { path: "/pizzeria-eixample", priority: 0.7 },
  { path: "/restaurante-italiano-barcelona", priority: 0.7 },
  { path: "/menu-del-dia", priority: 0.8 },
  { path: "/pizza-domicilio", priority: 0.7 },
  { path: "/trabaja-con-nosotros", priority: 0.5 },
  { path: "/aviso-legal", priority: 0.3 },
  { path: "/politica-de-privacidad", priority: 0.3 },
  { path: "/politica-de-cookies-ue", priority: 0.3 },
];

// Landings sólo en inglés (sin equivalente ES).
const EN_ONLY: { path: string; priority: number }[] = [
  { path: "/en/best-pizza-barcelona", priority: 0.8 },
];

// Páginas sólo en español (sin equivalente EN): no declaran hreflang cruzado.
const ES_ONLY: { path: string; priority: number }[] = [
  { path: "/nuestra-historia", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority } of PAIRED) {
    const enPath = alternatePath(path, "en");
    const esUrl = `${SITE_URL}${path === "/" ? "" : path}`;
    const languages = {
      "es-ES": esUrl,
      en: `${SITE_URL}${enPath}`,
      "x-default": esUrl,
    };
    entries.push({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: { languages },
    });
    entries.push({
      url: `${SITE_URL}${enPath}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: { languages },
    });
  }

  for (const { path, priority } of [...EN_ONLY, ...ES_ONLY]) {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    });
  }

  return entries;
}
