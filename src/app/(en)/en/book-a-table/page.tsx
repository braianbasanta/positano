import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

const DISH_ID = "hydra-e271f889-46d4-4929-baba-ef5fe752476a";
const DISH_WIDGET_URL = `https://reservation.dish.co/widget/${DISH_ID}?eid=${DISH_ID}&tagid=hors-${DISH_ID}&width=100%25`;

export const metadata: Metadata = {
  title: "Book a Table · Positano — Neapolitan Pizzeria in Barcelona",
  description:
    "Book your table at Positano, a Neapolitan pizzeria in the heart of the Eixample, Barcelona. Choose date, time and party size — instant online confirmation.",
  alternates: alternatesForEn("/en/book-a-table"),
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
      <SiteHeader lang="en" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
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
              Choose the date, time and number of guests. You'll receive your
              confirmation right away.
            </p>
          </div>
        </section>

        {/* DISH widget */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="border border-ink/15 bg-cream/40 p-2 sm:p-4 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Book a table at Positano"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
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
      </main>
      <Script src="https://reservation.dish.co/widget.js" strategy="lazyOnload" />
      <SiteFooter lang="en" />
    </>
  );
}
