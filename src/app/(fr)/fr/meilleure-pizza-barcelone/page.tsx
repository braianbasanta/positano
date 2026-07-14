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

const title = "La meilleure pizza de Barcelone · Cuite au feu de bois · Positano Eixample";
const description =
  "Vous cherchez la meilleure pizza de Barcelone ? Positano propose d'authentiques pizzas napolitaines dans le quartier de l'Eixample : une pâte reposée pendant 48 heures, un four à bois et des ingrédients AOP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("mejorPizzeria", "fr"),
  ...socialFor({
    title,
    description,
    path: "/fr/meilleure-pizza-barcelone",
    locale: "fr",
  }),
};

const reasons = [
  {
    title: "Pâte fermentée pendant 48 heures",
    text: "Une fermentation lente rend notre pizza légère, aérée et facile à digérer : c'est là le secret d'une véritable pâte napolitaine d'exception.",
  },
  {
    title: "Cuisson au feu de bois en 90 secondes",
    text: "Cuite à 400 °C dans un four à bois pour obtenir ce « cornicione » aux taches de léopard et ce cœur fondant qui caractérisent la véritable pizza napolitaine.",
  },
  {
    title: "Ingrédients italiens AOP",
    text: "Tomates de San Marzano, « fior di latte » de Campanie, mozzarella de bufflonne AOP. Des produits authentiques importés directement d'Italie.",
  },
  {
    title: "Le favori de Barcelone",
    text: "Nos clients nous ont attribué une note de 4,8 sur Google. Ils reviennent pour la pâte, le goût du feu de bois et l'accueil : c'est ce qui fait de nous une référence en matière de pizza dans la ville.",
  },
];

export default function BestPizzaBarcelonaFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          { name: "La meilleure pizza de Barcelone", path: "/fr/meilleure-pizza-barcelone" },
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
              Noté ★{reviewStatsEn.rating} sur Google
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              La meilleure pizza de Barcelone
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Une véritable pizza napolitaine, dans l&apos;Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Vous recherchez la meilleure pizza de Barcelone ? Chez Positano, nous préparons d&apos;authentiques pizzas napolitaines avec une pâte fermentée pendant 48 heures, un four à bois et des ingrédients italiens AOP — exactement comme on le fait à Naples. Noté 4,8 sur Google par nos clients.
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
                Découvrez nos pizzas
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
                Pourquoi Positano ?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Pourquoi nos pizzas sont-elles les meilleures de Barcelone ?
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Une bonne pizza ne s’improvise jamais. Quatre éléments distinguent nos pizzas de toutes les autres de la ville — ancrées dans la{" "}
                <a
                  href="/fr/pizza-napolitaine-barcelone"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  la véritable tradition de la pizza napolitaine
                </a>{" "}
                que nous avons rapportée de Campanie.
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
        <Resenas lang="fr" />

        {/* Closing CTA */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Venez le goûter par vous-même
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">
                Vous nous trouverez au 24, Carrer del Rosselló, au cœur de l&apos;Eixample, à Barcelone. Réservez une table ou commandez un repas à livrer à domicile.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/fr/reserver-une-table"
                  className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                >
                  Réserver une table
                </a>
                <a
                  href="/fr/livraison-pizza-barcelone"
                  className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  Livraison de la commande
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="fr" />
    </>
  );
}
