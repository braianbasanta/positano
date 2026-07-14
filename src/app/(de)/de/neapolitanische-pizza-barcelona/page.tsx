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
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Authentische neapolitanische Pizza · aus dem Holzofen · Positano BCN";
const description =
  "Positano ist eine authentische neapolitanische Pizzeria in Barcelona. Rezepte aus Kampanien, 48 Stunden lang gegärter Teig, Holzofen und italienische Zutaten mit DOP-Gütesiegel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("napolitana", "de"),
  ...socialFor({
    title,
    description,
    path: "/de/neapolitanische-pizza-barcelona",
    locale: "de",
  }),
};

const faqs = [
  {
    q: "Wo finde ich in Barcelona ein authentisches neapolitanisches Restaurant?",
    a: "„Positano“ ist ein neapolitanisches Restaurant im Stadtteil Eixample in Barcelona (Carrer del Rosselló 24). Es wird von drei Neapolitanern aus Kampanien geführt, die genau so kochen wie in Neapel: Pizza mit 48 Stunden lang gereiftem Teig, gebacken im Holzofen, hausgemachte frische Pasta und Antipasti aus italienischen DOP-Produkten.",
  },
  {
    q: "Was unterscheidet eine neapolitanische Pizzeria von einer gewöhnlichen Pizzeria?",
    a: "Echte neapolitanische Pizza zeichnet sich durch ihren lange gegärten Teig (48 Stunden), einen Holzofen bei 400 °C, in dem sie in weniger als 90 Sekunden gebacken wird, sowie durch den hohen, luftigen Rand – den „Cornicione“ – mit seinen charakteristischen Leopardenflecken aus. Bei Positano folgen wir dieser Tradition ohne Abstriche.",
  },
  {
    q: "Ist das „Positano“ ein gutes italienisches Restaurant in Barcelona?",
    a: "Ja. Neben neapolitanischer Pizza serviert das „Positano“ süditalienische Küche: frische Pasta, Antipasti, Salate und hausgemachte Desserts nach Rezepten, die direkt aus Kampanien stammen. Ein italienisches Restaurant im Herzen des Stadtteils Eixample in Barcelona.",
  },
  {
    q: "Wer steht hinter Positano?",
    a: "Das „Positano“ wurde von Antonio, Massimo und Vincenzo gegründet, drei Neapolitanern aus Kampanien, die die Rezepte ihrer Heimat nach Barcelona brachten. Italienische Küche, wie man sie in Neapel zubereitet – ohne Anpassungen und ohne Abstriche.",
  },
  {
    q: "Liefert „Positano“ neapolitanische Pizza aus?",
    a: "Ja, wir liefern unsere neapolitanische Pizza, frische Pasta und Antipasti in Barcelona über Uber Eats und Glovo. Wir akzeptieren auch Ticket Restaurant®.",
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
    title: "48 Stunden lang fermentierter Teig",
    text: "Wir lassen den Teig 48 Stunden ruhen, um eine leichtere, bekömmlichere Pizza mit dem für Neapel typischen luftigen Rand – dem „Cornicione“ – zu erhalten.",
  },
  {
    title: "Holzofen bei 400 °C",
    text: "Jede Pizza wird gemäß neapolitanischer Tradition in weniger als 90 Sekunden in einem Holzofen gebacken. So entstehen der leopardenfleckige Rand und der geschmolzene Kern.",
  },
  {
    title: "Italienische Zutaten mit DOP-Gütesiegel",
    text: "San-Marzano-Tomaten, „Fior di Latte“ aus Kampanien, Büffelmozzarella DOP, 24 Monate gereifter Grana Padano. Authentische Produkte direkt aus Italien, ohne Abstriche.",
  },
];

export default function NeapolitanPizzaDePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: "/de" },
          { name: "Neapolitanische Pizza", path: "/de/neapolitanische-pizza-barcelona" },
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
              Die echte Pizza aus Neapel
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Neapolitanische Pizza in Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Von Kampanien bis zum Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Bei Positano backen wir nicht einfach irgendeine Pizza: Wir backen authentische neapolitanische Pizza nach Rezepten, die wir aus Süditalien mitgebracht haben, mit einem 48 Stunden lang gereiften Teig und in einem Holzofen. Der echte Geschmack Neapels, mitten im Herzen von Barcelona.
            </p>
          </div>
        </section>

        {/* Our story */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Unsere Geschichte
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Drei Neapolitaner in Barcelona
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                Alles beginnt mit Antonio, Massimo und Vincenzo, die in Kampanien, der Region, in der die Pizza ihren Ursprung hat, geboren und aufgewachsen sind. Dort lernten sie schon in jungen Jahren, dass das Kochen die Seele des Zuhauses ist.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                Nachdem sie ihr Handwerk über Jahre hinweg perfektioniert hatten, brachten sie die Rezepte ihrer Heimat nach Barcelona. Und so entstand das „Positano“: eine neapolitanische Pizzeria, in der die Küche Süditaliens genau so serviert wird, wie sie in Neapel zubereitet wird – ohne Anpassungen und ohne Abstriche.
              </p>
              <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
                „Die Leidenschaft für gutes Essen liegt uns im Blut.“
              </p>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
                <Image
                  src="/hero/positano.jpg"
                  alt="Positano, eine neapolitanische Pizzeria in Barcelona mit Rezepten aus Kampanien"
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
                Was macht es authentisch?
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Echte neapolitanische Pizza
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Echte neapolitanische Pizza wird niemals improvisiert. Dies sind die drei Merkmale, die sie auszeichnen und die uns für viele{" "}
                <a
                  href="/de/beste-pizza-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  die beste Pizza in Barcelona
                </a>
                .
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
                href="/de/speisekarte"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Sehen Sie sich unsere Pizzen an
              </a>
              <a
                href="/de/tisch-reservieren"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Einen Tisch reservieren
              </a>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <Resenas lang="de" offset={18} limit={12} />

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
                Neapolitanisches Restaurant in Barcelona
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
      <SiteFooter lang="de" />
    </>
  );
}
