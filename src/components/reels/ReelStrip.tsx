import Lemon from "../Lemon";
import LemonBranch from "../LemonBranch";
import Reveal from "../Reveal";
import { featured } from "@/data/menu";
import ReelCarousel from "./ReelCarousel";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "Carta en vídeo",
    heading: "Cada plato, en movimiento",
    intro:
      "Antes de elegir, míralo. Así sale cada plato de nuestra cocina — grabado tal cual llega a tu mesa.",
    note: "Y más de 45 platos: antipasti, pastas frescas, risotti, carnes, pescados y 18 pizzas napolitanas.",
    cta: "Ver la carta completa",
    cartaHref: "/menu",
  },
  en: {
    eyebrow: "Menu in video",
    heading: "Every dish, in motion",
    intro:
      "See it before you choose. This is how each dish leaves our kitchen — filmed exactly as it reaches your table.",
    note: "And over 45 dishes: antipasti, fresh pasta, risotti, meat, fish and 18 Neapolitan pizzas.",
    cta: "View the full menu",
    cartaHref: "/en/menu",
  },
  it: {
    eyebrow: "Menu nel video",
    heading: "Ogni piatto, in movimento",
    intro:
      "Guardalo prima di scegliere. Ecco come ogni piatto esce dalla nostra cucina: ripreso esattamente nel momento in cui arriva sulla tua tavola.",
    note: "E oltre 45 piatti: antipasti, pasta fresca, risotti, carne, pesce e 18 pizze napoletane.",
    cta: "Guarda il menu completo",
    cartaHref: "/it/menu",
  },
  fr: {
    eyebrow: "Menu dans la vidéo",
    heading: "Chaque plat, en mouvement",
    intro:
      "Découvrez-le avant de faire votre choix. Voici comment chaque plat quitte notre cuisine — filmé exactement au moment où il arrive sur votre table.",
    note: "Et plus de 45 plats : antipasti, pâtes fraîches, risottos, viandes, poissons et 18 pizzas napolitaines.",
    cta: "Consultez le menu complet",
    cartaHref: "/fr/carte",
  },
  de: {
    eyebrow: "Menü im Video",
    heading: "Jedes Gericht – in Bewegung",
    intro:
      "Sehen Sie es sich an, bevor Sie sich entscheiden. So verlässt jedes Gericht unsere Küche – genau so gefilmt, wie es auf Ihren Tisch kommt.",
    note: "Und über 45 Gerichte: Antipasti, frische Pasta, Risotti, Fleisch, Fisch und 18 neapolitanische Pizzen.",
    cta: "Die vollständige Speisekarte anzeigen",
    cartaHref: "/de/speisekarte",
  },
  nl: {
    eyebrow: "Menu in de video",
    heading: "Elk gerecht, in beweging",
    intro:
      "Bekijk het voordat je een keuze maakt. Zo verlaat elk gerecht onze keuken — gefilmd precies op het moment dat het bij jou op tafel komt.",
    note: "En meer dan 45 gerechten: antipasti, verse pasta, risotto’s, vlees, vis en 18 Napolitaanse pizza’s.",
    cta: "Bekijk het volledige menu",
    cartaHref: "/nl/menukaart",
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * Teaser de reels en el homepage. Tira horizontal de platos destacados;
 * cada tarjeta abre el visor inmersivo recorriendo toda la carta.
 */
export default function ReelStrip({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  return (
    <section
      id="reels"
      className="relative overflow-hidden bg-ink py-24 text-cream md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[150deg] text-lemon/20" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] md:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-cream/75">
            {t.intro}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <ReelCarousel items={featured} lang={lang} />
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="max-w-xl font-serif text-lg italic text-cream/75">
            {t.note}
          </p>
          <a
            href={t.cartaHref}
            className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
          >
            {t.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
