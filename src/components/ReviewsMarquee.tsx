import Stars from "./Stars";
import { reviews } from "@/data/reviews";

export default function ReviewsMarquee() {
  const loop = [...reviews, ...reviews];

  return (
    <div className="marquee relative overflow-hidden py-2">
      {/* Difuminado en los bordes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />

      <div className="marquee-track flex w-max">
        {loop.map((review, i) => (
          <article
            key={i}
            aria-hidden={i >= reviews.length}
            className="mr-6 flex h-[280px] w-[320px] shrink-0 flex-col border border-ink/15 bg-cream p-7 sm:w-[380px]"
          >
            <Stars className="h-4 w-4" />
            <p className="mt-4 line-clamp-5 font-serif text-base leading-relaxed text-ink">
              {review.text.replace(/\n+/g, " ")}
            </p>
            <div className="mt-auto pt-5">
              <p className="font-display text-base uppercase tracking-[0.16em] text-ink">
                {review.name}
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-ink-soft">
                Reseña de Google
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
