export default function LemonBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* tallo */}
      <path d="M150 8C132 60 120 110 112 158c-7 42-16 82-42 114" />
      {/* hojas */}
      <path d="M120 70c20-14 52-10 68 8-22 18-56 14-68-8Z" />
      <path d="M112 150c-20-12-30-42-20-64 24 14 32 46 20 64Z" />
      <path d="M100 226c20-14 52-10 68 8-22 18-56 14-68-8Z" />
      {/* nervaduras */}
      <path d="M126 74c20 2 40 8 58 6" />
      <path d="M100 140c-4-22-4-40-1-52" />
      <path d="M108 222c20 0 40 4 56 10" />
      {/* limones */}
      <ellipse cx="92" cy="178" rx="23" ry="17" transform="rotate(-34 92 178)" />
      <path d="M110 159q5-7 13-8" />
      <ellipse cx="66" cy="248" rx="20" ry="15" transform="rotate(-34 66 248)" />
      <path d="M82 230q5-6 11-7" />
      {/* naranjas — racimo en ramita lateral */}
      <path d="M117 122c16 2 31 3 44 9" />
      <circle cx="150" cy="151" r="16" />
      <path d="M147 135q3-4 8-4" />
      <circle cx="176" cy="143" r="12" />
      <path d="M172 131q3-3 7-3" />
    </svg>
  );
}
