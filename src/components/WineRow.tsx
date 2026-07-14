import type { Wine } from "@/data/wines";
import { pickLang, type Locale } from "@/lib/i18n";
import BottleViewButton from "./bebidas/BottleViewButton";

export default function WineRow({
  wine,
  lang = "es",
}: {
  wine: Wine;
  lang?: Locale;
}) {
  const notes = pickLang(wine, "notes", lang);
  const meta = [wine.region, wine.grape].filter(Boolean).join(" · ");
  const glassLabel = (
    { es: "copa", en: "glass", it: "calice", fr: "verre", de: "Glas", nl: "glas" } as Record<Locale, string>
  )[lang];

  return (
    <li>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-ink">
          {wine.name}
          {wine.image ? (
            <BottleViewButton image={wine.image} name={wine.name} lang={lang} />
          ) : null}
        </h3>
        {wine.price ? (
          <span className="shrink-0 text-right font-serif text-lg text-ink-soft">
            {wine.price}
            {wine.glass ? (
              <span className="block text-[0.78rem] tracking-wide text-ink-soft/75">
                {glassLabel} {wine.glass}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
      {meta ? <p className="mt-1 text-sm text-ink-soft/80">{meta}</p> : null}
      {notes ? (
        <p className="mt-1 font-serif text-base italic leading-snug text-ink-soft">
          {notes}
        </p>
      ) : null}
    </li>
  );
}
