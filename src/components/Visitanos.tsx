import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=es&output=embed";

type InfoLine = { text: string; href?: string };
type ScheduleRow = { day: string; hours: string };
type InfoBlock = {
  title: string;
  lines?: InfoLine[];
  schedule?: ScheduleRow[];
};

const info: InfoBlock[] = [
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
  {
    title: "Contacto",
    lines: [
      { text: "+34 933 515 913", href: "tel:+34933515913" },
      {
        text: "positanopizzeria2023@gmail.com",
        href: "mailto:positanopizzeria2023@gmail.com",
      },
    ],
  },
];

export default function Visitanos() {
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
            Visítanos
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            Te esperamos en el Eixample de Barcelona
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
            Reserva tu mesa o pásate a tomar algo en la barra. La casa siempre
            tiene un sitio para ti.
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
                src={MAP_EMBED}
                title="Ubicación de Positano Pizzería en Barcelona"
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
          <a
            href="/reservas"
            className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
          >
            Reservar mesa
          </a>
          <a
            href="tel:+34933515913"
            className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            Llámanos
          </a>
        </Reveal>
      </div>
    </section>
  );
}
