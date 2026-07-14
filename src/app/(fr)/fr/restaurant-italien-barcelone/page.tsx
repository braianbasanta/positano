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

const title = "Restaurant italien à Barcelone · Four à bois · Positano";
const description =
  "Positano est un authentique restaurant italien à Barcelone : pizzas napolitaines, pâtes fraîches, risottos et plats du sud de l'Italie dans le quartier de l'Eixample.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("italiano", "fr"),
  ...socialFor({
    title,
    description,
    path: "/fr/restaurant-italien-barcelone",
    locale: "fr",
  }),
};

const dishes = [
  {
    title: "Pizza napolitaine",
    text: "Pâte fermentée pendant 48 heures, cuite au feu de bois et garnie d'ingrédients italiens AOP. De la Margherita à la Tartufo.",
  },
  {
    title: "Pâtes fraîches faites maison",
    text: "Tagliatelles, scialatelli, raviolotto et bien d'autres encore, préparés sur place. Goûtez les carbonara, agrémentées d'une meule de pecorino.",
  },
  {
    title: "Risottos et plats principaux",
    text: "Risotto aux champignons, filet de bœuf, filet de saumon : une cuisine du sud de l'Italie à base de produits authentiques.",
  },
  {
    title: "Entrées et boissons",
    text: "Burrata des Pouilles frite, caprese au buffle, vins et bières italiens. L'entrée en matière idéale, ou simplement un verre au comptoir.",
  },
];

export default function ItalianRestaurantBarcelonaFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          {
            name: "Restaurant italien à Barcelone",
            path: "/fr/restaurant-italien-barcelone",
          },
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
              Le véritable sud de l&apos;Italie
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Restaurant italien à Barcelone
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Un petit air de Naples dans l&apos;Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano est un authentique restaurant italien situé au cœur de Barcelone. Pizzas napolitaines, pâtes fraîches maison, risottos et plats principaux du sud de l&apos;Italie — préparés par des chefs nés et ayant grandi en Campanie. Noté 4,8 sur Google.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/fr/reserver-une-table"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Réserver une table
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/fr/carte"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Consultez le menu
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
                Notre cuisine
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La vraie cuisine italienne à Barcelone
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Du four à pizza à la planche à pâtes, tout est préparé à la manière du sud de l&apos;Italie, avec des produits importés d&apos;Italie.
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
                href="/fr/carte"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Consultez le menu complet
              </a>
            </Reveal>
          </div>
        </section>

        {/* Social proof */}
        <Resenas lang="fr" />

        {/* Location & hours */}
        <Visitanos lang="fr" />
      </main>
      <SiteFooter lang="fr" />
    </>
  );
}
