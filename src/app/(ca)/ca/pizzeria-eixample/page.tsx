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
  "https://maps.google.com/maps?q=Positano%20Pizzeria%2C%20Carrer%20del%20Rossell%C3%B3%2C%2024%2C%2008029%20Barcelona&z=16&hl=ca&output=embed";

const title = "Pizzeria a l'Eixample · Pizza al Forn de Llenya | Positano BCN";
const description =
  "Positano, pizzeria napolitana i restaurant italià a l'Eixample de Barcelona. Pizza al forn de llenya, pasta fresca casolana i antipasti.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("eixample", "ca"),
  ...socialFor({
    title,
    description,
    path: "/ca/pizzeria-eixample",
    locale: "ca",
  }),
};

const raons = [
  {
    title: "Autèntica pizza napolitana",
    text: "Massa de fermentació de 48 hores, cuita al forn de llenya i ingredients DOP italians. La pizza napolitana de Barcelona com a Nàpols.",
  },
  {
    title: "Cuina italiana de veritat",
    text: "Pasta fresca casolana, antipasti, risotti i secondi elaborats cada dia pels nostres xefs nascuts a la Campània.",
  },
  {
    title: "En ple Eixample",
    text: "Un racó de la Costa Amalfitana al cor de l'Eixample de Barcelona, ideal per dinar, sopar o prendre alguna cosa a la barra.",
  },
  {
    title: "Portada per napolitans",
    text: "Al capdavant de Positano hi ha tres napolitans de la Campània. Italians cuinant perquè mengis com al sud d'Itàlia, sense dreceres ni adaptacions.",
  },
];

// Plats reals de la carta, els més mencionats pels nostres clients.
const plats = [
  {
    cat: "De la pizzeria napolitana",
    items:
      "Margherita, Diavola, Bufala i Ortolana, amb massa de 48 hores i cornicione alt. Provola e Peppe i Siciliana per als qui busquen alguna cosa més.",
  },
  {
    cat: "Pasta fresca casolana",
    items:
      "Carbonara feta com toca, sense nata; lasanya tradicional; paccheri alla genovese; scialatelli amb llamàntol i gnocchi alla sorrentina.",
  },
  {
    cat: "Antipasti i per compartir",
    items:
      "Burrata pugliese, provolone al forn per sucar-hi pa, parmigiana d'albergínia i la nostra selecció d'entrants del sud d'Itàlia.",
  },
  {
    cat: "Dolci casolans",
    items:
      "Tiramisú clàssic, panna cotta i propostes com el tiramisú de festuc. El final italià que mereix l'àpat.",
  },
];

// Respostes verificades (les mateixes que el FAQ de la home), enfocades a l'Eixample.
const faqs = [
  {
    q: "On és la pizzeria de l'Eixample?",
    a: "Som al Carrer del Rosselló, 24, en ple Eixample de Barcelona (08029), entre el passeig de Gràcia i la Sagrada Família. Ens pots trucar al +34 933 51 59 13.",
  },
  {
    q: "Quin tipus de cuina feu?",
    a: "Pizza napolitana de massa fermentada 48 hores al forn de llenya amb ingredients DOP italians, a més de pasta fresca casolana, antipasti, amanides i postres casolanes del sud d'Itàlia.",
  },
  {
    q: "Es pot reservar taula?",
    a: "Sí, pots reservar online amb confirmació immediata des de la nostra pàgina de reserves, o trucant al +34 933 51 59 13. Els caps de setmana recomanem reservar amb antelació.",
  },
  {
    q: "Teniu opcions vegetarianes?",
    a: "Sí: la pizza Ortolana, la Bufala, la lasanya vegetariana, amanides i antipasti com la parmigiana d'albergínia o la burrata.",
  },
  {
    q: "Feu pizza a domicili a l'Eixample?",
    a: "Sí, portem la nostra pizza napolitana, la pasta fresca i els antipasti a domicili a Barcelona a través d'Uber Eats i Glovo. També acceptem Ticket Restaurant®.",
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

const horari = [
  { dia: "Dilluns", hores: "Tancat" },
  { dia: "De dimarts a dijous", hores: "13:00 – 16:00 · 20:00 – 23:30" },
  { dia: "Divendres", hores: "13:00 – 16:00 · 20:00 – 00:00" },
  { dia: "Dissabte", hores: "13:00 – 00:00" },
  { dia: "Diumenge", hores: "13:00 – 23:30" },
];

export default function PizzeriaEixampleCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "Pizzeria a l'Eixample", path: "/ca/pizzeria-eixample" },
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
              A l'Eixample de Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizzeria a l'Eixample
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Restaurant italià a Barcelona
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano és una pizzeria napolitana i restaurant italià al cor de
              l'Eixample. Pizza de massa fermentada 48 hores al forn de llenya,
              pasta fresca i la millor cuina italiana de Barcelona — el sabor de
              Nàpols a tocar de casa.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/ca/reservar-taula"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Reservar taula
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/ca/carta"
                className="group inline-flex items-center gap-3 rounded-full border border-cream/50 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
              >
                Veure la carta
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Per què Positano */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Per què Positano
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La pizzeria napolitana de l'Eixample
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Si busques una pizzeria a l'Eixample o un{" "}
                <a
                  href="/ca/restaurant-italia-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  restaurant italià a Barcelona
                </a>
                , a Positano hi trobaràs cuina del sud d'Itàlia feta amb
                producte autèntic i molta passió.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {raons.map((rao, index) => (
                <Reveal key={rao.title} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {rao.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {rao.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* La cuina */}
        <section className="relative overflow-hidden bg-ink px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-12 h-80 w-auto rotate-[150deg] text-lemon/15" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                La nostra cuina
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Molt més que una pizzeria italiana a Barcelona
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-cream/80">
                Al nostre restaurant italià de l'Eixample hi trobaràs la carta
                completa del sud d'Itàlia: de la pizza napolitana de forn de
                llenya a la pasta fresca casolana, els antipasti i les postres
                italianes. Això és el que més repeteixen els nostres clients.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {plats.map((plat, index) => (
                <Reveal key={plat.cat} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-cream/15 bg-cream/[0.04] p-8 transition-colors duration-300 hover:border-lemon/60">
                    <h3 className="font-display text-2xl leading-tight text-lemon">
                      {plat.cat}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-cream/80">
                      {plat.items}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <a
                href="/ca/carta"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Veure la carta completa
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Ressenyes */}
        <Resenas lang="ca" offset={0} limit={12} />

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
                La pizzeria de l'Eixample, al detall
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

        {/* On som */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                On som
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                La nostra pizzeria a l'Eixample
              </h2>
              <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                Ens trobaràs al Carrer del Rosselló, 24, en ple Eixample de
                Barcelona. Vine a dinar o sopar la nostra{" "}
                <a
                  href="/ca/pizza-napolitana-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  pizza napolitana
                </a>
                , prova el{" "}
                <a
                  href="/ca/menu-del-dia"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  menú del dia
                </a>{" "}
                entre setmana o demana-la{" "}
                <a
                  href="/ca/pizza-a-domicili"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  a domicili
                </a>{" "}
                si prefereixes quedar-te a casa.
              </p>
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
              {/* Info */}
              <Reveal className="order-2 md:order-1">
                <div className="flex h-full flex-col justify-center gap-10 border border-ink/15 bg-cream px-8 py-12 text-center">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Adreça
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
                      Horari
                    </h3>
                    {horari.map((row) => (
                      <div
                        key={row.dia}
                        className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-center"
                      >
                        <span className="font-serif text-lg text-ink">
                          {row.dia}
                        </span>
                        <span className="hidden text-ink-soft/40 sm:inline">
                          ·
                        </span>
                        <span className="font-serif text-base text-ink-soft sm:text-lg">
                          {row.hores}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl uppercase tracking-[0.16em] text-ink">
                      Contacte
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

              {/* Mapa */}
              <Reveal delay={120} className="order-1 md:order-2 md:h-full">
                <div className="relative h-[360px] overflow-hidden border border-ink/15 md:h-full">
                  <iframe
                    src={MAP_EMBED}
                    title="Ubicació de Positano Pizzeria a l'Eixample de Barcelona"
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
                href="/ca/reservar-taula"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Reservar taula
              </a>
              <a
                href="/ca/pizza-a-domicili"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Demanar a domicili
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="ca" />
    </>
  );
}
