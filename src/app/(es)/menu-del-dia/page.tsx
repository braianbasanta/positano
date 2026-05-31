import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor } from "@/lib/i18n";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const INSTAGRAM_URL = "https://instagram.com/positanopizzeriabcn/";

export const metadata: Metadata = {
  title: "Menú del Día en Barcelona · Positano — Comer en el Eixample",
  description:
    "Menú del día en Positano, pizzería italiana en el Eixample de Barcelona, por 14,90 €. Comida italiana casera de martes a viernes. Aceptamos Ticket Restaurant®.",
  alternates: alternatesFor("/menu-del-dia"),
};

const horario = [
  { dia: "Martes a Jueves", horas: "13:00 – 16:00" },
  { dia: "Viernes", horas: "13:00 – 16:00" },
  { dia: "Sábado y Domingo", horas: "Carta completa" },
  { dia: "Lunes", horas: "Cerrado" },
];

export default function MenuDelDiaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Menú del día", path: "/menu-del-dia" },
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
              Comer al mediodía en el Eixample
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Menú del día
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Comida italiana casera por 14,90 €
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              ¿Buscas dónde comer cerca, en el Eixample de Barcelona? Cada
              mediodía servimos nuestro menú del día con pasta fresca, pizza
              napolitana y platos caseros del sur de Italia. Rápido, auténtico y
              a buen precio.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/reservas"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Reservar para comer
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/menu"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Ver la carta
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Qué incluye
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Un menú completo por 14,90 €
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Primero, segundo, pan, bebida y postre. Cocina italiana casera,
                pensada para comer bien y volver al trabajo a tiempo.
              </p>
            </Reveal>

            <Reveal
              delay={120}
              className="mt-12 flex flex-col items-center gap-7 border border-ink/15 bg-cream/55 px-8 py-12 text-center sm:px-14"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[0.78rem] uppercase tracking-[0.28em] text-ink-soft/70">
                  Menú almuerzo
                </span>
                <span className="font-display text-6xl leading-none text-ink md:text-7xl">
                  14,90 €
                </span>
                <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-soft/70">
                  Bebida y postre incluidos
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-ink/15" />
                <Lemon className="h-5 w-5 text-lemon" />
                <span className="h-px w-10 bg-ink/15" />
              </div>

              <p className="max-w-md font-serif text-base leading-relaxed text-ink-soft">
                Cada semana cambiamos el menú con producto fresco de mercado.
                Publicamos los platos del día en nuestras stories de Instagram:
                échale un vistazo antes de venir.
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream shadow-[0_10px_28px_rgba(29,39,80,0.25)] transition-all duration-300 hover:bg-lemon hover:text-ink"
              >
                Ver menú del día en Instagram
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>

            <Reveal className="mx-auto mt-14 max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                Aceptamos Ticket Restaurant® y Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                ¿Comes con tu tarjeta de comida de empresa? En Positano puedes
                pagar tu menú del día con Ticket Restaurant®, Edenred y otras
                tarjetas restaurante. El sitio perfecto para tu pausa del
                mediodía en el Eixample.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Horario y ubicación */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Horario del menú del día
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  De martes a viernes al mediodía
                </h2>
                <ul className="mx-auto mt-8 max-w-md space-y-2.5">
                  {horario.map((row) => (
                    <li
                      key={row.dia}
                      className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-between"
                    >
                      <span className="font-serif text-lg text-ink">
                        {row.dia}
                      </span>
                      <span className="font-serif text-base text-ink-soft sm:text-lg">
                        {row.horas}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Dónde estamos
                </h3>
                <a
                  href={PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                >
                  Carrer del Rosselló, 24 · 08029 · Eixample, Barcelona
                </a>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="/reservas"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Reservar para comer
                  </a>
                  <a
                    href="tel:+34933515913"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Llámanos
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
