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
    cta: "Ver el menú del día",
    igLabel: "El menú de cada día, en Instagram",
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
    cta: "See the menu of the day",
    igLabel: "Each day's menu on Instagram",
    landingHref: "/en/lunch-menu-barcelona",
  },
  it: {
    eyebrow: "Menu del giorno",
    heading: "Da martedì a venerdì mangiamo come a casa",
    intro:
      "Antipasto, piatto principale, pane, una bevanda e dessert. Un menu del giorno completo che aggiorniamo ogni settimana con prodotti freschi del mercato.",
    label: "Menu del giorno",
    incluido: "Bevanda e dessert inclusi",
    note: "Pubblichiamo il menu del giorno sulle nostre storie di Instagram. Dai un'occhiata prima di venire, così scopri cosa c'è in menu a pranzo.",
    cta: "Vedi il menu del giorno",
    igLabel: "Il menu di ogni giorno su Instagram",
    landingHref: "/it/menu-pranzo-barcellona",
  },
  fr: {
    eyebrow: "Menu du jour",
    heading: "Du mardi au vendredi, nous mangeons comme à la maison",
    intro:
      "Une entrée, un plat principal, du pain, une boisson et un dessert. Un menu du jour complet que nous renouvelons chaque semaine avec des produits frais du marché.",
    label: "Menu du jour",
    incluido: "Boisson et dessert compris",
    note: "Nous publions le menu du jour sur nos stories Instagram. Jetez-y un œil avant de venir pour découvrir ce que nous vous proposons à midi.",
    cta: "Voir le menu du jour",
    igLabel: "Le menu de chaque jour sur Instagram",
    landingHref: "/fr/menu-dejeuner-barcelone",
  },
  de: {
    eyebrow: "Tagesmenü",
    heading: "Von Dienstag bis Freitag essen wir wie zu Hause",
    intro:
      "Vorspeise, Hauptgericht, Brot, ein Getränk und Dessert. Ein komplettes Tagesmenü, das wir jede Woche mit frischen Produkten vom Markt neu zusammenstellen.",
    label: "Tagesmenü",
    incluido: "Getränk und Dessert inklusive",
    note: "Wir veröffentlichen das Tagesmenü in unseren Instagram-Stories. Schauen Sie doch vor Ihrem Besuch dort vorbei und sehen Sie sich an, was mittags auf dem Speiseplan steht.",
    cta: "Zum Tagesmenü",
    igLabel: "Das Menü von jedem Tag auf Instagram",
    landingHref: "/de/mittagsmenue-barcelona",
  },
  nl: {
    eyebrow: "Dagmenu",
    heading: "Van dinsdag tot en met vrijdag eten we net als thuis",
    intro:
      "Voorgerecht, hoofdgerecht, brood, een drankje en een toetje. Een compleet dagmenu dat we elke week vernieuwen met verse producten van de markt.",
    label: "Dagmenu",
    incluido: "Drankje en toetje inbegrepen",
    note: "We zetten het menu van elke dag op onze Instagram Stories. Neem even een kijkje voordat je langskomt, zodat je weet wat er ’s middags op het menu staat.",
    cta: "Bekijk het dagmenu",
    igLabel: "Het menu van elke dag op Instagram",
    landingHref: "/nl/lunchmenu-barcelona",
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
            href={t.landingHref}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream shadow-[0_10px_28px_rgba(29,39,80,0.25)] transition-all duration-300 hover:bg-lemon hover:text-ink"
          >
            {t.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[0.84rem] uppercase tracking-[0.22em] text-lemon transition-colors hover:text-ink"
          >
            {t.igLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
