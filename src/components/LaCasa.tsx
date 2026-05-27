import Image from "next/image";
import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";

export default function LaCasa() {
  return (
    <section
      id="la-casa"
      className="relative overflow-hidden bg-cream px-6 py-24 md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal className="order-2 md:order-1">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            La Casa
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            De Campania a Barcelona
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
            Nuestra historia es un viaje culinario: la fusión perfecta entre
            tradición y modernidad, donde cada plato cuenta algo.
          </p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
            Comienza con Antonio, Massimo y Vincenzo, nacidos y criados en
            Campania, donde su amor por la cocina se cultivó desde pequeños — al
            descubrir que la cocina era el alma del hogar.
          </p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
            Tras años perfeccionando ese arte, llevaron su talento a Barcelona.
            Así nació Positano, nuestra pizzería napolitana y restaurante
            italiano en el Eixample, donde converge la gastronomía del sur de
            Italia con el encanto vibrante de la ciudad.
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
              alt="Vista del pueblo de Positano (Costa Amalfitana, Italia), origen de nuestra pizzería napolitana en Barcelona"
              width={1400}
              height={933}
              className="relative aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
