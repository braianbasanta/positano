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

const title = "Auténtica Pizzería Napolitana · Nuestra Historia · Positano";
const description =
  "Positano, pizzería y restaurante napolitano en Barcelona. Recetas de Campania, masa de fermentación 48 h, horno de leña e ingredientes DOP italianos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/nuestra-historia"),
  ...socialFor({ title, description, path: "/nuestra-historia", locale: "es" }),
};

const faqs = [
  {
    q: "¿Dónde hay un restaurante napolitano auténtico en Barcelona?",
    a: "Positano es un restaurante napolitano en el Eixample de Barcelona (Carrer del Rosselló, 24). Lo llevan tres napolitanos de Campania que cocinan como en Nápoles: pizza de masa fermentada 48 horas en horno de leña, pasta fresca casera y antipasti con producto DOP italiano.",
  },
  {
    q: "¿Qué diferencia a una pizzería napolitana de una pizzería normal?",
    a: "La pizza napolitana de verdad se reconoce por la masa de larga fermentación (48 horas), el horno de leña a 400 °C que la cuece en menos de 90 segundos y el borde alto y aireado (cornicione) con su leopardado característico. En Positano seguimos esa tradición sin atajos.",
  },
  {
    q: "¿Es Positano un buen restaurante italiano en Barcelona?",
    a: "Sí. Además de la pizza napolitana, en Positano servimos cocina italiana del sur: pasta fresca, antipasti, ensaladas y postres caseros, con recetas traídas directamente de Campania. Un restaurante italiano en pleno Eixample de Barcelona.",
  },
  {
    q: "¿Quién está detrás de Positano?",
    a: "Positano nace de Antonio, Massimo y Vincenzo, tres napolitanos de Campania que trajeron a Barcelona las recetas de su tierra. Italianos cocinando como se hace en Nápoles, sin adaptaciones ni atajos.",
  },
  {
    q: "¿Positano hace pizza napolitana a domicilio?",
    a: "Sí, llevamos nuestra pizza napolitana, pasta fresca y antipasti a domicilio en Barcelona a través de Uber Eats y Glovo. También aceptamos Ticket Restaurant®.",
  },
];

const claves = [
  {
    title: "Masa fermentada 48 horas",
    text: "Dejamos reposar la masa 48 horas para conseguir una pizza más ligera, digerible y con el borde aireado (el cornicione) característico de Nápoles.",
  },
  {
    title: "Horno de leña a 400 °C",
    text: "Cada pizza se hornea en menos de 90 segundos en horno de leña, como manda la tradición napolitana. Así nace ese borde con leopardado y el centro fundente.",
  },
  {
    title: "Ingredientes DOP italianos",
    text: "Tomate San Marzano, fior di latte campano, mozzarella de búfala DOP, grana padano 24 meses. Producto auténtico traído de Italia, sin atajos.",
  },
];

export default function PizzeriaNapolitanaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Pizzería napolitana", path: "/nuestra-historia" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
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
              La auténtica pizza de Nápoles
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizzería napolitana en Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              De Campania al Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              En Positano no hacemos cualquier pizza: somos un restaurante
              napolitano en Barcelona donde se hace auténtica pizza napolitana,
              con las recetas que trajimos del sur de Italia, masa fermentada 48
              horas y horno de leña. El sabor real de Nápoles, en el corazón de
              Barcelona.
            </p>
          </div>
        </section>

        {/* Nuestra historia */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Nuestra historia
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Tres napolitanos en Barcelona
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                Todo empieza con Antonio, Massimo y Vincenzo, nacidos y criados
                en Campania, la región que vio nacer la pizza. Allí aprendieron,
                desde pequeños, que la cocina es el alma del hogar.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                Tras años perfeccionando el oficio, trajeron a Barcelona las
                recetas de su tierra. Así nació Positano: una pizzería
                napolitana donde la gastronomía del sur de Italia se sirve tal y
                como se hace en Nápoles, sin adaptaciones ni atajos.
              </p>
              <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
                «La pasión por la buena comida corre por nuestras venas.»
              </p>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
                <Image
                  src="/hero/positano.jpg"
                  alt="Positano, pizzería napolitana en Barcelona con recetas traídas de Campania"
                  width={1400}
                  height={933}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="relative aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Qué hace auténtica nuestra pizza */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Qué la hace auténtica
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La verdadera pizza napolitana
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                La pizza napolitana de verdad no se improvisa. Estas son las tres
                cosas que la diferencian de cualquier otra pizza de Barcelona.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {claves.map((clave, index) => (
                <Reveal key={clave.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {clave.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {clave.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/menu"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Ver nuestras pizzas
              </a>
              <a
                href="/reservas"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Reservar mesa
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reseñas */}
        <Resenas offset={18} limit={12} />

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
                Restaurante napolitano en Barcelona
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
      <SiteFooter />
    </>
  );
}
