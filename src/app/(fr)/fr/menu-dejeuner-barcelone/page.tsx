import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import PaymentLogos from "@/components/PaymentLogos";
import MenuSemanal from "@/components/MenuSemanal";
import Resenas from "@/components/Resenas";
import { breadcrumbJsonLd, menuDelDiaJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { goldCta3d } from "@/lib/ui";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const title = "Déjeuner italien dans l'Eixample · Menu fixe · Positano BCN";
const description =
  "Menu du jour chez Positano, une pizzeria italienne située dans le quartier de l'Eixample, à Barcelone, au prix de 14,90 €. Plats faits maison du mardi au vendredi. Nous acceptons les chèques Ticket Restaurant®.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menuDelDia", "fr"),
  ...socialFor({ title, description, path: "/fr/menu-dejeuner-barcelone", locale: "fr" }),
};

const hours = [
  { day: "Du mardi au jeudi", time: "13 h – 16 h" },
  { day: "Vendredi", time: "13 h – 16 h" },
  { day: "Samedi et dimanche", time: "Menu complet à la carte" },
  { day: "lundi", time: "Fermé" },
];

const faqs = [
  {
    q: "Combien coûte le menu du déjeuner ?",
    a: "Le menu du déjeuner coûte 14,90 € et comprend une entrée, un plat principal, du pain, une boisson et un dessert. Un supplément de 10 % s'applique pour les places en terrasse.",
  },
  {
    q: "Quels jours le menu du déjeuner est-il proposé ?",
    a: "Nous proposons le menu du déjeuner du mardi au vendredi à midi, de 13 h à 16 h. Les samedis et dimanches, nous proposons l'intégralité de la carte, et nous sommes fermés le lundi.",
  },
  {
    q: "Acceptez-vous les chèques Ticket Restaurant® ou Edenred pour le menu du déjeuner ?",
    a: "Oui. Vous pouvez régler votre menu du midi avec des chèques-restaurant Ticket Restaurant®, Edenred et d'autres titres-restauration. L'endroit idéal pour votre pause déjeuner dans le quartier de l'Eixample.",
  },
  {
    q: "Le menu du déjeuner change-t-il chaque semaine ?",
    a: "Oui, nous renouvelons notre carte chaque semaine avec des plats faits maison du sud de l'Italie : des pâtes telles que les rigatoni au pesto, des salades, des plats principaux à base de viande ou de poisson et une pizza napolitaine de votre choix (Margherita, Diavola, Ortolana et bien d'autres encore).",
  },
  {
    q: "Dois-je réserver pour le menu du déjeuner ?",
    a: "Ce n'est pas indispensable, mais l'Eixample est très fréquenté à midi : si vous venez en groupe ou si vous disposez de peu de temps, nous vous recommandons de réserver en ligne ou d'appeler le +34 933 51 59 13.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function LunchMenuFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          { name: "Menu du déjeuner à Barcelone", path: "/fr/menu-dejeuner-barcelone" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={menuDelDiaJsonLd("fr")} />
      <SiteHeader lang="fr" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Déjeuner dans l&apos;Eixample
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Menu du déjeuner à Barcelone
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Cuisine italienne maison à 14,90 €
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Vous cherchez un endroit où déjeuner à proximité, dans le quartier de l&apos;Eixample à Barcelone ? Tous les midis, nous vous proposons notre menu du jour composé de pâtes fraîches, de pizzas napolitaines et de plats faits maison du sud de l&apos;Italie. Rapide, authentique et d&apos;un excellent rapport qualité-prix.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/fr/reserver-une-table"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Réserver pour le déjeuner
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

        {/* What's included */}
        <section className="relative overflow-hidden bg-cream px-6 pt-24 pb-6 md:pt-32 md:pb-8">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Ce qui est inclus
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Un menu complet à{" "}
                <span className="whitespace-nowrap">€14.90</span>
              </h2>
              <p className="mt-3 font-serif text-base italic text-ink-soft/70">
                Supplément de 10 % pour les tables en terrasse
              </p>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Entrée, plat principal, pain, une boisson et un dessert. Une cuisine italienne maison, conçue pour bien manger et retourner au travail à l&apos;heure.
              </p>
            </Reveal>
          </div>
        </section>

        {/* This week's menu (updates from src/data/menuDelDia.ts) */}
        <MenuSemanal lang="fr" />

        {/* Pay with meal-voucher cards */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-4 md:pb-28">
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="mx-auto max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                Nous acceptons les chèques-restaurant Ticket Restaurant® et Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                Vous payez avec votre carte de restauration d&apos;entreprise ? Chez Positano, vous pouvez régler votre menu du jour avec Ticket Restaurant®, Edenred et d&apos;autres titres-restauration. L&apos;endroit idéal pour votre pause déjeuner dans l&apos;Eixample.
              </p>
              <PaymentLogos lang="fr" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="fr" offset={6} limit={12} />

        {/* Frequently asked questions */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Foire aux questions
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Le menu du déjeuner, en détail
              </h2>
            </Reveal>

            <Reveal className="mt-14">
              <div className="divide-y divide-ink/15 border-y border-ink/15">
                {faqs.map((item) => (
                  <details key={item.q} className="group px-1 py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl leading-snug text-ink transition-colors hover:text-lemon md:text-2xl [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="relative mt-1 h-4 w-4 shrink-0">
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-lemon" />
                        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-lemon transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                      </span>
                    </summary>
                    <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hours & location */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Horaires du menu du jour
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Du mardi au vendredi à midi
                </h2>
                <ul className="mx-auto mt-8 max-w-md space-y-2.5">
                  {hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-between"
                    >
                      <span className="font-serif text-lg text-ink">
                        {row.day}
                      </span>
                      <span className="font-serif text-base text-ink-soft sm:text-lg">
                        {row.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Où nous trouver
                </h3>
                <a
                  href={PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                >
                  Carrer del Rosselló, 24 · 08029 · Eixample, Barcelone
                </a>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="/fr/reserver-une-table"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Réserver pour le déjeuner
                  </a>
                  <a
                    href="tel:+34933515913"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Appelez-nous
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="fr" />
    </>
  );
}
