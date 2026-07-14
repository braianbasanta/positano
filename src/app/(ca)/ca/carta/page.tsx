import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import MenuExplorer from "@/components/MenuExplorer";
import JsonLd from "@/components/JsonLd";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "La Carta · Pizza Napolitana i Pasta Fresca · Positano BCN";
const description =
  "La carta de Positano: pizza napolitana de massa fermentada 48 h, pasta fresca, antipasti i risotti. Restaurant italià a l'Eixample de Barcelona.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menu", "ca"),
  ...socialFor({ title, description, path: "/ca/carta", locale: "ca" }),
};

export default function MenuCaPage() {
  return (
    <>
      <JsonLd data={menuJsonLd("ca")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "La Carta", path: "/ca/carta" },
        ])}
      />
      <SiteHeader lang="ca" />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              La Carta
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              La Nostra Carta
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Pizza napolitana de massa fermentada 48 hores, cuita a
              400&nbsp;°C i amb ingredients 100&nbsp;% italians. Cada plat, una
              història del sud d&apos;Itàlia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/ca/reservar-taula"
                className="inline-flex items-center rounded-full bg-lemon px-7 py-3 text-[0.85rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Reservar taula
              </a>
              <a
                href="/ca/begudes"
                className="inline-flex items-center gap-2 rounded-full border border-lemon/60 px-7 py-3 text-[0.85rem] uppercase tracking-[0.22em] text-lemon transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                <Lemon className="h-4 w-4" />
                Veure la carta de begudes
              </a>
            </div>
          </div>
        </section>

        {/* Cuerpo de la carta */}
        <div className="bg-cream px-6 py-20 md:py-28">
          <MenuExplorer lang="ca" />

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.88rem] uppercase tracking-[0.22em] text-ink-soft">
              <span>Menú del dia · 14,90 €</span>
              <span className="hidden h-3 w-px bg-ink/25 sm:block" />
              <span>Suplement de terrassa · 10 %</span>
            </div>
            <p className="mt-4 text-center font-serif text-base italic text-ink-soft">
              Informa el nostre equip de qualsevol al·lèrgia o intolerància.
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
      <SiteFooter lang="ca" />
    </>
  );
}
