import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import type { Locale } from "@/lib/i18n";

const INSTAGRAM_URL = "https://instagram.com/positanopizzeriabcn/";

const COPY = {
  es: {
    eyebrow: "Menú del día",
    heading: "De martes a viernes, comemos como en casa",
    intro:
      "Primero, segundo, pan, bebida y postre. Un menú completo que renovamos cada semana con producto fresco de mercado.",
    label: "Menú almuerzo",
    incluido: "Bebida y postre incluidos",
    note: "Publicamos el menú del día en nuestras stories de Instagram. Échale un vistazo antes de venir y descubre qué se cocina al mediodía.",
    cta: "Ver menú del día en Instagram",
    landingLabel: "Más sobre el menú del día",
    landingHref: "/menu-del-dia",
  },
  en: {
    eyebrow: "Menu of the day",
    heading: "Tuesday to Friday, we eat like at home",
    intro:
      "Starter, main, bread, a drink and dessert. A complete menu of the day we refresh every week with fresh market produce.",
    label: "Menu of the day",
    incluido: "Drink and dessert included",
    note: "We post each day's menu on our Instagram stories. Take a look before you come and see what's cooking at midday.",
    cta: "See the menu of the day on Instagram",
    landingLabel: "More about the menu of the day",
    landingHref: "/en/lunch-menu-barcelona",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function MenuDelDia({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  return (
    <section
      id="menu-dia"
      className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -left-14 -top-14 h-80 w-auto -rotate-12 text-lemon/20" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
            {t.intro}
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-12 flex flex-col items-center gap-8 border border-ink/15 bg-cream/55 px-8 py-12 sm:px-14 sm:py-14"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[0.78rem] uppercase tracking-[0.28em] text-ink-soft/70">
              {t.label}
            </span>
            <span className="font-display text-6xl leading-none text-ink md:text-7xl">
              14,90 €
            </span>
            <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-soft/70">
              {t.incluido}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-ink/15" />
            <Lemon className="h-5 w-5 text-lemon" />
            <span className="h-px w-10 bg-ink/15" />
          </div>

          <p className="max-w-md text-center font-serif text-base leading-relaxed text-ink-soft">
            {t.note}
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream shadow-[0_10px_28px_rgba(29,39,80,0.25)] transition-all duration-300 hover:bg-lemon hover:text-ink"
          >
            {t.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href={t.landingHref}
            className="group inline-flex items-center gap-2 text-[0.84rem] uppercase tracking-[0.22em] text-lemon transition-colors hover:text-ink"
          >
            {t.landingLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
