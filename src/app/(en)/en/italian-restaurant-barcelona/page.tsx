import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import Visitanos from "@/components/Visitanos";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Italian Restaurant in Barcelona · Positano Eixample",
  description:
    "Positano is an authentic Italian restaurant in Barcelona: Neapolitan pizza, fresh pasta, risotti and mains from southern Italy in the Eixample.",
  alternates: alternatesForEn("/en/italian-restaurant-barcelona"),
};

const dishes = [
  {
    title: "Neapolitan pizza",
    text: "48-hour fermented dough, wood-fired and topped with Italian DOP ingredients. From the Margherita to the Tartufo.",
  },
  {
    title: "Homemade fresh pasta",
    text: "Tagliatelle, scialatelli, raviolotto and more, made in-house. Try the carbonara finished in a pecorino wheel.",
  },
  {
    title: "Risotti & mains",
    text: "Mushroom risotto, beef tenderloin, salmon fillet — southern Italian cooking with authentic produce.",
  },
  {
    title: "Antipasti & cocktails",
    text: "Fried Pugliese burrata, buffalo caprese and a full bar. The perfect start, or a drink at the counter.",
  },
];

export default function ItalianRestaurantBarcelonaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          {
            name: "Italian restaurant in Barcelona",
            path: "/en/italian-restaurant-barcelona",
          },
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
              Authentic southern Italy
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Italian restaurant in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              A taste of Naples in the Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano is an authentic Italian restaurant in the heart of
              Barcelona. Neapolitan pizza, homemade fresh pasta, risotti and
              mains from southern Italy — cooked by chefs born and raised in
              Campania. Rated 4.8 on Google.
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
                View the menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* What we serve */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Our cuisine
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Real Italian food in Barcelona
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                From the pizza oven to the pasta board, everything is made the
                southern Italian way, with produce brought from Italy.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {dishes.map((dish, index) => (
                <Reveal key={dish.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {dish.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {dish.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/en/menu"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                See the full menu
              </a>
            </Reveal>
          </div>
        </section>

        {/* Social proof */}
        <Resenas lang="en" />

        {/* Location & hours */}
        <Visitanos lang="en" />
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
