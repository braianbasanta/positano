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

const UBER_EATS =
  "https://www.ubereats.com/es/store/positano-pizzeria/ciPAhMptSOeZGNeUsyhjKA";
const GLOVO =
  "https://glovoapp.com/en/es/barcelona/stores/positano-pizzeria-barcelona";

const title = "Pizza a Domicili a Barcelona · Napolitana · Positano BCN";
const description =
  "Demanar pizza a domicili a Barcelona mai havia estat tan fàcil. Et portem la pizza napolitana, la pasta fresca i els antipasti de Positano a casa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("domicilio", "ca"),
  ...socialFor({
    title,
    description,
    path: "/ca/pizza-a-domicili",
    locale: "ca",
  }),
};

const passos = [
  {
    number: "01",
    title: "Tria els teus plats",
    text: "Obre la nostra carta de pizza a domicili a Uber Eats o Glovo i munta la teva comanda: pizza napolitana, pasta fresca, antipasti i molt més.",
  },
  {
    number: "02",
    title: "Confirma i paga",
    text: "Introdueix la teva adreça de Barcelona i paga de manera segura. També acceptem Ticket Restaurant®.",
  },
  {
    number: "03",
    title: "Te la portem a casa",
    text: "Enfornem la teva pizza al moment i un rider te la porta calenta fins a la porta, siguis on siguis.",
  },
];

const horari = [
  { dia: "De dimarts a dijous", hores: "13:00 – 16:00 · 20:00 – 23:30" },
  { dia: "Divendres", hores: "13:00 – 16:00 · 20:00 – 00:00" },
  { dia: "Dissabte", hores: "13:00 – 00:00" },
  { dia: "Diumenge", hores: "13:00 – 23:30" },
  { dia: "Dilluns", hores: "Tancat" },
];

const faqs = [
  {
    q: "Com demano pizza a domicili a Positano?",
    a: "Fes la comanda online a Uber Eats o Glovo. Tria els teus plats, introdueix la teva adreça de Barcelona i t'ho portem a casa acabat de fer.",
  },
  {
    q: "A quines zones de Barcelona repartiu?",
    a: "Repartim a Barcelona a través d'Uber Eats i Glovo. El radi exacte de repartiment el veuràs en introduir la teva adreça a la plataforma.",
  },
  {
    q: "Què puc demanar a domicili?",
    a: "Tota la nostra carta: pizza napolitana de massa fermentada 48 hores, pasta fresca casolana, antipasti i postres. Acabats de fer i a punt per gaudir-los a casa.",
  },
  {
    q: "Accepteu Ticket Restaurant® a domicili?",
    a: "Sí, acceptem Ticket Restaurant® també en les comandes a domicili, segons la plataforma des d'on facis la comanda.",
  },
  {
    q: "Quin és l'horari d'entrega a domicili?",
    a: "Servim a domicili de dimarts a dijous de 13:00 a 16:00 i de 20:00 a 23:30, divendres fins a les 00:00, dissabte de 13:00 a 00:00 i diumenge de 13:00 a 23:30. Els dilluns tanquem.",
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

export default function PizzaADomiciliCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "Pizza a domicili", path: "/ca/pizza-a-domicili" },
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
              A domicili a Barcelona
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Pizza a domicili
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Et portem la pizza a casa
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Pizza napolitana de fermentació de 48 hores, pasta fresca i els
              nostres antipasti — acabats de fer i a punt per gaudir-los a casa.
              Demanar pizza a domicili a Barcelona mai havia estat tan fàcil:
              fes la comanda online i te la portem ben calenta fins a la porta.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-lemon px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-cream hover:tracking-[0.27em]"
              >
                Demanar a Uber Eats
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
                Demanar a Glovo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Com funciona */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Com funciona
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Demanar pizza online és així de fàcil
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Tres passos entre tu i una pizza napolitana acabada de sortir
                del forn a casa. Sense trucades, sense esperes.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {passos.map((pas, index) => (
                <Reveal key={pas.number} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border border-ink/15 bg-cream/40 p-8 transition-colors duration-300 hover:border-lemon/60">
                    <span className="font-display text-3xl text-lemon">
                      {pas.number}
                    </span>
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {pas.title}
                    </h3>
                    <p className="font-serif text-base leading-relaxed text-ink-soft">
                      {pas.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Ressenyes */}
        <Resenas lang="ca" offset={12} limit={12} />

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
                Pizza a domicili, al detall
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

        {/* Plataforma */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Repartiment a domicili
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  Demana la teva pizza a Uber Eats o Glovo
                </h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
                  Tota la nostra{" "}
                  <a
                    href="/ca/carta"
                    className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                  >
                    carta
                  </a>{" "}
                  de{" "}
                  <a
                    href="/ca/pizza-napolitana-barcelona"
                    className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                  >
                    pizza napolitana
                  </a>
                  , pasta fresca i antipasti, a punt per portar-te-la a casa a
                  qualsevol racó de Barcelona. Tria la teva plataforma preferida
                  — el radi exacte de repartiment el veuràs en introduir la teva
                  adreça.
                </p>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  Horari d'entrega
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {horari.map((item) => (
                    <li
                      key={item.dia}
                      className="font-serif text-lg text-ink-soft"
                    >
                      <span className="text-ink">{item.dia}</span> ·{" "}
                      {item.hores}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.84rem] uppercase tracking-[0.18em] text-ink-soft">
                  <span>Acceptem Ticket Restaurant®</span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={UBER_EATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink"
                  >
                    Demanar a Uber Eats
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
                    Demanar a Glovo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-lg italic text-ink-soft">
                Prefereixes viure Positano a taula?
              </p>
              <a
                href="/ca/reservar-taula"
                className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Reservar taula
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="ca" />
    </>
  );
}
