import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import PaymentLogos from "@/components/PaymentLogos";
import Resenas from "@/components/Resenas";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor, socialFor } from "@/lib/i18n";
import { goldCta3d } from "@/lib/ui";
import { reviewStats } from "@/data/reviews";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const TITLE = "Restaurante para Grupos y Empresas · Eixample · Positano";
const DESCRIPTION =
  "Comidas y cenas de grupo en el Eixample: pizza napolitana, pasta fresca y trato cercano en Positano. Cenas de empresa, terraza y menú del día para equipos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("/grupos-barcelona"),
  ...socialFor({ title: TITLE, description: DESCRIPTION, path: "/grupos-barcelona" }),
};

const horario = [
  { dia: "Martes a Jueves", horas: "13:00–16:00 y 20:00–23:30" },
  { dia: "Viernes", horas: "13:00–16:00 y 20:00–00:00" },
  { dia: "Sábado", horas: "13:00–00:00" },
  { dia: "Domingo", horas: "13:00–23:30" },
  { dia: "Lunes", horas: "Cerrado" },
];

const argumentos = [
  {
    title: "Cocina italiana completa",
    text: "Pizza napolitana de masa fermentada 48 horas, pasta fresca casera y postres como nuestro tiramisú de pistacho: un menú con algo para cada gusto en la mesa.",
  },
  {
    title: `${reviewStats.rating}★ con más de ${reviewStats.count.replace("+", "")} reseñas`,
    text: "La pizzería mejor valorada de la zona, con el trato cercano de Antonio, Massimo y Vincenzo, tres napolitanos que reciben cada grupo como si fuera de casa.",
  },
  {
    title: "Terraza en el Eixample",
    text: "Grupos grandes también en terraza, con un suplemento del 10%. La asignación final depende de la disponibilidad del día.",
  },
];

const faqs = [
  {
    q: "¿Hacéis menús para grupos?",
    a: "Sí. No tenemos un menú de grupo cerrado con precio publicado: preparamos una propuesta a medida según el número de comensales, con pizza napolitana, pasta fresca y postres de nuestra carta. Llámanos al +34 933 51 59 13 y lo organizamos juntos.",
  },
  {
    q: "¿Organizáis cenas de empresa?",
    a: "Sí, recibimos cenas de empresa, cumpleaños y comidas de equipo durante todo el año. Cuéntanos cuántos sois y qué buscáis y te preparamos una propuesta a medida por teléfono.",
  },
  {
    q: "¿Aceptáis Ticket Restaurant® para el grupo?",
    a: "Sí, aceptamos Ticket Restaurant®, Edenred y otras tarjetas restaurante. Es una opción habitual para equipos de oficina que vienen a comer nuestro menú del día de 14,90 € de martes a viernes, de 13:00 a 16:00.",
  },
  {
    q: "¿Tenéis terraza para grupos?",
    a: "Sí, tenemos terraza y también mesas en el interior. Para grupos grandes en terraza aplicamos un suplemento del 10%; la asignación depende de la disponibilidad del día.",
  },
  {
    q: "¿Cómo reservo para un grupo?",
    a: "Para grupos grandes, lo mejor es llamarnos al +34 933 51 59 13: así organizamos la mesa y, si quieres, una propuesta de menú a medida. Para grupos pequeños también puedes reservar online.",
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

export default function GruposBarcelonaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Grupos y empresas", path: "/grupos-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="es" />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Grupos y empresas en el Eixample
            </span>
            {/* text-[2.6rem] en móvil: "Restaurante" a text-5xl desborda
                los 390px de un iPhone. */}
            <h1 className="mt-5 font-display text-[2.6rem] uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Restaurante para grupos
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Comidas y cenas de empresa en Positano
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              ¿Buscáis restaurante de grupos en Barcelona? En Positano recibimos
              cumpleaños, comidas de familia y cenas de empresa en el corazón del
              Eixample, con una cocina italiana completa que gusta a todos y el
              trato cercano de tres napolitanos.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="tel:+34933515913"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Llamar para organizar el grupo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/reservas"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Reservar grupo pequeño
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Por qué Positano para tu grupo */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Por qué Positano
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Un sitio donde todo el grupo come bien
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Nuestra{" "}
                <a
                  href="/menu"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  carta
                </a>{" "}
                combina pizza napolitana, pasta fresca y postres caseros, así que
                el grupo entero encuentra su plato favorito.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {argumentos.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Cenas de empresa y menú del día para equipos */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="mx-auto max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                ¿Sois una oficina cerca del Eixample?
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                Para comidas de equipo al mediodía tenemos nuestro{" "}
                <a
                  href="/menu-del-dia"
                  className="underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  menú del día
                </a>{" "}
                por 14,90 €, de martes a viernes de 13:00 a 16:00. Aceptamos
                Ticket Restaurant®, Edenred y otras tarjetas restaurante, así que
                es la opción perfecta para llevar al equipo entero sin
                complicaciones.
              </p>
              <PaymentLogos lang="es" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Reseñas */}
        <Resenas lang="es" offset={2} limit={12} />

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
                Grupos y empresas, al detalle
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
                  Horario
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Abrimos de martes a domingo
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
                    href="tel:+34933515913"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Llamar al +34 933 51 59 13
                  </a>
                  <a
                    href="/reservas"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Reservar online
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="es" />
    </>
  );
}
