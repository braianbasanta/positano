import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";

// 404 global. Al haber dos root layouts (es/en) y ningún layout raíz único,
// Next exige `global-not-found` con su propio <html>/<body> e importando los
// estilos y fuentes a mano (ver experimental.globalNotFound en next.config).
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Página no encontrada · Positano",
  description: "La página que buscas no existe o se ha movido.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="es"
      className={`${bodoni.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-6 py-24 text-center text-cream">
          <span className="text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            Error 404
          </span>
          <h1 className="mt-5 font-display text-6xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-8xl">
            Página no encontrada
          </h1>
          <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-cream/80 md:text-xl">
            La página que buscas no existe o se ha movido. Vuelve al inicio y
            sigue descubriendo Positano.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
            >
              Volver al inicio
            </a>
            <a
              href="/menu"
              className="rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              Ver la carta
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
