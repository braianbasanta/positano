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

const title = "Italienisches Restaurant in Barcelona · Holzofen · Positano";
const description =
  "Das „Positano“ ist ein authentisches italienisches Restaurant in Barcelona: neapolitanische Pizza, frische Pasta, Risotti und Hauptgerichte aus Süditalien im Stadtteil Eixample.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("italiano", "de"),
  ...socialFor({
    title,
    description,
    path: "/de/italienisches-restaurant-barcelona",
    locale: "de",
  }),
};

const dishes = [
  {
    title: "Neapolitanische Pizza",
    text: "48 Stunden lang gereifter Teig, im Holzofen gebacken und mit italienischen DOP-Zutaten belegt. Von der Margherita bis zur Tartufo.",
  },
  {
    title: "Hausgemachte frische Pasta",
    text: "Tagliatelle, Scialatelli, Raviolotto und vieles mehr – alles hausgemacht. Probieren Sie die Carbonara, die in einem Pecorino-Laib serviert wird.",
  },
  {
    title: "Risotto und Hauptgerichte",
    text: "Pilzrisotto, Rinderfilet, Lachsfilet – süditalienische Küche mit authentischen Zutaten.",
  },
  {
    title: "Vorspeisen & Getränke",
    text: "Gebratene Burrata aus Apulien, Caprese mit Büffelmilch, italienische Weine und Biere. Der perfekte Auftakt oder ein Drink an der Theke.",
  },
];

export default function ItalianRestaurantBarcelonaDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          {
            name: "Italienisches Restaurant in Barcelona",
            path: "/de/italienisches-restaurant-barcelona",
          },
        ])}
      />
      <SiteHeader lang="de" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Das authentische Süditalien
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Italienisches Restaurant in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Ein Hauch von Neapel im Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Das „Positano“ ist ein authentisches italienisches Restaurant im Herzen von Barcelona. Neapolitanische Pizza, hausgemachte frische Pasta, Risotti und Hauptgerichte aus Süditalien – zubereitet von Köchen, die in Kampanien geboren und aufgewachsen sind. Bewertung: 4,8 bei Google.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/de/tisch-reservieren"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Einen Tisch reservieren
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/de/speisekarte"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Menü anzeigen
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
                Unsere Küche
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Echte italienische Küche in Barcelona
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Vom Pizzaofen bis zum Nudelbrett – alles wird nach süditalienischer Art zubereitet, mit Zutaten, die aus Italien stammen.
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
                href="/de/speisekarte"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Sehen Sie sich die vollständige Speisekarte an
              </a>
            </Reveal>
          </div>
        </section>

        {/* Social proof */}
        <Resenas lang="de" />

        {/* Location & hours */}
        <Visitanos lang="de" />
      </main>
      <SiteFooter lang="de" />
    </>
  );
}
