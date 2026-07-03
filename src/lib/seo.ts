import { SITE_URL, type Locale } from "@/lib/i18n";
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
export function menuJsonLd(lang: Locale) {
  const menuPath = lang === "en" ? "/en/menu" : "/menu";
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: lang === "en" ? "Positano Menu" : "Carta de Positano",
    url: absUrl(menuPath),
    inLanguage: lang === "en" ? "en" : "es-ES",
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: lang === "en" ? category.nameEn ?? category.name : category.name,
      hasMenuItem: category.items.map((dish) => {
        const name = lang === "en" ? dish.nameEn ?? dish.name : dish.name;
        const description = lang === "en" ? dish.descEn ?? dish.desc : dish.desc;
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
export function menuDelDiaJsonLd(lang: Locale) {
  const path = lang === "en" ? "/en/lunch-menu-barcelona" : "/menu-del-dia";
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: lang === "en" ? "Lunch Menu (Menú del Día)" : "Menú del día",
    description:
      lang === "en"
        ? "Weekly lunch menu for €14.90: starter, main course, bread, drink and dessert. Tuesday to Friday, 1:00–4:00 pm. Ticket Restaurant® and Edenred accepted."
        : "Menú del día semanal por 14,90 €: primero, segundo, pan, bebida y postre. De martes a viernes, de 13:00 a 16:00. Aceptamos Ticket Restaurant® y Edenred.",
    url: absUrl(path),
    inLanguage: lang === "en" ? "en" : "es-ES",
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
  const drinksPath = lang === "en" ? "/en/drinks" : "/bebidas";
  const categories = [...wines, ...beers];
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: lang === "en" ? "Positano Drinks" : "Carta de Bebidas de Positano",
    url: absUrl(drinksPath),
    inLanguage: lang === "en" ? "en" : "es-ES",
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: lang === "en" ? category.nameEn ?? category.name : category.name,
      hasMenuItem: category.items.map((drink) => {
        const description = lang === "en" ? drink.notesEn ?? drink.notes : drink.notes;
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
