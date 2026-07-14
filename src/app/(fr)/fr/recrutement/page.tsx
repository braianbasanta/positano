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

const title = "Carrières · Positano Pizzería Lounge Bar Barcelone";
const description =
  "Vous êtes passionné(e) par la cuisine italienne, le service en salle ou le bar ? Rejoignez l'équipe du Positano dans le quartier de l'Eixample, à Barcelone. Envoyez-nous votre CV en quelques minutes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("empleo", "fr"),
  ...socialFor({ title, description, path: "/fr/recrutement", locale: "fr" }),
};

export default function CareersFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          { name: "Carrières", path: "/fr/recrutement" },
        ])}
      />
      <SiteHeader lang="fr" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Carrières
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Rejoignez l&apos;équipe
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Nous recherchons des personnes passionnées par la cuisine italienne, l&apos;ambiance de la salle à manger et un service chaleureux et personnalisé. Si vous souhaitez faire partie du quotidien du Positano, présentez-vous et envoyez-nous votre CV.
            </p>
          </div>
        </section>

        {/* Intro + form */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <p className="text-[0.82rem] uppercase tracking-[0.32em] text-lemon">
                Notre équipe
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                Nous cuisinons avec le cœur. Nous servons avec l&apos;âme.
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink-soft">
                <p>
                  Chez Positano, nous privilégions l&apos;attitude plutôt que le CV. Nous recherchons des personnes curieuses et fiables, désireuses d&apos;apprendre le métier.
                </p>
                <p>
                  Si vous êtes passionné(e) par la pizza napolitaine, les pâtes fraîches ou le service en salle, nous aimerions faire votre connaissance. Remplissez le formulaire en quelques minutes et joignez votre CV : nous l&apos;examinerons personnellement.
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
              <EmpleoForm lang="fr" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="fr" />
    </>
  );
}
