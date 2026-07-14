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

const title = "Vacatures · Positano Pizzería Lounge Bar Barcelona";
const description =
  "Ben je gek op de Italiaanse keuken, de bediening of de bar? Kom dan bij het Positano-team in de wijk Eixample in Barcelona werken. Stuur ons binnen een paar minuten je cv.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("empleo", "nl"),
  ...socialFor({ title, description, path: "/nl/vacatures", locale: "nl" }),
};

export default function CareersNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          { name: "Carrière", path: "/nl/vacatures" },
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
              Carrière
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Kom bij ons team
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              We zijn op zoek naar mensen die dol zijn op de Italiaanse keuken, de eetzaal en een warme, persoonlijke bediening. Als je deel wilt uitmaken van het dagelijkse reilen en zeilen bij Positano, vertel ons dan wie je bent en stuur ons je cv.
            </p>
          </div>
        </section>

        {/* Intro + form */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <p className="text-[0.82rem] uppercase tracking-[0.32em] text-lemon">
                Ons team
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                We koken met hart en ziel. We serveren met passie.
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink-soft">
                <p>
                  Bij Positano vinden we je houding belangrijker dan je cv. We zijn op zoek naar nieuwsgierige, betrouwbare mensen die graag het vak willen leren.
                </p>
                <p>
                  Als je een passie hebt voor Napolitaanse pizza, verse pasta of bediening, dan willen we je graag ontmoeten. Vul het formulier in een paar minuten in en voeg je cv toe — we bekijken het persoonlijk.
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
              <EmpleoForm lang="nl" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
