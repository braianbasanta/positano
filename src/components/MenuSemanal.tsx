import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import { menuDelDia } from "@/data/menuDelDia";
import type { MenuDelDiaItem } from "@/data/menuDelDia";

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

export default function MenuSemanal() {
  const m = menuDelDia;
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
      <LemonBranch className="pointer-events-none absolute -right-16 -top-12 h-80 w-auto rotate-[150deg] text-lemon/20" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            El menú de esta semana
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            Primero · Segundo · Pan · Bebida · Postre
          </h2>
          <p className="mt-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-serif text-lg text-ink-soft">
            <span className="font-display text-3xl text-ink md:text-4xl">
              {m.precio}
            </span>
            <span className="italic">
              · Suplemento terraza {m.suplementoTerraza}
            </span>
          </p>
          <p className="mt-2 text-[0.78rem] uppercase tracking-[0.24em] text-ink-soft/60">
            {m.semana}
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-12 space-y-12 border border-ink/15 bg-cream/55 px-7 py-12 sm:px-12 sm:py-14"
        >
          <Seccion titulo="Primeros" items={m.primeros} />
          <Seccion titulo="Segundos" items={m.segundos} />
          <Seccion titulo="Postres" items={m.postres} />

          <div>
            <h3 className="flex items-center justify-center gap-3 font-display text-2xl uppercase tracking-[0.16em] text-ink md:text-3xl">
              <span className="h-px w-8 bg-lemon" />
              Bebidas
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
            Cambiamos el menú cada semana con producto fresco de mercado. Lo
            publicamos también en nuestras stories de Instagram.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
