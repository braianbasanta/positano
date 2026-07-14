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
import { reviewStatsEn } from "@/data/reviews";
import { goldCta3d } from "@/lib/ui";

const title = "La migliore pizza di Barcellona · Cotta nel forno a legna · Positano Eixample";
const description =
  "Cerchi la migliore pizza di Barcellona? Positano serve autentica pizza napoletana nell'Eixample: impasto a riposo per 48 ore, forno a legna e ingredienti DOP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("mejorPizzeria", "it"),
  ...socialFor({
    title,
    description,
    path: "/it/migliore-pizza-barcellona",
    locale: "it",
  }),
};

const reasons = [
  {
    title: "Impasto fermentato per 48 ore",
    text: "La fermentazione lenta rende la nostra pizza leggera, soffice e facile da digerire: ecco il segreto di una crosta napoletana davvero eccezionale.",
  },
  {
    title: "Cotto a legna in 90 secondi",
    text: "Cotta a 400 °C in un forno a legna per ottenere quel cornicione maculato come un leopardo e quel cuore filante che contraddistinguono la vera pizza napoletana.",
  },
  {
    title: "Ingredienti italiani DOP",
    text: "Pomodoro di San Marzano, fior di latte campano, mozzarella di bufala DOP. Prodotti genuini provenienti direttamente dall'Italia.",
  },
  {
    title: "Il beniamino di Barcellona",
    text: "I nostri ospiti ci hanno dato un punteggio di 4,8 su Google. La gente torna da noi per l'impasto, il sapore del forno a legna e l'accoglienza: è questo che ci rende un punto di riferimento per la pizza in città.",
  },
];

export default function BestPizzaBarcelonaItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          { name: "La migliore pizza di Barcellona", path: "/it/migliore-pizza-barcellona" },
        ])}
      />
      <SiteHeader lang="it" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Valutato ★{reviewStatsEn.rating} su Google
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              La pizza più buona di Barcellona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              La vera pizza napoletana, nell&apos;Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Cerchi la migliore pizza di Barcellona? Da Positano prepariamo l&apos;autentica pizza napoletana con impasto a lievitazione naturale di 48 ore, forno a legna e ingredienti italiani DOP — proprio come si fa a Napoli. Valutato 4,8 su Google dai nostri ospiti.
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
                Dai un&apos;occhiata alle nostre pizze
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Why the best */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Perché Positano
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Cosa rende la nostra pizza la migliore di Barcellona
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Una pizza davvero buona non si improvvisa mai. Sono quattro le cose che distinguono la nostra da qualsiasi altra pizza in città — radicate nella{" "}
                <a
                  href="/it/pizza-napoletana-barcellona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  autentica tradizione della pizza napoletana
                </a>{" "}
                che abbiamo portato dalla Campania.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
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

        {/* Social proof */}
        <Resenas lang="it" />

        {/* Closing CTA */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Vieni a provarlo di persona
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">
                Ci trovi in Carrer del Rosselló, 24, nel cuore dell&apos;Eixample, a Barcellona. Prenota un tavolo o ordina la consegna a domicilio.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
