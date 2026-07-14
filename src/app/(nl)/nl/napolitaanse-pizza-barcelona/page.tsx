import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Authentieke Napolitaanse pizza · Uit de houtoven · Positano BCN";
const description =
  "Positano is een authentieke Napolitaanse pizzeria in Barcelona. Recepten uit Campanië, 48 uur gerijpt deeg, houtgestookte oven en Italiaanse DOP-ingrediënten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("napolitana", "nl"),
  ...socialFor({
    title,
    description,
    path: "/nl/napolitaanse-pizza-barcelona",
    locale: "nl",
  }),
};

const faqs = [
  {
    q: "Waar kan ik in Barcelona een authentiek Napolitaans restaurant vinden?",
    a: "Positano is een Napolitaans restaurant in de wijk Eixample in Barcelona (Carrer del Rosselló, 24). Het wordt gerund door drie Napolitanen uit Campanië die koken precies zoals ze dat in Napels doen: pizza met 48 uur gerijpt deeg, gebakken in een houtgestookte oven, zelfgemaakte verse pasta en antipasti met Italiaanse DOP-producten.",
  },
  {
    q: "Wat maakt een Napolitaanse pizzeria anders dan een gewone pizzeria?",
    a: "Echte Napolitaanse pizza kenmerk je aan het lang gerezen deeg (48 uur), een houtgestookte oven op 400 °C waarin hij in minder dan 90 seconden wordt gebakken, en de hoge, luchtige rand — de cornicione — met zijn kenmerkende luipaardvlekken. Bij Positano volgen we die traditie zonder concessies.",
  },
  {
    q: "Is Positano een goed Italiaans restaurant in Barcelona?",
    a: "Ja. Naast Napolitaanse pizza serveert Positano Zuid-Italiaanse gerechten: verse pasta, antipasti, salades en zelfgemaakte desserts, met recepten die rechtstreeks uit Campanië komen. Een Italiaans restaurant in het hart van de wijk Eixample in Barcelona.",
  },
  {
    q: "Wie zit er achter Positano?",
    a: "Positano is opgericht door Antonio, Massimo en Vincenzo, drie Napolitanen uit Campanië die de recepten uit hun geboortestreek naar Barcelona hebben gebracht. Italianen die koken zoals dat in Napels hoort, zonder aanpassingen en zonder snelkoppelingen.",
  },
  {
    q: "Bezorgt Positano Napolitaanse pizza’s?",
    a: "Ja, we bezorgen onze Napolitaanse pizza’s, verse pasta en antipasti in Barcelona via Uber Eats en Glovo. We accepteren ook Ticket Restaurant®.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const keys = [
  {
    title: "48 uur gefermenteerd deeg",
    text: "We laten het deeg 48 uur rusten om een lichtere, beter verteerbare pizza te krijgen met die luchtige korst — de cornicione — die zo typisch is voor Napels.",
  },
  {
    title: "Houtgestookte oven op 400 °C",
    text: "Elke pizza wordt in minder dan 90 seconden gebakken in een houtgestookte oven, zoals de Napolitaanse traditie voorschrijft. Zo krijg je die korst met luipaardvlekken en die smeltende binnenkant.",
  },
  {
    title: "Italiaanse DOP-ingrediënten",
    text: "San Marzano-tomaten, fior di latte uit Campanië, buffelmozzarella DOP, Grana Padano van 24 maanden. Authentieke producten rechtstreeks uit Italië, zonder concessies.",
  },
];

export default function NeapolitanPizzaNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          { name: "Napolitaanse pizza", path: "/nl/napolitaanse-pizza-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="nl" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              De echte pizza uit Napels
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Napolitaanse pizza in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Van Campanië naar de Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Bij Positano maken we niet zomaar een pizza: we maken authentieke Napolitaanse pizza, volgens de recepten die we uit Zuid-Italië hebben meegenomen, met deeg dat 48 uur heeft gerijpt en een houtgestookte oven. De echte smaak van Napels, midden in Barcelona.
            </p>
          </div>
        </section>

        {/* Our story */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Ons verhaal
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Drie Napolitanen in Barcelona
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                Het begint allemaal met Antonio, Massimo en Vincenzo, geboren en getogen in Campanië, de regio waar de pizza is ontstaan. Daar hebben ze al van jongs af aan geleerd dat koken de ziel van het huis is.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                Na jarenlang hun vak te hebben geperfectioneerd, brachten ze de recepten uit hun thuisland mee naar Barcelona. En zo ontstond Positano: een Napolitaanse pizzeria waar de keuken van Zuid-Italië precies zo wordt geserveerd als in Napels, zonder aanpassingen en zonder concessies.
              </p>
              <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
                “De passie voor lekker eten zit ons in het bloed.”
              </p>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
                <Image
                  src="/hero/positano.jpg"
                  alt="Positano, een Napolitaanse pizzeria in Barcelona met recepten uit Campanië"
                  width={1400}
                  height={933}
                  className="relative aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* What makes it authentic */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Wat maakt het authentiek?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Echte Napolitaanse pizza
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Echte Napolitaanse pizza wordt nooit zomaar in elkaar geflanst. Dit zijn de drie dingen die hem zo bijzonder maken en waardoor we voor velen{" "}
                <a
                  href="/nl/beste-pizza-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  de lekkerste pizza van Barcelona
                </a>
                .
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {keys.map((key, index) => (
                <Reveal key={key.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {key.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {key.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/nl/menukaart"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Bekijk onze pizza’s
              </a>
              <a
                href="/nl/tafel-reserveren"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Reserveer een tafel
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="nl" offset={18} limit={12} />

        {/* Frequently asked questions */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Veelgestelde vragen
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Napolitaans restaurant in Barcelona
              </h2>
            </Reveal>

            <Reveal className="mt-14">
              <div className="divide-y divide-ink/15 border-y border-ink/15">
                {faqs.map((item) => (
                  <details key={item.q} className="group px-1 py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl leading-snug text-ink transition-colors hover:text-lemon md:text-2xl [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="relative mt-1 h-4 w-4 shrink-0">
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-lemon" />
                        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-lemon transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
