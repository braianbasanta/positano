import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";

const INSTAGRAM_URL = "https://instagram.com/positanopizzeriabcn/";

export default function MenuDelDia() {
  return (
    <section
      id="menu-dia"
      className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -left-14 -top-14 h-80 w-auto -rotate-12 text-lemon/20" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            Menú del día
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            De martes a viernes, comemos como en casa
          </h2>
          <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
            Primero, segundo, pan, bebida y postre. Un menú completo que
            renovamos cada semana, recién pensado por nuestra cocina.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-12 flex flex-col items-center gap-8 border border-ink/15 bg-cream/55 px-8 py-12 sm:px-14 sm:py-14"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[0.78rem] uppercase tracking-[0.28em] text-ink-soft/70">
              Menú almuerzo
            </span>
            <span className="font-display text-6xl leading-none text-ink md:text-7xl">
              14,90 €
            </span>
            <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-soft/70">
              Bebida y postre incluidos
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-ink/15" />
            <Lemon className="h-5 w-5 text-lemon" />
            <span className="h-px w-10 bg-ink/15" />
          </div>

          <p className="max-w-md text-center font-serif text-base leading-relaxed text-ink-soft">
            Publicamos el menú del día en nuestras stories de Instagram.
            Échale un vistazo antes de venir y descubre qué se cocina al
            mediodía.
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream shadow-[0_10px_28px_rgba(29,39,80,0.25)] transition-all duration-300 hover:bg-lemon hover:text-ink"
          >
            Ver menú del día en Instagram
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
