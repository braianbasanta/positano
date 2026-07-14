import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { reviewStatsEn } from "@/data/reviews";
import { goldCta3d } from "@/lib/ui";

const title = "De beste pizza van Barcelona · Uit de houtoven · Positano Eixample";
const description =
  "Op zoek naar de beste pizza in Barcelona? Positano serveert authentieke Napolitaanse pizza in de wijk Eixample: deeg dat 48 uur heeft gerijpt, een houtgestookte oven en DOP-ingrediënten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("mejorPizzeria", "nl"),
  ...socialFor({
    title,
    description,
    path: "/nl/beste-pizza-barcelona",
    locale: "nl",
  }),
};

const reasons = [
  {
    title: "48 uur gefermenteerd deeg",
    text: "Door de langzame gisting wordt onze pizza licht, luchtig en licht verteerbaar — dat is het geheim achter een echt geweldige Napolitaanse bodem.",
  },
  {
    title: "In 90 seconden op hout gestookt",
    text: "Gebakken op 400 °C in een houtgestookte oven, voor die cornicione met luipaardvlekken en die smeltende kern die een echte Napolitaanse pizza zo kenmerken.",
  },
  {
    title: "Italiaanse DOP-ingrediënten",
    text: "San Marzano-tomaten, fior di latte uit Campanië, buffelmozzarella DOP. Authentieke producten, rechtstreeks uit Italië.",
  },
  {
    title: "De favoriet van Barcelona",
    text: "Onze gasten geven ons een 4,8 op Google. Mensen komen terug voor het deeg, de smaak van de houtoven en de gastvrije ontvangst — dat maakt ons tot dé plek voor pizza in de stad.",
  },
];

export default function BestPizzaBarcelonaNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          { name: "De lekkerste pizza van Barcelona", path: "/nl/beste-pizza-barcelona" },
        ])}
      />
      <SiteHeader lang="nl" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Beoordeeld met ★{reviewStatsEn.rating} op Google
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              De lekkerste pizza van Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Echte pizza uit Napels, in de wijk Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Op zoek naar de beste pizza in Barcelona? Bij Positano maken we authentieke Napolitaanse pizza met deeg dat 48 uur heeft gerijpt, een houtgestookte oven en Italiaanse DOP-ingrediënten — precies zoals ze het in Napels doen. Onze gasten geven ons een 4,8 op Google.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/nl/tafel-reserveren"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Reserveer een tafel
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/nl/menukaart"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Bekijk onze pizza’s
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Why the best */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Waarom Positano?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Waarom is onze pizza de beste van Barcelona?
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Een geweldige pizza maak je niet zomaar even. Er zijn vier dingen die onze pizza onderscheiden van alle andere pizza’s in de stad — en die zijn geworteld in de{" "}
                <a
                  href="/nl/napolitaanse-pizza-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  de authentieke Napolitaanse pizzatraditie
                </a>{" "}
                die we uit Campanië hebben meegenomen.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {reason.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {reason.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <Resenas lang="nl" />

        {/* Closing CTA */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Kom het zelf maar eens proeven
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">
                Je vindt ons op Carrer del Rosselló 24, in het hart van de wijk Eixample in Barcelona. Reserveer een tafel of bestel eten dat bij je thuis wordt bezorgd.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/nl/tafel-reserveren"
                  className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                >
                  Reserveer een tafel
                </a>
                <a
                  href="/nl/pizza-bezorgen-barcelona"
                  className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  Levering van je bestelling
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
