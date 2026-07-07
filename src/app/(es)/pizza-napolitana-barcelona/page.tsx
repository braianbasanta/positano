import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor, socialFor } from "@/lib/i18n";
import { goldCta3d } from "@/lib/ui";

const title = "Pizza Napolitana en Barcelona · Horno de Leña · Positano";
const description =
  "Pizza napolitana auténtica en Barcelona: masa fermentada 48 horas, horno de leña e ingredientes DOP italianos. La verdadera pizza de Nápoles en el Eixample.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/pizza-napolitana-barcelona"),
  ...socialFor({
    title,
    description,
    path: "/pizza-napolitana-barcelona",
    locale: "es",
  }),
};

const keys = [
  {
    title: "Masa fermentada 48 horas",
    text: "Dejamos reposar la masa 48 horas para una pizza más ligera y digestible, con el cornicione alto y aireado típico de Nápoles.",
  },
  {
    title: "Horno de leña a 400 °C",
    text: "Cada pizza se hornea en menos de 90 segundos en horno de leña, como manda la tradición napolitana. Así nace el borde con sus manchas de leopardo y el centro fundente.",
  },
  {
    title: "Ingredientes DOP italianos",
    text: "Tomate San Marzano, fior di latte de Campania, mozzarella de búfala DOP y grana padano de 24 meses. Producto auténtico traído de Italia, sin atajos.",
  },
];

const faqs = [
  {
    q: "¿Dónde comer auténtica pizza napolitana en Barcelona?",
    a: "En Positano, en el Eixample (Carrer del Rosselló, 24). Es una pizzería napolitana llevada por tres napolitanos de Campania que cocinan como en Nápoles: pizza de masa fermentada 48 horas al horno de leña, pasta fresca casera y antipasti con producto DOP italiano.",
  },
  {
    q: "¿Qué diferencia a una pizza napolitana de una pizza normal?",
    a: "La pizza napolitana de verdad se define por su masa de larga fermentación (48 horas), un horno de leña a 400 °C que la cuece en menos de 90 segundos, y el borde alto y aireado —el cornicione— con sus características manchas de leopardo. En Positano seguimos esa tradición sin atajos.",
  },
  {
    q: "¿Qué pizzas napolitanas tenéis?",
    a: "Desde las clásicas Margherita y Marinara hasta la Diavola, la Ortolana o nuestras especiales de temporada. Todas con masa napolitana de 48 horas. Puedes verlas todas en nuestra carta.",
  },
  {
    q: "¿Se puede pedir vuestra pizza napolitana a domicilio?",
    a: "Sí, llevamos nuestra pizza napolitana, pasta fresca y antipasti a domicilio en Barcelona a través de Uber Eats y Glovo. También aceptamos Ticket Restaurant®.",
  },
  {
    q: "¿Quién está detrás de Positano?",
    a: "Positano lo fundaron Antonio, Massimo y Vincenzo, tres napolitanos de Campania que trajeron a Barcelona las recetas de su tierra. Italianos cocinando como se hace en Nápoles, sin adaptaciones ni atajos.",
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

export default function PizzaNapolitanaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Pizza napolitana en Barcelona", path: "/pizza-napolitana-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="es" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              La verdadera pizza de Nápoles
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizza napolitana en Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              De Campania al Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              En Positano no hacemos una pizza cualquiera: hacemos auténtica pizza
              napolitana, con las recetas que trajimos del sur de Italia, masa
              fermentada 48 horas y horno de leña. El verdadero sabor de Nápoles,
              en el corazón de Barcelona.
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
                Ver nuestras pizzas
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Qué es la pizza napolitana */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Qué la hace napolitana
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La auténtica pizza de Nápoles
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                La pizza napolitana no se improvisa. Nace de una masa viva,
                fermentada con calma, y de un horno de leña que la cuece en
                segundos. El resultado es ligera, digestible y con ese borde alto
                y aireado que la distingue de cualquier otra pizza.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                Somos una{" "}
                <a
                  href="/pizzeria-eixample"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  pizzería napolitana en el Eixample
                </a>{" "}
                llevada por napolitanos: cocinamos como en casa, sin adaptaciones.
                Conoce{" "}
                <a
                  href="/nuestra-historia"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  nuestra historia napolitana
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
                <Image
                  src="/hero/positano.jpg"
                  alt="Pizza napolitana de Positano, con masa fermentada 48 horas, en el Eixample de Barcelona"
                  width={1400}
                  height={933}
                  className="relative aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Las tres claves */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Las tres claves
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Pizza napolitana de verdad
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Tres cosas separan nuestra pizza napolitana de cualquier otra
                pizza de Barcelona.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {keys.map((key, index) => (
                <Reveal key={key.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {key.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {key.text}
                    </p>
                  </div>
                </Reveal>
              ))}
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

        {/* Reseñas */}
        <Resenas lang="es" offset={6} limit={12} />

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
                Pizza napolitana en Barcelona
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
                    <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="es" />
    </>
  );
}
