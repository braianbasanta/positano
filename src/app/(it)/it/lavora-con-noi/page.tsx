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

const title = "Opportunità di lavoro · Positano Pizzería Lounge Bar Barcellona";
const description =
  "Ti appassiona la cucina italiana, il servizio in sala o il bar? Entra a far parte del team di Positano nell’Eixample, a Barcellona. Mandaci il tuo CV in pochi minuti.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("empleo", "it"),
  ...socialFor({ title, description, path: "/it/lavora-con-noi", locale: "it" }),
};

export default function CareersItPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/it" },
          { name: "Opportunità di lavoro", path: "/it/lavora-con-noi" },
        ])}
      />
      <SiteHeader lang="it" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Opportunità di lavoro
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Entra a far parte del team
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Cerchiamo persone che amino la cucina italiana, la sala da pranzo e un servizio cordiale e personalizzato. Se vuoi far parte della vita quotidiana del Positano, raccontaci chi sei e lasciaci il tuo CV.
            </p>
          </div>
        </section>

        {/* Intro + form */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <p className="text-[0.82rem] uppercase tracking-[0.32em] text-lemon">
                Il nostro team
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                Cuciniamo con il cuore. Serviamo con l’anima.
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink-soft">
                <p>
                  Da Positano diamo più importanza all’atteggiamento che al curriculum. Cerchiamo persone curiose e affidabili, desiderose di imparare il mestiere.
                </p>
                <p>
                  Se ti appassiona la pizza napoletana, la pasta fresca o il servizio in sala, vogliamo conoscerti. Compila il modulo in pochi minuti e allega il tuo CV: lo esamineremo personalmente.
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
              <EmpleoForm lang="it" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="it" />
    </>
  );
}
