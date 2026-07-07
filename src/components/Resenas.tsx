import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import Stars from "./Stars";
import ReviewsMarquee from "./ReviewsMarquee";
import { reviewStats, reviewsUrl, forkStats, forkUrl } from "@/data/reviews";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "Reseñas",
    heading: "Lo que dicen nuestros clientes",
    count: "reseñas en Google",
    forkCount: "opiniones en TheFork",
    cta: "Ver todas las reseñas en Google",
  },
  en: {
    eyebrow: "Reviews",
    heading: "What our guests are saying",
    count: "reviews on Google",
    forkCount: "reviews on TheFork",
    cta: "Read all reviews on Google",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function Resenas({
  lang = "es",
  offset = 0,
  limit,
}: {
  lang?: Locale;
  offset?: number;
  limit?: number;
}) {
  const t = COPY[lang];
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-auto -rotate-[18deg] text-lemon/20" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] md:text-5xl">
            {t.heading}
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-6">
            {/* Google (escala /5) */}
            <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-1">
              <span className="flex items-center gap-3">
                <Stars className="h-5 w-5" />
                <span className="font-display text-2xl text-cream">
                  {reviewStats.rating}
                  <span className="text-cream/50"> /5</span>
                </span>
              </span>
              <span className="font-serif text-base text-cream/70 sm:text-lg">
                <span className="hidden sm:inline">· </span>
                {reviewStats.count} {t.count}
              </span>
            </div>

            <span className="hidden h-8 w-px bg-cream/20 sm:block" />

            {/* TheFork (escala /10) */}
            <a
              href={forkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1.5 text-center transition-colors duration-300 sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-1"
            >
              <span className="font-display text-2xl text-cream">
                {forkStats.rating}
                <span className="text-cream/50">/10</span>
              </span>
              <span className="font-serif text-base text-cream/70 transition-colors duration-300 group-hover:text-lemon sm:text-lg">
                <span className="hidden sm:inline">· </span>
                {forkStats.count} {t.forkCount}
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="relative mt-14">
        <ReviewsMarquee offset={offset} limit={limit} />
      </Reveal>

      <div className="relative mx-auto mt-12 flex max-w-5xl justify-center px-6">
        <Reveal>
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-[0.88rem] uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:text-lemon"
          >
            {t.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
