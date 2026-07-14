import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import Visitanos from "@/components/Visitanos";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { goldCta3d } from "@/lib/ui";

const title = "Ristorante italiano a Barcellona · Forno a legna · Positano";
const description =
  "Positano è un autentico ristorante italiano a Barcellona: pizza napoletana, pasta fresca, risotti e piatti tipici del Sud Italia nel quartiere dell'Eixample.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("italiano", "it"),
  ...socialFor({
    title,
    description,
    path: "/it/ristorante-italiano-barcellona",
    locale: "it",
  }),
};

const dishes = [
  {
    title: "Pizza napoletana",
    text: "Impasto fermentato per 48 ore, cotto nel forno a legna e condito con ingredienti italiani DOP. Dalla Margherita al Tartufo.",
  },
  {
    title: "Pasta fresca fatta in casa",
    text: "Tagliatelle, scialatelli, raviolotto e altro ancora, fatti in casa. Prova la carbonara rifinita con una fetta di pecorino.",
  },
  {
    title: "Risotti e piatti principali",
    text: "Risotto ai funghi, filetto di manzo, filetto di salmone: la cucina del Sud Italia con prodotti genuini.",
  },
  {
    title: "Antipasti e bevande",
    text: "Burrata pugliese fritta, caprese di bufala, vini e birre italiane. L’inizio perfetto, oppure un drink al bancone.",
  },
];

export default function ItalianRestaurantBarcelonaItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          {
            name: "Ristorante italiano a Barcellona",
            path: "/it/ristorante-italiano-barcellona",
          },
        ])}
      />
      <SiteHeader lang="it" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              L&apos;autentico Sud Italia
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Ristorante italiano a Barcellona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Un assaggio di Napoli nell’Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano è un autentico ristorante italiano nel cuore di Barcellona. Pizza napoletana, pasta fresca fatta in casa, risotti e piatti tipici del Sud Italia — preparati da chef nati e cresciuti in Campania. Valutato 4,8 su Google.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/it/prenota-un-tavolo"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Prenota un tavolo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/it/menu"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Guarda il menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* What we serve */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                La nostra cucina
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Vera cucina italiana a Barcellona
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Dal forno per la pizza al tagliere per la pasta, tutto è preparato secondo la tradizione del Sud Italia, con ingredienti provenienti dall&apos;Italia.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {dishes.map((dish, index) => (
                <Reveal key={dish.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {dish.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {dish.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/it/menu"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Dai un&apos;occhiata al menu completo
              </a>
            </Reveal>
          </div>
        </section>

        {/* Social proof */}
        <Resenas lang="it" />

        {/* Location & hours */}
        <Visitanos lang="it" />
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
