"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "La Carta", href: "/carta" },
  { label: "Pedir online", href: "/pizza-domicilio" },
  { label: "Visítanos", href: "/#visitanos" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
];

const RESERVAS = "/reservas";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-cream/95 shadow-[0_1px_0_rgba(29,39,80,0.14)] backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-12 ${
            scrolled ? "py-3.5" : "py-6 md:py-7"
          }`}
        >
          <a href="/" onClick={() => setOpen(false)} className="leading-none">
            <span
              className={`block font-display text-lg tracking-[0.32em] transition-colors md:text-xl ${
                solid ? "text-ink" : "text-cream"
              }`}
            >
              POSITANO
            </span>
            <span
              className={`mt-1 block text-[0.56rem] tracking-[0.4em] transition-colors ${
                solid ? "text-ink-soft" : "text-cream/60"
              }`}
            >
              BARCELONA
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-[0.9rem] uppercase tracking-[0.16em] transition-colors ${
                  solid
                    ? "text-ink-soft hover:text-ink"
                    : "text-cream/75 hover:text-cream"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    solid ? "bg-ink" : "bg-cream"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={RESERVAS}
              className={`hidden rounded-full px-5 py-2 text-[0.74rem] uppercase tracking-[0.2em] transition-all duration-300 sm:block ${
                solid
                  ? "bg-lemon text-ink hover:bg-ink hover:text-cream"
                  : "border border-cream/50 text-cream hover:bg-cream hover:text-ink"
              }`}
            >
              Reservar
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 transition-all duration-300 ${
                    solid ? "bg-ink" : "bg-cream"
                  } ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 transition-opacity duration-300 ${
                    solid ? "bg-ink" : "bg-cream"
                  } ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 transition-all duration-300 ${
                    solid ? "bg-ink" : "bg-cream"
                  } ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil — capa propia bajo la barra del header */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-cream transition-opacity duration-150 ease-out lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl tracking-wide text-ink"
          >
            {link.label}
          </a>
        ))}
        <a
          href={RESERVAS}
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full bg-ink px-8 py-3.5 text-[0.78rem] uppercase tracking-[0.22em] text-cream"
        >
          Reservar mesa
        </a>
      </div>
    </>
  );
}
