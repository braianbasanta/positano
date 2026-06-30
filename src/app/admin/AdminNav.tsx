"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/facturacion", label: "Facturación" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/clics", label: "Clics" },
  { href: "/admin/plan", label: "Plan" },
  { href: "/admin/reviews", label: "Reseñas" },
];

// Barra de navegación común a todas las páginas de /admin. Resalta la activa.
export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="mb-6 flex flex-wrap gap-1 border-b border-ink/10 pb-3">
      {NAV.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-3 py-1.5 font-sans text-sm font-medium transition ${
              active ? "bg-ink text-cream" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
