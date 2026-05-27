import Lemon from "../Lemon";
import LemonBranch from "../LemonBranch";
import Reveal from "../Reveal";
import { featured } from "@/data/menu";
import ReelCarousel from "./ReelCarousel";

/**
 * Teaser de reels en el homepage. Tira horizontal de platos destacados;
 * cada tarjeta abre el visor inmersivo recorriendo toda la carta.
 */
export default function ReelStrip() {
  return (
    <section
      id="reels"
      className="relative overflow-hidden bg-ink py-24 text-cream md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[150deg] text-lemon/20" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            Carta en vídeo
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] md:text-5xl">
            Cada plato, en movimiento
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-cream/75">
            Antes de elegir, míralo. Así sale cada plato de nuestra cocina —
            grabado tal cual llega a tu mesa.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <ReelCarousel items={featured} />
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="max-w-xl font-serif text-lg italic text-cream/75">
            Y más de 45 platos: antipasti, pastas frescas, risotti, carnes,
            pescados y 18 pizzas napolitanas.
          </p>
          <a
            href="/carta"
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
  );
}
