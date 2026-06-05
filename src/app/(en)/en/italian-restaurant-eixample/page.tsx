import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import Resenas from "@/components/Resenas";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=en&output=embed";

export const metadata: Metadata = {
  title: "Italian Restaurant in the Eixample · Positano — Barcelona",
  description:
    "Positano is a Neapolitan pizzeria and Italian restaurant in the Eixample, Barcelona. 48-hour wood-fired pizza, fresh pasta and antipasti. Book a table.",
  alternates: alternatesForEn("/en/italian-restaurant-eixample"),
};

const reasons = [
  {
    title: "Authentic Neapolitan pizza",
    text: "48-hour fermented dough, wood-fired and made with Italian DOP ingredients. Neapolitan pizza in Barcelona, just like in Naples.",
  },
  {
    title: "Real Italian cuisine",
    text: "Homemade fresh pasta, antipasti, risotti and mains prepared every day by our Campania-born chefs.",
  },
  {
    title: "Right in the Eixample",
    text: "A corner of the Amalfi Coast in the heart of the Eixample, Barcelona — perfect for lunch, dinner or a drink at the bar.",
  },
  {
    title: "Run by Neapolitans",
    text: "Positano is led by three Neapolitans from Campania. Italians cooking so you eat like you're in the south of Italy — no shortcuts, no shortcuts taken.",
  },
];

// Real dishes from the menu, most mentioned by our guests.
const dishes = [
  {
    cat: "From the Neapolitan pizzeria",
    items:
      "Margherita, Diavola, Bufala and Ortolana, all made with 48-hour dough and a proper cornicione. Provola e Peppe and Siciliana for those after something more.",
  },
  {
    cat: "Homemade fresh pasta",
    items:
      "Carbonara the right way — no cream; traditional lasagne; paccheri alla genovese; scialatelli with lobster; and gnocchi alla sorrentina.",
  },
  {
    cat: "Antipasti and sharing plates",
    items:
      "Burrata pugliese, oven-baked provolone for dipping bread, aubergine parmigiana and our selection of starters from southern Italy.",
  },
  {
    cat: "Homemade desserts",
    items:
      "Classic tiramisù, panna cotta and specials like pistachio tiramisù. The Italian ending your meal deserves.",
  },
];

// Verified answers, focused on the Eixample location.
const faqs = [
  {
    q: "Where is the Italian restaurant in the Eixample?",
    a: "We are at Carrer del Rosselló, 24, right in the Eixample of Barcelona (08029), between Passeig de Gràcia and the Sagrada Família. You can call us on +34 933 51 59 13.",
  },
  {
    q: "What kind of food do you serve?",
    a: "Neapolitan pizza made with 48-hour fermented dough, baked in a wood-fired oven with Italian DOP ingredients, plus homemade fresh pasta, antipasti, salads and homemade desserts from southern Italy.",
  },
  {
    q: "Can I book a table?",
    a: "Yes — you can book online with instant confirmation from our reservations page, or by calling +34 933 51 59 13. On weekends we recommend booking ahead.",
  },
  {
    q: "Do you have vegetarian options?",
    a: "Yes: the Ortolana pizza, the Bufala, vegetarian lasagne, salads and antipasti such as the aubergine parmigiana and burrata.",
  },
  {
    q: "Do you deliver pizza to the Eixample?",
    a: "Yes, we deliver our Neapolitan pizza, fresh pasta and antipasti across Barcelona via Uber Eats and Glovo. We also accept Ticket Restaurant®.",
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
  { day: "Monday", time: "Closed" },
  { day: "Tuesday to Thursday", time: "1:00 – 4:00 pm · 8:00 – 11:30 pm" },
  { day: "Friday", time: "1:00 – 4:00 pm · 8:00 pm – 12:00 am" },
  { day: "Saturday", time: "1:00 pm – 12:00 am" },
  { day: "Sunday", time: "1:00 – 11:30 pm" },
];

export default function ItalianRestaurantEixamplePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          {
            name: "Italian restaurant in the Eixample",
            path: "/en/italian-restaurant-eixample",
          },
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
              In the Eixample, Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Italian restaurant in the Eixample
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Neapolitan pizzeria in Barcelona
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano is a Neapolitan pizzeria and Italian restaurant in the
              heart of the Eixample. 48-hour fermented wood-fired pizza, fresh
              pasta and the best Italian cuisine in Barcelona — the taste of
              Naples, right around the corner.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/en/book-a-table"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Book a table
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

        {/* Why Positano */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Why Positano
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                The Neapolitan pizzeria of the Eixample
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                If you're looking for an Italian restaurant in the Eixample or a
                pizzeria in Barcelona, at Positano you'll find southern Italian
                cuisine made with authentic produce and a lot of passion.
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
                Our kitchen
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Much more than an Italian pizzeria in Barcelona
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                At our Italian restaurant in the Eixample you'll find the full
                menu of southern Italy: from Neapolitan wood-fired pizza to
                homemade fresh pasta, antipasti and Italian desserts. This is
                what our guests keep coming back for.
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
                href="/en/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                View the full menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="en" offset={0} limit={12} />

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
                The Eixample pizzeria, in detail
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
                Where we are
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Our restaurant in the Eixample
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                You'll find us at Carrer del Rosselló, 24, right in the Eixample
                of Barcelona. Come for lunch or dinner and enjoy the best
                Neapolitan pizza in the city, or drop by for a drink at the bar.
              </p>
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
              {/* Info */}
              <Reveal className="order-2 md:order-1">
                <div className="flex h-full flex-col justify-center gap-10 border border-ink/15 bg-cream px-8 py-12 text-center">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Address
                    </h3>
                    <a
                      href={PLACE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      Carrer del Rosselló, 24
                      <br />
                      08029 · Eixample, Barcelona
                    </a>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Opening hours
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
                    title="Location of Positano Pizzería in the Eixample, Barcelona"
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
                href="/en/book-a-table"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Book a table
              </a>
              <a
                href="/en/pizza-delivery-barcelona"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Order delivery
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
