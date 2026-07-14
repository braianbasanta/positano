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

const title = "Italiaans restaurant in Barcelona · Oven op houtvuur · Positano";
const description =
  "Positano is een authentiek Italiaans restaurant in Barcelona: Napolitaanse pizza, verse pasta, risotto’s en hoofdgerechten uit Zuid-Italië in de wijk Eixample.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("italiano", "nl"),
  ...socialFor({
    title,
    description,
    path: "/nl/italiaans-restaurant-barcelona",
    locale: "nl",
  }),
};

const dishes = [
  {
    title: "Napolitaanse pizza",
    text: "48 uur gerijpt deeg, gebakken in een houtgestookte oven en belegd met Italiaanse DOP-ingrediënten. Van de Margherita tot de Tartufo.",
  },
  {
    title: "Zelfgemaakte verse pasta",
    text: "Tagliatelle, scialatelli, raviolotto en nog veel meer, allemaal zelfgemaakt. Probeer eens de carbonara, afgewerkt met een stuk pecorino.",
  },
  {
    title: "Risotto’s & hoofdgerechten",
    text: "Risotto met champignons, ossenhaas, zalmfilet — Zuid-Italiaanse gerechten met authentieke ingrediënten.",
  },
  {
    title: "Antipasti & drankjes",
    text: "Gebakken burrata uit Apulië, caprese met buffelmozzarella, Italiaanse wijnen en bieren. De perfecte start, of gewoon een drankje aan de bar.",
  },
];

export default function ItalianRestaurantBarcelonaNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          {
            name: "Italiaans restaurant in Barcelona",
            path: "/nl/italiaans-restaurant-barcelona",
          },
        ])}
      />
      <SiteHeader lang="nl" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Het echte Zuid-Italië
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Italiaans restaurant in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Een vleugje Napels in de wijk Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano is een authentiek Italiaans restaurant in het hart van Barcelona. Napolitaanse pizza, verse huisgemaakte pasta, risotto’s en hoofdgerechten uit Zuid-Italië — bereid door chef-koks die geboren en getogen zijn in Campanië. Beoordeeld met een 4,8 op Google.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/nl/tafel-reserveren"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Reserveer een tafel
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/nl/menukaart"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Bekijk het menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* What we serve */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Onze keuken
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Echt Italiaans eten in Barcelona
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Van de pizzaoven tot de pastaplaat: alles wordt op Zuid-Italiaanse wijze bereid, met ingrediënten die rechtstreeks uit Italië komen.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {dishes.map((dish, index) => (
                <Reveal key={dish.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {dish.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {dish.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/nl/menukaart"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Bekijk het volledige menu
              </a>
            </Reveal>
          </div>
        </section>

        {/* Social proof */}
        <Resenas lang="nl" />

        {/* Location & hours */}
        <Visitanos lang="nl" />
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
