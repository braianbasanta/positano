import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import PaymentLogos from "@/components/PaymentLogos";
import MenuSemanal from "@/components/MenuSemanal";
import Resenas from "@/components/Resenas";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor } from "@/lib/i18n";
import { reviewStats } from "@/data/reviews";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

export const metadata: Metadata = {
  title: `Menú del Día en el Eixample ★${reviewStats.rating} · Positano Barcelona`,
  description:
    "Menú del día en Positano, pizzería italiana en el Eixample, Barcelona, por 14,90 €. Comida casera de martes a viernes. Aceptamos Ticket Restaurant®.",
  alternates: alternatesFor("/menu-del-dia"),
};

const horario = [
  { dia: "Martes a Jueves", horas: "13:00 – 16:00" },
  { dia: "Viernes", horas: "13:00 – 16:00" },
  { dia: "Sábado y Domingo", horas: "Carta completa" },
  { dia: "Lunes", horas: "Cerrado" },
];

const faqs = [
  {
    q: "¿Cuánto cuesta el menú del día?",
    a: "El menú del día cuesta 14,90 € e incluye primero, segundo, pan, bebida y postre. En terraza se aplica un suplemento del 10%.",
  },
  {
    q: "¿Qué días hay menú del día?",
    a: "Servimos el menú del día de martes a viernes al mediodía, de 13:00 a 16:00. Los sábados y domingos trabajamos con la carta completa, y los lunes cerramos.",
  },
  {
    q: "¿Aceptáis Ticket Restaurant® o Edenred para el menú del día?",
    a: "Sí. Puedes pagar tu menú del día con Ticket Restaurant®, Edenred y otras tarjetas restaurante. Es el sitio ideal para tu pausa del mediodía en el Eixample.",
  },
  {
    q: "¿El menú del día cambia cada semana?",
    a: "Sí, lo renovamos cada semana con platos caseros del sur de Italia: pastas como los rigatoni al pesto, ensaladas, segundos de carne o pescado y una pizza napolitana a elegir (Margherita, Diavola, Ortolana y más).",
  },
  {
    q: "¿Hay que reservar para comer el menú del día?",
    a: "No es imprescindible, pero al mediodía el Eixample se llena: si vienes en grupo o con poco tiempo, te recomendamos reservar online o llamar al +34 933 51 59 13.",
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

export default function MenuDelDiaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Menú del día", path: "/menu-del-dia" },
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
        <section className="relative overflow-hidden bg-cream px-6 pt-24 pb-6 md:pt-32 md:pb-8">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Qué incluye
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Un menú completo por{" "}
                <span className="whitespace-nowrap">14,90 €</span>
              </h2>
              <p className="mt-3 font-serif text-base italic text-ink-soft/70">
                Suplemento terraza 10%
              </p>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Primero, segundo, pan, bebida y postre. Cocina italiana casera de
                nuestra{" "}
                <a
                  href="/menu"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  carta
                </a>
                , pensada para comer bien y volver al trabajo a tiempo.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Menú de la semana (se actualiza desde src/data/menuDelDia.ts) */}
        <MenuSemanal />

        {/* Pago con tarjetas restaurante */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-4 md:pb-28">
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="mx-auto max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                Aceptamos Ticket Restaurant® y Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                ¿Comes con tu tarjeta de comida de empresa? En Positano puedes
                pagar tu menú del día con Ticket Restaurant®, Edenred y otras
                tarjetas restaurante. El sitio perfecto para tu pausa del
                mediodía en{" "}
                <a
                  href="/pizzeria-eixample"
                  className="underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  nuestra pizzería del Eixample
                </a>
                .
              </p>
              <PaymentLogos lang="es" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Reseñas */}
        <Resenas offset={6} limit={12} />

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
                El menú del día, al detalle
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
