import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import Stars from "./Stars";
import ReviewsMarquee from "./ReviewsMarquee";
import { reviewStats, reviewsUrl } from "@/data/reviews";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "Reseñas",
    heading: "Lo que dicen nuestros clientes",
    count: "reseñas en Google",
    cta: "Ver todas las reseñas en Google",
  },
  en: {
    eyebrow: "Reviews",
    heading: "What our guests are saying",
    count: "reviews on Google",
    cta: "Read all reviews on Google",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function Resenas({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <LemonBranch className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-auto -rotate-[18deg] text-lemon/20" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] md:text-5xl">
            {t.heading}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Stars className="h-5 w-5" />
            <span className="font-display text-2xl text-cream">
              {reviewStats.rating}
            </span>
            <span className="font-serif text-lg text-cream/70">
              · {reviewStats.count} {t.count}
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal className="relative mt-14">
        <ReviewsMarquee />
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
