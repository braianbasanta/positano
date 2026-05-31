import type { MetadataRoute } from "next";
import { SITE_URL, alternatePath } from "@/lib/i18n";

// Páginas ES (raíz) con par EN. La home y las landings espejo declaran
// hreflang recíproco vía `alternates.languages`.
const PAIRED: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.8 },
  { path: "/nuestra-historia", priority: 0.8 },
  { path: "/pizzeria-eixample", priority: 0.7 },
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
  { path: "/en/italian-restaurant-barcelona", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority } of PAIRED) {
    const enPath = alternatePath(path, "en");
    const languages = {
      "es-ES": `${SITE_URL}${path === "/" ? "" : path}`,
      en: `${SITE_URL}${enPath}`,
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

  for (const { path, priority } of EN_ONLY) {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    });
  }

  return entries;
}
