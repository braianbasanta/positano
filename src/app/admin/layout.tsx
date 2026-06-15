import "../globals.css";
import type { ReactNode } from "react";
import { Bodoni_Moda, Cormorant_Garamond } from "next/font/google";

export const metadata = { robots: { index: false, follow: false } };

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

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${bodoni.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
