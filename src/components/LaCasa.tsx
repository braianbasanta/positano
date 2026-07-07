import Image from "next/image";
import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "La Casa",
    heading: "De Campania a Barcelona",
    p1: "Nuestra historia es un viaje culinario: la fusión perfecta entre tradición y modernidad, donde cada plato cuenta algo.",
    p2: "Comienza con Antonio, Massimo y Vincenzo, nacidos y criados en Campania, donde su amor por la cocina se cultivó desde pequeños — al descubrir que la cocina era el alma del hogar.",
    p3: "Tras años perfeccionando ese arte, llevaron su talento a Barcelona. Así nació Positano, nuestra pizzería napolitana y restaurante italiano en Barcelona, en pleno Eixample, donde converge la gastronomía del sur de Italia con el encanto vibrante de la ciudad.",
    quote: "«La pasión por la buena comida corre por nuestras venas.»",
    alt: "Vista del pueblo de Positano (Costa Amalfitana, Italia), origen de nuestra pizzería napolitana en Barcelona",
  },
  en: {
    eyebrow: "Our House",
    heading: "From Campania to Barcelona",
    p1: "Our story is a culinary journey: the perfect blend of tradition and modernity, where every dish has something to say.",
    p2: "It begins with Antonio, Massimo and Vincenzo, born and raised in Campania, where their love for cooking grew from an early age — discovering that the kitchen is the soul of the home.",
    p3: "After years perfecting that craft, they brought their talent to Barcelona. And so Positano was born: our Neapolitan pizzeria and Italian restaurant in Barcelona, right in the Eixample, where the cuisine of southern Italy meets the vibrant charm of the city.",
    quote: "“A passion for good food runs in our veins.”",
    alt: "View of the village of Positano (Amalfi Coast, Italy), the origin of our Neapolitan pizzeria in Barcelona",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function LaCasa({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  return (
    <section
      id="la-casa"
      className="relative overflow-hidden bg-cream px-6 py-24 md:py-32"
    >
      <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal className="order-2 md:order-1">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
            {t.p1}
          </p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
            {t.p2}
          </p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
            {t.p3}
          </p>
          <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
            {t.quote}
          </p>
        </Reveal>

        <Reveal delay={120} className="order-1 md:order-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
            <Image
              src="/hero/positano.jpg"
              alt={t.alt}
              width={1400}
              height={933}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="relative aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
