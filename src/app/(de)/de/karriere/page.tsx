import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import EmpleoForm from "@/components/EmpleoForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Karriere · Positano Pizzeria Lounge Bar Barcelona";
const description =
  "Begeistern Sie sich für die italienische Küche, den Service oder die Bar? Werden Sie Teil des Positano-Teams im Stadtteil Eixample in Barcelona. Senden Sie uns in wenigen Minuten Ihren Lebenslauf zu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("empleo", "de"),
  ...socialFor({ title, description, path: "/de/karriere", locale: "de" }),
};

export default function CareersDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          { name: "Karriere", path: "/de/karriere" },
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
              Karriere
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Werden Sie Teil des Teams
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Wir suchen Menschen, die die italienische Küche, den Speisesaal und einen herzlichen, persönlichen Service lieben. Wenn Sie Teil des Alltags im Positano sein möchten, erzählen Sie uns etwas über sich und senden Sie uns Ihren Lebenslauf.
            </p>
          </div>
        </section>

        {/* Intro + form */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <p className="text-[0.82rem] uppercase tracking-[0.32em] text-lemon">
                Unser Team
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                Wir kochen mit Herz. Wir servieren mit Seele.
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink-soft">
                <p>
                  Bei Positano legen wir mehr Wert auf die Einstellung als auf den Lebenslauf. Wir suchen neugierige, zuverlässige Menschen, die begierig darauf sind, das Handwerk zu erlernen.
                </p>
                <p>
                  Wenn Sie eine Leidenschaft für neapolitanische Pizza, frische Pasta oder den Service im Gastraum haben, möchten wir Sie gerne kennenlernen. Füllen Sie das Formular in wenigen Minuten aus und fügen Sie Ihren Lebenslauf bei – wir werden ihn persönlich prüfen.
                </p>
              </div>
              <ul className="mt-8 space-y-3 font-serif text-base text-ink-soft">
                {[
                  "Registered contract with legal conditions",
                  "Young, multicultural team",
                  "In-house Neapolitan pizza training",
                  "Eixample · Barcelona",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Lemon className="mt-1 h-4 w-4 shrink-0 text-lemon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <EmpleoForm lang="de" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="de" />
    </>
  );
}
