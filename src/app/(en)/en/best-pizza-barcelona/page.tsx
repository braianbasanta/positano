import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "The Best Pizza in Barcelona · Positano Pizzeria",
  description:
    "Looking for the best pizza in Barcelona? Positano serves authentic Neapolitan pizza in the Eixample: 48-hour dough, wood-fired oven and DOP ingredients.",
  alternates: alternatesForEn("/en/best-pizza-barcelona"),
};

const reasons = [
  {
    title: "48-hour fermented dough",
    text: "Slow fermentation makes our pizza light, airy and easy to digest — the secret behind a truly great Neapolitan crust.",
  },
  {
    title: "Wood-fired in 90 seconds",
    text: "Baked at 400 °C in a wood-fired oven for the leopard-spotted cornicione and the molten centre that define real Naples pizza.",
  },
  {
    title: "Italian DOP ingredients",
    text: "San Marzano tomato, Campania fior di latte, buffalo mozzarella DOP. Authentic produce brought straight from Italy.",
  },
  {
    title: "Made by Neapolitans",
    text: "Our pizzaioli were born and raised in Campania, the home of pizza. No adaptations, no shortcuts — just the real thing.",
  },
];

export default function BestPizzaBarcelonaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Best pizza in Barcelona", path: "/en/best-pizza-barcelona" },
        ])}
      />
      <SiteHeader lang="en" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Authentic Neapolitan pizza
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              The best pizza in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Real pizza from Naples, in the Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Looking for the best pizza in Barcelona? At Positano we make
              authentic Neapolitan pizza with 48-hour fermented dough, a
              wood-fired oven and Italian DOP ingredients — the way it's done in
              Naples. Rated 4.8 on Google by our guests.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/en/book-a-table"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Book a table
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/en/menu"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                See our pizzas
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Why the best */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Why Positano
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                What makes our pizza the best in Barcelona
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Great pizza is never improvised. Four things set ours apart from
                any other pizza in the city.
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
        <Resenas lang="en" />

        {/* Closing CTA */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Come and taste it for yourself
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">
                You'll find us at Carrer del Rosselló, 24, in the heart of the
                Eixample, Barcelona. Book a table or order delivery to your door.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/en/book-a-table"
                  className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                >
                  Book a table
                </a>
                <a
                  href="/en/pizza-delivery-barcelona"
                  className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  Order delivery
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
