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

const UBER_EATS =
  "https://www.ubereats.com/es/store/positano-pizzeria/ciPAhMptSOeZGNeUsyhjKA";
const GLOVO =
  "https://glovoapp.com/en/es/barcelona/stores/positano-pizzeria-barcelona";

const title = "Livraison de pizzas napolitaines · Eixample · Positano BCN";
const description =
  "Commandez une pizza à domicile à Barcelone en toute simplicité. Nous vous livrons à domicile les pizzas napolitaines, les pâtes fraîches et les antipasti de Positano. Commandez en ligne en quelques minutes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("domicilio", "fr"),
  ...socialFor({
    title,
    description,
    path: "/fr/livraison-pizza-barcelone",
    locale: "fr",
  }),
};

const steps = [
  {
    number: "01",
    title: "Choisissez vos plats",
    text: "Consultez notre menu de livraison sur Uber Eats ou Glovo et composez votre commande : pizza napolitaine, pâtes fraîches, antipasti et bien plus encore.",
  },
  {
    number: "02",
    title: "Valider et payer",
    text: "Indiquez votre adresse à Barcelone et effectuez votre paiement en toute sécurité. Nous acceptons également les chèques-repas Ticket Restaurant®.",
  },
  {
    number: "03",
    title: "Nous vous le proposons",
    text: "Nous préparons votre pizza sur place et un livreur vous l'apporte toute chaude à votre porte, où que vous soyez.",
  },
];

const hours = [
  { day: "Du mardi au jeudi", time: "13 h – 16 h · 20 h – 23 h 30" },
  { day: "Vendredi", time: "13 h – 16 h · 20 h – minuit" },
  { day: "samedi", time: "13 h – minuit" },
  { day: "dimanche", time: "23 h 00 – 23 h 30" },
  { day: "lundi", time: "Fermé" },
];

const faqs = [
  {
    q: "Comment puis-je commander une pizza à livrer depuis Positano ?",
    a: "Passez votre commande en ligne sur Uber Eats ou Glovo. Choisissez vos plats, indiquez votre adresse à Barcelone et nous vous les livrerons tout juste préparés.",
  },
  {
    q: "Dans quels quartiers de Barcelone effectuez-vous des livraisons ?",
    a: "Nous livrons dans toute la ville de Barcelone via Uber Eats et Glovo. Le rayon de livraison exact s'affichera lorsque vous saisirez votre adresse sur la plateforme.",
  },
  {
    q: "Que puis-je commander pour me faire livrer ?",
    a: "Notre carte complète : pizza napolitaine à fermentation lente de 48 heures, pâtes fraîches maison, antipasti et desserts. Le tout fraîchement préparé et prêt à déguster chez vous.",
  },
  {
    q: "Acceptez-vous les chèques Ticket Restaurant® pour les commandes à livrer ?",
    a: "Oui, nous acceptons également les Ticket Restaurant® pour les commandes à livrer, selon la plateforme que vous utilisez pour passer votre commande.",
  },
  {
    q: "Quelles sont vos heures de livraison ?",
    a: "Nous livrons du mardi au jeudi de 13 h à 16 h et de 20 h à 23 h 30, le vendredi jusqu'à minuit, le samedi de 13 h à minuit et le dimanche de 13 h à 23 h 30. Nous sommes fermés le lundi.",
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

export default function PizzaDeliveryFrPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/fr" },
          { name: "Livraison de pizzas à Barcelone", path: "/fr/livraison-pizza-barcelone" },
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
              Livraison dans toute la ville de Barcelone
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Livraison de pizzas à Barcelone
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Nous vous livrons la pizza à domicile
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Pizza napolitaine à la pâte fermentée pendant 48 heures, pâtes fraîches et nos antipasti — préparés sur place et prêts à être dégustés chez vous. Commander une pizza en livraison à Barcelone n&apos;a jamais été aussi simple : commandez en ligne et nous vous la livrerons toute chaude à votre porte.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Commander sur Uber Eats
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={GLOVO}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Commander sur Glovo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Comment cela fonctionne-t-il ?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Commander une pizza en ligne, c&apos;est aussi simple que ça
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Trois étapes suffisent pour déguster chez vous une pizza napolitaine tout juste sortie du four. Pas besoin d&apos;appeler, pas d&apos;attente.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <span className="font-display text-3xl text-lemon">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="fr" offset={12} limit={12} />

        {/* FAQ */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Foire aux questions
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La livraison de pizzas, en détail
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

        {/* Platform */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Livraison à domicile
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Commandez votre pizza sur Uber Eats ou Glovo
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                  Toute notre carte de pizzas napolitaines, de pâtes fraîches et d&apos;antipasti, à livrer chez vous partout à Barcelone. Choisissez votre plateforme préférée : vous verrez le rayon de livraison exact lorsque vous saisirez votre adresse.
                </p>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Horaires de livraison
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {hours.map((item) => (
                    <li key={item.day} className="font-serif text-lg text-ink-soft">
                      <span className="text-ink">{item.day}</span> · {item.time}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.84rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span>Nous acceptons les chèques-restaurant Ticket Restaurant®</span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={UBER_EATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Commander sur Uber Eats
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href={GLOVO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Commander sur Glovo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-lg italic text-ink-soft">
                Vous préférez découvrir Positano autour d&apos;un bon repas ?
              </p>
              <a
                href="/fr/reserver-une-table"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Réserver une table
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="fr" />
    </>
  );
}
