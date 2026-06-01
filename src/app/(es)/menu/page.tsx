import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import DishRow from "@/components/DishRow";
import JsonLd from "@/components/JsonLd";
import { menu } from "@/data/menu";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "La Carta de Positano · Pizza Napolitana en Barcelona",
  description:
    "La carta de Positano: pizza napolitana de masa fermentada 48 h, pasta fresca, antipasti y risotti. Restaurante italiano en el Eixample, Barcelona.",
  alternates: alternatesFor("/menu"),
};

export default function CartaPage() {
  return (
    <>
      <JsonLd data={menuJsonLd("es")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "La Carta", path: "/menu" },
        ])}
      />
      <SiteHeader />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              La Carta
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Nuestra Carta
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Pizza napolitana de masa fermentada 48 horas, horneada a
              400&nbsp;°C e ingredientes 100&nbsp;% italianos. Cada plato, una
              historia del sur de Italia.
            </p>
          </div>
        </section>

        {/* Cuerpo de la carta */}
        <div className="bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-5xl flex-col gap-20">
            {menu.map((category) => (
              <Reveal key={category.id}>
                <section id={category.id} className="scroll-mt-24">
                  <div className="flex items-center justify-center gap-5">
                    <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                    <h2 className="text-center font-display text-3xl uppercase tracking-[0.14em] text-lemon md:text-4xl">
                      {category.name}
                    </h2>
                    <span className="h-px w-10 bg-lemon/50 sm:w-16" />
                  </div>
                  <ul className="mx-auto mt-10 grid max-w-4xl gap-x-14 gap-y-7 md:grid-cols-2">
                    {category.items.map((dish) => (
                      <DishRow key={dish.name} dish={dish} />
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.88rem] uppercase tracking-[0.22em] text-ink-soft">
              <span>Menú del día · 14,90 €</span>
              <span className="hidden h-3 w-px bg-ink/25 sm:block" />
              <span>Suplemento de terraza · 10 %</span>
            </div>
            <p className="mt-4 text-center font-serif text-base italic text-ink-soft">
              Informa a nuestro equipo de cualquier alergia o intolerancia.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/reservas"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Reservar mesa
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
