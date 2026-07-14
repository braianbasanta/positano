import type { MetadataRoute } from "next";
import { SITE_URL, PAGES, LOCALES, HREFLANG } from "@/lib/i18n";

// Prioridad por página (clave de PAGES en lib/i18n). Cada página se emite en
// todos los idiomas en los que existe, con el bloque hreflang completo.
const PRIORITY: Record<string, number> = {
  home: 1,
  menu: 0.8,
  reservas: 0.9,
  bebidas: 0.6,
  napolitana: 0.7,
  eixample: 0.7,
  italiano: 0.7,
  mejorPizzeria: 0.8,
  menuDelDia: 0.8,
  domicilio: 0.7,
  empleo: 0.5,
  avisoLegal: 0.3,
  privacidad: 0.3,
  cookies: 0.3,
};

// Páginas sólo en español (sin equivalente en otros idiomas): sin hreflang.
const ES_ONLY: { path: string; priority: number }[] = [
  { path: "/nuestra-historia", priority: 0.8 },
  { path: "/grupos-barcelona", priority: 0.7 },
];

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const [key, slugs] of Object.entries(PAGES)) {
    const priority = PRIORITY[key] ?? 0.5;
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      const path = slugs[locale];
      if (path) languages[HREFLANG[locale]] = abs(path);
    }
    if (slugs.es) languages["x-default"] = abs(slugs.es);

    for (const locale of LOCALES) {
      const path = slugs[locale];
      if (!path) continue;
      entries.push({
        url: abs(path),
        lastModified,
        changeFrequency: "monthly",
        priority,
        alternates: { languages },
      });
    }
  }

  for (const { path, priority } of ES_ONLY) {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    });
  }

  return entries;
}
