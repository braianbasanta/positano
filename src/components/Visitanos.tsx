import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=es&output=embed";

type InfoLine = { text: string; href?: string };
type InfoBlock = { title: string; lines: InfoLine[] };

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
    lines: [
      { text: "Martes a Domingo" },
      { text: "13:00 – 17:00 · 20:00 – 00:00" },
      { text: "Lunes cerrado" },
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
      {
        text: "@positanopizzeriabcn",
        href: "https://instagram.com/positanopizzeriabcn/",
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
          <span className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.34em] text-lemon">
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

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Info — izquierda */}
          <Reveal className="md:h-[460px]">
            <div className="grid h-full gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-rows-3">
              {info.map((block) => (
                <div key={block.title} className="bg-cream">
                  <div className="flex h-full flex-col justify-center gap-3 p-8 text-center">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      {block.title}
                    </h3>
                    <div className="space-y-1">
                      {block.lines.map((line) =>
                        line.href ? (
                          <a
                            key={line.text}
                            href={line.href}
                            target={
                              line.href.startsWith("http")
                                ? "_blank"
                                : undefined
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
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Mapa — derecha */}
          <Reveal delay={120} className="md:h-[460px]">
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
              <a
                href={PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 rounded-full bg-ink px-6 py-3 text-[0.74rem] uppercase tracking-[0.2em] text-cream shadow-[0_8px_24px_rgba(29,39,80,0.35)] transition-colors duration-300 hover:bg-lemon hover:text-ink"
              >
                Ver en Google Maps
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/reservas"
            className="rounded-full bg-ink px-9 py-4 text-[0.8rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
          >
            Reservar mesa
          </a>
          <a
            href="tel:+34933515913"
            className="rounded-full border border-ink/45 px-9 py-4 text-[0.8rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            Llámanos
          </a>
        </Reveal>
      </div>
    </section>
  );
}
