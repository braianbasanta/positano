import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import PaymentLogos from "@/components/PaymentLogos";
import MenuSemanal from "@/components/MenuSemanal";
import Resenas from "@/components/Resenas";
import { breadcrumbJsonLd, menuDelDiaJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { goldCta3d } from "@/lib/ui";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const title = "Italiaanse lunch in de wijk Eixample · Vast menu · Positano BCN";
const description =
  "Dagmenu bij Positano, een Italiaanse pizzeria in de wijk Eixample in Barcelona, voor € 14,90. Zelfgemaakte gerechten van dinsdag tot en met vrijdag. We accepteren Ticket Restaurant®.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menuDelDia", "nl"),
  ...socialFor({ title, description, path: "/nl/lunchmenu-barcelona", locale: "nl" }),
};

const hours = [
  { day: "Dinsdag tot en met donderdag", time: "13.00 – 16.00 uur" },
  { day: "vrijdag", time: "13.00 – 16.00 uur" },
  { day: "Zaterdag en zondag", time: "Volledig à-la-cartemenu" },
  { day: "Maandag", time: "Gesloten" },
];

const faqs = [
  {
    q: "Hoeveel kost het lunchmenu?",
    a: "Het lunchmenu kost € 14,90 en bestaat uit een voorgerecht, hoofdgerecht, brood, een drankje en een toetje. Voor een tafel op het terras geldt een toeslag van 10%.",
  },
  {
    q: "Op welke dagen is het lunchmenu beschikbaar?",
    a: "Van dinsdag tot en met vrijdag serveren we het lunchmenu rond het middaguur, van 13.00 tot 16.00 uur. Op zaterdag en zondag kun je kiezen uit het volledige à-la-cartemenu, en op maandag zijn we gesloten.",
  },
  {
    q: "Accepteer je Ticket Restaurant® of Edenred voor het lunchmenu?",
    a: "Ja. Je kunt je lunchmenu betalen met Ticket Restaurant®, Edenred en andere maaltijdcheques. De perfecte plek voor je middagpauze in de wijk Eixample.",
  },
  {
    q: "Verandert het lunchmenu elke week?",
    a: "Ja, we vernieuwen het menu elke week met zelfgemaakte gerechten uit Zuid-Italië: pasta zoals rigatoni al pesto, salades, hoofdgerechten met vlees of vis en een Napolitaanse pizza naar keuze (Margherita, Diavola, Ortolana en nog veel meer).",
  },
  {
    q: "Moet ik reserveren voor het lunchmenu?",
    a: "Het is niet per se nodig, maar in de Eixample wordt het rond het middaguur druk: als je met een groep komt of weinig tijd hebt, raden we je aan om online te reserveren of te bellen naar +34 933 51 59 13.",
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

export default function LunchMenuNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          { name: "Lunchmenu in Barcelona", path: "/nl/lunchmenu-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={menuDelDiaJsonLd("nl")} />
      <SiteHeader lang="nl" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Lunch in de wijk Eixample
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Lunchmenu in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Zelfgemaakte Italiaanse gerechten voor € 14,90
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Op zoek naar een plekje in de buurt om te lunchen, in de wijk Eixample in Barcelona? Elke middag serveren we ons dagmenu met verse pasta, Napolitaanse pizza en huisgemaakte gerechten uit Zuid-Italië. Snel, authentiek en heel voordelig.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/nl/tafel-reserveren"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Reserveer voor de lunch
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/nl/menukaart"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Bekijk het menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="relative overflow-hidden bg-cream px-6 pt-24 pb-6 md:pt-32 md:pb-8">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Wat zit erbij?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Een compleet menu voor{" "}
                <span className="whitespace-nowrap">€14.90</span>
              </h2>
              <p className="mt-3 font-serif text-base italic text-ink-soft/70">
                10% terras toeslag
              </p>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Voorgerecht, hoofdgerecht, brood, een drankje en een toetje. Zelfgemaakte Italiaanse gerechten, zodat je lekker kunt eten en toch op tijd weer aan het werk kunt.
              </p>
            </Reveal>
          </div>
        </section>

        {/* This week's menu (updates from src/data/menuDelDia.ts) */}
        <MenuSemanal lang="nl" />

        {/* Pay with meal-voucher cards */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-4 md:pb-28">
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="mx-auto max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                We accepteren Ticket Restaurant® en Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                Betaal je met je bedrijfseetbon? Bij Positano kun je je dagmenu betalen met Ticket Restaurant®, Edenred en andere maaltijdbonnen. De perfecte plek voor je lunchpauze in de wijk Eixample.
              </p>
              <PaymentLogos lang="nl" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="nl" offset={6} limit={12} />

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
                Het lunchmenu, in detail
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
                    <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hours & location */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Openingstijden van het dagmenu
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Dinsdag tot en met vrijdag rond het middaguur
                </h2>
                <ul className="mx-auto mt-8 max-w-md space-y-2.5">
                  {hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-between"
                    >
                      <span className="font-serif text-lg text-ink">
                        {row.day}
                      </span>
                      <span className="font-serif text-base text-ink-soft sm:text-lg">
                        {row.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Waar we zijn
                </h3>
                <a
                  href={PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                >
                  Carrer del Rosselló, 24 · 08029 · Eixample, Barcelona
                </a>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="/nl/tafel-reserveren"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Reserveer voor de lunch
                  </a>
                  <a
                    href="tel:+34933515913"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Bel ons
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
