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

const title = "Vins et bières italiens · Positano · Eixample (Barcelone)";
const description =
  "Une sélection de vins et de bières italiens, spécialement choisie pour accompagner nos pizzas napolitaines et nos pâtes fraîches au Positano, restaurant italien situé dans le quartier de l'Eixample, à Barcelone.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("bebidas", "fr"),
  ...socialFor({ title, description, path: "/fr/boissons", locale: "fr" }),
};

const categories = [...wines, ...beers];

export default function DrinksFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          { name: "Boissons", path: "/fr/boissons" },
        ])}
      />
      <JsonLd data={beveragesJsonLd("fr")} />
      <SiteHeader lang="fr" />
      <BottleViewerProvider lang="fr">
      <main>
        {/* Title band + featured Lambruscos */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Boissons
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Nos boissons
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Une sélection italienne pour accompagner tous vos plats. Du Vésuve au Salento, des vins et des bières sélectionnés pour votre table.
            </p>
          </div>

          {featuredWines.length > 0 ? (
            <div className="relative mx-auto mt-16 max-w-4xl">
              <p className="text-[0.8rem] uppercase tracking-[0.3em] text-cream/60">
                Les favoris de la maison
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {featuredWines.map((wine) => (
                  <WineFeature key={wine.name} wine={wine} lang="fr" />
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
                      <WineRow key={wine.name} wine={wine} lang="fr" />
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-center font-serif text-base italic text-ink-soft">
              TVA comprise. Renseignez-vous auprès de notre équipe sur notre sélection de vins au verre.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/fr/reserver-une-table"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Réserver une table
              </a>
            </div>
          </div>
        </div>
      </main>
      </BottleViewerProvider>
      <SiteFooter lang="fr" />
    </>
  );
}
