import ReviewCard from "./ReviewCard";
import { reviews, forkReviews, type Review } from "@/data/reviews";

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

export default function ReviewsMarquee() {
  return (
    <div className="flex flex-col gap-6">
      <MarqueeRow items={reviews} source="google" />
      <MarqueeRow items={forkReviews} source="fork" reverse />
    </div>
  );
}
