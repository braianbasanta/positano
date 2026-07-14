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

const title = "Consegna a domicilio di pizza napoletana · Eixample · Positano BCN";
const description =
  "Ordina la pizza a domicilio a Barcellona in modo semplicissimo. Ti portiamo a casa la pizza napoletana di Positano, la pasta fresca e gli antipasti. Ordina online in pochi minuti.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("domicilio", "it"),
  ...socialFor({
    title,
    description,
    path: "/it/pizza-a-domicilio-barcellona",
    locale: "it",
  }),
};

const steps = [
  {
    number: "01",
    title: "Scegli i tuoi piatti",
    text: "Apri il nostro menu per le consegne su Uber Eats o Glovo e componi il tuo ordine: pizza napoletana, pasta fresca, antipasti e molto altro ancora.",
  },
  {
    number: "02",
    title: "Conferma e paga",
    text: "Inserisci il tuo indirizzo a Barcellona e paga in tutta sicurezza. Accettiamo anche i buoni Ticket Restaurant®.",
  },
  {
    number: "03",
    title: "Te lo portiamo noi",
    text: "Prepariamo la tua pizza al momento e un fattorino te la consegna calda a casa tua, ovunque tu sia.",
  },
];

const hours = [
  { day: "Da martedì a giovedì", time: "dalle 13:00 alle 16:00 · dalle 20:00 alle 23:30" },
  { day: "Venerdì", time: "dalle 13:00 alle 16:00 · dalle 20:00 alle 00:00" },
  { day: "Sabato", time: "13:00 – 00:00" },
  { day: "Domenica", time: "dalle 23:00 alle 23:30" },
  { day: "Lunedì", time: "Chiuso" },
];

const faqs = [
  {
    q: "Come faccio a ordinare una pizza a domicilio da Positano?",
    a: "Effettua l'ordine online su Uber Eats o Glovo. Scegli i tuoi piatti, inserisci il tuo indirizzo a Barcellona e te li porteremo appena preparati.",
  },
  {
    q: "In quali zone di Barcellona effettuate le consegne?",
    a: "Effettuiamo consegne in tutta Barcellona tramite Uber Eats e Glovo. Il raggio di consegna esatto verrà visualizzato quando inserirai il tuo indirizzo sulla piattaforma.",
  },
  {
    q: "Cosa posso ordinare con consegna a domicilio?",
    a: "Il nostro menu completo: pizza napoletana a lievitazione lenta di 48 ore, pasta fresca fatta in casa, antipasti e dolci. Tutto preparato al momento e pronto da gustare a casa tua.",
  },
  {
    q: "Accettate i Ticket Restaurant® per gli ordini con consegna a domicilio?",
    a: "Sì, accettiamo anche i Ticket Restaurant® per gli ordini con consegna a domicilio, a seconda della piattaforma che usi per effettuare l'ordine.",
  },
  {
    q: "Quali sono gli orari di consegna?",
    a: "Consegniamo dal martedì al giovedì dalle 13:00 alle 16:00 e dalle 20:00 alle 23:30, il venerdì fino a mezzanotte, il sabato dalle 13:00 alle 24:00 e la domenica dalle 13:00 alle 23:30. Il lunedì siamo chiusi.",
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

export default function PizzaDeliveryItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          { name: "Consegna pizza a Barcellona", path: "/it/pizza-a-domicilio-barcellona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="it" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Consegna in tutta Barcellona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Consegna pizza a Barcellona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Ti portiamo la pizza a casa
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Pizza napoletana con impasto lievitato per 48 ore, pasta fresca e i nostri antipasti: tutto preparato al momento e pronto da gustare a casa tua. Ordinare la pizza a domicilio a Barcellona non è mai stato così facile: ordina online e te la consegneremo calda direttamente a casa tua.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Ordina su Uber Eats
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
                Ordina su Glovo
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
                Come funziona
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Ordinare la pizza online è semplicissimo
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Tre semplici passaggi e avrai una pizza napoletana appena sfornata a casa tua. Niente telefonate, niente attese.
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
        <Resenas lang="it" offset={12} limit={12} />

        {/* FAQ */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Domande frequenti
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La consegna della pizza, in dettaglio
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
                  Consegna a domicilio
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Ordina la tua pizza su Uber Eats o Glovo
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                  Il nostro menu completo di pizza napoletana, pasta fresca e antipasti, pronto per essere consegnato a casa tua ovunque ti trovi a Barcellona. Scegli la tua piattaforma preferita: vedrai il raggio esatto di consegna quando inserirai il tuo indirizzo.
                </p>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Orari di consegna
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {hours.map((item) => (
                    <li key={item.day} className="font-serif text-lg text-ink-soft">
                      <span className="text-ink">{item.day}</span> · {item.time}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.84rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span>Accettiamo Ticket Restaurant®</span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={UBER_EATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Ordina su Uber Eats
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
                    Ordina su Glovo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-lg italic text-ink-soft">
                Preferisci goderti Positano a tavola?
              </p>
              <a
                href="/it/prenota-un-tavolo"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Prenota un tavolo
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
