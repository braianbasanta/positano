import type { Metadata } from "next";

export type Locale = "es" | "ca" | "en" | "it" | "fr" | "de" | "nl";

export const LOCALES: readonly Locale[] = ["es", "ca", "en", "it", "fr", "de", "nl"];

export const SITE_URL = "https://positanopizzeriabcn.com";

/**
 * Tabla de páginas → slug por idioma. El español vive en la raíz (sin
 * prefijo) y el resto bajo /ca/, /en/, /it/, /fr/, /de/, /nl/. Esta tabla alimenta
 * los `hreflang`, el selector de idioma del header y el sitemap. Los slugs
 * están optimizados por keyword en cada idioma (patrón heredado de EN).
 *
 * CA/IT/FR/DE/NL tienen el set completo salvo las páginas legales (solo
 * ES/EN); lo que no existe en un idioma cae al fallback EN en los enlaces.
 */
export const PAGES: Record<string, Partial<Record<Locale, string>>> = {
  home: { es: "/", ca: "/ca", en: "/en", it: "/it", fr: "/fr", de: "/de", nl: "/nl" },
  menu: {
    es: "/menu",
    ca: "/ca/carta",
    en: "/en/menu",
    it: "/it/menu",
    fr: "/fr/carte",
    de: "/de/speisekarte",
    nl: "/nl/menukaart",
  },
  bebidas: {
    es: "/bebidas",
    ca: "/ca/begudes",
    en: "/en/drinks",
    it: "/it/bevande",
    fr: "/fr/boissons",
    de: "/de/getraenke",
    nl: "/nl/dranken",
  },
  reservas: {
    es: "/reservas",
    ca: "/ca/reservar-taula",
    en: "/en/book-a-table",
    it: "/it/prenota-un-tavolo",
    fr: "/fr/reserver-une-table",
    de: "/de/tisch-reservieren",
    nl: "/nl/tafel-reserveren",
  },
  napolitana: {
    es: "/pizza-napolitana-barcelona",
    ca: "/ca/pizza-napolitana-barcelona",
    en: "/en/neapolitan-pizza-barcelona",
    it: "/it/pizza-napoletana-barcellona",
    fr: "/fr/pizza-napolitaine-barcelone",
    de: "/de/neapolitanische-pizza-barcelona",
    nl: "/nl/napolitaanse-pizza-barcelona",
  },
  mejorPizzeria: {
    es: "/mejor-pizzeria-barcelona",
    ca: "/ca/millor-pizzeria-barcelona",
    en: "/en/best-pizza-barcelona",
    it: "/it/migliore-pizza-barcellona",
    fr: "/fr/meilleure-pizza-barcelone",
    de: "/de/beste-pizza-barcelona",
    nl: "/nl/beste-pizza-barcelona",
  },
  eixample: {
    es: "/pizzeria-eixample",
    ca: "/ca/pizzeria-eixample",
    en: "/en/italian-restaurant-eixample",
    it: "/it/ristorante-italiano-eixample",
    fr: "/fr/restaurant-italien-eixample",
    de: "/de/italienisches-restaurant-eixample",
    nl: "/nl/italiaans-restaurant-eixample",
  },
  italiano: {
    es: "/restaurante-italiano-barcelona",
    ca: "/ca/restaurant-italia-barcelona",
    en: "/en/italian-restaurant-barcelona",
    it: "/it/ristorante-italiano-barcellona",
    fr: "/fr/restaurant-italien-barcelone",
    de: "/de/italienisches-restaurant-barcelona",
    nl: "/nl/italiaans-restaurant-barcelona",
  },
  menuDelDia: {
    es: "/menu-del-dia",
    ca: "/ca/menu-del-dia",
    en: "/en/lunch-menu-barcelona",
    it: "/it/menu-pranzo-barcellona",
    fr: "/fr/menu-dejeuner-barcelone",
    de: "/de/mittagsmenue-barcelona",
    nl: "/nl/lunchmenu-barcelona",
  },
  domicilio: {
    es: "/pizza-domicilio",
    ca: "/ca/pizza-a-domicili",
    en: "/en/pizza-delivery-barcelona",
    it: "/it/pizza-a-domicilio-barcellona",
    fr: "/fr/livraison-pizza-barcelone",
    de: "/de/pizza-lieferservice-barcelona",
    nl: "/nl/pizza-bezorgen-barcelona",
  },
  empleo: {
    es: "/trabaja-con-nosotros",
    ca: "/ca/treballa-amb-nosaltres",
    en: "/en/careers",
    it: "/it/lavora-con-noi",
    fr: "/fr/recrutement",
    de: "/de/karriere",
    nl: "/nl/vacatures",
  },
  avisoLegal: { es: "/aviso-legal", en: "/en/legal-notice" },
  privacidad: { es: "/politica-de-privacidad", en: "/en/privacy-policy" },
  cookies: { es: "/politica-de-cookies-ue", en: "/en/cookie-policy" },
};

/** Compat: pares ES↔EN derivados de PAGES (consumidores antiguos). */
export const ROUTE_PAIRS: { es: string; en: string }[] = Object.values(PAGES)
  .filter((p): p is { es: string; en: string } => Boolean(p.es && p.en))
  .map((p) => ({ es: p.es, en: p.en }));

/** Busca la página a la que pertenece un pathname (en cualquier idioma). */
export function pageKeyOf(pathname: string): string | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const [key, slugs] of Object.entries(PAGES)) {
    if (Object.values(slugs).includes(clean)) return key;
  }
  return null;
}

/**
 * Devuelve la ruta equivalente en otro idioma. Si la página no existe en el
 * idioma destino (o el path no se reconoce), devuelve la home de ese idioma —
 * comportamiento del selector de idioma del header.
 */
export function alternatePath(pathname: string, target: Locale): string {
  const key = pageKeyOf(pathname);
  const fallback = PAGES.home[target]!;
  if (!key) return fallback;
  return PAGES[key][target] ?? fallback;
}

/**
 * Como alternatePath, pero si la página no existe en el idioma destino cae a
 * la versión EN (página correcta aunque en inglés). Para enlaces internos de
 * contenido (CTAs), donde mandar a la home sería perder la intención.
 */
export function localizedHref(pathname: string, target: Locale): string {
  const key = pageKeyOf(pathname);
  if (!key) return PAGES.home[target]!;
  return PAGES[key][target] ?? PAGES[key].en ?? PAGES[key].es ?? "/";
}

/** Sufijo de campo por idioma en los data files (name → nameEn/nameIt/...). */
const FIELD_SUFFIX: Record<Exclude<Locale, "es">, "En" | "It" | "Fr" | "De" | "Nl" | "Ca"> = {
  ca: "Ca",
  en: "En",
  it: "It",
  fr: "Fr",
  de: "De",
  nl: "Nl",
};

/**
 * Lee un campo localizado de un item de data (menu/wines): `pickLang(dish,
 * "name", lang)` → nameIt para "it", con fallback nameEn → name. ES lee el
 * campo base. Campos sin variante (nombres italianos de plato) caen al base.
 */
export function pickLang<T extends object>(
  item: T,
  base: string,
  lang: Locale,
): string | undefined {
  const record = item as Record<string, string | undefined>;
  if (lang === "es") return record[base];
  return record[base + FIELD_SUFFIX[lang]] ?? record[base + "En"] ?? record[base];
}

/** Código hreflang de cada idioma. Solo ES lleva región (audiencia local). */
export const HREFLANG: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca",
  en: "en",
  it: "it",
  fr: "fr",
  de: "de",
  nl: "nl",
};

/**
 * Construye los `alternates` (canonical + hreflang) de una página en el
 * idioma indicado, listando TODAS las versiones que existen de esa página.
 * x-default apunta al español (idioma por defecto, audiencia local).
 */
export function alternatesForPage(
  pageKey: string,
  locale: Locale,
): Metadata["alternates"] {
  const slugs = PAGES[pageKey];
  const self = slugs?.[locale];
  if (!slugs || !self) return undefined;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    const path = slugs[l];
    if (path) languages[HREFLANG[l]] = path;
  }
  languages["x-default"] = slugs.es ?? self;
  return { canonical: self, languages };
}

/**
 * Compat: alternates de una página ES por su path. Página ES sin par en otros
 * idiomas (p. ej. /nuestra-historia): solo canonical + x-default self.
 */
export function alternatesFor(esPath: string): Metadata["alternates"] {
  const key = pageKeyOf(esPath);
  if (!key) {
    return {
      canonical: esPath,
      languages: { "es-ES": esPath, "x-default": esPath },
    };
  }
  return alternatesForPage(key, "es");
}

/** Compat: alternates de una página EN por su path. */
export function alternatesForEn(enPath: string): Metadata["alternates"] {
  const key = pageKeyOf(enPath);
  if (!key) {
    return {
      canonical: enPath,
      languages: { en: enPath, "x-default": enPath },
    };
  }
  return alternatesForPage(key, "en");
}

/** Locale de Open Graph por idioma. */
const OG_LOCALE: Record<Locale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_GB",
  it: "it_IT",
  fr: "fr_FR",
  de: "de_DE",
  nl: "nl_NL",
};

/**
 * openGraph + twitter propios de una página. Sin esto, el merge *shallow* de
 * Next hace que todas las páginas hereden el og:title/og:url de la home (el
 * del layout) y las previews de WhatsApp/redes muestran la home en vez de la
 * página compartida. OJO: definir openGraph en una página descarta también la
 * og:image file-based del segmento padre, así que referenciamos aquí las
 * copias estáticas en /public/og/ (exportadas de opengraph-image.tsx; si se
 * cambia ese diseño, regenerarlas: curl de /opengraph-image-* → public/og/).
 * Solo hay og:image ES/EN; CA (audiencia local) comparte la ES y los demás
 * idiomas la EN.
 * Uso: `...socialFor({ title, description, path, locale })` en `metadata`.
 */
export function socialFor(opts: {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const { title, description, path, locale = "es" } = opts;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImageLocale = locale === "es" || locale === "ca" ? "es" : "en";
  return {
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      ...(locale === "es" ? {} : { alternateLocale: "es_ES" }),
      siteName: "Positano Pizzería",
      title,
      description,
      url,
      images: [
        {
          url: `${SITE_URL}/og/positano-og-${ogImageLocale}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
