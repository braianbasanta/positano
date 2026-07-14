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

const title = "Lieferung von neapolitanischer Pizza · Eixample · Positano BCN";
const description =
  "Bestellen Sie ganz einfach Pizza nach Hause in Barcelona. Wir liefern Ihnen die neapolitanische Pizza von Positano, frische Pasta und Antipasti direkt nach Hause. Bestellen Sie in wenigen Minuten online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("domicilio", "de"),
  ...socialFor({
    title,
    description,
    path: "/de/pizza-lieferservice-barcelona",
    locale: "de",
  }),
};

const steps = [
  {
    number: "01",
    title: "Wählen Sie Ihre Gerichte aus",
    text: "Rufen Sie unser Liefermenü auf Uber Eats oder Glovo auf und stellen Sie Ihre Bestellung zusammen: neapolitanische Pizza, frische Pasta, Antipasti und vieles mehr.",
  },
  {
    number: "02",
    title: "Bestätigen und bezahlen",
    text: "Geben Sie Ihre Adresse in Barcelona ein und bezahlen Sie sicher. Wir akzeptieren auch Ticket Restaurant®.",
  },
  {
    number: "03",
    title: "Wir bringen es zu Ihnen",
    text: "Wir backen Ihre Pizza frisch, und ein Lieferfahrer bringt sie Ihnen heiß bis vor die Haustür – ganz gleich, wo Sie sich gerade befinden.",
  },
];

const hours = [
  { day: "Dienstag bis Donnerstag", time: "13:00 – 16:00 Uhr · 20:00 – 23:30 Uhr" },
  { day: "Freitag", time: "13:00 – 16:00 Uhr · 20:00 Uhr – 00:00 Uhr" },
  { day: "Samstag", time: "13:00 Uhr – 00:00 Uhr" },
  { day: "Sonntag", time: "13:00 – 23:30 Uhr" },
  { day: "Montag", time: "Geschlossen" },
];

const faqs = [
  {
    q: "Wie kann ich bei Positano eine Pizza zum Mitnehmen bestellen?",
    a: "Geben Sie Ihre Bestellung online bei Uber Eats oder Glovo auf. Wählen Sie Ihre Gerichte aus, geben Sie Ihre Adresse in Barcelona ein, und wir liefern Ihnen die frisch zubereiteten Speisen nach Hause.",
  },
  {
    q: "In welche Stadtteile von Barcelona liefern Sie?",
    a: "Wir liefern in ganz Barcelona über Uber Eats und Glovo. Der genaue Lieferradius wird angezeigt, sobald Sie Ihre Adresse auf der Plattform eingeben.",
  },
  {
    q: "Was kann ich zur Lieferung bestellen?",
    a: "Unsere gesamte Speisekarte: 48 Stunden lang langsam gegärte neapolitanische Pizza, hausgemachte frische Pasta, Antipasti und Desserts. Alles frisch zubereitet und bereit, zu Hause genossen zu werden.",
  },
  {
    q: "Akzeptieren Sie Ticket Restaurant® für Lieferbestellungen?",
    a: "Ja, wir akzeptieren Ticket Restaurant® auch für Lieferbestellungen, je nachdem, über welche Plattform Sie Ihre Bestellung aufgeben.",
  },
  {
    q: "Zu welchen Zeiten liefern Sie?",
    a: "Wir liefern dienstags bis donnerstags von 13:00 bis 16:00 Uhr und von 20:00 bis 23:30 Uhr, freitags bis Mitternacht, samstags von 13:00 bis 00:00 Uhr und sonntags von 13:00 bis 23:30 Uhr. Montags haben wir geschlossen.",
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

export default function PizzaDeliveryDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          { name: "Pizzalieferung in Barcelona", path: "/de/pizza-lieferservice-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="de" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Lieferung in ganz Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizzalieferung in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Wir liefern Ihnen die Pizza nach Hause
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Neapolitanische Pizza mit 48-stündiger Gärung, frische Pasta und unsere Antipasti – frisch zubereitet und bereit zum Genießen bei Ihnen zu Hause. Noch nie war es so einfach, in Barcelona Pizza liefern zu lassen: Bestellen Sie online, und wir bringen sie Ihnen heiß bis vor die Haustür.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Bei Uber Eats bestellen
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
                Bei Glovo bestellen
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
                So funktioniert es
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                So einfach ist es, Pizza online zu bestellen
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Nur drei Schritte trennen Sie von einer frisch gebackenen neapolitanischen Pizza bei Ihnen zu Hause. Keine Anrufe, kein Warten.
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
        <Resenas lang="de" offset={12} limit={12} />

        {/* FAQ */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Häufig gestellte Fragen
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Pizzalieferung – im Detail
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
                  Lieferung nach Hause
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Bestellen Sie Ihre Pizza über Uber Eats oder Glovo
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                  Unser gesamtes Angebot an neapolitanischer Pizza, frischer Pasta und Antipasti – bereit zur Lieferung zu Ihnen nach Hause, überall in Barcelona. Wählen Sie Ihre bevorzugte Plattform aus – den genauen Lieferradius sehen Sie, sobald Sie Ihre Adresse eingeben.
                </p>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Lieferzeiten
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {hours.map((item) => (
                    <li key={item.day} className="font-serif text-lg text-ink-soft">
                      <span className="text-ink">{item.day}</span> · {item.time}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.84rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span>Wir akzeptieren Ticket Restaurant®</span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={UBER_EATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Bei Uber Eats bestellen
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
                    Bei Glovo bestellen
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-lg italic text-ink-soft">
                Möchten Sie Positano lieber bei einem Essen genießen?
              </p>
              <a
                href="/de/tisch-reservieren"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Einen Tisch reservieren
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="de" />
    </>
  );
}
