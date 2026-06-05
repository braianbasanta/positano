import type { Dish } from "@/data/menu";
import type { Locale } from "@/lib/i18n";
import DishVideoButton from "./reels/DishVideoButton";

export default function DishRow({
  dish,
  lang = "es",
}: {
  dish: Dish;
  lang?: Locale;
}) {
  const name = lang === "en" ? dish.nameEn ?? dish.name : dish.name;
  const desc = lang === "en" ? dish.descEn ?? dish.desc : dish.desc;
  const dietLabel = dish.diet
    ? dish.diet === "vegan"
      ? lang === "en"
        ? "Vegan"
        : "Vegano"
      : lang === "en"
        ? "Veg"
        : "Veg"
    : null;
  return (
    <li>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl font-medium text-ink">
          {name}
          <span className="ml-2 inline-flex align-middle">
            <DishVideoButton slug={dish.slug} name={name} lang={lang} />
          </span>
        </h3>
        <div className="flex shrink-0 items-center gap-2.5">
          {dietLabel ? (
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6rem] font-sans font-semibold uppercase tracking-[0.12em] ${
                dish.diet === "vegan"
                  ? "bg-emerald-600 text-cream"
                  : "border border-emerald-600/40 text-emerald-700"
              }`}
            >
              {dietLabel}
            </span>
          ) : null}
          <span className="font-serif text-lg text-ink-soft">{dish.price}</span>
        </div>
      </div>
      {desc ? (
        <p className="mt-1 font-serif text-base italic leading-snug text-ink-soft">
          {desc}
        </p>
      ) : null}
    </li>
  );
}
