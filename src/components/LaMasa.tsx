import Image from "next/image";
import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    alt: "Nuestro pizzaiolo boleando a mano la masa de fermentación de 48 horas en Positano",
    eyebrow: "La masa",
    heading: "Tiempo, harina y paciencia",
    p1: "Nuestra masa fermenta lentamente durante 48 horas a temperatura controlada. Sin prisas ni levaduras forzadas — solo harina 0 multicereales italiana, agua, sal marina y tiempo. El resultado: ligera, alveolada y fácil de digerir.",
    p2: "Y porque lo que llega a la mesa importa, el resto del producto también viene de Italia: tomate San Marzano DOP, mozzarella di bufala campana y aceite de oliva virgen extra del sur. Cada ingrediente, donde tiene que estar.",
    quote: "«La buena pizza empieza dos días antes.»",
    cta: "Descubre nuestra pizzería napolitana",
    ctaHref: "/nuestra-historia",
    journey: "El viaje de la masa",
    dias: [
      { num: "01", eyebrow: "Día uno", title: "Preparamos la fermentación", text: "Mezclamos harina tipo 0 multicereales italiana, agua, sal marina y apenas una pizca de levadura. Amasamos hasta lograr una textura sedosa y la dejamos en reposo en frío." },
      { num: "02", eyebrow: "Día dos", title: "La masa madura", text: "Veinticuatro horas a temperatura controlada. El gluten se relaja, los alvéolos aparecen y la masa empieza a respirar." },
      { num: "03", eyebrow: "Día tres", title: "Lista para el horno", text: "Cuarenta y ocho horas cumplidas. Formamos las bolitas a mano y, al pedirla, va al horno a 400 °C: ligera, alveolada y digestiva." },
    ],
    ingredientes: [
      { name: "Harina tipo 0 multicereales", origin: "Molino Casillo · Puglia" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "Di bufala campana" },
      { name: "Olio EVO", origin: "Sur de Italia" },
    ],
  },
  en: {
    alt: "Our pizzaiolo hand-shaping the 48-hour fermented dough at Positano",
    eyebrow: "The dough",
    heading: "Time, flour and patience",
    p1: "Our dough ferments slowly for 48 hours at a controlled temperature. No rushing, no forced yeast — just Italian type-0 multigrain flour, water, sea salt and time. The result: light, airy and easy to digest.",
    p2: "And because what reaches the table matters, the rest of the produce comes from Italy too: San Marzano DOP tomatoes, mozzarella di bufala campana and extra-virgin olive oil from the south. Every ingredient, exactly where it belongs.",
    quote: "“A great pizza starts two days earlier.”",
    cta: "Discover our Neapolitan pizzeria",
    ctaHref: "/en/neapolitan-pizza-barcelona",
    journey: "The dough's journey",
    dias: [
      { num: "01", eyebrow: "Day one", title: "We start the ferment", text: "We mix Italian type-0 multigrain flour, water, sea salt and just a pinch of yeast. We knead until silky and leave it to rest in the cold." },
      { num: "02", eyebrow: "Day two", title: "The dough matures", text: "Twenty-four hours at a controlled temperature. The gluten relaxes, the air pockets form and the dough begins to breathe." },
      { num: "03", eyebrow: "Day three", title: "Ready for the oven", text: "Forty-eight hours complete. We shape the dough balls by hand and, once ordered, it goes into the 400 °C oven: light, airy and digestible." },
    ],
    ingredientes: [
      { name: "Type-0 multigrain flour", origin: "Molino Casillo · Puglia" },
      { name: "San Marzano", origin: "DOP · Agro Sarnese" },
      { name: "Mozzarella", origin: "Di bufala campana" },
      { name: "Olio EVO", origin: "Southern Italy" },
    ],
  },
} satisfies Record<Locale, Record<string, unknown>>;

export default function LaMasa({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  const dias = t.dias;
  const ingredientes = t.ingredientes;
  return (
    <section
      id="la-masa"
      className="relative overflow-hidden bg-cream px-6 py-24 md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -right-14 -top-14 h-80 w-auto rotate-[155deg] text-lemon/20" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <Reveal className="order-1">
            <div className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
              <Image
                src="/la-masa.jpg"
                alt={t.alt}
                width={1080}
                height={1350}
                className="relative aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-2">
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

            <ul className="mt-8 grid gap-3 border-t border-ink/15 pt-6 sm:grid-cols-2">
              {ingredientes.map((item) => (
                <li key={item.name} className="flex items-baseline gap-3">
                  <span className="h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-lemon" />
                  <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-soft lining-nums">
                    <span className="text-ink">{item.name}</span> · {item.origin}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
              {t.quote}
            </p>
            <a
              href={t.ctaHref}
              className="group mt-6 inline-flex items-center gap-2 text-[0.84rem] uppercase tracking-[0.22em] text-lemon transition-colors hover:text-ink"
            >
              {t.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="relative">
            <div className="absolute -right-4 -bottom-4 hidden h-full w-full border border-lemon/40 md:block" />
            <div className="relative bg-cream-deep px-8 py-12 sm:px-12 sm:py-14">
              <div className="mb-12 flex items-center justify-between text-[0.82rem] uppercase tracking-[0.3em] text-ink-soft/55">
                <span>{t.journey}</span>
                <span>48 h · 22 °C</span>
              </div>

              <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
                {dias.map((dia) => (
                  <li key={dia.num} className="relative">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 shrink-0 rounded-full bg-lemon shadow-[0_0_0_5px_var(--color-cream-deep)]" />
                      <span className="font-display text-[0.84rem] uppercase tracking-[0.32em] text-lemon">
                        {dia.eyebrow}
                      </span>
                      <span
                        aria-hidden
                        className="font-display text-xs italic text-ink-soft/45"
                      >
                        · {dia.num}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl leading-tight text-ink sm:text-[1.65rem]">
                      {dia.title}
                    </h3>
                    <p className="mt-2 font-serif text-base leading-relaxed text-ink-soft">
                      {dia.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
