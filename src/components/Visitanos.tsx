import Link from "next/link";
import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import type { Locale } from "@/lib/i18n";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const mapEmbed = (hl: string) =>
  `https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=${hl}&output=embed`;

type InfoLine = { text: string; href?: string };
type ScheduleRow = { day: string; hours: string };
type InfoBlock = {
  title: string;
  lines?: InfoLine[];
  schedule?: ScheduleRow[];
};

const CONTACT_LINES: InfoLine[] = [
  { text: "+34 933 515 913", href: "tel:+34933515913" },
  { text: "positanopizzeria2023@gmail.com", href: "mailto:positanopizzeria2023@gmail.com" },
];

const COPY = {
  es: {
    eyebrow: "Visítanos",
    heading: "Te esperamos en el Eixample de Barcelona",
    intro:
      "Reserva tu mesa o pásate a tomar algo en la barra. La casa siempre tiene un sitio para ti.",
    mapHl: "es",
    mapTitle: "Ubicación de Positano Pizzería en Barcelona",
    reservar: "Reservar mesa",
    reservasHref: "/reservas",
    llamar: "Llámanos",
    info: [
      {
        title: "Dónde estamos",
        lines: [
          { text: "Carrer del Rosselló, 24", href: PLACE_URL },
          { text: "08029 · Barcelona", href: PLACE_URL },
        ],
      },
      {
        title: "Horario",
        schedule: [
          { day: "Mar – Jue", hours: "13:00 – 16:00 · 20:00 – 23:30" },
          { day: "Viernes", hours: "13:00 – 16:00 · 20:00 – 00:00" },
          { day: "Sábado", hours: "13:00 – 00:00" },
          { day: "Domingo", hours: "13:00 – 23:30" },
          { day: "Lunes", hours: "Cerrado" },
        ],
      },
      { title: "Contacto", lines: CONTACT_LINES },
    ] as InfoBlock[],
  },
  ca: {
    eyebrow: "Visita'ns",
    heading: "T'esperem a l'Eixample de Barcelona",
    intro:
      "Reserva la teva taula o passa a prendre alguna cosa a la barra. La casa sempre té un lloc per a tu.",
    mapHl: "ca",
    mapTitle: "Ubicació de Positano Pizzería a Barcelona",
    reservar: "Reservar taula",
    reservasHref: "/ca/reservar-taula",
    llamar: "Truca'ns",
    info: [
      {
        title: "On som",
        lines: [
          { text: "Carrer del Rosselló, 24", href: PLACE_URL },
          { text: "08029 · Barcelona", href: PLACE_URL },
        ],
      },
      {
        title: "Horari",
        schedule: [
          { day: "Dt – Dj", hours: "13:00 – 16:00 · 20:00 – 23:30" },
          { day: "Divendres", hours: "13:00 – 16:00 · 20:00 – 00:00" },
          { day: "Dissabte", hours: "13:00 – 00:00" },
          { day: "Diumenge", hours: "13:00 – 23:30" },
          { day: "Dilluns", hours: "Tancat" },
        ],
      },
      { title: "Contacte", lines: CONTACT_LINES },
    ] as InfoBlock[],
  },
  en: {
    eyebrow: "Visit us",
    heading: "We're waiting for you in the Eixample, Barcelona",
    intro:
      "Book a table or drop by for a drink at the bar. The house always has a seat for you.",
    mapHl: "en",
    mapTitle: "Location of Positano Pizzería in Barcelona",
    reservar: "Book a table",
    reservasHref: "/en/book-a-table",
    llamar: "Call us",
    info: [
      {
        title: "Where we are",
        lines: [
          { text: "Carrer del Rosselló, 24", href: PLACE_URL },
          { text: "08029 · Barcelona", href: PLACE_URL },
        ],
      },
      {
        title: "Opening hours",
        schedule: [
          { day: "Tue – Thu", hours: "1:00 – 4:00 pm · 8:00 – 11:30 pm" },
          { day: "Friday", hours: "1:00 – 4:00 pm · 8:00 pm – 12:00 am" },
          { day: "Saturday", hours: "1:00 pm – 12:00 am" },
          { day: "Sunday", hours: "1:00 – 11:30 pm" },
          { day: "Monday", hours: "Closed" },
        ],
      },
      { title: "Contact", lines: CONTACT_LINES },
    ] as InfoBlock[],
  },
  it: {
    eyebrow: "Vieni a trovarci",
    heading: "Ti aspettiamo nell'Eixample, a Barcellona",
    intro:
      "Prenota un tavolo o passa a bere qualcosa al bar. Da noi c'è sempre un posto per te.",
    mapHl: "en inform",
    mapTitle: "Dove si trova la Pizzeria Positano a Barcellona",
    reservar: "Prenota un tavolo",
    reservasHref: "/it/prenota-un-tavolo",
    llamar: "Chiamaci",
    info: [
      {
        title: "Where we are",
        lines: [
          { text: "Carrer del Rosselló, 24", href: PLACE_URL },
          { text: "08029 · Barcelona", href: PLACE_URL },
        ],
      },
      {
        title: "Opening hours",
        schedule: [
          { day: "Tue – Thu", hours: "1:00 – 4:00 pm · 8:00 – 11:30 pm" },
          { day: "Friday", hours: "1:00 – 4:00 pm · 8:00 pm – 12:00 am" },
          { day: "Saturday", hours: "1:00 pm – 12:00 am" },
          { day: "Sunday", hours: "1:00 – 11:30 pm" },
          { day: "Monday", hours: "Closed" },
        ],
      },
      { title: "Contact", lines: CONTACT_LINES },
    ] as InfoBlock[],
  },
  fr: {
    eyebrow: "Venez nous rendre visite",
    heading: "Nous vous attendons dans le quartier de l'Eixample, à Barcelone",
    intro:
      "Réservez une table ou passez prendre un verre au bar. Il y a toujours une place pour vous chez nous.",
    mapHl: "fr",
    mapTitle: "Emplacement de la pizzeria Positano à Barcelone",
    reservar: "Réserver une table",
    reservasHref: "/fr/reserver-une-table",
    llamar: "Appelez-nous",
    info: [
      {
        title: "Where we are",
        lines: [
          { text: "Carrer del Rosselló, 24", href: PLACE_URL },
          { text: "08029 · Barcelona", href: PLACE_URL },
        ],
      },
      {
        title: "Opening hours",
        schedule: [
          { day: "Tue – Thu", hours: "1:00 – 4:00 pm · 8:00 – 11:30 pm" },
          { day: "Friday", hours: "1:00 – 4:00 pm · 8:00 pm – 12:00 am" },
          { day: "Saturday", hours: "1:00 pm – 12:00 am" },
          { day: "Sunday", hours: "1:00 – 11:30 pm" },
          { day: "Monday", hours: "Closed" },
        ],
      },
      { title: "Contact", lines: CONTACT_LINES },
    ] as InfoBlock[],
  },
  de: {
    eyebrow: "Besuchen Sie uns",
    heading: "Wir erwarten Sie im Stadtteil Eixample in Barcelona",
    intro:
      "Reservieren Sie einen Tisch oder kommen Sie auf einen Drink an der Bar vorbei. Bei uns ist immer ein Platz für Sie frei.",
    mapHl: "de",
    mapTitle: "Standort der Pizzeria „Positano“ in Barcelona",
    reservar: "Einen Tisch reservieren",
    reservasHref: "/de/tisch-reservieren",
    llamar: "Rufen Sie uns an",
    info: [
      {
        title: "Where we are",
        lines: [
          { text: "Carrer del Rosselló, 24", href: PLACE_URL },
          { text: "08029 · Barcelona", href: PLACE_URL },
        ],
      },
      {
        title: "Opening hours",
        schedule: [
          { day: "Tue – Thu", hours: "1:00 – 4:00 pm · 8:00 – 11:30 pm" },
          { day: "Friday", hours: "1:00 – 4:00 pm · 8:00 pm – 12:00 am" },
          { day: "Saturday", hours: "1:00 pm – 12:00 am" },
          { day: "Sunday", hours: "1:00 – 11:30 pm" },
          { day: "Monday", hours: "Closed" },
        ],
      },
      { title: "Contact", lines: CONTACT_LINES },
    ] as InfoBlock[],
  },
  nl: {
    eyebrow: "Kom eens langs",
    heading: "We wachten op je in de wijk Eixample in Barcelona",
    intro:
      "Reserveer een tafel of kom even langs voor een drankje aan de bar. Bij ons is er altijd wel een plekje voor je.",
    mapHl: "nl",
    mapTitle: "Locatie van Pizzería Positano in Barcelona",
    reservar: "Reserveer een tafel",
    reservasHref: "/nl/tafel-reserveren",
    llamar: "Bel ons",
    info: [
      {
        title: "Where we are",
        lines: [
          { text: "Carrer del Rosselló, 24", href: PLACE_URL },
          { text: "08029 · Barcelona", href: PLACE_URL },
        ],
      },
      {
        title: "Opening hours",
        schedule: [
          { day: "Tue – Thu", hours: "1:00 – 4:00 pm · 8:00 – 11:30 pm" },
          { day: "Friday", hours: "1:00 – 4:00 pm · 8:00 pm – 12:00 am" },
          { day: "Saturday", hours: "1:00 pm – 12:00 am" },
          { day: "Sunday", hours: "1:00 – 11:30 pm" },
          { day: "Monday", hours: "Closed" },
        ],
      },
      { title: "Contact", lines: CONTACT_LINES },
    ] as InfoBlock[],
  },
} satisfies Record<Locale, Record<string, unknown>>;

export default function Visitanos({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  const info = t.info;
  return (
    <section
      id="visitanos"
      className="relative overflow-hidden bg-cream px-6 py-24 md:py-32"
    >
      <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[135deg] text-lemon/20" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
            {t.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {/* Info — izquierda en desktop, debajo en móvil */}
          <Reveal className="order-2 md:order-1">
            <div className="flex h-full flex-col divide-y divide-ink/15 overflow-hidden border border-ink/15 bg-cream">
              {info.map((block) => (
                <div
                  key={block.title}
                  className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center"
                >
                  <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                    {block.title}
                  </h3>
                  {block.schedule ? (
                    <div className="space-y-2.5">
                      {block.schedule.map((row) => (
                        <div
                          key={row.day}
                          className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-center"
                        >
                          <span className="font-serif text-lg text-ink">
                            {row.day}
                          </span>
                          <span className="hidden text-ink-soft/40 sm:inline">
                            ·
                          </span>
                          <span className="font-serif text-base text-ink-soft sm:text-lg">
                            {row.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {block.lines?.map((line) =>
                        line.href ? (
                          <a
                            key={line.text}
                            href={line.href}
                            target={
                              line.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              line.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                          >
                            {line.text}
                          </a>
                        ) : (
                          <p
                            key={line.text}
                            className="font-serif text-lg leading-relaxed text-ink-soft"
                          >
                            {line.text}
                          </p>
                        ),
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Mapa — derecha en desktop, primero en móvil */}
          <Reveal delay={120} className="order-1 md:order-2 md:h-full">
            <div className="relative h-[360px] overflow-hidden border border-ink/15 md:h-full">
              <iframe
                src={mapEmbed(t.mapHl)}
                title={t.mapTitle}
                className="block h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={t.reservasHref}
            className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
          >
            {t.reservar}
          </Link>
          <a
            href="tel:+34933515913"
            className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            {t.llamar}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
