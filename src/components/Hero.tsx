import Image from "next/image";
import Lemon from "./Lemon";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-svh min-h-[640px] w-full overflow-hidden bg-ink"
    >
      {/* Ilustración de Positano en azul y dorado de marca */}
      <Image
        src="/hero/positano-azul.png"
        alt="Positano, pizzería napolitana en el Eixample de Barcelona — ilustración del pueblo de la Costa Amalfitana"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_58%]"
      />

      {/* Armonización con el navy de marca + legibilidad */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-ink/35" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(100deg,rgba(29,39,80,0.96)_0%,rgba(29,39,80,0.62)_40%,rgba(29,39,80,0.16)_60%,rgba(29,39,80,0)_76%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-ink/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-ink to-transparent" />

      {/* Contenido */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">
        <div className="max-w-xl">
          <h1 className="hero-rise" style={{ animationDelay: "0.15s" }}>
            <Image
              src="/positano-wordmark.png"
              alt="Positano · Pizzería Napolitana en el Eixample, Barcelona"
              width={1443}
              height={373}
              priority
              className="h-auto w-[clamp(15rem,42vw,28rem)] drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
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
            Pizzería napolitana. El sabor de Nápoles en el corazón del
            Eixample, Barcelona.
          </p>

          <div
            className="hero-rise mt-9 flex flex-col gap-4"
            style={{ animationDelay: "0.74s" }}
          >
            <a
              href="/reservas"
              className="rounded-full bg-lemon px-9 py-4 text-center text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
            >
              Reservar mesa
            </a>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/pizza-domicilio"
                className="flex items-center justify-center rounded-full border border-cream/45 px-6 py-4 text-center text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
              >
                Pedir online
              </a>
              <a
                href="/carta"
                className="flex items-center justify-center rounded-full border border-cream/45 px-6 py-4 text-center text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
              >
                Ver carta
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#la-casa"
        aria-label="Bajar a la siguiente sección"
        className="hero-rise absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2"
        style={{ animationDelay: "0.95s" }}
      >
        <span className="text-[0.82rem] uppercase tracking-[0.4em] text-cream/55">
          Descubre
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
