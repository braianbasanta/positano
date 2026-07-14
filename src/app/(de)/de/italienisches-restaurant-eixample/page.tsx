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

const title = "Italienisches Restaurant im Eixample · 48h Dough · Positano";
const description =
  "„Positano“ ist eine neapolitanische Pizzeria und ein italienisches Restaurant im Stadtteil Eixample in Barcelona. 48 Stunden gereifte Holzofenpizza, frische Pasta und Antipasti. Reservieren Sie einen Tisch.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("eixample", "de"),
  ...socialFor({
    title,
    description,
    path: "/de/italienisches-restaurant-eixample",
    locale: "de",
  }),
};

const reasons = [
  {
    title: "Authentische neapolitanische Pizza",
    text: "48 Stunden lang gegärter Teig, im Holzofen gebacken und mit italienischen DOP-Zutaten zubereitet. Neapolitanische Pizza in Barcelona, genau wie in Neapel.",
  },
  {
    title: "Echte italienische Küche",
    text: "Hausgemachte frische Pasta, Antipasti, Risotti und Hauptgerichte, die täglich von unseren aus Kampanien stammenden Köchen zubereitet werden.",
  },
  {
    title: "Mitten im Eixample",
    text: "Ein Stückchen Amalfiküste im Herzen des Eixample in Barcelona – ideal für ein Mittagessen, ein Abendessen oder einen Drink an der Bar.",
  },
  {
    title: "Von Neapolitanern geführt",
    text: "Das „Positano“ wird von drei Neapolitanern aus Kampanien geleitet. Italiener am Herd, damit Sie so speisen, als wären Sie im Süden Italiens – ohne Abstriche, ohne Kompromisse.",
  },
];

// Real dishes from the menu, most mentioned by our guests.
const dishes = [
  {
    cat: "Aus der neapolitanischen Pizzeria",
    items:
      "Margherita, Diavola, Bufala und Ortolana – alle mit einem 48 Stunden gereiften Teig und einem ordentlichen „Cornicione“. Provola e Peppe und Siciliana für diejenigen, die etwas mehr wünschen.",
  },
  {
    cat: "Hausgemachte frische Pasta",
    items:
      "Carbonara, wie sie sein soll – ohne Sahne; traditionelle Lasagne; Paccheri alla genovese; Scialatelli mit Hummer; und Gnocchi alla sorrentina.",
  },
  {
    cat: "Antipasti und Gerichte zum Teilen",
    items:
      "Burrata aus Apulien, im Ofen gebackener Provolone zum Brot eintunken, Auberginen-Parmigiana und unsere Auswahl an Vorspeisen aus Süditalien.",
  },
  {
    cat: "Hausgemachte Desserts",
    items:
      "Klassisches Tiramisu, Panna Cotta und Spezialitäten wie Pistazien-Tiramisu. Der italienische Abschluss, den Ihre Mahlzeit verdient.",
  },
];

// Verified answers, focused on the Eixample location.
const faqs = [
  {
    q: "Wo befindet sich das italienische Restaurant im Eixample?",
    a: "Sie finden uns in der Carrer del Rosselló 24, mitten im Stadtteil Eixample in Barcelona (08029), zwischen dem Passeig de Gràcia und der Sagrada Família. Sie erreichen uns telefonisch unter +34 933 51 59 13.",
  },
  {
    q: "Welche Art von Speisen servieren Sie?",
    a: "Neapolitanische Pizza aus 48 Stunden lang gereiftem Teig, gebacken im Holzofen mit italienischen DOP-Zutaten, dazu hausgemachte frische Pasta, Antipasti, Salate und hausgemachte Desserts aus Süditalien.",
  },
  {
    q: "Kann ich einen Tisch reservieren?",
    a: "Ja – Sie können online über unsere Reservierungsseite mit sofortiger Bestätigung buchen oder telefonisch unter +34 933 51 59 13. An Wochenenden empfehlen wir Ihnen, im Voraus zu reservieren.",
  },
  {
    q: "Gibt es bei Ihnen vegetarische Gerichte?",
    a: "Ja: die Pizza „Ortolana“, die „Bufala“, vegetarische Lasagne, Salate und Antipasti wie die Auberginen-Parmigiana und Burrata.",
  },
  {
    q: "Liefern Sie Pizza ins Eixample?",
    a: "Ja, wir liefern unsere neapolitanische Pizza, frische Pasta und Antipasti in ganz Barcelona über Uber Eats und Glovo aus. Wir akzeptieren auch Ticket Restaurant®.",
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
  { day: "Montag", time: "Geschlossen" },
  { day: "Dienstag bis Donnerstag", time: "13:00 – 16:00 Uhr · 20:00 – 23:30 Uhr" },
  { day: "Freitag", time: "13:00 – 16:00 Uhr · 20:00 Uhr – 00:00 Uhr" },
  { day: "Samstag", time: "13:00 Uhr – 00:00 Uhr" },
  { day: "Sonntag", time: "13:00 – 23:30 Uhr" },
];

export default function ItalianRestaurantEixampleDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          {
            name: "Italienisches Restaurant im Eixample",
            path: "/de/italienisches-restaurant-eixample",
          },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="de" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Im Stadtteil Eixample, Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Italienisches Restaurant im Eixample
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Neapolitanische Pizzeria in Barcelona
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              „Positano“ ist eine neapolitanische Pizzeria und ein italienisches Restaurant im Herzen des Eixample. 48 Stunden lang gereifter, im Holzofen gebackener Pizzateig, frische Pasta und die beste italienische Küche in Barcelona – der Geschmack Neapels, gleich um die Ecke.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/de/tisch-reservieren"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Einen Tisch reservieren
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/de/speisekarte"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Menü anzeigen
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
                Warum Positano?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Die neapolitanische Pizzeria im Eixample
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Wenn Sie auf der Suche nach einem italienischen Restaurant im Eixample oder einer Pizzeria in Barcelona sind, finden Sie im „Positano“ süditalienische Küche, zubereitet mit authentischen Zutaten und viel Leidenschaft.
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
                Unsere Küche
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Viel mehr als nur eine italienische Pizzeria in Barcelona
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                In unserem italienischen Restaurant im Eixample erwartet Sie die gesamte kulinarische Vielfalt Süditaliens: von neapolitanischer Pizza aus dem Holzofen über hausgemachte frische Pasta bis hin zu Antipasti und italienischen Desserts. Genau das ist es, was unsere Gäste immer wieder zu uns zurückkehren lässt.
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
                href="/de/speisekarte"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Die vollständige Speisekarte anzeigen
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="de" offset={0} limit={12} />

        {/* Frequently asked questions */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Häufig gestellte Fragen
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Die Pizzeria im Eixample – im Detail
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
                Wo wir uns befinden
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Unser Restaurant im Eixample
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                Sie finden uns in der Carrer del Rosselló 24, mitten im Stadtteil Eixample in Barcelona. Kommen Sie zum Mittag- oder Abendessen vorbei und genießen Sie die beste neapolitanische Pizza der Stadt, oder schauen Sie einfach auf einen Drink an der Bar vorbei.
              </p>
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
              {/* Info */}
              <Reveal className="order-2 md:order-1">
                <div className="flex h-full flex-col justify-center gap-10 border border-ink/15 bg-cream px-8 py-12 text-center">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Anschrift
                    </h3>
                    <a
                      href={PLACE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                    >
                      Carrer del Rosselló 24
                      <br />
                      08029 · Eixample, Barcelona
                    </a>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Öffnungszeiten
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
                      Kontakt
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
                    title="Standort der Pizzeria „Positano“ im Stadtteil Eixample in Barcelona"
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
                href="/de/tisch-reservieren"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Einen Tisch reservieren
              </a>
              <a
                href="/de/pizza-lieferservice-barcelona"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Lieferung der Bestellung
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="de" />
    </>
  );
}
