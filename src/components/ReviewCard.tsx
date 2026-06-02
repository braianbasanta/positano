import type { Review } from "@/data/reviews";

type Source = "google" | "fork";

const STAR_PATH =
  "M12 2.6l2.7 5.95 6.55.55-4.97 4.3 1.5 6.4L12 17.1 5.72 19.8l1.5-6.4L2.25 9.1l6.55-.55z";

function CardStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FBA919" : "#E2E0DA"}
          aria-hidden
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

/* Puntuación de TheFork sobre 10 (formato español con coma) */
function ForkScore({ rating }: { rating: number }) {
  const value = rating.toLocaleString("es-ES", { maximumFractionDigits: 1 });
  return (
    <span
      className="inline-flex items-baseline gap-1 self-start rounded-md bg-[#00684A] px-2 py-0.5 text-white"
      role="img"
      aria-label={`${value} sobre 10`}
    >
      <span className="font-sans text-sm font-bold leading-none">{value}</span>
      <span className="font-sans text-[0.7rem] font-semibold leading-none text-white/80">
        /10
      </span>
    </span>
  );
}

/* Wordmark de Google con sus colores de marca */
function GoogleMark() {
  const letters: [string, string][] = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span
      className="select-none font-sans text-[0.95rem] font-semibold tracking-tight"
      aria-label="Google"
    >
      {letters.map(([ch, color], i) => (
        <span key={i} style={{ color }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/* Wordmark de TheFork (tenedor + texto en verde de marca) */
function ForkMark() {
  return (
    <span className="inline-flex items-center gap-1.5 select-none" aria-label="TheFork">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#00684A" aria-hidden>
        <path d="M6.6 2.5a.85.85 0 0 1 1.7 0v5.1a1.7 1.7 0 0 0 3.4 0V2.5a.85.85 0 0 1 1.7 0v5.1a3.4 3.4 0 0 1-2.55 3.29V21a.85.85 0 0 1-1.7 0v-10.1A3.4 3.4 0 0 1 6.6 7.6zM16.6 2.5c1.6 0 2.6 1.9 2.6 4.6 0 2.3-.74 4.05-1.9 4.5V21a.85.85 0 0 1-1.7 0V2.9c0-.22.18-.4.4-.4z" />
      </svg>
      <span className="font-sans text-[0.92rem] font-bold tracking-tight text-[#00684A]">
        TheFork
      </span>
    </span>
  );
}

const AVATAR_COLORS = [
  "#1f5f8b",
  "#b4541e",
  "#3f7d4e",
  "#7a3b8f",
  "#a8432d",
  "#2a6f6b",
  "#9a6a17",
  "#4a4f8c",
];

function Avatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {initial}
    </span>
  );
}

export default function ReviewCard({
  review,
  source,
}: {
  review: Review;
  source: Source;
}) {
  return (
    <article className="flex h-[268px] w-[330px] shrink-0 flex-col rounded-2xl bg-white p-6 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)] ring-1 ring-black/5 sm:w-[360px]">
      {source === "fork" ? (
        <ForkScore rating={review.rating} />
      ) : (
        <CardStars rating={review.rating} />
      )}
      <p className="mt-3.5 line-clamp-4 font-sans text-[0.95rem] leading-relaxed text-neutral-700">
        {review.text.replace(/\n+/g, " ")}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-neutral-200/80 pt-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={review.name} />
          <span className="truncate font-sans text-[0.92rem] font-medium text-neutral-800">
            {review.name}
          </span>
        </div>
        {source === "google" ? <GoogleMark /> : <ForkMark />}
      </div>
    </article>
  );
}
