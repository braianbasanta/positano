import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import DishReservationTracker from "@/components/DishReservationTracker";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn, socialFor } from "@/lib/i18n";
import { DISH_WIDGET_URL } from "@/lib/dish";

const title = "Book a Table · Pizzeria in the Eixample · Positano BCN";
const description =
  "Book your table at Positano, a Neapolitan pizzeria in the heart of the Eixample, Barcelona. Choose date, time and party size — instant online confirmation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForEn("/en/book-a-table"),
  ...socialFor({ title, description, path: "/en/book-a-table", locale: "en" }),
};

const faqs = [
  {
    q: "Do I need to book to eat at Positano?",
    a: "It's not essential, but the Eixample fills up, especially at weekends and midday. Booking online guarantees your table at the time you want. You're also welcome to walk in and try your luck.",
  },
  {
    q: "Can I book for a large group?",
    a: "Yes. For larger groups we recommend booking ahead. If you're a big party or want a specific area, call us on +34 933 51 59 13 and we'll arrange it.",
  },
  {
    q: "Can I book a table on the terrace?",
    a: "We have a terrace and indoor tables. You can state your preference when booking; the terrace has a 10% supplement. Final seating depends on availability on the day.",
  },
  {
    q: "What are Positano's opening hours?",
    a: "We're open Tuesday to Sunday. Tuesday to Thursday 1:00–4:00 pm and 8:00–11:30 pm; Friday until midnight; Saturday 1:00 pm–12:00 am; Sunday 1:00–11:30 pm. Closed on Mondays.",
  },
  {
    q: "How do I change or cancel my booking?",
    a: "You'll get a confirmation email with options to change or cancel. If you have any trouble, call us on +34 933 51 59 13 and we'll help.",
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

export default function BookATablePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Book a table", path: "/en/book-a-table" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="en" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
          {/* Pizza photo behind the title ("something that makes you hungry",
              per Braian): ad visitors land here without seeing the home hero —
              the picture sells the place before the form asks for anything.
              Navy veil keeps the text readable. */}
          <Image
            src="/hero/pizza-berenjena-entera.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_60%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(29,39,80,0.92)_0%,rgba(29,39,80,0.62)_52%,rgba(29,39,80,0.94)_100%)]" />
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Reservations
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Book a table
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Choose the date, time and number of guests. You&apos;ll receive your
              confirmation right away.
            </p>
          </div>
        </section>

        {/* DISH widget */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(29,39,80,0.35)] sm:p-5 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Book a table at Positano"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
              <DishReservationTracker />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              Having trouble with your booking? Call us on{" "}
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
              Booking a table at Positano, a Neapolitan pizzeria in the heart of
              the Eixample, is easy: pick your date, time and party size and
              you&apos;ll get an instant confirmation. We&apos;ll be waiting for you at
              Carrer del Rosselló, 24, for Neapolitan pizza with 48-hour fermented
              dough, fresh pasta and antipasti.
            </p>

            <h2 className="mt-14 text-center font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Questions about your booking
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
      <SiteFooter lang="en" />
    </>
  );
}
