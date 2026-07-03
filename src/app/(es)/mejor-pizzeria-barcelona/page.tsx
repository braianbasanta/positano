import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor, socialFor } from "@/lib/i18n";
import { reviewStats } from "@/data/reviews";
import { goldCta3d } from "@/lib/ui";

const TITLE = `Mejor Pizzería de Barcelona · ${reviewStats.rating}★ en Google`;
const DESCRIPTION = `Positano, una de las italianas mejor valoradas de Barcelona según Google (${reviewStats.rating}★): trato cercano y cocina italiana completa, más allá de la pizza.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("/mejor-pizzeria-barcelona"),
  ...socialFor({
    title: TITLE,
    description: DESCRIPTION,
    path: "/mejor-pizzeria-barcelona",
  }),
};

// El diferencial real, según 1.450+ reseñas: no es la fermentación de 48h
// (se menciona de pasada, en último lugar), es el trato y la cocina completa.
const razones = [
  {
    title: `${reviewStats.rating}★ en Google`,
    text: `Más de ${reviewStats.count} reseñas avalan a Positano como una de las italianas mejor valoradas de Barcelona. No lo decimos nosotros: lo dicen quienes ya han venido.`,
  },
  {
    title: "El trato de tres napolitanos",
    text: "Antonio, Massimo y Vincenzo, tres napolitanos de Campania, llevan el día a día de Positano. En las reseñas se repite el trato cercano casi tanto como la comida.",
  },
  {
    title: "Cocina italiana completa",
    text: "No solo pizza: la carbonara que más recomiendan nuestros clientes, pasta fresca casera y el tiramisú de pistacho cierran una carta italiana de verdad.",
  },
  {
    title: "Masa fermentada 48 horas",
    text: "La base de nuestra pizza napolitana también fermenta 48 horas y se cuece en horno de leña — aunque, según las reseñas, no es lo primero que la gente destaca.",
  },
];

const platos = [
  {
    cat: "Pizza napolitana",
    items:
      "Horno de leña, masa fermentada 48 horas e ingredientes DOP italianos. El plato que abre la puerta, pero no el único motivo por el que se repite.",
  },
  {
    cat: "Pasta fresca casera",
    items:
      "La carbonara terminada en la rueda de pecorino es de lo más recomendado en las reseñas. Se hace en casa cada día, junto a tagliatelle y raviolotto.",
  },
  {
    cat: "Dolci",
    items:
      "El tiramisú de pistacho es el postre que más mencionan quienes ya han venido — un buen motivo para reservar postre antes de sentarse a la mesa.",
  },
];

const faqs = [
  {
    q: "¿Cuál es la mejor pizzería de Barcelona?",
    a: `Eso lo deciden quienes ya han venido: en Google, Positano tiene ${reviewStats.rating}★ con ${reviewStats.count} reseñas, una de las valoraciones más altas entre las italianas de Barcelona. Lo que más se repite en esas reseñas no es solo la pizza, sino el trato y la cocina completa.`,
  },
  {
    q: "¿Qué diferencia a Positano de otras pizzerías?",
    a: "Además de la pizza napolitana de masa fermentada 48 horas, en Positano encontrarás pasta fresca casera —como la carbonara que más recomiendan nuestros clientes— y el trato cercano de Antonio, Massimo y Vincenzo, los tres napolitanos de Campania que llevan el restaurante.",
  },
  {
    q: "¿En Positano solo se puede comer pizza?",
    a: "No. La carta incluye pasta fresca casera, antipasti y dolci como el tiramisú de pistacho. La pizza napolitana es el plato más pedido, pero la cocina italiana es completa.",
  },
  {
    q: "¿Cuál es el horario y dónde está Positano?",
    a: "Estamos en Carrer del Rosselló, 24, en el Eixample de Barcelona (08029). Abrimos de martes a jueves de 13:00 a 16:00 y de 20:00 a 23:30, viernes de 13:00 a 16:00 y de 20:00 a 00:00, sábado de 13:00 a 00:00 y domingo de 13:00 a 23:30. Los lunes cerramos.",
  },
  {
    q: "¿Tenéis menú del día y terraza?",
    a: "Sí, el menú del día cuesta 14,90 € y se sirve de martes a viernes al mediodía. También tenemos terraza, con un suplemento del 10% sobre el precio de carta.",
  },
  {
    q: "¿Se puede reservar mesa?",
    a: "Sí, puedes reservar online con confirmación inmediata desde nuestra página de reservas, o llamando al +34 933 51 59 13.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function MejorPizzeriaBarcelonaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          {
            name: "La mejor pizzería de Barcelona",
            path: "/mejor-pizzeria-barcelona",
          },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="es" />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Valorada con ★{reviewStats.rating} en Google
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              La mejor pizzería de Barcelona, según quienes ya han venido
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              No lo decimos nosotros: lo dicen {reviewStats.count} reseñas en Google
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano es una de las italianas mejor valoradas de Barcelona,
              con {reviewStats.rating}★ en Google. Y lo que más repiten nuestros
              clientes no es solo la pizza: es el trato cercano de tres
              napolitanos de Campania y una cocina italiana completa.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/reservas"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
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

        {/* Por qué lo dicen las reseñas */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Por qué lo dicen las reseñas
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Lo que hace destacar a Positano
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                No hace falta que lo proclamemos nosotros: son{" "}
                {reviewStats.count} reseñas en Google las que sitúan a Positano
                entre las{" "}
                <a
                  href="/pizza-napolitana-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  pizzerías napolitanas
                </a>{" "}
                mejor valoradas de la ciudad.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
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

        {/* Cocina completa */}
        <section className="relative overflow-hidden bg-ink px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-12 h-80 w-auto rotate-[150deg] text-lemon/15" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Mucho más que pizza
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Una cocina italiana completa
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                Lo que hace afirmar a tantos clientes que Positano es la mejor
                pizzería de Barcelona no es solo la masa: es encontrar la
                carta de un auténtico{" "}
                <a
                  href="/restaurante-italiano-barcelona"
                  className="text-cream underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  restaurante italiano en Barcelona
                </a>
                , con pasta fresca casera y dolci hechos en casa.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {platos.map((plato, index) => (
                <Reveal key={plato.cat} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-cream/15 bg-cream/[0.04] p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-lemon">
                      {plato.cat}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-cream/80">
                      {plato.items}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Ver la carta completa
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reseñas */}
        <Resenas offset={0} limit={12} />

        {/* Preguntas frecuentes */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Preguntas frecuentes
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La mejor pizzería de Barcelona, al detalle
              </h2>
            </Reveal>

            <Reveal className="mt-14">
              <div className="divide-y divide-ink/15 border-y border-ink/15">
                {faqs.map((item) => (
                  <details key={item.q} className="group px-1 py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl leading-snug text-ink transition-colors hover:text-lemon md:text-2xl [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="relative mt-1 h-4 w-4 shrink-0">
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-lemon" />
                        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-lemon transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                      </span>
                    </summary>
                    <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Compruébalo tú mismo
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">
                Nos encontrarás en Carrer del Rosselló, 24, en el Eixample de
                Barcelona (lunes cerrado). Entre semana tenemos menú del día a
                14,90 € y, si el tiempo acompaña, terraza con un suplemento
                del 10%.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/reservas"
                  className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                >
                  Reservar mesa
                </a>
                <a
                  href="/menu"
                  className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  Ver la carta
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="es" />
    </>
  );
}
