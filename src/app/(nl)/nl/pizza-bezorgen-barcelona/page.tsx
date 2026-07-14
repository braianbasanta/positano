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

const UBER_EATS =
  "https://www.ubereats.com/es/store/positano-pizzeria/ciPAhMptSOeZGNeUsyhjKA";
const GLOVO =
  "https://glovoapp.com/en/es/barcelona/stores/positano-pizzeria-barcelona";

const title = "Bezorging van Napolitaanse pizza’s · Eixample · Positano BCN";
const description =
  "Bestel op een makkelijke manier een pizza aan huis in Barcelona. Wij bezorgen de Napolitaanse pizza’s, verse pasta en antipasti van Positano bij je thuis. Bestel binnen enkele minuten online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("domicilio", "nl"),
  ...socialFor({
    title,
    description,
    path: "/nl/pizza-bezorgen-barcelona",
    locale: "nl",
  }),
};

const steps = [
  {
    number: "01",
    title: "Kies je gerechten",
    text: "Open ons bezorgmenu op Uber Eats of Glovo en stel je bestelling samen: Napolitaanse pizza, verse pasta, antipasti en nog veel meer.",
  },
  {
    number: "02",
    title: "Bevestig en betaal",
    text: "Voer je adres in Barcelona in en betaal veilig. We accepteren ook Ticket Restaurant®.",
  },
  {
    number: "03",
    title: "We brengen het naar je toe",
    text: "We bakken je pizza vers en een bezorger brengt hem warm bij je thuis, waar je ook bent.",
  },
];

const hours = [
  { day: "Dinsdag tot en met donderdag", time: "13.00 – 16.00 uur · 20.00 – 23.30 uur" },
  { day: "vrijdag", time: "13.00 – 16.00 uur · 20.00 – 00.00 uur" },
  { day: "zaterdag", time: "13.00 uur – 00.00 uur" },
  { day: "zondag", time: "13.00 – 23.30 uur" },
  { day: "Maandag", time: "Gesloten" },
];

const faqs = [
  {
    q: "Hoe bestel ik een pizza bij Positano?",
    a: "Bestel online via Uber Eats of Glovo. Kies je gerechten, vul je adres in Barcelona in en wij bezorgen het vers bereid bij je thuis.",
  },
  {
    q: "In welke wijken van Barcelona bezorgen jullie?",
    a: "We bezorgen in heel Barcelona via Uber Eats en Glovo. De exacte bezorgstraal wordt weergegeven zodra je je adres op het platform invoert.",
  },
  {
    q: "Wat kan ik bestellen om te laten bezorgen?",
    a: "Ons volledige menu: 48 uur lang langzaam gerijpte Napolitaanse pizza, zelfgemaakte verse pasta, antipasti en desserts. Alles vers bereid en klaar om thuis van te genieten.",
  },
  {
    q: "Accepteer je Ticket Restaurant® voor bezorgbestellingen?",
    a: "Ja, we accepteren Ticket Restaurant® ook voor bezorgbestellingen, afhankelijk van het platform dat je gebruikt om je bestelling te plaatsen.",
  },
  {
    q: "Wat zijn jullie bezorgtijden?",
    a: "We bezorgen van dinsdag tot en met donderdag van 13.00 tot 16.00 uur en van 20.00 tot 23.30 uur, op vrijdag tot middernacht, op zaterdag van 13.00 tot 00.00 uur en op zondag van 13.00 tot 23.30 uur. Op maandag zijn we gesloten.",
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

export default function PizzaDeliveryNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          { name: "Pizzabezorging in Barcelona", path: "/nl/pizza-bezorgen-barcelona" },
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
              Bezorging in heel Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizzabezorging in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              We bezorgen de pizza bij je thuis
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Napolitaanse pizza met een rijstijd van 48 uur, verse pasta en onze antipasti — vers bereid en klaar om thuis van te genieten. Pizza laten bezorgen in Barcelona was nog nooit zo makkelijk: bestel online en wij brengen hem warm bij je thuis.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Bestel via Uber Eats
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={GLOVO}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Bestel via Glovo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Hoe het werkt
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Online pizza bestellen is zo simpel
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Drie stappen en je hebt thuis een versgebakken Napolitaanse pizza. Geen telefoontjes, geen wachttijd.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <span className="font-display text-3xl text-lemon">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="nl" offset={12} limit={12} />

        {/* FAQ */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Veelgestelde vragen
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Pizzabezorging, in detail
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

        {/* Platform */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Thuisbezorging
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Bestel je pizza via Uber Eats of Glovo
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                  Ons volledige menu met Napolitaanse pizza’s, verse pasta en antipasti, klaar om bij je thuis bezorgd te worden, waar je ook woont in Barcelona. Kies je favoriete bezorgplatform — je ziet de exacte bezorgstraal zodra je je adres invoert.
                </p>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Bezorgtijden
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {hours.map((item) => (
                    <li key={item.day} className="font-serif text-lg text-ink-soft">
                      <span className="text-ink">{item.day}</span> · {item.time}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.84rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span>We accepteren Ticket Restaurant®</span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={UBER_EATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Bestel via Uber Eats
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href={GLOVO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Bestel via Glovo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-lg italic text-ink-soft">
                Geniet je liever van Positano aan tafel?
              </p>
              <a
                href="/nl/tafel-reserveren"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Reserveer een tafel
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
