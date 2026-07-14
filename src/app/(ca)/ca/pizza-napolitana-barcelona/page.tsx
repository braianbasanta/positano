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

const title = "Pizza Napolitana a Barcelona · Forn de Llenya · Positano";
const description =
  "Pizza napolitana autèntica a Barcelona: massa fermentada 48 hores, forn de llenya i ingredients DOP italians. La veritable pizza de Nàpols a l'Eixample.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("napolitana", "ca"),
  ...socialFor({
    title,
    description,
    path: "/ca/pizza-napolitana-barcelona",
    locale: "ca",
  }),
};

const faqs = [
  {
    q: "On menjar pizza napolitana autèntica a Barcelona?",
    a: "A Positano, a l'Eixample (Carrer del Rosselló, 24). És una pizzeria napolitana portada per tres napolitans de la Campània que cuinen com a Nàpols: pizza de massa fermentada 48 hores al forn de llenya, pasta fresca casolana i antipasti amb producte DOP italià.",
  },
  {
    q: "Què diferencia una pizza napolitana d'una pizza normal?",
    a: "La pizza napolitana de veritat es defineix per la massa de llarga fermentació (48 hores), un forn de llenya a 400 °C que la cou en menys de 90 segons, i la vora alta i esponjosa —el cornicione— amb les seves característiques taques de lleopard. A Positano seguim aquesta tradició sense dreceres.",
  },
  {
    q: "Quines pizzes napolitanes teniu?",
    a: "De les clàssiques Margherita i Marinara a la Diavola, l'Ortolana o les nostres especials de temporada. Totes amb massa napolitana de 48 hores. Les pots veure totes a la nostra carta.",
  },
  {
    q: "Es pot demanar la vostra pizza napolitana a domicili?",
    a: "Sí, portem la nostra pizza napolitana, la pasta fresca i els antipasti a domicili a Barcelona a través d'Uber Eats i Glovo. També acceptem Ticket Restaurant®.",
  },
  {
    q: "Qui hi ha darrere de Positano?",
    a: "Positano el van fundar Antonio, Massimo i Vincenzo, tres napolitans de la Campània que van portar a Barcelona les receptes de la seva terra. Italians cuinant com es fa a Nàpols, sense adaptacions ni dreceres.",
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
    title: "Massa fermentada 48 hores",
    text: "Deixem reposar la massa 48 hores per aconseguir una pizza més lleugera i digestiva, amb el cornicione alt i esponjós típic de Nàpols.",
  },
  {
    title: "Forn de llenya a 400 °C",
    text: "Cada pizza es cou en menys de 90 segons al forn de llenya, com mana la tradició napolitana. Així neix la vora amb les seves taques de lleopard i el centre fondent.",
  },
  {
    title: "Ingredients DOP italians",
    text: "Tomàquet San Marzano, fior di latte de la Campània, mozzarella de búfala DOP i grana padano de 24 mesos. Producte autèntic portat d'Itàlia, sense dreceres.",
  },
];

export default function PizzaNapolitanaCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "Pizza napolitana a Barcelona", path: "/ca/pizza-napolitana-barcelona" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="ca" />
      <main>
        {/* Banda de títol */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              La veritable pizza de Nàpols
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizza napolitana a Barcelona
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              De la Campània a l'Eixample
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              A Positano no fem una pizza qualsevol: fem autèntica pizza napolitana, amb les receptes que vam portar del sud d'Itàlia, massa fermentada 48 hores i forn de llenya. El veritable sabor de Nàpols, al cor de Barcelona.
            </p>
          </div>
        </section>

        {/* La nostra història */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
            <Reveal className="order-2 md:order-1">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                La nostra història
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Tres napolitans a Barcelona
              </h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
                Tot comença amb l'Antonio, en Massimo i en Vincenzo, nascuts i criats a la Campània, la regió que va veure néixer la pizza. Allà van aprendre, des de petits, que la cuina és l'ànima de la llar.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                Després d'anys perfeccionant l'ofici, van portar a Barcelona les receptes de la seva terra. Així va néixer Positano: una{" "}
                <a
                  href="/ca/pizzeria-eixample"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  pizzeria napolitana a l'Eixample
                </a>{" "}
                on la gastronomia del sud d'Itàlia se serveix tal com es fa a Nàpols, sense adaptacions ni dreceres.
              </p>
              <p className="mt-8 font-serif text-2xl italic leading-snug text-ink">
                «La passió pel bon menjar ens corre per les venes.»
              </p>
            </Reveal>

            <Reveal delay={120} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 hidden h-full w-full border border-lemon/40 md:block" />
                <Image
                  src="/hero/positano.jpg"
                  alt="Positano, pizzeria napolitana a Barcelona amb receptes portades de la Campània"
                  width={1400}
                  height={933}
                  className="relative aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Què la fa autèntica */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Què la fa autèntica
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Pizza napolitana de veritat
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                La pizza napolitana no s'improvisa. Aquestes són les tres claus que la fan única i per les quals molts ens consideren{" "}
                <a
                  href="/ca/millor-pizzeria-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  la millor pizza de Barcelona
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
                href="/ca/carta"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Veure les nostres pizzes
              </a>
              <a
                href="/ca/reservar-taula"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Reservar taula
              </a>
            </Reveal>
          </div>
        </section>

        {/* Ressenyes */}
        <Resenas lang="ca" offset={18} limit={12} />

        {/* Preguntes freqüents */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Preguntes freqüents
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Pizza napolitana a Barcelona
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
      <SiteFooter lang="ca" />
    </>
  );
}
