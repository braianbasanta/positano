import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Autentica pizza napoletana · Cotta nel forno a legna · Positano BCN";
const description =
  "Positano è un’autentica pizzeria napoletana a Barcellona. Ricette campane, impasto a lievitazione naturale di 48 ore, forno a legna e ingredienti italiani DOP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("napolitana", "it"),
  ...socialFor({
    title,
    description,
    path: "/it/pizza-napoletana-barcellona",
    locale: "it",
  }),
};

const faqs = [
  {
    q: "Dove posso trovare un vero ristorante napoletano a Barcellona?",
    a: "Positano è un ristorante napoletano nel quartiere dell’Eixample di Barcellona (Carrer del Rosselló, 24). È gestito da tre napoletani della Campania che cucinano proprio come si fa a Napoli: pizza con impasto lievitato per 48 ore e cotta nel forno a legna, pasta fresca fatta in casa e antipasti preparati con prodotti italiani DOP.",
  },
  {
    q: "Cosa distingue una pizzeria napoletana da una pizzeria normale?",
    a: "La vera pizza napoletana si riconosce dall’impasto a lunga fermentazione (48 ore), dal forno a legna a 400 °C che la cuoce in meno di 90 secondi e dal bordo alto e soffice — il cornicione — con le sue caratteristiche macchie leopardate. Da Positano seguiamo questa tradizione senza scorciatoie.",
  },
  {
    q: "Positano è un buon ristorante italiano a Barcellona?",
    a: "Sì. Oltre alla pizza napoletana, Positano propone piatti della cucina del Sud Italia: pasta fresca, antipasti, insalate e dolci fatti in casa, con ricette provenienti direttamente dalla Campania. Un ristorante italiano nel cuore dell'Eixample di Barcellona.",
  },
  {
    q: "Chi c'è dietro Positano?",
    a: "Positano è stato fondato da Antonio, Massimo e Vincenzo, tre napoletani della Campania che hanno portato a Barcellona le ricette della loro terra. Italiani che cucinano proprio come si fa a Napoli, senza adattamenti né scorciatoie.",
  },
  {
    q: "A Positano consegnano la pizza napoletana a domicilio?",
    a: "Sì, consegniamo la nostra pizza napoletana, la pasta fresca e gli antipasti a Barcellona tramite Uber Eats e Glovo. Accettiamo anche i buoni Ticket Restaurant®.",
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

const keys = [
  {
    title: "Impasto fermentato per 48 ore",
    text: "Lasciamo riposare l'impasto per 48 ore per ottenere una pizza più leggera e digeribile, con quella crosta soffice — il cornicione — tipica di Napoli.",
  },
  {
    title: "Forno a legna a 400 °C",
    text: "Ogni pizza viene cotta in meno di 90 secondi in un forno a legna, come vuole la tradizione napoletana. È così che si ottiene quella crosta maculata e il cuore filante.",
  },
  {
    title: "Ingredienti italiani DOP",
    text: "Pomodori di San Marzano, fior di latte campano, mozzarella di bufala DOP, Grana Padano stagionato 24 mesi. Prodotti genuini provenienti dall’Italia, senza compromessi.",
  },
];

export default function NeapolitanPizzaItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          { name: "Pizza napoletana", path: "/it/pizza-napoletana-barcellona" },
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
              La vera pizza napoletana
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizza napoletana a Barcellona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Dalla Campania all’Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Da Positano non facciamo una pizza qualsiasi: facciamo l’autentica pizza napoletana, con le ricette che abbiamo portato dal Sud Italia, l’impasto fermentato per 48 ore e il forno a legna. Il vero sapore di Napoli, nel cuore di Barcellona.
            </p>
          </div>
        </section>

        {/* Our story */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                La nostra storia
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Tre napoletani a Barcellona
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                Tutto inizia con Antonio, Massimo e Vincenzo, nati e cresciuti in Campania, la regione dove è nata la pizza. Lì hanno imparato, fin da piccoli, che la cucina è l’anima della casa.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                Dopo anni passati a perfezionare l&apos;arte, hanno portato le ricette della loro terra a Barcellona. Ed è così che è nato Positano: una pizzeria napoletana dove la cucina del Sud Italia viene servita esattamente come si fa a Napoli, senza adattamenti né scorciatoie.
              </p>
              <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
                “La passione per il buon cibo ce l’abbiamo nel sangue.”
              </p>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
                <Image
                  src="/hero/positano.jpg"
                  alt="Positano, pizzeria napoletana a Barcellona con ricette portate dalla Campania"
                  width={1400}
                  height={933}
                  className="relative aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* What makes it authentic */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Cosa lo rende autentico
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La vera pizza napoletana
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                La vera pizza napoletana non si improvvisa mai. Ecco le tre cose che la rendono unica e che, per molti, ci rendono{" "}
                <a
                  href="/it/migliore-pizza-barcellona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  la pizza più buona di Barcellona
                </a>
                .
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {keys.map((key, index) => (
                <Reveal key={key.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {key.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {key.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/it/menu"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Dai un&apos;occhiata alle nostre pizze
              </a>
              <a
                href="/it/prenota-un-tavolo"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Prenota un tavolo
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="it" offset={18} limit={12} />

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
                Ristorante napoletano a Barcellona
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
                    <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
