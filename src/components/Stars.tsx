export default function Stars({
  count = 5,
  className = "h-4 w-4",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span
      className="inline-flex gap-1 text-lemon"
      role="img"
      aria-label={`${count} de 5 estrellas`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.6l2.7 5.95 6.55.55-4.97 4.3 1.5 6.4L12 17.1 5.72 19.8l1.5-6.4L2.25 9.1l6.55-.55z" />
        </svg>
      ))}
    </span>
  );
}
