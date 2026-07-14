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
import { reviewStats } from "@/data/reviews";
import { goldCta3d } from "@/lib/ui";

const title = `La Millor Pizzeria de Barcelona · ${reviewStats.rating}★ a Google`;
const description = `Positano, una de les italianes més ben valorades de Barcelona segons Google (${reviewStats.rating}★): tracte proper i cuina italiana completa, més enllà de la pizza.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("mejorPizzeria", "ca"),
  ...socialFor({
    title,
    description,
    path: "/ca/millor-pizzeria-barcelona",
    locale: "ca",
  }),
};

// El diferencial real, segons 1.450+ ressenyes: no és la fermentació de 48h
// (es menciona de passada), és el tracte i la cuina completa.
const raons = [
  {
    title: `${reviewStats.rating}★ a Google`,
    text: `Més de ${reviewStats.count} ressenyes avalen Positano com una de les italianes més ben valorades de Barcelona. No ho diem nosaltres: ho diuen els qui ja hi han vingut.`,
  },
  {
    title: "El tracte de tres napolitans",
    text: "L'Antonio, en Massimo i en Vincenzo, tres napolitans de la Campània, porten el dia a dia de Positano. A les ressenyes es repeteix el tracte proper gairebé tant com el menjar.",
  },
  {
    title: "Cuina italiana completa",
    text: "No només pizza: la carbonara que més recomanen els nostres clients, la pasta fresca casolana i el tiramisú de festuc tanquen una carta italiana de veritat.",
  },
  {
    title: "Massa fermentada 48 hores",
    text: "La base de la nostra pizza napolitana també fermenta 48 hores i es cou al forn de llenya — tot i que, segons les ressenyes, no és el primer que la gent destaca.",
  },
];

export default function MillorPizzeriaBarcelonaCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "La millor pizzeria de Barcelona", path: "/ca/millor-pizzeria-barcelona" },
        ])}
      />
      <SiteHeader lang="ca" />
      <main>
        {/* Banda de títol */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Valorada amb ★{reviewStats.rating} a Google
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              La millor pizzeria de Barcelona, segons els qui ja hi han vingut
            </h1>
            <p className="mt-4 font-serif text-xl italic text-cream/80 md:text-2xl">
              No ho diem nosaltres: ho diuen {reviewStats.count} ressenyes a Google
            </p>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Positano és una de les italianes més ben valorades de Barcelona,
              amb {reviewStats.rating}★ a Google. I el que més repeteixen els
              nostres clients no és només la pizza: és el tracte proper de tres
              napolitans de la Campània i una cuina italiana completa.
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

        {/* Per què ho diuen les ressenyes */}
        <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-16 -left-14 h-80 w-auto -rotate-12 text-lemon/20" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="flex flex-col items-center text-center">
              <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
                <Lemon className="h-5 w-5" />
                Per què ho diuen les ressenyes
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                El que fa destacar Positano
              </h2>
              <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">
                No cal que ho proclamem nosaltres: són{" "}
                {reviewStats.count} ressenyes a Google les que situen Positano
                entre les{" "}
                <a
                  href="/ca/pizza-napolitana-barcelona"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  pizzeries napolitanes
                </a>{" "}
                més ben valorades de la ciutat — per a molts, la millor pizza de
                Barcelona.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
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

        {/* Prova social */}
        <Resenas lang="ca" />

        {/* CTA final */}
        <section className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-14 h-80 w-auto rotate-[155deg] text-lemon/25" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                Comprova-ho tu mateix
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">
                Ens trobaràs al Carrer del Rosselló, 24, a l'Eixample de
                Barcelona (dilluns tancat). Entre setmana tenim{" "}
                <a
                  href="/ca/menu-del-dia"
                  className="text-ink underline decoration-lemon underline-offset-4 transition-colors hover:text-lemon"
                >
                  menú del dia
                </a>{" "}
                a 14,90 € i, si el temps acompanya, terrassa amb un suplement
                del 10%.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="ca" />
    </>
  );
}
