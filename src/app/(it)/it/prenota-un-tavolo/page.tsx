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

const title = "Prenota un tavolo · Pizzeria nell'Eixample · Positano BCN";
const description =
  "Prenota il tuo tavolo al Positano, una pizzeria napoletana nel cuore dell'Eixample, a Barcellona. Scegli data, ora e numero di persone: riceverai subito la conferma online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("reservas", "it"),
  ...socialFor({ title, description, path: "/it/prenota-un-tavolo", locale: "it" }),
};

const faqs = [
  {
    q: "Devo prenotare per mangiare a Positano?",
    a: "Non è indispensabile, ma l'Eixample si riempie, soprattutto nei fine settimana e a mezzogiorno. Prenotando online ti assicuri un tavolo all'orario che preferisci. Puoi anche passare senza prenotazione e tentare la fortuna.",
  },
  {
    q: "Posso prenotare per un gruppo numeroso?",
    a: "Sì. Per i gruppi più numerosi ti consigliamo di prenotare in anticipo. Se siete in tanti o volete un’area specifica, chiamaci al numero +34 933 51 59 13 e penseremo noi a organizzare tutto.",
  },
  {
    q: "Posso prenotare un tavolo sulla terrazza?",
    a: "Abbiamo una terrazza e tavoli all'interno. Puoi specificare la tua preferenza al momento della prenotazione; per la terrazza è previsto un supplemento del 10%. L'assegnazione definitiva dei posti dipende dalla disponibilità del giorno stesso.",
  },
  {
    q: "Quali sono gli orari di apertura di Positano?",
    a: "Siamo aperti da martedì a domenica. Da martedì a giovedì dalle 13:00 alle 16:00 e dalle 20:00 alle 23:30; venerdì fino a mezzanotte; sabato dalle 13:00 alle 00:00; domenica dalle 13:00 alle 23:30. Chiuso il lunedì.",
  },
  {
    q: "Come faccio a modificare o cancellare la mia prenotazione?",
    a: "Riceverai un'e-mail di conferma con le opzioni per modificare o annullare la prenotazione. Se hai qualche problema, chiamaci al numero +34 933 51 59 13 e ti aiuteremo.",
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

export default function BookATableItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          { name: "Prenota un tavolo", path: "/it/prenota-un-tavolo" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="it" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Prenotazioni
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Prenota un tavolo
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Scegli la data, l&apos;ora e il numero di ospiti. Riceverai subito la conferma.
            </p>
          </div>
        </section>

        {/* DISH widget */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(29,39,80,0.35)] sm:p-5 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Prenota un tavolo a Positano"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
              <DishReservationTracker />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              Hai problemi con la tua prenotazione? Chiamaci al{" "}
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
              Prenotare un tavolo al Positano, una pizzeria napoletana nel cuore dell’Eixample, è semplicissimo: scegli la data, l’ora e il numero di persone e riceverai subito una conferma. Ti aspettiamo in Carrer del Rosselló, 24, per gustare la pizza napoletana con impasto lievitato 48 ore, pasta fresca e antipasti.
            </p>

            <h2 className="mt-14 text-center font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Domande sulla tua prenotazione
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
      <SiteFooter lang="it" />
    </>
  );
}
