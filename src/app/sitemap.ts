import type { MetadataRoute } from "next";
import { SITE_URL, PAGES, LOCALES, HREFLANG } from "@/lib/i18n";
import { menuUpdatedAt } from "@/data/menu";
import { menuDelDiaUpdatedAt } from "@/data/menuDelDia";

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

// Última modificación REAL del contenido por página (no la fecha de build:
// un lastmod idéntico en cada deploy hace que Google ignore la señal).
// Actualizar la clave al cambiar el contenido de esa página; las cartas
// toman su fecha de los propios archivos de datos que se editan cada semana.
const CONTENT_UPDATED: Record<string, string> = {
  home: "2026-07-14",
  menu: menuUpdatedAt,
  menuDelDia: menuDelDiaUpdatedAt,
  avisoLegal: "2026-07-03",
  privacidad: "2026-07-03",
  cookies: "2026-07-03",
};
// Fecha por defecto: último retoque de contenido general (refactor 7 idiomas).
const CONTENT_UPDATED_DEFAULT = "2026-07-07";

// Páginas sólo en español (sin equivalente en otros idiomas): sin hreflang.
const ES_ONLY: { path: string; priority: number }[] = [
  { path: "/nuestra-historia", priority: 0.8 },
  { path: "/grupos-barcelona", priority: 0.7 },
];

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
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
        lastModified: new Date(CONTENT_UPDATED[key] ?? CONTENT_UPDATED_DEFAULT),
        changeFrequency: "monthly",
        priority,
        alternates: { languages },
      });
    }
  }

  for (const { path, priority } of ES_ONLY) {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(CONTENT_UPDATED_DEFAULT),
      changeFrequency: "monthly",
      priority,
    });
  }

  return entries;
}
