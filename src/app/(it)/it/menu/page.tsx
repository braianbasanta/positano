import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import MenuExplorer from "@/components/MenuExplorer";
import JsonLd from "@/components/JsonLd";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Il menu · Pizza napoletana e pasta fresca · Positano BCN";
const description =
  "Il menu di Positano: pizza napoletana con lievitazione di 48 ore, pasta fresca, antipasti, risotti e piatti principali. Ristorante italiano nell'Eixample, a Barcellona.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menu", "it"),
  ...socialFor({ title, description, path: "/it/menu", locale: "it" }),
};

export default function MenuItPage() {
  return (
    <>
      <JsonLd data={menuJsonLd("it")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          { name: "Menu", path: "/it/menu" },
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
              Il menu
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Il nostro menu
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Pizza napoletana con impasto lievitato per 48 ore, cotta a 400 °C con ingredienti 100% italiani. Ogni piatto racconta una storia del Sud Italia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/it/prenota-un-tavolo"
                className="inline-flex items-center rounded-full bg-lemon px-7 py-3 text-[0.85rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Prenota un tavolo
              </a>
              <a
                href="/it/bevande"
                className="inline-flex items-center gap-2 rounded-full border border-lemon/60 px-7 py-3 text-[0.85rem] uppercase tracking-[0.22em] text-lemon transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                <Lemon className="h-4 w-4" />
                Visualizza le bevande
              </a>
            </div>
          </div>
        </section>

        {/* Menu body */}
        <div className="bg-cream px-6 py-20 md:py-28">
          <MenuExplorer lang="it" />

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.88rem] uppercase tracking-[0.22em] text-ink-soft">
              <span>Menu del giorno · 14,90 €</span>
              <span className="hidden h-3 w-px bg-ink/25 sm:block" />
              <span>Supplemento terrazza · 10 %</span>
            </div>
            <p className="mt-4 text-center font-serif text-base italic text-ink-soft">
              Ti preghiamo di segnalare al nostro team eventuali allergie o intolleranze.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/it/prenota-un-tavolo"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Prenota un tavolo
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
