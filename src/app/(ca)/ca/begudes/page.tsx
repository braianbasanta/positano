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
import { alternatesForPage, pickLang, socialFor } from "@/lib/i18n";

const title = "Vins Italians i Cerveses · Positano · Eixample BCN";
const description =
  "Vins italians i cerveses seleccionades per acompanyar la nostra pizza napolitana i la pasta fresca a Positano, restaurant italià a l'Eixample de Barcelona.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("bebidas", "ca"),
  ...socialFor({ title, description, path: "/ca/begudes", locale: "ca" }),
};

const categories = [...wines, ...beers];

export default function DrinksCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "Begudes", path: "/ca/begudes" },
        ])}
      />
      <JsonLd data={beveragesJsonLd("ca")} />
      <SiteHeader lang="ca" />
      <BottleViewerProvider lang="ca">
      <main>
        {/* Banda de título + Lambruscos destacados */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Carta de Begudes
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Les Nostres Begudes
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Una selecció italiana per acompanyar cada plat. Del Vesuvi al
              Salento, vins i cerveses pensats per a la nostra taula.
            </p>
          </div>

          {featuredWines.length > 0 ? (
            <div className="relative mx-auto mt-16 max-w-4xl">
              <p className="text-[0.8rem] uppercase tracking-[0.3em] text-cream/60">
                Els favorits de la casa
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {featuredWines.map((wine) => (
                  <WineFeature key={wine.name} wine={wine} lang="ca" />
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* Cuerpo de la carta de bebidas */}
        <div className="bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-5xl flex-col gap-20">
            {categories.map((category) => (
              <Reveal key={category.id}>
                <section id={category.id} className="scroll-mt-24">
                  <div className="flex items-center justify-center gap-5">
                    <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                    <h2 className="text-center font-display text-3xl uppercase tracking-[0.14em] text-lemon md:text-4xl">
                      {pickLang(category, "name", "ca") ?? category.name}
                    </h2>
                    <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                  </div>
                  <ul className="mx-auto mt-10 grid max-w-4xl gap-x-14 gap-y-7 md:grid-cols-2">
                    {category.items.map((wine) => (
                      <WineRow key={wine.name} wine={wine} lang="ca" />
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-center font-serif text-base italic text-ink-soft">
              IVA inclòs. Pregunta al nostre equip per la selecció de copes del
              dia.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/ca/reservar-taula"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Reservar taula
              </a>
            </div>
          </div>
        </div>
      </main>
      </BottleViewerProvider>
      <SiteFooter lang="ca" />
    </>
  );
}
