"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale, alternatePath } from "@/lib/i18n";

const SWITCH_LABEL: Record<Locale, string> = {
  es: "Cambiar de idioma",
  en: "Change language",
  it: "Cambia lingua",
  fr: "Changer de langue",
  de: "Sprache ändern",
  nl: "Taal wijzigen",
};

const RESERVAR_MESA: Record<Locale, string> = {
  es: "Reservar mesa",
  en: "Book a table",
  it: "Prenota un tavolo",
  fr: "Réserver une table",
  de: "Tisch reservieren",
  nl: "Reserveer een tafel",
};

const NAV: Record<Locale, { label: string; href: string }[]> = {
  es: [
    { label: "La Carta", href: "/menu" },
    { label: "Menú del día", href: "/menu-del-dia" },
    { label: "Pedir online", href: "/pizza-domicilio" },
    { label: "Visítanos", href: "/#visitanos" },
    { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
  ],
  en: [
    { label: "Menu", href: "/en/menu" },
    { label: "Menu of the Day", href: "/en/lunch-menu-barcelona" },
    { label: "Order Online", href: "/en/pizza-delivery-barcelona" },
    { label: "Visit Us", href: "/en#visitanos" },
    { label: "Careers", href: "/en/careers" },
  ],
  it: [
    { label: "Menu", href: "/it/menu" },
    { label: "Menu del giorno", href: "/it/menu-pranzo-barcellona" },
    { label: "Ordina online", href: "/it/pizza-a-domicilio-barcellona" },
    { label: "Vieni a trovarci", href: "/it#visitanos" },
    { label: "Opportunità di lavoro", href: "/it/lavora-con-noi" },
  ],
  fr: [
    { label: "Menu", href: "/fr/carte" },
    { label: "Menu du jour", href: "/fr/menu-dejeuner-barcelone" },
    { label: "Commander en ligne", href: "/fr/livraison-pizza-barcelone" },
    { label: "Venez nous rendre visite", href: "/fr#visitanos" },
    { label: "Carrières", href: "/fr/recrutement" },
  ],
  de: [
    { label: "Menü", href: "/de/speisekarte" },
    { label: "Tagesmenü", href: "/de/mittagsmenue-barcelona" },
    { label: "Online bestellen", href: "/de/pizza-lieferservice-barcelona" },
    { label: "Besuchen Sie uns", href: "/de#visitanos" },
    { label: "Karriere", href: "/de/karriere" },
  ],
  nl: [
    { label: "Menu", href: "/nl/menukaart" },
    { label: "Dagmenu", href: "/nl/lunchmenu-barcelona" },
    { label: "Online bestellen", href: "/nl/pizza-bezorgen-barcelona" },
    { label: "Kom eens langs", href: "/nl#visitanos" },
    { label: "Carrière", href: "/nl/vacatures" },
  ],
};

const COPY: Record<Locale, { home: string; reservas: string; reservar: string; abrir: string; cerrar: string }> = {
  es: { home: "/", reservas: "/reservas", reservar: "Reservar", abrir: "Abrir menú", cerrar: "Cerrar menú" },
  en: { home: "/en", reservas: "/en/book-a-table", reservar: "Book", abrir: "Open menu", cerrar: "Close menu" },
  it: { home: "/it", reservas: "/it/prenota-un-tavolo", reservar: "Prenota", abrir: "Apri il menu", cerrar: "Chiudi il menu" },
  fr: { home: "/fr", reservas: "/fr/reserver-une-table", reservar: "Réserver", abrir: "Ouvrir le menu", cerrar: "Fermer le menu" },
  de: { home: "/de", reservas: "/de/tisch-reservieren", reservar: "Reservieren", abrir: "Menü öffnen", cerrar: "Menü schließen" },
  nl: { home: "/nl", reservas: "/nl/tafel-reserveren", reservar: "Reserveer", abrir: "Menu openen", cerrar: "Menu sluiten" },
};

export default function SiteHeader({ lang = "es" }: { lang?: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const solid = scrolled || open;
  const pathname = usePathname();

  const links = NAV[lang];
  const copy = COPY[lang];
  const otherLocales = LOCALES.filter((l) => l !== lang);
  const hrefFor = (l: Locale) => alternatePath(pathname ?? copy.home, l);

  // El CTA "Reservar" sale dorado SIEMPRE, salvo encima del hero de la home
  // (ahí el fondo ya es dorado y un botón dorado sería "doble dorado"): en ese
  // único caso lo dejamos con borde claro.
  const isHome = (pathname ?? copy.home) === copy.home;
  const heroTransparent = isHome && !solid;

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
            ? "bg-cream shadow-[0_1px_0_rgba(29,39,80,0.14)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-12 ${
            scrolled ? "py-3" : "py-4 md:py-5"
          }`}
        >
          <a href={copy.home} onClick={() => setOpen(false)} className="leading-none">
            <span
              className={`block font-display text-base tracking-[0.32em] transition-colors md:text-lg ${
                solid ? "text-ink" : "text-cream"
              }`}
            >
              POSITANO
            </span>
            <span
              className={`mt-0.5 block text-[0.66rem] tracking-[0.4em] transition-colors ${
                solid ? "text-ink-soft" : "text-cream/60"
              }`}
            >
              BARCELONA
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-[0.8rem] uppercase tracking-[0.16em] transition-colors ${
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
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setLangOpen((value) => !value)}
                aria-label={SWITCH_LABEL[lang]}
                aria-expanded={langOpen}
                className={`flex items-center gap-1 text-[0.82rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                  solid ? "text-ink-soft hover:text-ink" : "text-cream/70 hover:text-cream"
                }`}
              >
                {lang.toUpperCase()}
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {langOpen ? (
                <div className="absolute right-0 top-full mt-3 flex flex-col rounded-xl bg-cream py-2 shadow-[0_18px_40px_-12px_rgba(29,39,80,0.4)] ring-1 ring-ink/10">
                  {otherLocales.map((l) => (
                    <a
                      key={l}
                      href={hrefFor(l)}
                      className="px-5 py-1.5 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
                    >
                      {l.toUpperCase()}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <a
              href={copy.reservas}
              className={`hidden rounded-full px-4 py-1.5 text-[0.76rem] uppercase tracking-[0.2em] transition-all duration-300 sm:block ${
                heroTransparent
                  ? "border border-cream/50 text-cream hover:bg-cream hover:text-ink"
                  : "bg-lemon text-ink hover:bg-ink hover:text-cream"
              }`}
            >
              {copy.reservar}
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? copy.cerrar : copy.abrir}
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
          href={copy.reservas}
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full bg-ink px-8 py-3.5 text-[0.88rem] uppercase tracking-[0.22em] text-cream"
        >
          {RESERVAR_MESA[lang]}
        </a>
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-5">
          {otherLocales.map((l) => (
            <a
              key={l}
              href={hrefFor(l)}
              onClick={() => setOpen(false)}
              className="text-[0.84rem] uppercase tracking-[0.24em] text-ink-soft transition-colors hover:text-ink"
            >
              {l.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
