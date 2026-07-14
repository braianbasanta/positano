import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import EmpleoForm from "@/components/EmpleoForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";

const title = "Treballa amb nosaltres · Positano Pizzería Lounge Bar Barcelona";
const description =
  "T'apassiona la cuina italiana, la sala o la barra? Uneix-te a l'equip de Positano a l'Eixample de Barcelona. Envia'ns el teu CV en uns minuts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("empleo", "ca"),
  ...socialFor({ title, description, path: "/ca/treballa-amb-nosaltres", locale: "ca" }),
};

export default function CareersCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "Treballa amb nosaltres", path: "/ca/treballa-amb-nosaltres" },
        ])}
      />
      <SiteHeader lang="ca" />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Treballa amb nosaltres
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Uneix-te a l&apos;equip
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Busquem persones que estimin la cuina italiana, la sala i el
              tracte proper. Si vols formar part del dia a dia de Positano,
              explica&apos;ns qui ets i deixa&apos;ns el teu CV.
            </p>
          </div>
        </section>

        {/* Bloque de intro + formulario */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <p className="text-[0.82rem] uppercase tracking-[0.32em] text-lemon">
                El nostre equip
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                Cuinem amb cor. Servim amb ànima.
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink-soft">
                <p>
                  A Positano valorem l&apos;actitud per sobre del currículum.
                  Busquem gent curiosa, responsable i amb ganes d&apos;aprendre
                  l&apos;ofici.
                </p>
                <p>
                  Si t&apos;apassiona la pizza napolitana, la pasta fresca o el
                  servei de sala, volem conèixer-te. Omple el formulari en uns
                  minuts i adjunta el teu CV — el revisarem personalment.
                </p>
              </div>
              <ul className="mt-8 space-y-3 font-serif text-base text-ink-soft">
                {[
                  "Contracte amb alta i condicions legals",
                  "Equip jove i multicultural",
                  "Formació interna en pizza napolitana",
                  "Eixample · Barcelona",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Lemon className="mt-1 h-4 w-4 shrink-0 text-lemon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <EmpleoForm lang="ca" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="ca" />
    </>
  );
}
