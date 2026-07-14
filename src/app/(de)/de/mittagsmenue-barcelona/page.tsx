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

const title = "Italienisches Mittagessen im Eixample · Menü · Positano BCN";
const description =
  "Tagesmenü im „Positano“, einer italienischen Pizzeria im Stadtteil Eixample in Barcelona, für 14,90 €. Hausgemachte Gerichte von Dienstag bis Freitag. Wir akzeptieren Ticket Restaurant®.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menuDelDia", "de"),
  ...socialFor({ title, description, path: "/de/mittagsmenue-barcelona", locale: "de" }),
};

const hours = [
  { day: "Dienstag bis Donnerstag", time: "13:00 – 16:00 Uhr" },
  { day: "Freitag", time: "13:00 – 16:00 Uhr" },
  { day: "Samstag und Sonntag", time: "Vollständige Speisekarte à la carte" },
  { day: "Montag", time: "Geschlossen" },
];

const faqs = [
  {
    q: "Wie viel kostet das Mittagsmenü?",
    a: "Das Mittagsmenü kostet 14,90 € und umfasst eine Vorspeise, ein Hauptgericht, Brot, ein Getränk und ein Dessert. Für Plätze auf der Terrasse wird ein Aufschlag von 10 % berechnet.",
  },
  {
    q: "An welchen Tagen wird das Mittagsmenü angeboten?",
    a: "Das Mittagsmenü servieren wir dienstags bis freitags mittags von 13:00 bis 16:00 Uhr. Samstags und sonntags bieten wir die gesamte À-la-carte-Karte an, und montags haben wir geschlossen.",
  },
  {
    q: "Akzeptieren Sie Ticket Restaurant® oder Edenred für das Mittagsmenü?",
    a: "Ja. Sie können Ihr Mittagsmenü mit Ticket Restaurant®, Edenred und anderen Essensgutscheinen bezahlen. Der ideale Ort für Ihre Mittagspause im Eixample.",
  },
  {
    q: "Ändert sich das Mittagsmenü jede Woche?",
    a: "Ja, wir ergänzen das Angebot jede Woche mit hausgemachten Gerichten aus Süditalien: Pasta wie Rigatoni al Pesto, Salate, Hauptgerichte mit Fleisch oder Fisch sowie eine neapolitanische Pizza Ihrer Wahl (Margherita, Diavola, Ortolana und weitere).",
  },
  {
    q: "Muss ich für das Mittagsmenü reservieren?",
    a: "Es ist zwar nicht unbedingt erforderlich, aber im Eixample wird es gegen Mittag sehr voll: Wenn Sie in einer Gruppe kommen oder nur wenig Zeit haben, empfehlen wir Ihnen, online zu reservieren oder unter +34 933 51 59 13 anzurufen.",
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

export default function LunchMenuDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          { name: "Mittagsmenü in Barcelona", path: "/de/mittagsmenue-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={menuDelDiaJsonLd("de")} />
      <SiteHeader lang="de" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Mittagessen im Eixample
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Mittagsmenü in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Hausgemachte italienische Gerichte für 14,90 €
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Suchen Sie nach einer Möglichkeit, in der Nähe, im Stadtteil Eixample in Barcelona, zu Mittag zu essen? Jeden Mittag servieren wir unser Tagesmenü mit frischer Pasta, neapolitanischer Pizza und hausgemachten Gerichten aus Süditalien. Schnell, authentisch und preiswert.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/de/tisch-reservieren"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Zum Mittagessen reservieren
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/de/speisekarte"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Menü anzeigen
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
                Was ist im Lieferumfang enthalten?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Ein komplettes Menü für{" "}
                <span className="whitespace-nowrap">€14.90</span>
              </h2>
              <p className="mt-3 font-serif text-base italic text-ink-soft/70">
                10 % Terrassenzuschlag
              </p>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Vorspeise, Hauptgericht, Brot, ein Getränk und Nachtisch. Hausgemachte italienische Küche – damit Sie gut essen und pünktlich wieder an die Arbeit gehen können.
              </p>
            </Reveal>
          </div>
        </section>

        {/* This week's menu (updates from src/data/menuDelDia.ts) */}
        <MenuSemanal lang="de" />

        {/* Pay with meal-voucher cards */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-4 md:pb-28">
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="mx-auto max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                Wir akzeptieren Ticket Restaurant® und Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                Bezahlen Sie mit Ihrer Firmenessenskarte? Im Positano können Sie Ihr Tagesmenü mit Ticket Restaurant®, Edenred und anderen Essensgutscheinen bezahlen. Der perfekte Ort für Ihre Mittagspause im Eixample.
              </p>
              <PaymentLogos lang="de" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="de" offset={6} limit={12} />

        {/* Frequently asked questions */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Häufig gestellte Fragen
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Das Mittagsmenü im Einzelnen
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
                  Öffnungszeiten für das Tagesmenü
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Dienstag bis Freitag um 12 Uhr
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
                  Wo wir uns befinden
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
                    href="/de/tisch-reservieren"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Zum Mittagessen reservieren
                  </a>
                  <a
                    href="tel:+34933515913"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Rufen Sie uns an
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="de" />
    </>
  );
}
