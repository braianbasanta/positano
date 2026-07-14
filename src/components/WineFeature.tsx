import type { FeaturedWine } from "@/data/wines";
import { pickLang, type Locale } from "@/lib/i18n";
import Lemon from "./Lemon";
import BottleImage from "./bebidas/BottleImage";

export default function WineFeature({
  wine,
  lang = "es",
}: {
  wine: FeaturedWine;
  lang?: Locale;
}) {
  const notes = pickLang(wine, "notes", lang);
  const tag = pickLang(wine, "tag", lang);

  return (
    <article className="group flex overflow-hidden rounded-2xl border border-lemon/30 bg-ink/40 text-left backdrop-blur-sm transition-colors duration-300 hover:border-lemon/60">
      {wine.image ? (
        <BottleImage
          image={wine.image}
          name={wine.name}
          sizes="(max-width: 768px) 40vw, 220px"
          className="w-2/5 shrink-0"
        />
      ) : null}
      <div className="flex flex-col p-6 md:p-7">
        <span className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.26em] text-lemon">
          <Lemon className="h-4 w-4 shrink-0" />
          {tag}
        </span>
        <h3 className="mt-3 font-display text-xl uppercase leading-tight tracking-[0.04em] text-cream md:text-2xl">
          {wine.name}
        </h3>
        {notes ? (
          <p className="mt-3 font-serif text-base italic leading-relaxed text-cream/80">
            {notes}
          </p>
        ) : null}
        <div className="mt-auto flex items-center gap-3 pt-5 text-cream/70">
          <span className="h-px w-8 bg-lemon/50" />
          <span className="font-serif text-lg text-lemon">{wine.price}</span>
        </div>
      </div>
    </article>
  );
}
