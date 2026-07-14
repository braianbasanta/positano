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
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Italienische Weine und Biere · Positano · Eixample BCN";
const description =
  "Eine sorgfältig zusammengestellte Auswahl an italienischen Weinen und Bieren, die hervorragend zu unserer neapolitanischen Pizza und unserer frischen Pasta im „Positano“, einem italienischen Restaurant im Stadtteil Eixample in Barcelona, passen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("bebidas", "de"),
  ...socialFor({ title, description, path: "/de/getraenke", locale: "de" }),
};

const categories = [...wines, ...beers];

export default function DrinksDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          { name: "Getränke", path: "/de/getraenke" },
        ])}
      />
      <JsonLd data={beveragesJsonLd("de")} />
      <SiteHeader lang="de" />
      <BottleViewerProvider lang="de">
      <main>
        {/* Title band + featured Lambruscos */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Getränke
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Unsere Getränke
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Eine Auswahl italienischer Weine und Biere, die zu jedem Gericht passen. Vom Vesuv bis zum Salento – Weine und Biere, die wir speziell für unseren Tisch ausgewählt haben.
            </p>
          </div>

          {featuredWines.length > 0 ? (
            <div className="relative mx-auto mt-16 max-w-4xl">
              <p className="text-[0.8rem] uppercase tracking-[0.3em] text-cream/60">
                Hausfavoriten
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {featuredWines.map((wine) => (
                  <WineFeature key={wine.name} wine={wine} lang="de" />
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
                      <WineRow key={wine.name} wine={wine} lang="de" />
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-center font-serif text-base italic text-ink-soft">
              inkl. MwSt. Fragen Sie unser Team nach unseren Weinen im Glas.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/de/tisch-reservieren"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Einen Tisch reservieren
              </a>
            </div>
          </div>
        </div>
      </main>
      </BottleViewerProvider>
      <SiteFooter lang="de" />
    </>
  );
}
