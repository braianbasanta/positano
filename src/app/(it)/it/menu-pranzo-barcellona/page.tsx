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

const title = "Pranzo italiano nell'Eixample · Menu fisso · Positano BCN";
const description =
  "Menu del giorno da Positano, una pizzeria italiana nell’Eixample, a Barcellona, a 14,90 €. Cibo fatto in casa dal martedì al venerdì. Accettiamo Ticket Restaurant®.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menuDelDia", "it"),
  ...socialFor({ title, description, path: "/it/menu-pranzo-barcellona", locale: "it" }),
};

const hours = [
  { day: "Da martedì a giovedì", time: "dalle 13:00 alle 16:00" },
  { day: "Venerdì", time: "dalle 13:00 alle 16:00" },
  { day: "Sabato e domenica", time: "Menu completo à la carte" },
  { day: "Lunedì", time: "Chiuso" },
];

const faqs = [
  {
    q: "Quanto costa il menu del pranzo?",
    a: "Il menu del pranzo costa 14,90 € e comprende un antipasto, un piatto principale, il pane, una bevanda e il dessert. Per i posti in terrazza si applica un supplemento del 10%.",
  },
  {
    q: "In quali giorni è disponibile il menu del pranzo?",
    a: "Il menu del pranzo è disponibile da martedì a venerdì a mezzogiorno, dalle 13:00 alle 16:00. Il sabato e la domenica proponiamo il menu completo à la carte, mentre il lunedì siamo chiusi.",
  },
  {
    q: "Accettate Ticket Restaurant® o Edenred per il menu del pranzo?",
    a: "Sì. Puoi pagare il tuo menu del pranzo con Ticket Restaurant®, Edenred e altri buoni pasto. Il posto perfetto per la tua pausa pranzo nell'Eixample.",
  },
  {
    q: "Il menu del pranzo cambia ogni settimana?",
    a: "Sì, lo rinnoviamo ogni settimana con piatti fatti in casa tipici del Sud Italia: pasta come i rigatoni al pesto, insalate, piatti principali a base di carne o pesce e una pizza napoletana a tua scelta (Margherita, Diavola, Ortolana e altre ancora).",
  },
  {
    q: "Devo prenotare per il menu del pranzo?",
    a: "Non è indispensabile, ma l'Eixample si riempie a mezzogiorno: se venite in gruppo o avete poco tempo, vi consigliamo di prenotare online o di chiamare il numero +34 933 51 59 13.",
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

export default function LunchMenuItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          { name: "Menu del pranzo a Barcellona", path: "/it/menu-pranzo-barcellona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={menuDelDiaJsonLd("it")} />
      <SiteHeader lang="it" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Pranzo nell&apos;Eixample
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Menu del pranzo a Barcellona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Cucina italiana fatta in casa a 14,90 €
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Cerchi un posto dove pranzare qui vicino, nell’Eixample di Barcellona? Ogni giorno a mezzogiorno serviamo il nostro menu del giorno con pasta fresca, pizza napoletana e piatti fatti in casa del Sud Italia. Veloce, autentico e con un ottimo rapporto qualità-prezzo.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/it/prenota-un-tavolo"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Prenota per il pranzo
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

        {/* What's included */}
        <section className="relative overflow-hidden bg-cream px-6 pt-24 pb-6 md:pt-32 md:pb-8">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Cosa è incluso
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Un menu completo a{" "}
                <span className="whitespace-nowrap">€14.90</span>
              </h2>
              <p className="mt-3 font-serif text-base italic text-ink-soft/70">
                Supplemento terrazza del 10%
              </p>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Antipasto, piatto principale, pane, una bevanda e dessert. Cucina italiana fatta in casa, pensata per mangiare bene e tornare al lavoro in orario.
              </p>
            </Reveal>
          </div>
        </section>

        {/* This week's menu (updates from src/data/menuDelDia.ts) */}
        <MenuSemanal lang="it" />

        {/* Pay with meal-voucher cards */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-4 md:pb-28">
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="mx-auto max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                Accettiamo Ticket Restaurant® ed Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                Paghi con la tua carta pasto aziendale? Da Positano puoi pagare il menu del giorno con Ticket Restaurant®, Edenred e altri buoni pasto. Il posto perfetto per la tua pausa pranzo nell’Eixample.
              </p>
              <PaymentLogos lang="it" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="it" offset={6} limit={12} />

        {/* Frequently asked questions */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Domande frequenti
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Il menu del pranzo, in dettaglio
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
                  Orari del menu del giorno
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Da martedì a venerdì a mezzogiorno
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
                  Dove siamo
                </h3>
                <a
                  href={PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                >
                  Carrer del Rosselló, 24 · 08029 · Eixample, Barcellona
                </a>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="/it/prenota-un-tavolo"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Prenota per il pranzo
                  </a>
                  <a
                    href="tel:+34933515913"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Chiamaci
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
