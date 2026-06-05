import ReviewCard from "./ReviewCard";
import { reviews, forkReviews, type Review } from "@/data/reviews";

// Rota el array empezando en `offset` (con módulo seguro). Permite que cada
// landing muestre una ventana distinta de reseñas y no se repita el mismo
// bloque idéntico en todas las páginas.
function rotate<T>(arr: T[], offset: number): T[] {
  const n = arr.length;
  if (n === 0) return arr;
  const k = ((offset % n) + n) % n;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

function MarqueeRow({
  items,
  source,
  reverse = false,
}: {
  items: Review[];
  source: "google" | "fork";
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden py-2">
      {/* Difuminado en los bordes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />

      <div
        className={`marquee-track flex w-max gap-6${
          reverse ? " marquee-track--reverse" : ""
        }`}
      >
        {loop.map((review, i) => (
          <div key={i} aria-hidden={i >= items.length}>
            <ReviewCard review={review} source={source} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReviewsMarquee({
  offset = 0,
  limit,
}: {
  offset?: number;
  limit?: number;
}) {
  const google = rotate(reviews, offset).slice(0, limit ?? reviews.length);
  const fork = rotate(forkReviews, offset).slice(0, limit ?? forkReviews.length);
  return (
    <div className="flex flex-col gap-6">
      <MarqueeRow items={google} source="google" />
      <MarqueeRow items={fork} source="fork" reverse />
    </div>
  );
}
