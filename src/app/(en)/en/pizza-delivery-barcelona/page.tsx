import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

const UBER_EATS =
  "https://www.ubereats.com/es/store/positano-pizzeria/ciPAhMptSOeZGNeUsyhjKA";
const GLOVO =
  "https://glovoapp.com/en/es/barcelona/stores/positano-pizzeria-barcelona";

export const metadata: Metadata = {
  title: "Pizza Delivery in Barcelona · Positano Neapolitan Pizza",
  description:
    "Order pizza delivery in Barcelona the easy way. We bring Positano's Neapolitan pizza, fresh pasta and antipasti to your home. Order online in minutes.",
  alternates: alternatesForEn("/en/pizza-delivery-barcelona"),
};

const steps = [
  {
    number: "01",
    title: "Choose your dishes",
    text: "Open our delivery menu on Uber Eats or Glovo and build your order: Neapolitan pizza, fresh pasta, antipasti and much more.",
  },
  {
    number: "02",
    title: "Confirm and pay",
    text: "Enter your Barcelona address and pay securely. We also accept Ticket Restaurant®.",
  },
  {
    number: "03",
    title: "We bring it to you",
    text: "We bake your pizza fresh and a rider brings it hot to your door, wherever you are.",
  },
];

const hours = [
  { day: "Tuesday to Thursday", time: "1:00 – 4:00 pm · 8:00 – 11:30 pm" },
  { day: "Friday", time: "1:00 – 4:00 pm · 8:00 pm – 12:00 am" },
  { day: "Saturday", time: "1:00 pm – 12:00 am" },
  { day: "Sunday", time: "1:00 – 11:30 pm" },
  { day: "Monday", time: "Closed" },
];

export default function PizzaDeliveryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Pizza delivery", path: "/en/pizza-delivery-barcelona" },
        ])}
      />
      <SiteHeader lang="en" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Delivery across Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizza delivery
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              We bring the pizza to your home
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              48-hour fermented Neapolitan pizza, fresh pasta and our antipasti —
              freshly made and ready to enjoy at home. Ordering pizza delivery in
              Barcelona has never been easier: order online and we'll bring it
              hot to your door.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Order on Uber Eats
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
                Order on Glovo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                How it works
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Ordering pizza online is this easy
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Three steps between you and a freshly baked Neapolitan pizza at
                home. No calls, no waiting.
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

        {/* Platform */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Home delivery
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Order your pizza on Uber Eats or Glovo
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                  Our whole menu of Neapolitan pizza, fresh pasta and antipasti,
                  ready to deliver to your home anywhere in Barcelona. Pick your
                  favourite platform — you'll see the exact delivery radius when
                  you enter your address.
                </p>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Delivery hours
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {hours.map((item) => (
                    <li key={item.day} className="font-serif text-lg text-ink-soft">
                      <span className="text-ink">{item.day}</span> · {item.time}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.84rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span>We accept Ticket Restaurant®</span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={UBER_EATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Order on Uber Eats
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
                    Order on Glovo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-lg italic text-ink-soft">
                Prefer to enjoy Positano at the table?
              </p>
              <a
                href="/en/book-a-table"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Book a table
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
