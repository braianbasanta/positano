import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import DishReservationTracker from "@/components/DishReservationTracker";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { DISH_WIDGET_URL } from "@/lib/dish";

const title = "Réserver une table · Pizzeria dans l'Eixample · Positano BCN";
const description =
  "Réservez votre table au Positano, une pizzeria napolitaine située au cœur de l'Eixample, à Barcelone. Choisissez la date, l'heure et le nombre de convives — confirmation en ligne immédiate.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("reservas", "fr"),
  ...socialFor({ title, description, path: "/fr/reserver-une-table", locale: "fr" }),
};

const faqs = [
  {
    q: "Faut-il réserver pour manger au Positano ?",
    a: "Ce n'est pas indispensable, mais le restaurant Eixample est souvent complet, surtout le week-end et à midi. En réservant en ligne, vous êtes assuré d'avoir une table à l'heure qui vous convient. Vous pouvez également vous présenter sur place et tenter votre chance.",
  },
  {
    q: "Puis-je réserver pour un groupe important ?",
    a: "Oui. Pour les groupes plus importants, nous vous recommandons de réserver à l'avance. Si vous êtes nombreux ou si vous souhaitez disposer d'un espace spécifique, appelez-nous au +34 933 51 59 13 et nous nous chargerons de tout organiser.",
  },
  {
    q: "Puis-je réserver une table en terrasse ?",
    a: "Nous disposons d'une terrasse et de tables à l'intérieur. Vous pouvez indiquer votre préférence lors de la réservation ; un supplément de 10 % s'applique pour la terrasse. L'attribution définitive des places dépendra des disponibilités du jour.",
  },
  {
    q: "Quelles sont les heures d'ouverture de Positano ?",
    a: "Nous sommes ouverts du mardi au dimanche. Du mardi au jeudi, de 13 h à 16 h et de 20 h à 23 h 30 ; le vendredi jusqu'à minuit ; le samedi, de 13 h à minuit ; le dimanche, de 13 h à 23 h 30. Fermé le lundi.",
  },
  {
    q: "Comment puis-je modifier ou annuler ma réservation ?",
    a: "Vous recevrez un e-mail de confirmation vous proposant de modifier ou d'annuler votre réservation. En cas de problème, n'hésitez pas à nous appeler au +34 933 51 59 13 et nous vous aiderons.",
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

export default function BookATableFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          { name: "Réserver une table", path: "/fr/reserver-une-table" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="fr" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Réservations
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Réserver une table
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Choisissez la date, l&apos;heure et le nombre d&apos;invités. Vous recevrez immédiatement votre confirmation.
            </p>
          </div>
        </section>

        {/* DISH widget */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(29,39,80,0.35)] sm:p-5 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Réservez une table au Positano"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
              <DishReservationTracker />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              Vous rencontrez des difficultés avec votre réservation ? Appelez-nous au{" "}
              <a
                href="tel:+34933515913"
                className="text-ink underline-offset-4 transition-colors hover:text-lemon hover:underline"
              >
                +34 933 515 913
              </a>
              .
            </p>
          </div>
        </section>

        {/* About your booking + FAQ */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-2 md:pb-28">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-center font-serif text-lg leading-relaxed text-ink-soft">
              Réserver une table chez Positano, une pizzeria napolitaine située au cœur de l&apos;Eixample, est très simple : choisissez la date, l&apos;heure et le nombre de convives, et vous recevrez une confirmation immédiate. Nous vous attendons au 24, rue del Rosselló, pour vous faire découvrir nos pizzas napolitaines à la pâte fermentée pendant 48 heures, nos pâtes fraîches et nos antipasti.
            </p>

            <h2 className="mt-14 text-center font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Questions concernant votre réservation
            </h2>
            <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
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
          </div>
        </section>
      </main>
      <Script src="https://reservation.dish.co/widget.js" strategy="lazyOnload" />
      <SiteFooter lang="fr" />
    </>
  );
}
