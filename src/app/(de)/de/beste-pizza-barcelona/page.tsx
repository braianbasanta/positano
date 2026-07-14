import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { reviewStatsEn } from "@/data/reviews";
import { goldCta3d } from "@/lib/ui";

const title = "Die beste Pizza in Barcelona · Aus dem Holzofen · Positano Eixample";
const description =
  "Sind Sie auf der Suche nach der besten Pizza in Barcelona? Das „Positano“ serviert im Stadtteil Eixample authentische neapolitanische Pizza: 48 Stunden gereifter Teig, Holzofen und Zutaten mit DOP-Gütesiegel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("mejorPizzeria", "de"),
  ...socialFor({
    title,
    description,
    path: "/de/beste-pizza-barcelona",
    locale: "de",
  }),
};

const reasons = [
  {
    title: "48 Stunden lang fermentierter Teig",
    text: "Durch die langsame Gärung wird unsere Pizza leicht, luftig und bekömmlich – das Geheimnis hinter einem wirklich hervorragenden neapolitanischen Pizzaboden.",
  },
  {
    title: "In 90 Sekunden mit Holz befeuert",
    text: "Bei 400 °C in einem Holzofen gebacken, um den leopardenfleckigen „Cornicione“ und den flüssigen Kern zu erzielen, die eine echte neapolitanische Pizza auszeichnen.",
  },
  {
    title: "Italienische Zutaten mit DOP-Gütesiegel",
    text: "San-Marzano-Tomaten, „Fior di Latte“ aus Kampanien, Büffelmozzarella DOP. Authentische Produkte direkt aus Italien.",
  },
  {
    title: "Barcelonas Liebling",
    text: "Von unseren Gästen bei Google mit 4,8 bewertet. Die Gäste kommen wegen des Teigs, des Holzofen-Aromas und der herzlichen Atmosphäre wieder – genau das macht uns zu einer ersten Adresse für Pizza in der Stadt.",
  },
];

export default function BestPizzaBarcelonaDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          { name: "Die beste Pizza in Barcelona", path: "/de/beste-pizza-barcelona" },
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
              Bewertet mit ★{reviewStatsEn.rating} auf Google
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Die beste Pizza in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Echte Pizza aus Neapel, im Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Sind Sie auf der Suche nach der besten Pizza in Barcelona? Im Positano bereiten wir authentische neapolitanische Pizza zu – mit 48 Stunden lang gereiftem Teig, einem Holzofen und italienischen DOP-Zutaten – ganz so, wie man es in Neapel macht. Von unseren Gästen bei Google mit 4,8 bewertet.
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
                Sehen Sie sich unsere Pizzen an
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Why the best */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Warum Positano?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Was macht unsere Pizza zur besten in Barcelona?
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Eine großartige Pizza entsteht niemals durch Improvisation. Vier Dinge heben unsere Pizza von allen anderen in der Stadt ab – verwurzelt in der{" "}
                <a
                  href="/de/neapolitanische-pizza-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  authentische neapolitanische Pizzatradition
                </a>{" "}
                die wir aus Kampanien mitgebracht haben.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {reason.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {reason.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <Resenas lang="de" />

        {/* Closing CTA */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Kommen Sie vorbei und probieren Sie es selbst
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">
                Sie finden uns in der Carrer del Rosselló 24, im Herzen des Stadtteils Eixample in Barcelona. Reservieren Sie einen Tisch oder bestellen Sie sich Ihr Essen nach Hause.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/de/tisch-reservieren"
                  className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                >
                  Einen Tisch reservieren
                </a>
                <a
                  href="/de/pizza-lieferservice-barcelona"
                  className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  Lieferung der Bestellung
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="de" />
    </>
  );
}
