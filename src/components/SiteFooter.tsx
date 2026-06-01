import Image from "next/image";
import Lemon from "./Lemon";
import SocialLinks from "./SocialLinks";
import type { Locale } from "@/lib/i18n";

type Column = { title: string; links: { label: string; href: string }[] };

const COLUMNS: Record<Locale, Column[]> = {
  es: [
    {
      title: "Navegación",
      links: [
        { label: "Nuestra historia", href: "/#la-casa" },
        { label: "La Carta", href: "/menu" },
        { label: "Pizzería napolitana", href: "/nuestra-historia" },
        { label: "Menú del día", href: "/menu-del-dia" },
        { label: "Pizzería en el Eixample", href: "/pizzeria-eixample" },
        { label: "Pizza a domicilio", href: "/pizza-domicilio" },
        { label: "Visítanos", href: "/#visitanos" },
        { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: "Carrer del Rosselló, 24", href: "/#visitanos" },
        { label: "08029 · Barcelona", href: "/#visitanos" },
        { label: "+34 933 515 913", href: "tel:+34933515913" },
        {
          label: "positanopizzeria2023@gmail.com",
          href: "mailto:positanopizzeria2023@gmail.com",
        },
      ],
    },
  ],
  en: [
    {
      title: "Navigation",
      links: [
        { label: "Our story", href: "/en#la-casa" },
        { label: "Menu", href: "/en/menu" },
        { label: "Neapolitan pizza", href: "/en/neapolitan-pizza-barcelona" },
        { label: "Menu of the Day", href: "/en/lunch-menu-barcelona" },
        { label: "Italian restaurant in the Eixample", href: "/en/italian-restaurant-eixample" },
        { label: "Pizza delivery", href: "/en/pizza-delivery-barcelona" },
        { label: "Visit us", href: "/en#visitanos" },
        { label: "Careers", href: "/en/careers" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Carrer del Rosselló, 24", href: "/en#visitanos" },
        { label: "08029 · Barcelona", href: "/en#visitanos" },
        { label: "+34 933 515 913", href: "tel:+34933515913" },
        {
          label: "positanopizzeria2023@gmail.com",
          href: "mailto:positanopizzeria2023@gmail.com",
        },
      ],
    },
  ],
};

const TAGLINE: Record<Locale, string> = {
  es: "El sabor de Nápoles, en el corazón de Barcelona.",
  en: "A taste of Naples, in the heart of Barcelona.",
};

const LEGAL: Record<Locale, { label: string; href: string }[]> = {
  es: [
    { label: "Aviso legal", href: "/aviso-legal" },
    { label: "Privacidad", href: "/politica-de-privacidad" },
    { label: "Cookies", href: "/politica-de-cookies-ue" },
  ],
  en: [
    { label: "Legal notice", href: "/en/legal-notice" },
    { label: "Privacy", href: "/en/privacy-policy" },
    { label: "Cookies", href: "/en/cookie-policy" },
  ],
};

export default function SiteFooter({ lang = "es" }: { lang?: Locale }) {
  const columns = COLUMNS[lang];
  return (
    <footer className="bg-ink px-6 py-16 text-cream md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1.3fr]">
          <div>
            <Image
              src="/positano-wordmark.png"
              alt="Positano · Pizzería Lounge Bar — Barcelona"
              width={1539}
              height={417}
              className="h-auto w-56"
            />
            <p className="mt-3 text-[0.82rem] tracking-[0.42em] text-cream/55">
              BARCELONA
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-10 bg-cream/25" />
              <Lemon className="h-5 w-5 text-lemon" />
              <span className="h-px w-10 bg-cream/25" />
            </div>
            <p className="mt-5 max-w-xs font-serif text-base italic leading-relaxed text-cream/65">
              {TAGLINE[lang]}
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.82rem] uppercase tracking-[0.28em] text-lemon">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-serif text-lg text-cream/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-sm text-cream/45">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL[lang].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-cream/80"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Positano · Pizzería Lounge Bar —
              Barcelona
            </p>
            <p className="italic">Fatto con amore.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
