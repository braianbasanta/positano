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
import { goldCta3d } from "@/lib/ui";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=en&output=embed";

const title = "Restaurant italien dans l'Eixample · Pâte fermentée 48 h · Positano";
const description =
  "Positano est une pizzeria napolitaine et un restaurant italien situé dans le quartier de l'Eixample, à Barcelone. Au menu : des pizzas cuites au feu de bois pendant 48 heures, des pâtes fraîches et des antipasti. Réservez une table.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("eixample", "fr"),
  ...socialFor({
    title,
    description,
    path: "/fr/restaurant-italien-eixample",
    locale: "fr",
  }),
};

const reasons = [
  {
    title: "Une authentique pizza napolitaine",
    text: "Pâte fermentée pendant 48 heures, cuite au feu de bois et préparée avec des ingrédients italiens AOP. Une pizza napolitaine à Barcelone, exactement comme à Naples.",
  },
  {
    title: "La véritable cuisine italienne",
    text: "Des pâtes fraîches maison, des antipasti, des risottos et des plats principaux préparés chaque jour par nos chefs originaires de Campanie.",
  },
  {
    title: "En plein cœur de l'Eixample",
    text: "Un petit coin de la Côte amalfitaine au cœur de l'Eixample, à Barcelone — l'endroit idéal pour déjeuner, dîner ou prendre un verre au bar.",
  },
  {
    title: "Géré par des Napolitains",
    text: "Le restaurant Positano est dirigé par trois Napolitains originaires de Campanie. Des Italiens qui cuisinent pour que vous mangiez comme si vous étiez dans le sud de l'Italie — sans compromis, sans prendre de raccourcis.",
  },
];

// Real dishes from the menu, most mentioned by our guests.
const dishes = [
  {
    cat: "De la pizzeria napolitaine",
    items:
      "Margherita, Diavola, Bufala et Ortolana, toutes préparées avec une pâte reposée 48 heures et dotées d'un véritable cornicione. Provola e Peppe et Siciliana pour ceux qui souhaitent quelque chose de plus.",
  },
  {
    cat: "Pâtes fraîches faites maison",
    items:
      "Une carbonara comme il se doit — sans crème ; des lasagnes traditionnelles ; des paccheri à la génoise ; des scialatelli au homard ; et des gnocchi à la sorrentine.",
  },
  {
    cat: "Antipasti et assiettes à partager",
    items:
      "Burrata des Pouilles, provolone cuit au four pour y tremper du pain, parmigiana d'aubergines et notre sélection d'entrées du sud de l'Italie.",
  },
  {
    cat: "Desserts faits maison",
    items:
      "Tiramisu classique, panna cotta et spécialités telles que le tiramisu à la pistache. La touche italienne qui conclura votre repas en beauté.",
  },
];

// Verified answers, focused on the Eixample location.
const faqs = [
  {
    q: "Où se trouve le restaurant italien dans l'Eixample ?",
    a: "Nous sommes situés au 24, Carrer del Rosselló, en plein cœur de l'Eixample à Barcelone (08029), entre le Passeig de Gràcia et la Sagrada Família. Vous pouvez nous joindre au +34 933 51 59 13.",
  },
  {
    q: "Quel type de plats servez-vous ?",
    a: "Pizza napolitaine à base d'une pâte fermentée pendant 48 heures, cuite au four à bois avec des ingrédients italiens AOP, ainsi que des pâtes fraîches maison, des antipasti, des salades et des desserts maison du sud de l'Italie.",
  },
  {
    q: "Puis-je réserver une table ?",
    a: "Oui, vous pouvez réserver en ligne avec confirmation immédiate depuis notre page de réservations, ou en appelant le +34 933 51 59 13. Le week-end, nous vous recommandons de réserver à l'avance.",
  },
  {
    q: "Proposez-vous des plats végétariens ?",
    a: "Oui : la pizza Ortolana, la Bufala, les lasagnes végétariennes, les salades et les antipasti, comme la parmigiana d'aubergines et la burrata.",
  },
  {
    q: "Livrez-vous des pizzas dans le quartier de l'Eixample ?",
    a: "Oui, nous livrons nos pizzas napolitaines, nos pâtes fraîches et nos antipasti dans toute la ville de Barcelone via Uber Eats et Glovo. Nous acceptons également les chèques-restaurant®.",
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

const hours = [
  { day: "lundi", time: "Fermé" },
  { day: "Du mardi au jeudi", time: "13 h – 16 h · 20 h – 23 h 30" },
  { day: "Vendredi", time: "13 h – 16 h · 20 h – minuit" },
  { day: "samedi", time: "13 h – minuit" },
  { day: "dimanche", time: "23 h 00 – 23 h 30" },
];

export default function ItalianRestaurantEixampleFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          {
            name: "Restaurant italien dans l'Eixample",
            path: "/fr/restaurant-italien-eixample",
          },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="fr" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Dans l&apos;Eixample, à Barcelone
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Restaurant italien dans l&apos;Eixample
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Pizzeria napolitaine à Barcelone
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano est une pizzeria napolitaine et un restaurant italien situé au cœur de l&apos;Eixample. Des pizzas cuites au feu de bois après 48 heures de fermentation, des pâtes fraîches et le meilleur de la cuisine italienne à Barcelone : les saveurs de Naples, juste au coin de la rue.
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

        {/* Why Positano */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Pourquoi Positano ?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La pizzeria napolitaine de l&apos;Eixample
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Si vous recherchez un restaurant italien dans l&apos;Eixample ou une pizzeria à Barcelone, vous trouverez chez Positano une cuisine du sud de l&apos;Italie préparée à partir de produits authentiques et avec beaucoup de passion.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
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

        {/* Our kitchen */}
        <section className="relative overflow-hidden bg-ink px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-12 h-80 w-auto rotate-[150deg] text-lemon/15" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Notre cuisine
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Bien plus qu&apos;une simple pizzeria italienne à Barcelone
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                Dans notre restaurant italien de l&apos;Eixample, vous découvrirez toute la gamme des spécialités du sud de l&apos;Italie : des pizzas napolitaines cuites au feu de bois aux pâtes fraîches maison, en passant par les antipasti et les desserts italiens. C&apos;est ce qui incite nos clients à revenir sans cesse.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {dishes.map((dish, index) => (
                <Reveal key={dish.cat} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-cream/15 bg-cream/[0.04] p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-lemon">
                      {dish.cat}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-cream/80">
                      {dish.items}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/fr/carte"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Consultez le menu complet
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="fr" offset={0} limit={12} />

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
                La pizzeria de l&apos;Eixample, en détail
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

        {/* Where we are */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Où nous trouver
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Notre restaurant dans l&apos;Eixample
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                Vous nous trouverez au 24, rue del Rosselló, en plein cœur de l&apos;Eixample à Barcelone. Venez déjeuner ou dîner et déguster la meilleure pizza napolitaine de la ville, ou passez simplement prendre un verre au bar.
              </p>
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
              {/* Info */}
              <Reveal className="order-2 md:order-1">
                <div className="flex h-full flex-col justify-center gap-10 border border-ink/15 bg-cream px-8 py-12 text-center">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Adresse
                    </h3>
                    <a
                      href={PLACE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      24, rue du Rosselló
                      <br />
                      08029 · Eixample, Barcelone
                    </a>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Horaires d&apos;ouverture
                    </h3>
                    {hours.map((row) => (
                      <div
                        key={row.day}
                        className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-center"
                      >
                        <span className="font-serif text-lg text-ink">
                          {row.day}
                        </span>
                        <span className="hidden text-ink-soft/40 sm:inline">
                          ·
                        </span>
                        <span className="font-serif text-base text-ink-soft sm:text-lg">
                          {row.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Contact
                    </h3>
                    <a
                      href="tel:+34933515913"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      +34 933 515 913
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Map */}
              <Reveal delay={120} className="order-1 md:order-2 md:h-full">
                <div className="relative h-[360px] overflow-hidden border border-ink/15 md:h-full">
                  <iframe
                    src={MAP_EMBED}
                    title="Emplacement de la pizzeria Positano dans le quartier de l'Eixample, à Barcelone"
                    className="block h-full w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="fr" />
    </>
  );
}
