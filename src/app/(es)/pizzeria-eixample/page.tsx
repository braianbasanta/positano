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

const MAP_EMBED =
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=es&output=embed";

export const metadata: Metadata = {
  title: "Pizzería en el Eixample · Restaurante Italiano Barcelona",
  description:
    "Positano es una pizzería napolitana y restaurante italiano en el Eixample, Barcelona. Pizza de masa fermentada 48 h en horno de leña, pasta fresca y antipasti.",
  alternates: alternatesFor("/pizzeria-eixample"),
};

const razones = [
  {
    title: "Auténtica pizza napolitana",
    text: "Masa de fermentación de 48 horas, cocida en horno de leña e ingredientes DOP italianos. La pizza napolitana de Barcelona como en Nápoles.",
  },
  {
    title: "Cocina italiana de verdad",
    text: "Pasta fresca casera, antipasti, risotti y secondi elaborados cada día por nuestros chefs nacidos en Campania.",
  },
  {
    title: "En pleno Eixample",
    text: "Un rincón de la Costa Amalfitana en el corazón del Eixample de Barcelona, ideal para comer, cenar o tomar algo en la barra.",
  },
];

const horario = [
  { dia: "Lunes", horas: "Cerrado" },
  { dia: "Martes a Jueves", horas: "13:00 – 16:00 · 20:00 – 23:30" },
  { dia: "Viernes", horas: "13:00 – 16:00 · 20:00 – 00:00" },
  { dia: "Sábado", horas: "13:00 – 00:00" },
  { dia: "Domingo", horas: "13:00 – 23:30" },
];

export default function PizzeriaEixamplePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Pizzería en el Eixample", path: "/pizzeria-eixample" },
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
              En el Eixample de Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizzería en el Eixample
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Restaurante italiano en Barcelona
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano es una pizzería napolitana y restaurante italiano en el
              corazón del Eixample. Pizza de masa fermentada 48 horas en horno de
              leña, pasta fresca y la mejor cocina italiana de Barcelona — el
              sabor de Nápoles a la vuelta de la esquina.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/reservas"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Reservar mesa
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

        {/* Por qué Positano */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Por qué Positano
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La pizzería napolitana del Eixample
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Si buscas una pizzería en el Eixample o un restaurante italiano
                en Barcelona, en Positano encontrarás cocina del sur de Italia
                hecha con producto auténtico y mucha pasión.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {razones.map((razon, index) => (
                <Reveal key={razon.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {razon.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {razon.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dónde estamos */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Dónde estamos
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Nuestra pizzería en el Eixample
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                Nos encontrarás en Carrer del Rosselló, 24, en pleno Eixample de
                Barcelona. Ven a comer o cenar la mejor pizza napolitana de la
                ciudad, o pásate a tomar algo en la barra.
              </p>
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
              {/* Info */}
              <Reveal className="order-2 md:order-1">
                <div className="flex h-full flex-col justify-center gap-10 border border-ink/15 bg-cream px-8 py-12 text-center">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Dirección
                    </h3>
                    <a
                      href={PLACE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      Carrer del Rosselló, 24
                      <br />
                      08029 · Eixample, Barcelona
                    </a>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Horario
                    </h3>
                    {horario.map((row) => (
                      <div
                        key={row.dia}
                        className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-center"
                      >
                        <span className="font-serif text-lg text-ink">
                          {row.dia}
                        </span>
                        <span className="hidden text-ink-soft/40 sm:inline">
                          ·
                        </span>
                        <span className="font-serif text-base text-ink-soft sm:text-lg">
                          {row.horas}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Contacto
                    </h3>
                    <a
                      href="tel:+34933515913"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      +34 933 515 913
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Mapa */}
              <Reveal delay={120} className="order-1 md:order-2 md:h-full">
                <div className="relative h-[360px] overflow-hidden border border-ink/15 md:h-full">
                  <iframe
                    src={MAP_EMBED}
                    title="Ubicación de Positano Pizzería en el Eixample de Barcelona"
                    className="block h-full w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/reservas"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Reservar mesa
              </a>
              <a
                href="/pizza-domicilio"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Pedir a domicilio
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
