import Image from "next/image";
import Lemon from "./Lemon";
import HeroBackground from "./HeroBackground";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    srHeading: "Positano · Pizzería Napolitana e Italiano en el Eixample, Barcelona",
    tagline:
      "La napolitana del Eixample a la que siempre vuelven.",
    reservar: "Reservar mesa",
    reservasHref: "/reservas",
    pedir: "Pedir online",
    pedirHref: "/pizza-domicilio",
    carta: "Ver carta",
    cartaHref: "/menu",
    descubre: "Descubre",
    scrollAria: "Bajar a la siguiente sección",
    bgAlt: "Positano, pizzería napolitana en el Eixample de Barcelona — ilustración del pueblo de la Costa Amalfitana",
  },
  ca: {
    srHeading: "Positano · Pizzeria napolitana i restaurant italià a l'Eixample, Barcelona",
    tagline:
      "La napolitana de l'Eixample on tothom torna sempre.",
    reservar: "Reservar taula",
    reservasHref: "/ca/reservar-taula",
    pedir: "Demanar online",
    pedirHref: "/ca/pizza-a-domicili",
    carta: "Veure la carta",
    cartaHref: "/ca/carta",
    descubre: "Descobreix",
    scrollAria: "Baixa a la secció següent",
    bgAlt: "Positano, pizzeria napolitana a l'Eixample de Barcelona — il·lustració del poble de la Costa Amalfitana",
  },
  en: {
    srHeading: "Positano · Neapolitan Pizzeria & Italian Restaurant in Barcelona",
    tagline:
      "The Eixample's Neapolitan everyone comes back to.",
    reservar: "Book a table",
    reservasHref: "/en/book-a-table",
    pedir: "Order online",
    pedirHref: "/en/pizza-delivery-barcelona",
    carta: "View menu",
    cartaHref: "/en/menu",
    descubre: "Discover",
    scrollAria: "Scroll to the next section",
    bgAlt: "Positano, a Neapolitan pizzeria in the Eixample, Barcelona — illustration of the Amalfi Coast village",
  },
  it: {
    srHeading: "Positano · Pizzeria napoletana e ristorante italiano a Barcellona",
    tagline:
      "La napoletana dell’Eixample dove tutti tornano sempre.",
    reservar: "Prenota un tavolo",
    reservasHref: "/it/prenota-un-tavolo",
    pedir: "Ordina online",
    pedirHref: "/it/pizza-a-domicilio-barcellona",
    carta: "Visualizza il menu",
    cartaHref: "/it/menu",
    descubre: "Scopri",
    scrollAria: "Scorri fino alla sezione successiva",
    bgAlt: "Positano, una pizzeria napoletana nell’Eixample, a Barcellona — illustrazione del paesino della Costiera Amalfitana",
  },
  fr: {
    srHeading: "Positano · Pizzeria napolitaine et restaurant italien à Barcelone",
    tagline:
      "La pizzeria napolitaine de l'Eixample où tout le monde revient.",
    reservar: "Réserver une table",
    reservasHref: "/fr/reserver-une-table",
    pedir: "Commander en ligne",
    pedirHref: "/fr/livraison-pizza-barcelone",
    carta: "Afficher le menu",
    cartaHref: "/fr/carte",
    descubre: "Découvrez",
    scrollAria: "Faites défiler jusqu'à la section suivante",
    bgAlt: "Positano, une pizzeria napolitaine située dans le quartier de l'Eixample, à Barcelone — illustration représentant ce village de la côte amalfitaine",
  },
  de: {
    srHeading: "Positano · Neapolitanische Pizzeria und italienisches Restaurant in Barcelona",
    tagline:
      "Die neapolitanische Pizzeria im Eixample, in die jeder immer wieder zurückkehrt.",
    reservar: "Einen Tisch reservieren",
    reservasHref: "/de/tisch-reservieren",
    pedir: "Online bestellen",
    pedirHref: "/de/pizza-lieferservice-barcelona",
    carta: "Menü anzeigen",
    cartaHref: "/de/speisekarte",
    descubre: "Entdecken Sie",
    scrollAria: "Blättern Sie zum nächsten Abschnitt",
    bgAlt: "Positano, eine neapolitanische Pizzeria im Stadtteil Eixample in Barcelona – Illustration des Ortes an der Amalfiküste",
  },
  nl: {
    srHeading: "Positano · Napolitaanse pizzeria & Italiaans restaurant in Barcelona",
    tagline:
      "De Napolitaanse plek in de Eixample waar iedereen steeds weer naar terugkomt.",
    reservar: "Reserveer een tafel",
    reservasHref: "/nl/tafel-reserveren",
    pedir: "Bestel online",
    pedirHref: "/nl/pizza-bezorgen-barcelona",
    carta: "Menu bekijken",
    cartaHref: "/nl/menukaart",
    descubre: "Ontdek",
    scrollAria: "Scroll naar het volgende gedeelte",
    bgAlt: "Positano, een Napolitaanse pizzeria in de wijk Eixample in Barcelona — illustratie van het dorpje aan de kust van Amalfi",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function Hero({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  return (
    <section
      id="top"
      className="relative h-svh min-h-[640px] w-full overflow-hidden bg-ink"
    >
      {/* Vídeo del restaurante (vertical en móvil, horizontal en desktop) */}
      <HeroBackground alt={t.bgAlt} />

      {/* Armonización con el navy de marca + legibilidad */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-ink/15" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(100deg,rgba(29,39,80,0.82)_0%,rgba(29,39,80,0.42)_38%,rgba(29,39,80,0.08)_60%,rgba(29,39,80,0)_76%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-ink/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-ink to-transparent" />

      {/* Contenido */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">
        <div className="max-w-xl">
          <h1 className="hero-rise" style={{ animationDelay: "0.15s" }}>
            <span className="sr-only">{t.srHeading}</span>
            <Image
              src="/positano-wordmark.png"
              alt=""
              width={1539}
              height={417}
              priority
              sizes="(min-width: 768px) 448px, 240px"
              className="h-auto w-[clamp(15rem,42vw,28rem)] [filter:drop-shadow(0_0_5px_rgba(0,0,0,0.55))_drop-shadow(0_6px_18px_rgba(0,0,0,0.45))]"
            />
          </h1>

          <div
            className="hero-rise mt-7 flex items-center gap-4"
            style={{ animationDelay: "0.46s" }}
          >
            <span className="h-px w-16 bg-cream/35" />
            <Lemon className="h-6 w-6 text-lemon" />
          </div>

          <p
            className="hero-rise hero-glow mt-7 max-w-md font-serif text-xl leading-relaxed text-cream/85 md:text-2xl"
            style={{ animationDelay: "0.6s" }}
          >
            {t.tagline}
          </p>

          <div
            className="hero-rise mt-9 flex flex-col gap-4"
            style={{ animationDelay: "0.74s" }}
          >
            <a
              href={t.reservasHref}
              className="rounded-full bg-[linear-gradient(160deg,#d6b579_0%,#c49b5a_52%,#b68b46_100%)] px-9 py-[1.35rem] text-center font-bold text-[1.1rem] uppercase tracking-[0.22em] text-ink ring-1 ring-ink/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_14px_34px_-8px_rgba(0,0,0,0.5),0_5px_14px_-3px_rgba(0,0,0,0.35)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:tracking-[0.25em] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_22px_46px_-10px_rgba(0,0,0,0.55),0_8px_20px_-4px_rgba(0,0,0,0.4)] active:scale-[0.98] md:text-[1.25rem]"
            >
              {t.reservar}
            </a>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a
                href={t.pedirHref}
                className="flex items-center justify-center whitespace-nowrap rounded-full border-2 border-cream/85 bg-ink/55 px-2 py-[1.1rem] text-center font-semibold text-sm uppercase tracking-[0.12em] text-cream backdrop-blur-sm shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-cream hover:text-ink sm:px-6 sm:text-base sm:tracking-[0.2em]"
              >
                {t.pedir}
              </a>
              <a
                href={t.cartaHref}
                className="flex items-center justify-center whitespace-nowrap rounded-full border-2 border-cream/85 bg-ink/55 px-2 py-[1.1rem] text-center font-semibold text-sm uppercase tracking-[0.12em] text-cream backdrop-blur-sm shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-cream hover:text-ink sm:px-6 sm:text-base sm:tracking-[0.2em]"
              >
                {t.carta}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#la-casa"
        aria-label={t.scrollAria}
        className="hero-rise absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2"
        style={{ animationDelay: "0.95s" }}
      >
        <span className="text-[0.82rem] uppercase tracking-[0.4em] text-cream/55">
          {t.descubre}
        </span>
        <svg
          className="hero-cue h-4 w-4 text-cream/55"
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
      </a>
    </section>
  );
}
