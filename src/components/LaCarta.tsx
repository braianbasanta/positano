import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import { featured } from "@/data/menu";

export default function LaCarta() {
  return (
    <section
      id="carta"
      className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            La Carta
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            Cocina italiana, sin atajos
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
            Masa de fermentación de 48 horas, horneada a 400&nbsp;°C e
            ingredientes 100&nbsp;% italianos. Estos son algunos de nuestros
            imprescindibles.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dish, index) => (
            <Reveal key={dish.name} delay={index * 70}>
              <div className="group flex h-full flex-col gap-2 border border-ink/15 bg-cream/40 p-7 transition-colors duration-300 hover:border-lemon/60">
                <span className="text-[0.84rem] uppercase tracking-[0.28em] text-lemon">
                  {dish.tag}
                </span>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl leading-tight text-ink">
                    {dish.name}
                  </h3>
                  <span className="shrink-0 font-serif text-lg text-ink-soft">
                    {dish.price}
                  </span>
                </div>
                <p className="font-serif text-base italic leading-snug text-ink-soft">
                  {dish.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl font-serif text-lg italic text-ink-soft">
            Y más de 45 platos: antipasti, pastas frescas, risotti, carnes,
            pescados y 18 pizzas napolitanas.
          </p>
          <a
            href="/menu"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
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
