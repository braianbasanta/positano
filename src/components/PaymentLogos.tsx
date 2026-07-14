import Image from "next/image";
import type { Locale } from "@/lib/i18n";

// Logos de medios de pago aceptados (tarjetas restaurante). Se sirven desde
// public/pagos/ como SVG oficiales. Para añadir uno nuevo (p. ej. Ticket
// Restaurant), basta con sumar una entrada con sus dimensiones de viewBox.
const LOGOS: { src: string; alt: string; width: number; height: number }[] = [
  { src: "/pagos/edenred.svg", alt: "Edenred", width: 100, height: 61 },
];

const COPY = {
  es: { aria: "Métodos de pago aceptados" },
  ca: { aria: "Mètodes de pagament acceptats" },
  en: { aria: "Accepted payment methods" },
  it: { aria: "Metodi di pagamento accettati" },
  fr: { aria: "Modes de paiement acceptés" },
  de: { aria: "Akzeptierte Zahlungsmethoden" },
  nl: { aria: "Geaccepteerde betaalmethoden" },
} satisfies Record<Locale, Record<string, string>>;

export default function PaymentLogos({
  lang = "es",
  className = "",
}: {
  lang?: Locale;
  className?: string;
}) {
  const t = COPY[lang];
  return (
    <ul
      aria-label={t.aria}
      className={`flex flex-wrap items-center justify-center gap-4 ${className}`}
    >
      {LOGOS.map((logo) => (
        <li
          key={logo.src}
          className="flex items-center justify-center rounded-lg bg-white px-5 py-3 shadow-[0_4px_14px_rgba(29,39,80,0.10)]"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-9 w-auto"
          />
        </li>
      ))}
    </ul>
  );
}
