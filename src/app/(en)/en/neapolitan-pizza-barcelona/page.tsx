import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Neapolitan Pizza in Barcelona · Positano Pizzeria",
  description:
    "Positano is an authentic Neapolitan pizzeria in Barcelona. Recipes from Campania, 48-hour fermented dough, wood-fired oven and Italian DOP ingredients.",
  alternates: alternatesForEn("/en/neapolitan-pizza-barcelona"),
};

const faqs = [
  {
    q: "Where can I find an authentic Neapolitan restaurant in Barcelona?",
    a: "Positano is a Neapolitan restaurant in the Eixample district of Barcelona (Carrer del Rosselló, 24). It is run by three Neapolitans from Campania who cook just like they do in Naples: pizza with 48-hour fermented dough baked in a wood-fired oven, homemade fresh pasta and antipasti made with Italian DOP produce.",
  },
  {
    q: "What sets a Neapolitan pizzeria apart from a regular pizzeria?",
    a: "Real Neapolitan pizza is defined by its long-fermented dough (48 hours), a wood-fired oven at 400 °C that bakes it in under 90 seconds, and the tall, airy crust — the cornicione — with its characteristic leopard spots. At Positano we follow that tradition without shortcuts.",
  },
  {
    q: "Is Positano a good Italian restaurant in Barcelona?",
    a: "Yes. Beyond Neapolitan pizza, Positano serves southern Italian cuisine: fresh pasta, antipasti, salads and homemade desserts, with recipes brought directly from Campania. An Italian restaurant in the heart of Barcelona's Eixample.",
  },
  {
    q: "Who is behind Positano?",
    a: "Positano was founded by Antonio, Massimo and Vincenzo, three Neapolitans from Campania who brought the recipes of their homeland to Barcelona. Italians cooking the way it's done in Naples, with no adaptations and no shortcuts.",
  },
  {
    q: "Does Positano deliver Neapolitan pizza?",
    a: "Yes, we deliver our Neapolitan pizza, fresh pasta and antipasti in Barcelona via Uber Eats and Glovo. We also accept Ticket Restaurant®.",
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

const keys = [
  {
    title: "48-hour fermented dough",
    text: "We let the dough rest for 48 hours to achieve a lighter, more digestible pizza with the airy crust — the cornicione — typical of Naples.",
  },
  {
    title: "Wood-fired oven at 400 °C",
    text: "Each pizza is baked in under 90 seconds in a wood-fired oven, as Neapolitan tradition demands. That's how you get the leopard-spotted crust and the molten centre.",
  },
  {
    title: "Italian DOP ingredients",
    text: "San Marzano tomato, Campania fior di latte, buffalo mozzarella DOP, 24-month grana padano. Authentic produce brought from Italy, no shortcuts.",
  },
];

export default function NeapolitanPizzaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Neapolitan pizza", path: "/en/neapolitan-pizza-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="en" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              The real pizza of Naples
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Neapolitan pizza in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              From Campania to the Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              At Positano we don't make just any pizza: we make authentic
              Neapolitan pizza, with the recipes we brought from southern Italy,
              48-hour fermented dough and a wood-fired oven. The real taste of
              Naples, in the heart of Barcelona.
            </p>
          </div>
        </section>

        {/* Our story */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Our story
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Three Neapolitans in Barcelona
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                It all begins with Antonio, Massimo and Vincenzo, born and raised
                in Campania, the region where pizza was born. There they learned,
                from a young age, that cooking is the soul of the home.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                After years perfecting the craft, they brought the recipes of
                their homeland to Barcelona. And so Positano was born: a
                Neapolitan pizzeria where the cuisine of southern Italy is served
                exactly as it's made in Naples, with no adaptations and no
                shortcuts.
              </p>
              <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
                “A passion for good food runs in our veins.”
              </p>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
                <Image
                  src="/hero/positano.jpg"
                  alt="Positano, Neapolitan pizzeria in Barcelona with recipes brought from Campania"
                  width={1400}
                  height={933}
                  className="relative aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* What makes it authentic */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                What makes it authentic
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Real Neapolitan pizza
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Real Neapolitan pizza is never improvised. These are the three
                things that set it apart from any other pizza in Barcelona.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {keys.map((key, index) => (
                <Reveal key={key.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {key.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {key.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/en/menu"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                See our pizzas
              </a>
              <a
                href="/en/book-a-table"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Book a table
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="en" offset={18} limit={12} />

        {/* Frequently asked questions */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Frequently asked questions
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Neapolitan restaurant in Barcelona
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
                    <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
