"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import DishRow from "@/components/DishRow";
import { menu, type Dish } from "@/data/menu";
import { pickLang, type Locale } from "@/lib/i18n";

type Filter = "all" | "veg" | "vegan";

const COPY = {
  es: {
    label: "Filtrar la carta",
    all: "Todo",
    veg: "Vegetariano",
    vegan: "Vegano",
    empty: "No hay platos para este filtro.",
  },
  en: {
    label: "Filter the menu",
    all: "All",
    veg: "Vegetarian",
    vegan: "Vegan",
    empty: "No dishes for this filter.",
  },
  it: {
    label: "Filtra il menu",
    all: "Tutto",
    veg: "Vegetariano",
    vegan: "Vegano",
    empty: "Non ci sono piatti per questo filtro.",
  },
  fr: {
    label: "Filtrer le menu",
    all: "Tout",
    veg: "Végétarien",
    vegan: "Végétalien",
    empty: "Ce filtre ne concerne aucun plat.",
  },
  de: {
    label: "Das Menü filtern",
    all: "Alle",
    veg: "Vegetarisch",
    vegan: "Vegan",
    empty: "Für diesen Filter gibt es keine Gerichte.",
  },
  nl: {
    label: "Het menu filteren",
    all: "Alles",
    veg: "Vegetarisch",
    vegan: "Veganistisch",
    empty: "Er zijn geen gerechten voor dit filter.",
  },
} as const;

const FILTERS: Filter[] = ["all", "veg", "vegan"];

function matches(dish: Dish, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "vegan") return dish.diet === "vegan";
  // "veg" incluye también los veganos.
  return dish.diet === "veg" || dish.diet === "vegan";
}

export default function MenuExplorer({ lang = "es" }: { lang?: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");
  const t = COPY[lang];

  const categories = menu
    .map((category) => ({
      ...category,
      items: category.items.filter((dish) => matches(dish, filter)),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <>
      {/* Barra de filtros */}
      <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center gap-4">
        <span className="text-[0.72rem] uppercase tracking-[0.3em] text-ink-soft">
          {t.label}
        </span>
        <div
          role="group"
          aria-label={t.label}
          className="inline-flex flex-wrap justify-center gap-1.5 rounded-full border border-ink/15 bg-white/50 p-1.5"
        >
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`rounded-full px-5 py-2 text-[0.78rem] uppercase tracking-[0.18em] transition-all duration-300 ${
                filter === key
                  ? "bg-ink text-cream"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {t[key]}
            </button>
          ))}
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="text-center font-serif text-lg italic text-ink-soft">
          {t.empty}
        </p>
      ) : (
        <div className="mx-auto flex max-w-5xl flex-col gap-20">
          {categories.map((category) => (
            <Reveal key={category.id}>
              <section id={category.id} className="scroll-mt-24">
                <div className="flex items-center justify-center gap-5">
                  <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                  <h2 className="text-center font-display text-3xl uppercase tracking-[0.14em] text-lemon md:text-4xl">
                    {pickLang(category, "name", lang) ?? category.name}
                  </h2>
                  <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                </div>
                <ul className="mx-auto mt-10 grid max-w-4xl gap-x-14 gap-y-7 md:grid-cols-2">
                  {category.items.map((dish) => (
                    <DishRow key={dish.name} dish={dish} lang={lang} />
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
