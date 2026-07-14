import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import DishReservationTracker from "@/components/DishReservationTracker";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForPage, socialFor } from "@/lib/i18n";
import { DISH_WIDGET_URL } from "@/lib/dish";

const title = "Reservar Taula · Pizzeria a l'Eixample · Positano BCN";
const description =
  "Reserva la teva taula a Positano, pizzeria napolitana al cor de l'Eixample, Barcelona. Tria dia, hora i comensals — confirmació immediata en línia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForPage("reservas", "ca"),
  ...socialFor({ title, description, path: "/ca/reservar-taula", locale: "ca" }),
};

const faqs = [
  {
    q: "Cal reservar per menjar a Positano?",
    a: "No és obligatori, però l'Eixample s'omple, sobretot els caps de setmana i al migdia. Reservar en línia t'assegura taula a l'hora que vulguis. També pots venir sense reserva i provar sort.",
  },
  {
    q: "Puc reservar per a un grup gran?",
    a: "Sí. Per a grups grans et recomanem reservar amb antelació. Si sou molts o voleu una zona concreta, truca'ns al +34 933 51 59 13 i ho organitzem.",
  },
  {
    q: "Es pot reservar taula a la terrassa?",
    a: "Tenim terrassa i taules a l'interior. A la reserva pots indicar la teva preferència; la terrassa té un suplement del 10%. L'assignació final depèn de la disponibilitat del dia.",
  },
  {
    q: "Quin és l'horari de Positano?",
    a: "Obrim de dimarts a diumenge. De dimarts a dijous de 13:00 a 16:00 i de 20:00 a 23:30; divendres fins a mitjanit; dissabte de 13:00 a 24:00; diumenge de 13:00 a 23:30. Dilluns tancat.",
  },
  {
    q: "Com modifico o cancel·lo la meva reserva?",
    a: "Rebràs un correu de confirmació amb les opcions per modificar o cancel·lar. Si tens qualsevol problema, truca'ns al +34 933 51 59 13 i t'ajudem.",
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

export default function BookATableCaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inici", path: "/ca" },
          { name: "Reservar taula", path: "/ca/reservar-taula" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader lang="ca" />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Reserves
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Reserva la teva taula
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Tria dia, hora i nombre de comensals. Rebràs la confirmació a
              l&apos;instant.
            </p>
          </div>
        </section>

        {/* Widget DISH */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(29,39,80,0.35)] sm:p-5 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Reservar taula a Positano"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
              <DishReservationTracker />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              Algun problema amb la reserva? Truca&apos;ns al{" "}
              <a
                href="tel:+34933515913"
                className="text-ink underline-offset-4 transition-colors hover:text-lemon hover:underline"
              >
                +34 933 515 913
              </a>
              .
            </p>
          </div>
        </section>

        {/* Sobre tu reserva + FAQ */}
        <section className="relative overflow-hidden bg-cream px-6 pb-24 pt-2 md:pb-28">
          <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-center font-serif text-lg leading-relaxed text-ink-soft">
              Reservar taula a Positano, la teva pizzeria napolitana al cor de
              l&apos;Eixample, és molt fàcil: tria dia, hora i comensals i rebràs la
              confirmació a l&apos;instant. T&apos;esperem al Carrer del Rosselló, 24,
              per gaudir de pizza napolitana de massa fermentada 48 hores,
              pasta fresca i antipasti.
            </p>

            <h2 className="mt-14 text-center font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Preguntes sobre la teva reserva
            </h2>
            <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
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
          </div>
        </section>
      </main>
      <Script src="https://reservation.dish.co/widget.js" strategy="lazyOnload" />
      <SiteFooter lang="ca" />
    </>
  );
}
