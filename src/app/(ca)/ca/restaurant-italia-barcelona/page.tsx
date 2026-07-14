import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import Visitanos from "@/components/Visitanos";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { goldCta3d } from "@/lib/ui";

const title = "Restaurant Italià a Barcelona · Cuina Napolitana · Positano";
const description =
  "Positano, restaurant italià a Barcelona: pizza napolitana al forn de llenya, pasta fresca casolana, risotti i secondi del sud d'Itàlia a l'Eixample. 4,8★.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("italiano", "ca"),
  ...socialFor({
    title,
    description,
    path: "/ca/restaurant-italia-barcelona",
    locale: "ca",
  }),
};

const plats = [
  {
    title: "Pizza napolitana",
    text: "Massa fermentada 48 hores cuita al forn de llenya amb ingredients DOP italians. De la Margherita a la Tartufo, sempre amb cornicione alt.",
  },
  {
    title: "Pasta fresca casolana",
    text: "Tagliatelle, scialatelli, raviolotto i la carbonara acabada a la roda de pecorino. Pasta feta cada dia a casa, com al sud.",
  },
  {
    title: "Risotti i secondi",
    text: "Risotto de bolets, filet de vedella, filet de salmó. Els segons del sud d'Itàlia, amb producte autèntic i de temporada.",
  },
  {
    title: "Antipasti i dolci",
    text: "Burrata pugliese, caprese de búfala, parmigiana d'albergínia i, per acabar, tiramisú clàssic o de festuc. El final italià que mereix l'àpat.",
  },
];

export default function RestaurantItaliaBarcelonaCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          {
            name: "Restaurant italià a Barcelona",
            path: "/ca/restaurant-italia-barcelona",
          },
        ])}
      />
      <SiteHeader lang="ca" />
      <main>
        {/* Banda de títol */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Autèntic sud d'Itàlia
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Restaurant italià a Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              El sabor de Nàpols a l'Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano és un restaurant italià al cor de Barcelona. Pizza napolitana de massa fermentada 48 hores, pasta fresca casolana, risotti i secondi del sud d'Itàlia, cuinats per xefs nascuts a la Campània. 4,8★ a Google amb més de 1.450 ressenyes.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/ca/reservar-taula"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Reservar taula
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/ca/carta"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Veure la carta
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* La nostra cuina */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                La nostra cuina
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Cuina italiana de veritat a Barcelona
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Del forn de pizza a la pasta fresca: tot s'elabora com al sud
                d'Itàlia, amb ingredients portats directament d'Itàlia.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {plats.map((plat, index) => (
                <Reveal key={plat.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {plat.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {plat.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/ca/carta"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Veure la carta completa
              </a>
            </Reveal>
          </div>
        </section>

        {/* Prova social */}
        <Resenas lang="ca" />

        {/* Ubicació i horaris */}
        <Visitanos lang="ca" />
      </main>
      <SiteFooter lang="ca" />
    </>
  );
}
