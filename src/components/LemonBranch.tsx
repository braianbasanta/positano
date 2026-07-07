type LemonBranchProps = {
  className?: string;
  /** "top" decora esquinas superiores, "bottom" las inferiores */
  variant?: "top" | "bottom";
};

function Leaf({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d="M0 0C12 -13 35 -14 47 -2C34 11 11 10 0 0Z" />
      <path d="M3 0C17 -3 32 -4 44 -2" strokeWidth={0.9} />
      <path d="M13 -3C17 -7 21 -9 25 -10M15 0C19 3 24 5 29 6M27 -4C31 -6 34 -8 37 -9" strokeWidth={0.7} />
    </g>
  );
}

function Blossom({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-7.5" rx="3" ry="5.8" transform={`rotate(${a})`} />
      ))}
      <circle r={2.2} strokeWidth={0.9} />
    </g>
  );
}

function Bud({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d="M0 0C-3.5 -5 -3.5 -11 0 -15C3.5 -11 3.5 -5 0 0Z" />
      <path d="M0 -2C-1.6 -5 -1.6 -9 0 -12" strokeWidth={0.7} />
    </g>
  );
}

function Fruit({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path
        d="M-25 0C-25 -14 -13 -20 -1 -20C12 -20 23 -13 25 -4C29 -3 30 -2 30 0C30 2 29 3 25 4C23 13 12 20 -1 20C-13 20 -25 14 -25 0Z"
        strokeWidth={1.5}
      />
      <path d="M-14 -9C-6 -14 4 -14 12 -9" strokeWidth={1.3} strokeDasharray="0.1 3.2" />
      <path d="M-15 7C-7 12 4 12 12 7" strokeWidth={1.3} strokeDasharray="0.1 3.2" />
    </g>
  );
}

export default function LemonBranch({ className, variant = "top" }: LemonBranchProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {variant === "top" ? (
        <>
          {/* rama y ramitas */}
          <path d="M22 16C56 36 74 78 84 116C94 152 114 194 148 238" strokeWidth={1.9} />
          <path d="M84 116C110 118 134 106 150 84" strokeWidth={1.4} />
          <path d="M46 40C64 40 80 32 92 22" strokeWidth={1.2} />
          <path d="M74 100C64 106 56 112 50 116" strokeWidth={1} />
          {/* pedicelos */}
          <path d="M107 170C110 180 112 188 112 196" strokeWidth={1.1} />
          <path d="M86 130C78 144 70 156 64 166" strokeWidth={1.1} />
          <path d="M136 222C144 228 150 232 156 235" strokeWidth={1} />
          <Leaf transform="translate(92 22) rotate(-18) scale(0.8)" />
          <Leaf transform="translate(60 52) rotate(-62) scale(0.7)" />
          <Leaf transform="translate(34 32) rotate(200) scale(0.65)" />
          <Leaf transform="translate(150 84) rotate(-32) scale(0.95)" />
          <Leaf transform="translate(126 106) rotate(28) scale(0.8)" />
          <Leaf transform="translate(72 96) rotate(162) scale(0.9)" />
          <Leaf transform="translate(96 152) rotate(138) scale(1)" />
          <Leaf transform="translate(150 240) rotate(30) scale(0.75)" />
          <Blossom transform="translate(46 122)" />
          <Bud transform="translate(61 139) rotate(35) scale(0.8)" />
          <Bud transform="translate(30 107) rotate(-25) scale(0.65)" />
          <Fruit transform="translate(114 218) rotate(78) scale(1.05)" />
          <Fruit transform="translate(58 188) rotate(100) scale(0.9)" />
          <Fruit transform="translate(168 250) rotate(52) scale(0.78)" />
        </>
      ) : (
        <>
          {/* rama y ramitas */}
          <path d="M180 16C146 36 128 78 118 116C108 152 88 194 54 238" strokeWidth={1.9} />
          <path d="M118 116C92 118 68 106 52 84" strokeWidth={1.4} />
          <path d="M156 40C138 40 122 32 110 22" strokeWidth={1.2} />
          <path d="M134 78C118 70 102 62 90 58" strokeWidth={1} />
          <path d="M114 122C126 128 138 130 146 131" strokeWidth={1} />
          {/* pedicelos */}
          <path d="M66 100C60 112 56 122 54 132" strokeWidth={1.1} />
          <path d="M82 108C80 120 79 130 79 140" strokeWidth={1} />
          <path d="M95 164C92 176 90 186 90 194" strokeWidth={1.1} />
          <path d="M106 152C118 170 128 188 132 204" strokeWidth={1.1} />
          <Leaf transform="translate(110 22) rotate(198) scale(0.8)" />
          <Leaf transform="translate(142 52) rotate(242) scale(0.7)" />
          <Leaf transform="translate(168 32) rotate(-20) scale(0.65)" />
          <Leaf transform="translate(52 84) rotate(212) scale(0.95)" />
          <Leaf transform="translate(74 106) rotate(152) scale(0.8)" />
          <Leaf transform="translate(130 96) rotate(18) scale(0.9)" />
          <Leaf transform="translate(106 152) rotate(42) scale(1)" />
          <Leaf transform="translate(54 238) rotate(168) scale(0.85)" />
          <Blossom transform="translate(152 132)" />
          <Blossom transform="translate(86 56) scale(0.75)" />
          <Bud transform="translate(140 144) rotate(20) scale(0.8)" />
          <Bud transform="translate(163 118) rotate(-15) scale(0.7)" />
          <Fruit transform="translate(50 152) rotate(105) scale(0.7)" />
          <Fruit transform="translate(80 160) rotate(85) scale(0.62)" />
          <Fruit transform="translate(88 218) rotate(95) scale(1.05)" />
          <Fruit transform="translate(134 226) rotate(75) scale(0.85)" />
        </>
      )}
    </svg>
  );
}
