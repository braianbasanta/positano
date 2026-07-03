import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import EmpleoForm from "@/components/EmpleoForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor, socialFor } from "@/lib/i18n";

const title = "Trabaja con nosotros · Positano Pizzería Lounge Bar Barcelona";
const description =
  "¿Te apasiona la cocina italiana, la sala o la barra? Únete al equipo de Positano en el Eixample de Barcelona. Envíanos tu CV en unos minutos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/trabaja-con-nosotros"),
  ...socialFor({
    title,
    description,
    path: "/trabaja-con-nosotros",
    locale: "es",
  }),
};

export default function TrabajaConNosotrosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Trabaja con nosotros", path: "/trabaja-con-nosotros" },
        ])}
      />
      <SiteHeader />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Trabaja con nosotros
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Únete al equipo
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Buscamos personas que amen la cocina italiana, la sala y el trato
              cercano. Si quieres formar parte del día a día de Positano,
              cuéntanos quién eres y déjanos tu CV.
            </p>
          </div>
        </section>

        {/* Bloque de intro + formulario */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <p className="text-[0.82rem] uppercase tracking-[0.32em] text-lemon">
                Nuestro equipo
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                Cocinamos con corazón. Servimos con alma.
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink-soft">
                <p>
                  En Positano valoramos la actitud por encima del currículum.
                  Buscamos gente curiosa, responsable y con ganas de aprender el
                  oficio.
                </p>
                <p>
                  Si te apasiona la pizza napolitana, la pasta fresca o el
                  servicio de sala, queremos conocerte. Rellena el formulario en
                  unos minutos y adjunta tu CV — lo revisaremos personalmente.
                </p>
              </div>
              <ul className="mt-8 space-y-3 font-serif text-base text-ink-soft">
                {[
                  "Contrato con alta y condiciones legales",
                  "Equipo joven y multicultural",
                  "Formación interna en pizza napolitana",
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
              <EmpleoForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
