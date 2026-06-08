import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor } from "@/lib/i18n";
import { reviewStats } from "@/data/reviews";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=es&output=embed";

export const metadata: Metadata = {
  title: `Pizzería en el Eixample ★${reviewStats.rating} · Positano Barcelona`,
  description:
    "Positano, pizzería napolitana y restaurante italiano en el Eixample, Barcelona. Masa fermentada 48 h en horno de leña, pasta fresca y antipasti.",
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
  {
    title: "Llevado por napolitanos",
    text: "Positano está al frente de tres napolitanos de Campania. Italianos cocinando para que comas como en el sur de Italia, sin atajos ni adaptaciones.",
  },
];

// Platos reales de la carta, los más mencionados por nuestros clientes.
const platos = [
  {
    cat: "De la pizzería napolitana",
    items:
      "Margherita, Diavola, Bufala y Ortolana, con masa de 48 horas y cornicione alto. Provola e Peppe y Siciliana para los que buscan algo más.",
  },
  {
    cat: "Pasta fresca casera",
    items:
      "Carbonara hecha como toca, sin nata; lasaña tradicional; paccheri alla genovese; scialatelli con bogavante y gnocchi alla sorrentina.",
  },
  {
    cat: "Antipasti y para compartir",
    items:
      "Burrata pugliese, provolone al horno para mojar pan, parmigiana de berenjena y nuestra selección de entrantes del sur de Italia.",
  },
  {
    cat: "Dolci caseros",
    items:
      "Tiramisú clásico, panna cotta y propuestas como el tiramisú de pistacho. El final italiano que merece la comida.",
  },
];

// Respuestas verificadas (mismas que el FAQ de la home), enfocadas al Eixample.
const faqs = [
  {
    q: "¿Dónde está la pizzería en el Eixample?",
    a: "Estamos en Carrer del Rosselló, 24, en pleno Eixample de Barcelona (08029), entre Passeig de Gràcia y la Sagrada Família. Puedes llamarnos al +34 933 51 59 13.",
  },
  {
    q: "¿Qué tipo de cocina hacéis?",
    a: "Pizza napolitana de masa fermentada 48 horas en horno de leña con ingredientes DOP italianos, además de pasta fresca casera, antipasti, ensaladas y postres caseros del sur de Italia.",
  },
  {
    q: "¿Se puede reservar mesa?",
    a: "Sí, puedes reservar online con confirmación inmediata desde nuestra página de reservas, o llamando al +34 933 51 59 13. Los fines de semana recomendamos reservar con antelación.",
  },
  {
    q: "¿Tenéis opciones vegetarianas?",
    a: "Sí: la pizza Ortolana, la Búfala, la lasaña vegetariana, ensaladas y antipasti como la parmesana de berenjena o la burrata.",
  },
  {
    q: "¿Hacéis pizza a domicilio en el Eixample?",
    a: "Sí, llevamos nuestra pizza napolitana, pasta fresca y antipasti a domicilio en Barcelona a través de Uber Eats y Glovo. También aceptamos Ticket Restaurant®.",
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
      <JsonLd data={faqJsonLd} />
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

            <div className="mt-14 grid gap-5 md:grid-cols-2">
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

        {/* La cocina */}
        <section className="relative overflow-hidden bg-ink px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-12 h-80 w-auto rotate-[150deg] text-lemon/15" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Nuestra cocina
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Mucho más que una pizzería italiana en Barcelona
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                En nuestro restaurante italiano del Eixample encontrarás la carta
                completa del sur de Italia: de la pizza napolitana de horno de
                leña a la pasta fresca casera, los antipasti y los postres
                italianos. Esto es lo que más repiten nuestros clientes.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
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
                La pizzería del Eixample, al detalle
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
                Barcelona. Ven a comer o cenar nuestra{" "}
                <a
                  href="/pizza-napolitana-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  pizza napolitana
                </a>
                , prueba el{" "}
                <a
                  href="/menu-del-dia"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  menú del día
                </a>{" "}
                entre semana o pídela{" "}
                <a
                  href="/pizza-domicilio"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  a domicilio
                </a>{" "}
                si prefieres quedarte en casa.
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
