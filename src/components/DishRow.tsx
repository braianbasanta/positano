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
  return (
    <li>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-ink">
          {name}
          <DishVideoButton slug={dish.slug} name={name} lang={lang} />
        </h3>
        <span className="shrink-0 font-serif text-lg text-ink-soft">
          {dish.price}
        </span>
      </div>
      {desc ? (
        <p className="mt-1 font-serif text-base italic leading-snug text-ink-soft">
          {desc}
        </p>
      ) : null}
    </li>
  );
}
