import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";

const DISH_ID = "hydra-e271f889-46d4-4929-baba-ef5fe752476a";
const DISH_WIDGET_URL = `https://reservation.dish.co/widget/${DISH_ID}?eid=${DISH_ID}&tagid=hors-${DISH_ID}&width=100%25`;

export const metadata: Metadata = {
  title: "Reservas · Positano — Pizzería Lounge Bar Barcelona",
  description:
    "Reserva tu mesa en Positano, pizzería napolitana en el corazón del Eixample, Barcelona. Elige día, hora y comensales — confirmación inmediata online.",
  alternates: { canonical: "/reservas" },
};

export default function ReservasPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.72rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Reservas
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Reserva tu mesa
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Elige día, hora y número de comensales. Recibirás la
              confirmación al momento.
            </p>
          </div>
        </section>

        {/* Widget DISH */}
        <section className="bg-cream px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="border border-ink/15 bg-cream/40 p-2 sm:p-4 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Reservar mesa en Positano"
                className="block h-[420px] w-full border-0 sm:h-[460px]"
                loading="lazy"
              />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              ¿Algún problema con la reserva? Llámanos al{" "}
              <a
                href="tel:+34933515913"
                className="text-ink underline-offset-4 transition-colors hover:text-lemon hover:underline"
              >
                +34 933 515 913
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Script
        src="https://reservation.dish.co/widget.js"
        strategy="lazyOnload"
      />
      <SiteFooter />
    </>
  );
}
