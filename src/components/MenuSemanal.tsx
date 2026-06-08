import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import { menuDelDia } from "@/data/menuDelDia";
import type { MenuDelDiaItem } from "@/data/menuDelDia";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "La carta del mediodía",
    heading: "Los platos de esta semana",
    primeros: "Primeros",
    segundos: "Segundos",
    postres: "Postres",
    bebidas: "Bebidas",
    note: "Cambiamos el menú cada semana con producto fresco de mercado. Lo publicamos también en nuestras stories de Instagram.",
  },
  en: {
    eyebrow: "This week's lunch menu",
    heading: "This week's dishes",
    primeros: "Starters",
    segundos: "Mains",
    postres: "Desserts",
    bebidas: "Drinks",
    note: "We change the menu every week with fresh market produce. We also post it on our Instagram stories.",
  },
} satisfies Record<Locale, Record<string, string>>;

const MESES_EN: Record<string, string> = {
  enero: "January",
  febrero: "February",
  marzo: "March",
  abril: "April",
  mayo: "May",
  junio: "June",
  julio: "July",
  agosto: "August",
  septiembre: "September",
  octubre: "October",
  noviembre: "November",
  diciembre: "December",
};

// "Semana del 9 al 13 de junio" → "Week of 9–13 June"
function semanaLabel(semana: string, lang: Locale): string {
  if (lang === "es") return semana;
  const m = semana.match(/del?\s+(\d+)\s+al?\s+(\d+)\s+de\s+(\w+)/i);
  if (!m) return semana;
  const [, from, to, mes] = m;
  const month = MESES_EN[mes.toLowerCase()] ?? mes;
  return `Week of ${from}–${to} ${month}`;
}

function Seccion({
  titulo,
  items,
}: {
  titulo: string;
  items: MenuDelDiaItem[];
}) {
  return (
    <div>
      <h3 className="flex items-center justify-center gap-3 font-display text-2xl uppercase tracking-[0.16em] text-ink md:text-3xl">
        <span className="h-px w-8 bg-lemon" />
        {titulo}
        <span className="h-px w-8 bg-lemon" />
      </h3>
      <ul className="mt-5 space-y-2.5 text-center">
        {items.map((item) => (
          <li
            key={item.name}
            className="font-serif text-base leading-snug text-ink-soft md:text-lg"
          >
            {item.name}
            {item.surcharge && (
              <span className="ml-1 font-sans text-sm font-semibold text-lemon">
                {item.surcharge}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MenuSemanal({ lang = "es" }: { lang?: Locale }) {
  const m = menuDelDia;
  const t = COPY[lang];
  return (
    <section className="relative overflow-hidden bg-cream px-6 pb-16 pt-10 md:pb-20 md:pt-12">
      <LemonBranch className="pointer-events-none absolute -right-16 -top-12 h-80 w-auto rotate-[150deg] text-lemon/20" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-[0.78rem] uppercase tracking-[0.24em] text-ink-soft/60">
            {semanaLabel(m.semana, lang)}
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-12 space-y-12 border border-ink/15 bg-cream/55 px-7 py-12 sm:px-12 sm:py-14"
        >
          <Seccion titulo={t.primeros} items={m.primeros} />
          <Seccion titulo={t.segundos} items={m.segundos} />
          <Seccion titulo={t.postres} items={m.postres} />

          <div>
            <h3 className="flex items-center justify-center gap-3 font-display text-2xl uppercase tracking-[0.16em] text-ink md:text-3xl">
              <span className="h-px w-8 bg-lemon" />
              {t.bebidas}
              <span className="h-px w-8 bg-lemon" />
            </h3>
            <ul className="mx-auto mt-5 grid max-w-xl grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
              {m.bebidas.map((d) => (
                <li
                  key={d.name}
                  className="flex items-baseline justify-between gap-3 border-b border-dotted border-ink/15 pb-1.5 font-serif text-base text-ink-soft"
                >
                  <span>{d.name}</span>
                  <span className="whitespace-nowrap text-sm font-semibold text-lemon">
                    {d.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-8 text-center">
          <p className="font-serif text-base italic leading-relaxed text-ink-soft/80">
            {t.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
