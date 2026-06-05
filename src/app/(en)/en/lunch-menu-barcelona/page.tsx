import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import PaymentLogos from "@/components/PaymentLogos";
import Resenas from "@/components/Resenas";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const INSTAGRAM_URL = "https://instagram.com/positanopizzeriabcn/";

export const metadata: Metadata = {
  title: "Lunch Menu in Barcelona · Positano — Eixample",
  description:
    "Menu of the day at Positano, an Italian pizzeria in the Eixample, Barcelona, for €14.90. Homemade food Tuesday to Friday. We accept Ticket Restaurant®.",
  alternates: alternatesForEn("/en/lunch-menu-barcelona"),
};

const hours = [
  { day: "Tuesday to Thursday", time: "1:00 – 4:00 pm" },
  { day: "Friday", time: "1:00 – 4:00 pm" },
  { day: "Saturday & Sunday", time: "Full à la carte menu" },
  { day: "Monday", time: "Closed" },
];

const faqs = [
  {
    q: "How much does the lunch menu cost?",
    a: "The lunch menu costs €14.90 and includes a starter, main course, bread, a drink and dessert. A 10% supplement applies for terrace seating.",
  },
  {
    q: "Which days is the lunch menu available?",
    a: "We serve the lunch menu Tuesday to Friday at midday, from 1:00 to 4:00 pm. On Saturdays and Sundays we work from the full à la carte menu, and on Mondays we are closed.",
  },
  {
    q: "Do you accept Ticket Restaurant® or Edenred for the lunch menu?",
    a: "Yes. You can pay for your lunch menu with Ticket Restaurant®, Edenred and other meal vouchers. The perfect spot for your midday break in the Eixample.",
  },
  {
    q: "Does the lunch menu change every week?",
    a: "Yes, we renew it every week with homemade dishes from southern Italy: pasta such as rigatoni al pesto, salads, meat or fish mains and a Neapolitan pizza of your choice (Margherita, Diavola, Ortolana and more).",
  },
  {
    q: "Do I need to book for the lunch menu?",
    a: "It is not essential, but the Eixample fills up at midday: if you are coming in a group or are short on time, we recommend booking online or calling +34 933 51 59 13.",
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

export default function LunchMenuPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Menu of the day", path: "/en/lunch-menu-barcelona" },
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
              Lunch in the Eixample
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Menu of the day
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Homemade Italian food for €14.90
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Looking for where to have lunch nearby, in the Eixample of
              Barcelona? Every midday we serve our menu of the day with fresh
              pasta, Neapolitan pizza and homemade dishes from southern Italy.
              Fast, authentic and great value.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/en/book-a-table"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Book for lunch
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/en/menu"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                View the menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                What's included
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                A complete menu for €14.90
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Starter, main, bread, a drink and dessert. Homemade Italian
                cuisine, made to eat well and get back to work on time.
              </p>
            </Reveal>

            <Reveal
              delay={120}
              className="mt-12 flex flex-col items-center gap-7 border border-ink/15 bg-cream/55 px-8 py-12 text-center sm:px-14"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[0.78rem] uppercase tracking-[0.28em] text-ink-soft/70">
                  Menu of the day
                </span>
                <span className="font-display text-6xl leading-none text-ink md:text-7xl">
                  €14.90
                </span>
                <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-soft/70">
                  Drink and dessert included
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-ink/15" />
                <Lemon className="h-5 w-5 text-lemon" />
                <span className="h-px w-10 bg-ink/15" />
              </div>

              <p className="max-w-md font-serif text-base leading-relaxed text-ink-soft">
                We change the menu every week with fresh market produce. We post
                each day's dishes on our Instagram stories — take a look before
                you come.
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream shadow-[0_10px_28px_rgba(29,39,80,0.25)] transition-all duration-300 hover:bg-lemon hover:text-ink"
              >
                See the menu of the day on Instagram
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>

            <Reveal className="mx-auto mt-14 max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                We accept Ticket Restaurant® and Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                Paying with your company meal card? At Positano you can pay for
                your menu of the day with Ticket Restaurant®, Edenred and other meal
                vouchers. The perfect spot for your midday break in the Eixample.
              </p>
              <PaymentLogos lang="en" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="en" offset={6} limit={12} />

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
                The lunch menu, in detail
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
                  Menu of the day hours
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Tuesday to Friday at midday
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
                  Where we are
                </h3>
                <a
                  href={PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                >
                  Carrer del Rosselló, 24 · 08029 · Eixample, Barcelona
                </a>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="/en/book-a-table"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Book for lunch
                  </a>
                  <a
                    href="tel:+34933515913"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Call us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
