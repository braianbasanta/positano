import { PAGES, pickLang, SITE_URL, type Locale } from "@/lib/i18n";
import { menu } from "@/data/menu";
import { wines, beers } from "@/data/wines";

/** URL absoluta a partir de una ruta interna (la home no lleva barra final). */
export const absUrl = (path: string): string =>
  `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * BreadcrumbList para el SERP. `trail` va de la raíz a la página actual,
 * p. ej. [{ name: "Inicio", path: "/" }, { name: "La Carta", path: "/menu" }].
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

/** "12,90 €" → "12.90" (formato decimal que espera schema.org/Offer). */
function parsePrice(price: string): string {
  const match = price.match(/([\d.,]+)/);
  if (!match) return "";
  return match[1].replace(/\./g, "").replace(",", ".");
}

/**
 * schema.org/Menu construido desde src/data/menu.ts. Cada categoría es una
 * MenuSection y cada plato un MenuItem con su Offer (precio en EUR). Google
 * puede generar rich results de menú para el restaurante con esto.
 */
const MENU_NAME: Record<Locale, string> = {
  es: "Carta de Positano",
  ca: "Carta de Positano",
  en: "Positano Menu",
  it: "Menu di Positano",
  fr: "Carte du Positano",
  de: "Speisekarte des Positano",
  nl: "Menukaart van Positano",
};

const IN_LANGUAGE: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca",
  en: "en",
  it: "it",
  fr: "fr",
  de: "de",
  nl: "nl",
};

export function menuJsonLd(lang: Locale) {
  const menuPath = PAGES.menu[lang] ?? "/menu";
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: MENU_NAME[lang],
    url: absUrl(menuPath),
    inLanguage: IN_LANGUAGE[lang],
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: pickLang(category, "name", lang) ?? category.name,
      hasMenuItem: category.items.map((dish) => {
        const name = pickLang(dish, "name", lang) ?? dish.name;
        const description = pickLang(dish, "desc", lang);
        const value = parsePrice(dish.price);
        const item: Record<string, unknown> = { "@type": "MenuItem", name };
        if (description) item.description = description;
        if (value) {
          item.offers = {
            "@type": "Offer",
            price: value,
            priceCurrency: "EUR",
          };
        }
        return item;
      }),
    })),
  };
}

/**
 * schema.org/Menu del menú del día (14,90 €, mar-vie al mediodía). Expone
 * precio y disponibilidad en datos estructurados para Google y las IAs; los
 * platos cambian cada semana, así que no se listan MenuItems.
 */
const MENU_DEL_DIA_NAME: Record<Locale, string> = {
  es: "Menú del día",
  ca: "Menú del dia",
  en: "Lunch Menu (Menú del Día)",
  it: "Menù pranzo (menú del día)",
  fr: "Menu du midi (menú del día)",
  de: "Mittagsmenü (menú del día)",
  nl: "Lunchmenu (menú del día)",
};

const MENU_DEL_DIA_DESC: Record<Locale, string> = {
  es: "Menú del día semanal por 14,90 €: primero, segundo, pan, bebida y postre. De martes a viernes, de 13:00 a 16:00. Aceptamos Ticket Restaurant® y Edenred.",
  ca: "Menú del dia setmanal per 14,90 €: primer, segon, pa, beguda i postres. De dimarts a divendres, de 13:00 a 16:00. Acceptem Ticket Restaurant® i Edenred.",
  en: "Weekly lunch menu for €14.90: starter, main course, bread, drink and dessert. Tuesday to Friday, 1:00–4:00 pm. Ticket Restaurant® and Edenred accepted.",
  it: "Menu settimanale del pranzo a 14,90 €: antipasto, piatto principale, pane, bevanda e dessert. Da martedì a venerdì, dalle 13:00 alle 16:00. Si accettano Ticket Restaurant® ed Edenred.",
  fr: "Menu du midi hebdomadaire à 14,90 € : entrée, plat, pain, boisson et dessert. Du mardi au vendredi, de 13 h à 16 h. Nous acceptons les Ticket Restaurant® et Edenred.",
  de: "Wöchentliches Mittagsmenü für 14,90 €: Vorspeise, Hauptgericht, Brot, Getränk und Dessert. Dienstag bis Freitag, 13:00–16:00 Uhr. Ticket Restaurant® und Edenred werden akzeptiert.",
  nl: "Wekelijks lunchmenu voor € 14,90: voorgerecht, hoofdgerecht, brood, drankje en toetje. Dinsdag tot en met vrijdag, 13.00–16.00 uur. Ticket Restaurant® en Edenred worden geaccepteerd.",
};

export function menuDelDiaJsonLd(lang: Locale) {
  const path = PAGES.menuDelDia[lang] ?? "/menu-del-dia";
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: MENU_DEL_DIA_NAME[lang],
    description: MENU_DEL_DIA_DESC[lang],
    url: absUrl(path),
    inLanguage: IN_LANGUAGE[lang],
    offers: {
      "@type": "Offer",
      price: "14.90",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * schema.org/Menu de bebidas (vinos + cervezas) construido desde
 * src/data/wines.ts. Misma estructura que menuJsonLd: cada categoría es una
 * MenuSection y cada bebida un MenuItem con su Offer. Se emite en /bebidas.
 */
export function beveragesJsonLd(lang: Locale) {
  const drinksPath = PAGES.bebidas[lang] ?? "/bebidas";
  const categories = [...wines, ...beers];
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: (
      {
        es: "Carta de Bebidas de Positano",
        ca: "Carta de Begudes de Positano",
        en: "Positano Drinks",
        it: "Carta delle bevande di Positano",
        fr: "Carte des boissons du Positano",
        de: "Getränkekarte des Positano",
        nl: "Drankenkaart van Positano",
      } as Record<Locale, string>
    )[lang],
    url: absUrl(drinksPath),
    inLanguage: IN_LANGUAGE[lang],
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: pickLang(category, "name", lang) ?? category.name,
      hasMenuItem: category.items.map((drink) => {
        const description = pickLang(drink, "notes", lang);
        const value = parsePrice(drink.price);
        const item: Record<string, unknown> = { "@type": "MenuItem", name: drink.name };
        if (description) item.description = description;
        if (value) {
          item.offers = {
            "@type": "Offer",
            price: value,
            priceCurrency: "EUR",
          };
        }
        return item;
      }),
    })),
  };
}
