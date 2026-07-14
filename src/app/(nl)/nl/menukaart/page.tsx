import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import MenuExplorer from "@/components/MenuExplorer";
import JsonLd from "@/components/JsonLd";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Het menu · Napolitaanse pizza & verse pasta · Positano BCN";
const description =
  "Het menu van Positano: Napolitaanse pizza die 48 uur heeft gerijpt, verse pasta, antipasti, risotto’s en hoofdgerechten. Italiaans restaurant in de wijk Eixample, Barcelona.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menu", "nl"),
  ...socialFor({ title, description, path: "/nl/menukaart", locale: "nl" }),
};

export default function MenuNlPage() {
  return (
    <>
      <JsonLd data={menuJsonLd("nl")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          { name: "Menu", path: "/nl/menukaart" },
        ])}
      />
      <SiteHeader lang="nl" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Het menu
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Ons menu
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Napolitaanse pizza met een rijstijd van 48 uur, gebakken op 400 °C met 100 % Italiaanse ingrediënten. Elk gerecht vertelt een verhaal uit Zuid-Italië.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/nl/tafel-reserveren"
                className="inline-flex items-center rounded-full bg-lemon px-7 py-3 text-[0.85rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Reserveer een tafel
              </a>
              <a
                href="/nl/dranken"
                className="inline-flex items-center gap-2 rounded-full border border-lemon/60 px-7 py-3 text-[0.85rem] uppercase tracking-[0.22em] text-lemon transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                <Lemon className="h-4 w-4" />
                Bekijk de drankjes
              </a>
            </div>
          </div>
        </section>

        {/* Menu body */}
        <div className="bg-cream px-6 py-20 md:py-28">
          <MenuExplorer lang="nl" />

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.88rem] uppercase tracking-[0.22em] text-ink-soft">
              <span>Dagmenu · € 14,90</span>
              <span className="hidden h-3 w-px bg-ink/25 sm:block" />
              <span>Terras toeslag · 10 %</span>
            </div>
            <p className="mt-4 text-center font-serif text-base italic text-ink-soft">
              Laat ons team alsjeblieft weten of je ergens allergisch voor bent of iets niet verdraagt.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/nl/tafel-reserveren"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Reserveer een tafel
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
