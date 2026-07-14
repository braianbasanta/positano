import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import PaymentLogos from "@/components/PaymentLogos";
import MenuSemanal from "@/components/MenuSemanal";
import Resenas from "@/components/Resenas";
import { breadcrumbJsonLd, menuDelDiaJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { goldCta3d } from "@/lib/ui";

const PLACE_URL =
  "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria+Carrer+del+Rossell%C3%B3+24+Barcelona&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U";

const title = "Menú del Dia a l'Eixample de Barcelona · Italià · Positano";
const description =
  "Menú del dia a Positano, pizzeria italiana a l'Eixample de Barcelona, per 14,90 €. Cuina casolana de dimarts a divendres al migdia. Acceptem Ticket Restaurant®.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("menuDelDia", "ca"),
  ...socialFor({ title, description, path: "/ca/menu-del-dia", locale: "ca" }),
};

const horari = [
  { dia: "De dimarts a dijous", hores: "13:00 – 16:00" },
  { dia: "Divendres", hores: "13:00 – 16:00" },
  { dia: "Dissabte i diumenge", hores: "Carta completa" },
  { dia: "Dilluns", hores: "Tancat" },
];

const faqs = [
  {
    q: "Quant costa el menú del dia?",
    a: "El menú del dia costa 14,90 € i inclou primer, segon, pa, beguda i postres. A la terrassa s'hi aplica un suplement del 10%.",
  },
  {
    q: "Quins dies hi ha menú del dia?",
    a: "Servim el menú del dia de dimarts a divendres al migdia, de 13:00 a 16:00. Els dissabtes i diumenges treballem amb la carta completa, i els dilluns tanquem.",
  },
  {
    q: "Accepteu Ticket Restaurant® o Edenred per al menú del dia?",
    a: "Sí. Pots pagar el teu menú del dia amb Ticket Restaurant®, Edenred i altres targetes restaurant. És el lloc ideal per a la teva pausa del migdia a l'Eixample.",
  },
  {
    q: "El menú del dia canvia cada setmana?",
    a: "Sí, el renovem cada setmana amb plats casolans del sud d'Itàlia: pastes com els rigatoni al pesto, amanides, segons de carn o peix i una pizza napolitana a triar (Margherita, Diavola, Ortolana i més).",
  },
  {
    q: "Cal reservar per menjar el menú del dia?",
    a: "No és imprescindible, però al migdia l'Eixample s'omple: si véns en grup o amb poc temps, et recomanem reservar online o trucar al +34 933 51 59 13.",
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

export default function MenuDelDiaCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "Menú del dia", path: "/ca/menu-del-dia" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={menuDelDiaJsonLd("ca")} />
      <SiteHeader lang="ca" />
      <main>
        {/* Banda de títol */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Dinar al migdia a l'Eixample
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Menú del dia
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              Cuina italiana casolana per 14,90 €
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Busques on dinar a prop, a l'Eixample de Barcelona? Cada migdia
              servim el nostre menú del dia amb pasta fresca, pizza napolitana i
              plats casolans del sud d'Itàlia. Ràpid, autèntic i a bon preu.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/ca/reservar-taula"
                className={`group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] ${goldCta3d} hover:tracking-[0.25em]`}
              >
                Reservar per dinar
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

        {/* Què inclou */}
        <section className="relative overflow-hidden bg-cream px-6 pt-24 pb-6 md:pt-32 md:pb-8">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Què inclou
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Un menú complet per{" "}
                <span className="whitespace-nowrap">14,90 €</span>
              </h2>
              <p className="mt-3 font-serif text-base italic text-ink-soft/70">
                Suplement terrassa 10%
              </p>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                Primer, segon, pa, beguda i postres. Cuina italiana casolana de
                la nostra{" "}
                <a
                  href="/ca/carta"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  carta
                </a>
                , pensada per menjar bé i tornar a la feina a temps.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Menú de la setmana (s'actualitza des de src/data/menuDelDia.ts) */}
        <MenuSemanal lang="ca" />

        {/* Pagament amb targetes restaurant */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-4 md:pb-28">
          <div className="relative mx-auto max-w-3xl">
            <Reveal className="mx-auto max-w-3xl border border-lemon/40 bg-cream/40 p-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink">
                Acceptem Ticket Restaurant® i Edenred
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                Dines amb la targeta de menjar de l'empresa? A Positano pots
                pagar el teu menú del dia amb Ticket Restaurant®, Edenred i
                altres targetes restaurant. El lloc perfecte per a la teva pausa
                del migdia a{" "}
                <a
                  href="/ca/pizzeria-eixample"
                  className="underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  la nostra pizzeria de l'Eixample
                </a>
                .
              </p>
              <PaymentLogos lang="ca" className="mt-6" />
            </Reveal>
          </div>
        </section>

        {/* Ressenyes */}
        <Resenas lang="ca" offset={6} limit={12} />

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
                El menú del dia, al detall
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

        {/* Horari i ubicació */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <div className="border border-ink/15 bg-cream/50 p-9 text-center md:p-14">
                <span className="text-[0.84rem] uppercase tracking-[0.3em] text-lemon">
                  Horari del menú del dia
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                  De dimarts a divendres al migdia
                </h2>
                <ul className="mx-auto mt-8 max-w-md space-y-2.5">
                  {horari.map((row) => (
                    <li
                      key={row.dia}
                      className="flex flex-col items-center gap-x-2 leading-snug sm:flex-row sm:justify-between"
                    >
                      <span className="font-serif text-lg text-ink">
                        {row.dia}
                      </span>
                      <span className="font-serif text-base text-ink-soft sm:text-lg">
                        {row.hores}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mx-auto mt-9 flex items-center gap-4">
                  <span className="h-px flex-1 bg-ink/15" />
                  <Lemon className="h-5 w-5 text-lemon" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <h3 className="mt-9 text-[0.82rem] uppercase tracking-[0.28em] text-ink">
                  On som
                </h3>
                <a
                  href={PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-serif text-lg leading-relaxed text-ink-soft transition-colors hover:text-lemon"
                >
                  Carrer del Rosselló, 24 · 08029 · Eixample, Barcelona
                </a>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="/ca/reservar-taula"
                    className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
                  >
                    Reservar per dinar
                  </a>
                  <a
                    href="tel:+34933515913"
                    className="rounded-full border border-ink/45 px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Truca'ns
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="ca" />
    </>
  );
}
