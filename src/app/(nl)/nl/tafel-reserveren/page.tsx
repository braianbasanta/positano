import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import DishReservationTracker from "@/components/DishReservationTracker";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { DISH_WIDGET_URL } from "@/lib/dish";

const title = "Reserveer een tafel · Pizzeria in de wijk Eixample · Positano BCN";
const description =
  "Reserveer je tafel bij Positano, een Napolitaanse pizzeria in het hart van de wijk Eixample in Barcelona. Kies de datum, het tijdstip en het aantal personen — je krijgt direct online een bevestiging.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("reservas", "nl"),
  ...socialFor({ title, description, path: "/nl/tafel-reserveren", locale: "nl" }),
};

const faqs = [
  {
    q: "Moet ik reserveren om bij Positano te eten?",
    a: "Het is niet per se nodig, maar het Eixample zit vaak vol, vooral in het weekend en rond het middaguur. Als je online reserveert, ben je verzekerd van een tafel op het tijdstip dat je wilt. Je kunt natuurlijk ook gewoon binnenlopen en je geluk beproeven.",
  },
  {
    q: "Kan ik voor een grote groep reserveren?",
    a: "Ja. Voor grotere groepen raden we je aan om van tevoren te reserveren. Als je met een grote groep bent of een specifieke ruimte wilt, bel ons dan op +34 933 51 59 13, dan regelen we het voor je.",
  },
  {
    q: "Kan ik een tafel op het terras reserveren?",
    a: "We hebben een terras en tafels binnen. Je kunt bij het reserveren aangeven wat je voorkeur is; voor het terras geldt een toeslag van 10%. De uiteindelijke tafelindeling hangt af van de beschikbaarheid op de dag zelf.",
  },
  {
    q: "Wat zijn de openingstijden van Positano?",
    a: "We zijn open van dinsdag tot en met zondag. Dinsdag tot en met donderdag van 13.00 tot 16.00 uur en van 20.00 tot 23.30 uur; vrijdag tot middernacht; zaterdag van 13.00 tot 00.00 uur; zondag van 13.00 tot 23.30 uur. Maandag zijn we gesloten.",
  },
  {
    q: "Hoe kan ik mijn boeking wijzigen of annuleren?",
    a: "Je krijgt een bevestigingsmail met de mogelijkheid om je boeking te wijzigen of te annuleren. Mocht je problemen hebben, bel ons dan op +34 933 51 59 13, dan helpen we je graag verder.",
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

export default function BookATableNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          { name: "Reserveer een tafel", path: "/nl/tafel-reserveren" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="nl" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Reserveringen
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Reserveer een tafel
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Kies de datum, het tijdstip en het aantal gasten. Je krijgt meteen een bevestiging.
            </p>
          </div>
        </section>

        {/* DISH widget */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(29,39,80,0.35)] sm:p-5 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Reserveer een tafel bij Positano"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
              <DishReservationTracker />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              Heb je problemen met je boeking? Bel ons dan op{" "}
              <a
                href="tel:+34933515913"
                className="text-ink underline-offset-4 transition-colors hover:text-lemon hover:underline"
              >
                +34 933 515 913
              </a>
              .
            </p>
          </div>
        </section>

        {/* About your booking + FAQ */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-2 md:pb-28">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-center font-serif text-lg leading-relaxed text-ink-soft">
              Een tafel reserveren bij Positano, een Napolitaanse pizzeria in het hart van de Eixample, is heel eenvoudig: kies je datum, tijdstip en het aantal personen, en je krijgt meteen een bevestiging. We staan voor je klaar op Carrer del Rosselló 24, voor Napolitaanse pizza’s met 48 uur gerijpt deeg, verse pasta en antipasti.
            </p>

            <h2 className="mt-14 text-center font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Vragen over je boeking
            </h2>
            <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
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
          </div>
        </section>
      </main>
      <Script src="https://reservation.dish.co/widget.js" strategy="lazyOnload" />
      <SiteFooter lang="nl" />
    </>
  );
}
