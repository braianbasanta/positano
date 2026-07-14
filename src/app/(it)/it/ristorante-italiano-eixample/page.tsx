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
import { goldCta3d } from "@/lib/ui";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=en&output=embed";

const title = "Ristorante italiano nell'Eixample · Impasto a 48 ore · Positano";
const description =
  "Positano è una pizzeria napoletana e un ristorante italiano nell'Eixample, a Barcellona. Pizza cotta nel forno a legna con impasto lasciato riposare 48 ore, pasta fresca e antipasti. Prenota un tavolo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("eixample", "it"),
  ...socialFor({
    title,
    description,
    path: "/it/ristorante-italiano-eixample",
    locale: "it",
  }),
};

const reasons = [
  {
    title: "Autentica pizza napoletana",
    text: "Impasto fermentato per 48 ore, cotto nel forno a legna e preparato con ingredienti italiani DOP. Pizza napoletana a Barcellona, proprio come a Napoli.",
  },
  {
    title: "Vera cucina italiana",
    text: "Pasta fresca fatta in casa, antipasti, risotti e piatti principali preparati ogni giorno dai nostri chef originari della Campania.",
  },
  {
    title: "Proprio nell'Eixample",
    text: "Un angolo della Costiera Amalfitana nel cuore dell'Eixample, a Barcellona — perfetto per pranzo, cena o un drink al bar.",
  },
  {
    title: "Gestito da napoletani",
    text: "Il ristorante Positano è gestito da tre napoletani originari della Campania. Sono italiani che cucinano in modo che tu possa mangiare come se fossi nel sud dell’Italia: niente scorciatoie, nessuna approssimazione.",
  },
];

// Real dishes from the menu, most mentioned by our guests.
const dishes = [
  {
    cat: "Dalla pizzeria napoletana",
    items:
      "Margherita, Diavola, Bufala e Ortolana, tutte preparate con impasto a riposo di 48 ore e un cornicione come si deve. Provola e Peppe e Siciliana per chi vuole qualcosa in più.",
  },
  {
    cat: "Pasta fresca fatta in casa",
    items:
      "La carbonara come si deve — senza panna; lasagne tradizionali; paccheri alla genovese; scialatelli all’aragosta; e gnocchi alla sorrentina.",
  },
  {
    cat: "Antipasti e piatti da condividere",
    items:
      "Burrata pugliese, provolone al forno da intingere nel pane, parmigiana di melanzane e la nostra selezione di antipasti del Sud Italia.",
  },
  {
    cat: "Dolci fatti in casa",
    items:
      "Tiramisù classico, panna cotta e specialità come il tiramisù al pistacchio. Il finale italiano che il tuo pasto merita.",
  },
];

// Verified answers, focused on the Eixample location.
const faqs = [
  {
    q: "Dov’è il ristorante italiano nell’Eixample?",
    a: "Ci troviamo in Carrer del Rosselló, 24, proprio nel quartiere dell'Eixample di Barcellona (08029), tra il Passeig de Gràcia e la Sagrada Família. Puoi chiamarci al numero +34 933 51 59 13.",
  },
  {
    q: "Che tipo di cibo servite?",
    a: "Pizza napoletana con impasto fermentato per 48 ore, cotta nel forno a legna con ingredienti italiani DOP, oltre a pasta fresca fatta in casa, antipasti, insalate e dolci fatti in casa del Sud Italia.",
  },
  {
    q: "Posso prenotare un tavolo?",
    a: "Sì, puoi prenotare online con conferma immediata dalla nostra pagina delle prenotazioni, oppure chiamando il numero +34 933 51 59 13. Nei fine settimana ti consigliamo di prenotare in anticipo.",
  },
  {
    q: "Avete piatti vegetariani?",
    a: "Sì: la pizza Ortolana, la Bufala, le lasagne vegetariane, le insalate e gli antipasti come la parmigiana di melanzane e la burrata.",
  },
  {
    q: "Consegni la pizza nell’Eixample?",
    a: "Sì, consegniamo la nostra pizza napoletana, la pasta fresca e gli antipasti in tutta Barcellona tramite Uber Eats e Glovo. Accettiamo anche i buoni Ticket Restaurant®.",
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

const hours = [
  { day: "Lunedì", time: "Chiuso" },
  { day: "Da martedì a giovedì", time: "dalle 13:00 alle 16:00 · dalle 20:00 alle 23:30" },
  { day: "Venerdì", time: "dalle 13:00 alle 16:00 · dalle 20:00 alle 00:00" },
  { day: "Sabato", time: "13:00 – 00:00" },
  { day: "Domenica", time: "dalle 23:00 alle 23:30" },
];

export default function ItalianRestaurantEixampleItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          {
            name: "Ristorante italiano nell'Eixample",
            path: "/it/ristorante-italiano-eixample",
          },
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
              Nell&apos;Eixample, a Barcellona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Ristorante italiano nell&apos;Eixample
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Pizzeria napoletana a Barcellona
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano è una pizzeria napoletana e un ristorante italiano nel cuore dell’Eixample. Pizza cotta nel forno a legna con impasto lievitato per 48 ore, pasta fresca e il meglio della cucina italiana a Barcellona: il gusto di Napoli, proprio dietro l’angolo.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/it/prenota-un-tavolo"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Prenota un tavolo
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

        {/* Why Positano */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Perché Positano
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La pizzeria napoletana dell&apos;Eixample
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Se cerchi un ristorante italiano nell&apos;Eixample o una pizzeria a Barcellona, da Positano troverai la cucina del Sud Italia preparata con prodotti genuini e tanta passione.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {reason.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {reason.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Our kitchen */}
        <section className="relative overflow-hidden bg-ink px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-12 h-80 w-auto rotate-[150deg] text-lemon/15" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                La nostra cucina
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Molto più di una semplice pizzeria italiana a Barcellona
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                Nel nostro ristorante italiano nell&apos;Eixample troverai il menu completo della cucina del Sud Italia: dalla pizza napoletana cotta nel forno a legna alla pasta fresca fatta in casa, dagli antipasti ai dolci italiani. È proprio per questo che i nostri ospiti continuano a tornare da noi.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {dishes.map((dish, index) => (
                <Reveal key={dish.cat} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-cream/15 bg-cream/[0.04] p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-lemon">
                      {dish.cat}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-cream/80">
                      {dish.items}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/it/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Guarda il menu completo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="it" offset={0} limit={12} />

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
                La pizzeria dell&apos;Eixample, nei dettagli
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

        {/* Where we are */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Dove siamo
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Il nostro ristorante nell&apos;Eixample
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                Ci trovi in Carrer del Rosselló, 24, proprio nel quartiere dell&apos;Eixample di Barcellona. Vieni a pranzo o a cena e assaggia la migliore pizza napoletana della città, oppure passa a bere qualcosa al bar.
              </p>
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
              {/* Info */}
              <Reveal className="order-2 md:order-1">
                <div className="flex h-full flex-col justify-center gap-10 border border-ink/15 bg-cream px-8 py-12 text-center">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Indirizzo
                    </h3>
                    <a
                      href={PLACE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      Carrer del Rosselló, 24
                      <br />
                      08029 · Eixample, Barcellona
                    </a>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Orari di apertura
                    </h3>
                    {hours.map((row) => (
                      <div
                        key={row.day}
                        className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-center"
                      >
                        <span className="font-serif text-lg text-ink">
                          {row.day}
                        </span>
                        <span className="hidden text-ink-soft/40 sm:inline">
                          ·
                        </span>
                        <span className="font-serif text-base text-ink-soft sm:text-lg">
                          {row.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Contatti
                    </h3>
                    <a
                      href="tel:+34933515913"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      +34 933 515 913
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Map */}
              <Reveal delay={120} className="order-1 md:order-2 md:h-full">
                <div className="relative h-[360px] overflow-hidden border border-ink/15 md:h-full">
                  <iframe
                    src={MAP_EMBED}
                    title="Dove si trova la Pizzeria Positano nell'Eixample, a Barcellona"
                    className="block h-full w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/it/prenota-un-tavolo"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Prenota un tavolo
              </a>
              <a
                href="/it/pizza-a-domicilio-barcellona"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Consegna dell&apos;ordine
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
