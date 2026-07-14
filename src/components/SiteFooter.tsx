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
        { label: "La casa", href: "/#la-casa" },
        { label: "La Carta", href: "/menu" },
        { label: "Bebidas", href: "/bebidas" },
        { label: "Nuestra historia", href: "/nuestra-historia" },
        { label: "Pizza napolitana en Barcelona", href: "/pizza-napolitana-barcelona" },
        { label: "La mejor pizzería de Barcelona", href: "/mejor-pizzeria-barcelona" },
        { label: "Menú del día", href: "/menu-del-dia" },
        { label: "Grupos y empresas", href: "/grupos-barcelona" },
        { label: "Pizzería en el Eixample", href: "/pizzeria-eixample" },
        { label: "Restaurante italiano en Barcelona", href: "/restaurante-italiano-barcelona" },
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
  ca: [
    {
      title: "Navegació",
      links: [
        { label: "La casa", href: "/ca#la-casa" },
        { label: "La Carta", href: "/ca/carta" },
        { label: "Begudes", href: "/ca/begudes" },
        { label: "Pizza napolitana a Barcelona", href: "/ca/pizza-napolitana-barcelona" },
        { label: "La millor pizzeria de Barcelona", href: "/ca/millor-pizzeria-barcelona" },
        { label: "Menú del dia", href: "/ca/menu-del-dia" },
        { label: "Pizzeria a l'Eixample", href: "/ca/pizzeria-eixample" },
        { label: "Restaurant italià a Barcelona", href: "/ca/restaurant-italia-barcelona" },
        { label: "Pizza a domicili", href: "/ca/pizza-a-domicili" },
        { label: "Visita'ns", href: "/ca#visitanos" },
        { label: "Treballa amb nosaltres", href: "/ca/treballa-amb-nosaltres" },
      ],
    },
    {
      title: "Contacte",
      links: [
        { label: "Carrer del Rosselló, 24", href: "/ca#visitanos" },
        { label: "08029 · Barcelona", href: "/ca#visitanos" },
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
        { label: "Drinks", href: "/en/drinks" },
        { label: "Neapolitan pizza", href: "/en/neapolitan-pizza-barcelona" },
        { label: "Best pizza in Barcelona", href: "/en/best-pizza-barcelona" },
        { label: "Italian restaurant in Barcelona", href: "/en/italian-restaurant-barcelona" },
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
  it: [
    {
      title: "Navigazione",
      links: [
        { label: "La nostra storia", href: "/it#la-casa" },
        { label: "Menu", href: "/it/menu" },
        { label: "Bevande", href: "/it/bevande" },
        { label: "Pizza napoletana", href: "/it/pizza-napoletana-barcellona" },
        { label: "La migliore pizza di Barcellona", href: "/it/migliore-pizza-barcellona" },
        { label: "Ristorante italiano a Barcellona", href: "/it/ristorante-italiano-barcellona" },
        { label: "Menu del giorno", href: "/it/menu-pranzo-barcellona" },
        { label: "Ristorante italiano nell'Eixample", href: "/it/ristorante-italiano-eixample" },
        { label: "Consegna pizza a domicilio", href: "/it/pizza-a-domicilio-barcellona" },
        { label: "Vieni a trovarci", href: "/it#visitanos" },
        { label: "Opportunità di lavoro", href: "/it/lavora-con-noi" },
      ],
    },
    {
      title: "Contatti",
      links: [
        { label: "Carrer del Rosselló, 24", href: "/it#visitanos" },
        { label: "08029 · Barcellona", href: "/it#visitanos" },
        { label: "+34 933 515 913", href: "tel:+34933515913" },
        {
          label: "positanopizzeria2023@gmail.com",
          href: "mailto:positanopizzeria2023@gmail.com",
        },
      ],
    },
  ],
  fr: [
    {
      title: "Navigation",
      links: [
        { label: "Notre histoire", href: "/fr#la-casa" },
        { label: "Menu", href: "/fr/carte" },
        { label: "Boissons", href: "/fr/boissons" },
        { label: "Pizza napolitaine", href: "/fr/pizza-napolitaine-barcelone" },
        { label: "La meilleure pizza de Barcelone", href: "/fr/meilleure-pizza-barcelone" },
        { label: "Restaurant italien à Barcelone", href: "/fr/restaurant-italien-barcelone" },
        { label: "Menu du jour", href: "/fr/menu-dejeuner-barcelone" },
        { label: "Restaurant italien dans l'Eixample", href: "/fr/restaurant-italien-eixample" },
        { label: "Livraison de pizzas", href: "/fr/livraison-pizza-barcelone" },
        { label: "Venez nous rendre visite", href: "/fr#visitanos" },
        { label: "Carrières", href: "/fr/recrutement" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "24, rue du Rosselló", href: "/fr#visitanos" },
        { label: "08029 · Barcelone", href: "/fr#visitanos" },
        { label: "+34 933 515 913", href: "tel:+34933515913" },
        {
          label: "positanopizzeria2023@gmail.com",
          href: "mailto:positanopizzeria2023@gmail.com",
        },
      ],
    },
  ],
  de: [
    {
      title: "Navigation",
      links: [
        { label: "Unsere Geschichte", href: "/de#la-casa" },
        { label: "Menü", href: "/de/speisekarte" },
        { label: "Getränke", href: "/de/getraenke" },
        { label: "Neapolitanische Pizza", href: "/de/neapolitanische-pizza-barcelona" },
        { label: "Die beste Pizza in Barcelona", href: "/de/beste-pizza-barcelona" },
        { label: "Italienisches Restaurant in Barcelona", href: "/de/italienisches-restaurant-barcelona" },
        { label: "Tagesmenü", href: "/de/mittagsmenue-barcelona" },
        { label: "Italienisches Restaurant im Eixample", href: "/de/italienisches-restaurant-eixample" },
        { label: "Pizzalieferung", href: "/de/pizza-lieferservice-barcelona" },
        { label: "Besuchen Sie uns", href: "/de#visitanos" },
        { label: "Karriere", href: "/de/karriere" },
      ],
    },
    {
      title: "Kontakt",
      links: [
        { label: "Carrer del Rosselló 24", href: "/de#visitanos" },
        { label: "08029 · Barcelona", href: "/de#visitanos" },
        { label: "+34 933 515 913", href: "tel:+34933515913" },
        {
          label: "positanopizzeria2023@gmail.com",
          href: "mailto:positanopizzeria2023@gmail.com",
        },
      ],
    },
  ],
  nl: [
    {
      title: "Navigatie",
      links: [
        { label: "Ons verhaal", href: "/nl#la-casa" },
        { label: "Menu", href: "/nl/menukaart" },
        { label: "Drankjes", href: "/nl/dranken" },
        { label: "Napolitaanse pizza", href: "/nl/napolitaanse-pizza-barcelona" },
        { label: "De lekkerste pizza van Barcelona", href: "/nl/beste-pizza-barcelona" },
        { label: "Italiaans restaurant in Barcelona", href: "/nl/italiaans-restaurant-barcelona" },
        { label: "Dagmenu", href: "/nl/lunchmenu-barcelona" },
        { label: "Italiaans restaurant in de wijk Eixample", href: "/nl/italiaans-restaurant-eixample" },
        { label: "Pizzabezorging", href: "/nl/pizza-bezorgen-barcelona" },
        { label: "Kom eens langs", href: "/nl#visitanos" },
        { label: "Carrière", href: "/nl/vacatures" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Carrer del Rosselló, 24", href: "/nl#visitanos" },
        { label: "08029 · Barcelona", href: "/nl#visitanos" },
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
  ca: "El sabor de Nàpols, al cor de Barcelona.",
  en: "A taste of Naples, in the heart of Barcelona.",
  it: "Il sapore di Napoli, nel cuore di Barcellona.",
  fr: "Le goût de Naples, au cœur de Barcelone.",
  de: "Der Geschmack Neapels, im Herzen Barcelonas.",
  nl: "De smaak van Napels, in het hart van Barcelona.",
};

const LEGAL: Record<Locale, { label: string; href: string }[]> = {
  es: [
    { label: "Aviso legal", href: "/aviso-legal" },
    { label: "Privacidad", href: "/politica-de-privacidad" },
    { label: "Cookies", href: "/politica-de-cookies-ue" },
  ],
  // Las legales no existen en CA: para audiencia local, las ES antes que las EN.
  ca: [
    { label: "Avís legal", href: "/aviso-legal" },
    { label: "Privacitat", href: "/politica-de-privacidad" },
    { label: "Cookies", href: "/politica-de-cookies-ue" },
  ],
  en: [
    { label: "Legal notice", href: "/en/legal-notice" },
    { label: "Privacy", href: "/en/privacy-policy" },
    { label: "Cookies", href: "/en/cookie-policy" },
  ],
  it: [
    { label: "Note legali", href: "/en/legal-notice" },
    { label: "Privacy", href: "/en/privacy-policy" },
    { label: "Cookie", href: "/en/cookie-policy" },
  ],
  fr: [
    { label: "Mentions légales", href: "/en/legal-notice" },
    { label: "Confidentialité", href: "/en/privacy-policy" },
    { label: "Cookies", href: "/en/cookie-policy" },
  ],
  de: [
    { label: "Rechtliche Hinweise", href: "/en/legal-notice" },
    { label: "Datenschutz", href: "/en/privacy-policy" },
    { label: "Cookies", href: "/en/cookie-policy" },
  ],
  nl: [
    { label: "Juridische kennisgeving", href: "/en/legal-notice" },
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
