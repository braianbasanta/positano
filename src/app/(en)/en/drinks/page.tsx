import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import WineRow from "@/components/WineRow";
import WineFeature from "@/components/WineFeature";
import BottleViewerProvider from "@/components/bebidas/BottleViewerProvider";
import JsonLd from "@/components/JsonLd";
import { wines, beers, featuredWines } from "@/data/wines";
import { breadcrumbJsonLd, beveragesJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Italian Wines & Beers · Positano · Eixample BCN",
  description:
    "A curated list of Italian wines and beers to pair with our Neapolitan pizza and fresh pasta at Positano, Italian restaurant in the Eixample, Barcelona.",
  alternates: alternatesForEn("/en/drinks"),
};

const categories = [...wines, ...beers];

export default function DrinksEnPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Drinks", path: "/en/drinks" },
        ])}
      />
      <JsonLd data={beveragesJsonLd("en")} />
      <SiteHeader lang="en" />
      <BottleViewerProvider lang="en">
      <main>
        {/* Title band + featured Lambruscos */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Drinks
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Our Drinks
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              An Italian selection to pair with every dish. From Vesuvius to
              Salento, wines and beers chosen for our table.
            </p>
          </div>

          {featuredWines.length > 0 ? (
            <div className="relative mx-auto mt-16 max-w-4xl">
              <p className="text-[0.8rem] uppercase tracking-[0.3em] text-cream/60">
                House favourites
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {featuredWines.map((wine) => (
                  <WineFeature key={wine.name} wine={wine} lang="en" />
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* Drinks list body */}
        <div className="bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-5xl flex-col gap-20">
            {categories.map((category) => (
              <Reveal key={category.id}>
                <section id={category.id} className="scroll-mt-24">
                  <div className="flex items-center justify-center gap-5">
                    <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                    <h2 className="text-center font-display text-3xl uppercase tracking-[0.14em] text-lemon md:text-4xl">
                      {category.nameEn ?? category.name}
                    </h2>
                    <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                  </div>
                  <ul className="mx-auto mt-10 grid max-w-4xl gap-x-14 gap-y-7 md:grid-cols-2">
                    {category.items.map((wine) => (
                      <WineRow key={wine.name} wine={wine} lang="en" />
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-center font-serif text-base italic text-ink-soft">
              VAT included. Ask our team about our wines by the glass.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/en/book-a-table"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Book a table
              </a>
            </div>
          </div>
        </div>
      </main>
      </BottleViewerProvider>
      <SiteFooter lang="en" />
    </>
  );
}
