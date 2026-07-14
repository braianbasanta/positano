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

const title = "Italiaans restaurant in de wijk Eixample · 48h Dough · Positano";
const description =
  "Positano is een Napolitaanse pizzeria en Italiaans restaurant in de wijk Eixample in Barcelona. Pizza’s die 48 uur lang in een houtgestookte oven worden gebakken, verse pasta en antipasti. Reserveer een tafel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("eixample", "nl"),
  ...socialFor({
    title,
    description,
    path: "/nl/italiaans-restaurant-eixample",
    locale: "nl",
  }),
};

const reasons = [
  {
    title: "Echte Napolitaanse pizza",
    text: "48 uur gerijpt deeg, gebakken in een houtgestookte oven en gemaakt met Italiaanse DOP-ingrediënten. Napolitaanse pizza in Barcelona, net zoals in Napels.",
  },
  {
    title: "Echte Italiaanse keuken",
    text: "Zelfgemaakte verse pasta, antipasti, risotto’s en hoofdgerechten, elke dag vers bereid door onze uit Campanië afkomstige chef-koks.",
  },
  {
    title: "Midden in de wijk Eixample",
    text: "Een stukje van de Amalfikust in het hart van de wijk Eixample in Barcelona — perfect voor een lunch, diner of een drankje aan de bar.",
  },
  {
    title: "Gerund door Napolitanen",
    text: "Positano wordt gerund door drie Napolitanen uit Campanië. Italianen die koken, zodat je eet alsof je in Zuid-Italië bent — geen concessies, absoluut geen concessies.",
  },
];

// Real dishes from the menu, most mentioned by our guests.
const dishes = [
  {
    cat: "Uit de Napolitaanse pizzeria",
    items:
      "Margherita, Diavola, Bufala en Ortolana, allemaal gemaakt met een deeg dat 48 uur heeft gerijpt en een echte cornicione. Provola e Peppe en Siciliana voor wie zin heeft in iets extra’s.",
  },
  {
    cat: "Zelfgemaakte verse pasta",
    items:
      "Carbonara zoals het hoort — zonder room; traditionele lasagne; paccheri alla genovese; scialatelli met kreeft; en gnocchi alla sorrentina.",
  },
  {
    cat: "Antipasti en gerechten om te delen",
    items:
      "Burrata uit Apulië, in de oven gebakken provolone om brood in te dopen, aubergine parmigiana en onze selectie voorgerechten uit Zuid-Italië.",
  },
  {
    cat: "Zelfgemaakte toetjes",
    items:
      "Klassieke tiramisu, panna cotta en speciale varianten zoals tiramisu met pistache. De Italiaanse afsluiting die je maaltijd verdient.",
  },
];

// Verified answers, focused on the Eixample location.
const faqs = [
  {
    q: "Waar zit dat Italiaanse restaurant in de wijk Eixample?",
    a: "We zitten aan de Carrer del Rosselló 24, midden in de wijk Eixample in Barcelona (08029), tussen de Passeig de Gràcia en de Sagrada Família. Je kunt ons bellen op +34 933 51 59 13.",
  },
  {
    q: "Wat voor eten serveren jullie?",
    a: "Napolitaanse pizza gemaakt van deeg dat 48 uur heeft gerijpt, gebakken in een houtgestookte oven met Italiaanse DOP-ingrediënten, plus verse, zelfgemaakte pasta, antipasti, salades en zelfgemaakte desserts uit Zuid-Italië.",
  },
  {
    q: "Kan ik een tafel reserveren?",
    a: "Ja — je kunt online boeken met directe bevestiging via onze reserveringspagina, of door te bellen naar +34 933 51 59 13. In het weekend raden we je aan om van tevoren te reserveren.",
  },
  {
    q: "Hebben jullie vegetarische gerechten?",
    a: "Ja: de Ortolana-pizza, de Bufala, vegetarische lasagne, salades en antipasti zoals de aubergine parmigiana en burrata.",
  },
  {
    q: "Bezorgen jullie pizza in de wijk Eixample?",
    a: "Ja, we bezorgen onze Napolitaanse pizza’s, verse pasta en antipasti in heel Barcelona via Uber Eats en Glovo. We accepteren ook Ticket Restaurant®.",
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
  { day: "Maandag", time: "Gesloten" },
  { day: "Dinsdag tot en met donderdag", time: "13.00 – 16.00 uur · 20.00 – 23.30 uur" },
  { day: "vrijdag", time: "13.00 – 16.00 uur · 20.00 – 00.00 uur" },
  { day: "zaterdag", time: "13.00 uur – 00.00 uur" },
  { day: "zondag", time: "13.00 – 23.30 uur" },
];

export default function ItalianRestaurantEixampleNlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/nl" },
          {
            name: "Italiaans restaurant in de wijk Eixample",
            path: "/nl/italiaans-restaurant-eixample",
          },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="nl" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              In de wijk Eixample, Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Italiaans restaurant in de wijk Eixample
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Napolitaanse pizzeria in Barcelona
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano is een Napolitaanse pizzeria en Italiaans restaurant in het hart van de wijk Eixample. 48 uur gerijpte pizza’s uit de houtoven, verse pasta en de beste Italiaanse keuken van Barcelona — de smaak van Napels, gewoon om de hoek.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/nl/tafel-reserveren"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Reserveer een tafel
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/nl/menukaart"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Bekijk het menu
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
                Waarom Positano?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                De Napolitaanse pizzeria in de wijk Eixample
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Als je op zoek bent naar een Italiaans restaurant in de wijk Eixample of een pizzeria in Barcelona, dan vind je bij Positano de keuken van Zuid-Italië, bereid met authentieke ingrediënten en veel passie.
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
                Onze keuken
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Veel meer dan zomaar een Italiaanse pizzeria in Barcelona
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                In ons Italiaanse restaurant in de wijk Eixample vind je het volledige aanbod van Zuid-Italië: van Napolitaanse pizza’s uit de houtoven tot verse, zelfgemaakte pasta, antipasti en Italiaanse desserts. Dit is waarom onze gasten steeds weer bij ons terugkomen.
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
                href="/nl/menukaart"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Bekijk het volledige menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="nl" offset={0} limit={12} />

        {/* Frequently asked questions */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Veelgestelde vragen
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                De pizzeria in Eixample, in detail
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
                Waar we zijn
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Ons restaurant in de wijk Eixample
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                Je vindt ons op Carrer del Rosselló 24, midden in de wijk Eixample in Barcelona. Kom langs voor lunch of diner en geniet van de beste Napolitaanse pizza van de stad, of kom even langs voor een drankje aan de bar.
              </p>
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
              {/* Info */}
              <Reveal className="order-2 md:order-1">
                <div className="flex h-full flex-col justify-center gap-10 border border-ink/15 bg-cream px-8 py-12 text-center">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Adres
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
                      Openingstijden
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
                    title="Locatie van Pizzería Positano in de wijk Eixample, Barcelona"
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
                href="/nl/tafel-reserveren"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Reserveer een tafel
              </a>
              <a
                href="/nl/pizza-bezorgen-barcelona"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Levering van je bestelling
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="nl" />
    </>
  );
}
