import Image from "next/image";
import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";

const dias = [
  {
    num: "01",
    eyebrow: "Día uno",
    title: "Preparamos la fermentación",
    text: "Mezclamos harina tipo 0 multicereales italiana, agua, sal marina y apenas una pizca de levadura. Amasamos hasta lograr una textura sedosa y la dejamos en reposo en frío.",
  },
  {
    num: "02",
    eyebrow: "Día dos",
    title: "La masa madura",
    text: "Veinticuatro horas a temperatura controlada. El gluten se relaja, los alvéolos aparecen y la masa empieza a respirar.",
  },
  {
    num: "03",
    eyebrow: "Día tres",
    title: "Lista para el horno",
    text: "Cuarenta y ocho horas cumplidas. Formamos las bolitas a mano y, al pedirla, va al horno a 400 °C: ligera, alveolada y digestiva.",
  },
];

const ingredientes = [
  { name: "Harina tipo 0 multicereales", origin: "Molino Casillo · Puglia" },
  { name: "San Marzano", origin: "DOP · Agro Sarnese" },
  { name: "Mozzarella", origin: "Di bufala campana" },
  { name: "Olio EVO", origin: "Sur de Italia" },
];

export default function LaMasa() {
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
                alt="Nuestro pizzaiolo boleando a mano la masa de fermentación de 48 horas en Positano"
                width={1080}
                height={1350}
                className="relative aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-2">
            <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              La masa
            </span>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              Tiempo, harina y paciencia
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
              Nuestra masa fermenta lentamente durante 48 horas a temperatura
              controlada. Sin prisas ni levaduras forzadas — solo harina 0
              multicereales italiana, agua, sal marina y tiempo. El resultado:
              ligera, alveolada y fácil de digerir.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
              Y porque lo que llega a la mesa importa, el resto del producto
              también viene de Italia: tomate San Marzano DOP, mozzarella di
              bufala campana y aceite de oliva virgen extra del sur. Cada
              ingrediente, donde tiene que estar.
            </p>

            <ul className="mt-8 grid gap-3 border-t border-ink/15 pt-6 sm:grid-cols-2">
              {ingredientes.map((item) => (
                <li key={item.name} className="flex items-baseline gap-3">
                  <span className="h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-lemon" />
                  <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-soft">
                    <span className="text-ink">{item.name}</span> · {item.origin}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
              «La buena pizza empieza dos días antes.»
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <div className="relative">
            <div className="absolute -right-4 -bottom-4 hidden h-full w-full border border-lemon/40 md:block" />
            <div className="relative bg-cream-deep px-8 py-12 sm:px-12 sm:py-14">
              <div className="mb-12 flex items-center justify-between text-[0.82rem] uppercase tracking-[0.3em] text-ink-soft/55">
                <span>El viaje de la masa</span>
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
