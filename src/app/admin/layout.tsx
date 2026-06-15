import "../globals.css";
import type { ReactNode } from "react";

export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased">{children}</body>
    </html>
  );
}
