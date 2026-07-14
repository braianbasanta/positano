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

const title = "Tisch reservieren · Pizzeria im Eixample · Positano BCN";
const description =
  "Reservieren Sie Ihren Tisch im „Positano“, einer neapolitanischen Pizzeria im Herzen des Stadtteils Eixample in Barcelona. Wählen Sie Datum, Uhrzeit und die Anzahl der Gäste aus – Sie erhalten umgehend eine Online-Bestätigung.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("reservas", "de"),
  ...socialFor({ title, description, path: "/de/tisch-reservieren", locale: "de" }),
};

const faqs = [
  {
    q: "Muss ich im „Positano“ einen Tisch reservieren?",
    a: "Es ist zwar nicht unbedingt notwendig, aber das Eixample ist vor allem an Wochenenden und zur Mittagszeit gut besucht. Eine Online-Reservierung garantiert Ihnen einen Tisch zur gewünschten Zeit. Sie können aber auch gerne ohne Reservierung vorbeikommen und Ihr Glück versuchen.",
  },
  {
    q: "Kann ich für eine große Gruppe buchen?",
    a: "Ja. Für größere Gruppen empfehlen wir eine Voranmeldung. Wenn Sie mit einer größeren Gruppe anreisen oder einen bestimmten Bereich wünschen, rufen Sie uns bitte unter +34 933 51 59 13 an, und wir werden dies gerne für Sie arrangieren.",
  },
  {
    q: "Kann ich einen Tisch auf der Terrasse reservieren?",
    a: "Wir verfügen über eine Terrasse und Tische im Innenbereich. Sie können Ihren Wunsch bei der Buchung angeben; für die Terrasse wird ein Aufpreis von 10 % berechnet. Die endgültige Sitzplatzzuweisung hängt von der Verfügbarkeit am jeweiligen Tag ab.",
  },
  {
    q: "Wie lauten die Öffnungszeiten von Positano?",
    a: "Wir haben von Dienstag bis Sonntag geöffnet. Dienstag bis Donnerstag von 13:00 bis 16:00 Uhr und von 20:00 bis 23:30 Uhr; freitags bis Mitternacht; samstags von 13:00 Uhr bis 00:00 Uhr; sonntags von 13:00 bis 23:30 Uhr. Montags geschlossen.",
  },
  {
    q: "Wie kann ich meine Buchung ändern oder stornieren?",
    a: "Sie erhalten eine Bestätigungs-E-Mail mit der Möglichkeit, Ihre Buchung zu ändern oder zu stornieren. Sollten Sie Probleme haben, rufen Sie uns bitte unter +34 933 51 59 13 an, und wir helfen Ihnen gerne weiter.",
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

export default function BookATableDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          { name: "Einen Tisch reservieren", path: "/de/tisch-reservieren" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="de" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Reservierungen
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Einen Tisch reservieren
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Wählen Sie das Datum, die Uhrzeit und die Anzahl der Gäste aus. Sie erhalten umgehend eine Bestätigung.
            </p>
          </div>
        </section>

        {/* DISH widget */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(29,39,80,0.35)] sm:p-5 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Reservieren Sie einen Tisch im „Positano“"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
              <DishReservationTracker />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              Haben Sie Probleme mit Ihrer Buchung? Rufen Sie uns unter{" "}
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
              Die Tischreservierung im „Positano“, einer neapolitanischen Pizzeria im Herzen des Eixample, ist ganz einfach: Wählen Sie Datum, Uhrzeit und die Anzahl der Gäste aus, und Sie erhalten umgehend eine Bestätigung. Wir erwarten Sie in der Carrer del Rosselló 24 mit neapolitanischer Pizza aus 48 Stunden lang gereiftem Teig, frischer Pasta und Antipasti.
            </p>

            <h2 className="mt-14 text-center font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Fragen zu Ihrer Buchung
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
      <SiteFooter lang="de" />
    </>
  );
}
