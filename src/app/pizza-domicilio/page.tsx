import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";

const UBER_EATS =
  "https://www.ubereats.com/es/store/positano-pizzeria/ciPAhMptSOeZGNeUsyhjKA";
const GLOVO =
  "https://glovoapp.com/en/es/barcelona/stores/positano-pizzeria-barcelona";

export const metadata: Metadata = {
  title: "Pizza a Domicilio en Barcelona · Positano — Pizzería para Llevar",
  description:
    "Pedir pizza a domicilio en Barcelona nunca fue tan fácil. Te llevamos la pizza napolitana, la pasta fresca y los antipasti de Positano a casa. Pizzería para llevar — pide online en minutos.",
  alternates: { canonical: "/pizza-domicilio" },
};

const steps = [
  {
    number: "01",
    title: "Elige tus platos",
    text: "Abre nuestra carta de pizza a domicilio en Uber Eats o Glovo y compón tu pedido: pizza napolitana, pasta fresca, antipasti y mucho más.",
  },
  {
    number: "02",
    title: "Confirma y paga",
    text: "Introduce tu dirección de Barcelona y paga de forma segura. Aceptamos también Ticket Restaurant®.",
  },
  {
    number: "03",
    title: "Te la llevamos a casa",
    text: "Horneamos tu pizza al momento y un rider te la lleva caliente hasta tu puerta, estés donde estés.",
  },
];

const horario = [
  { dia: "Martes a Jueves", horas: "13:00 – 16:00 · 20:00 – 23:30" },
  { dia: "Viernes", horas: "13:00 – 16:00 · 20:00 – 00:00" },
  { dia: "Sábado", horas: "13:00 – 00:00" },
  { dia: "Domingo", horas: "13:00 – 23:30" },
  { dia: "Lunes", horas: "Cerrado" },
];

export default function PizzaDomicilioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              A domicilio en Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizza a domicilio
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Te llevamos la pizza a casa
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Pizza napolitana de fermentación de 48 horas, pasta fresca y
              nuestros antipasti — recién hechos y listos para disfrutar en
              casa. Pedir pizza a domicilio en Barcelona nunca fue tan fácil:
              haz tu pedido online y te lo llevamos calentito a tu puerta.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Pedir en Uber Eats
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={GLOVO}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Pedir en Glovo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Cómo funciona
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Pedir pizza online es así de fácil
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Tres pasos entre tú y una pizza napolitana recién horneada en
                casa. Sin llamadas, sin esperas.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <span className="font-display text-3xl text-lemon">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Plataforma */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Reparto a domicilio
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Pide tu pizza en Uber Eats o Glovo
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                  Toda nuestra carta de pizza napolitana, pasta fresca y
                  antipasti, lista para llevar a tu casa en cualquier rincón de
                  Barcelona. Elige tu plataforma favorita — el radio exacto de
                  reparto lo verás al introducir tu dirección.
                </p>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Horario de entrega
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {horario.map((item) => (
                    <li
                      key={item.dia}
                      className="font-serif text-lg text-ink-soft"
                    >
                      <span className="text-ink">{item.dia}</span> ·{" "}
                      {item.horas}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.84rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span>Aceptamos Ticket Restaurant®</span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={UBER_EATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Pedir en Uber Eats
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href={GLOVO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Pedir en Glovo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-lg italic text-ink-soft">
                ¿Prefieres vivir Positano en la mesa?
              </p>
              <a
                href="/reservas"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Reservar mesa
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
