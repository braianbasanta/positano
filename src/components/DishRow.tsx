import type { Dish } from "@/data/menu";
import DishVideoButton from "./reels/DishVideoButton";

export default function DishRow({ dish }: { dish: Dish }) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-ink">
          {dish.name}
          <DishVideoButton slug={dish.slug} name={dish.name} />
        </h3>
        <span className="shrink-0 font-serif text-lg text-ink-soft">
          {dish.price}
        </span>
      </div>
      {dish.desc ? (
        <p className="mt-1 font-serif text-base italic leading-snug text-ink-soft">
          {dish.desc}
        </p>
      ) : null}
    </li>
  );
}
