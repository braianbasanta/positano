import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import DishReservationTracker from "@/components/DishReservationTracker";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesFor, socialFor } from "@/lib/i18n";
import { DISH_WIDGET_URL } from "@/lib/dish";

const title = "Reservar Mesa · Pizzería en el Eixample · Positano BCN";
const description =
  "Reserva tu mesa en Positano, pizzería napolitana en el corazón del Eixample, Barcelona. Elige día, hora y comensales — confirmación inmediata online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/reservas"),
  ...socialFor({ title, description, path: "/reservas" }),
};

const faqs = [
  {
    q: "¿Hace falta reservar para comer en Positano?",
    a: "No es obligatorio, pero el Eixample se llena, sobre todo los fines de semana y al mediodía. Reservar online te asegura mesa a la hora que quieras. También puedes venir sin reserva y probar suerte.",
  },
  {
    q: "¿Puedo reservar para un grupo grande?",
    a: "Sí. Para grupos grandes te recomendamos reservar con antelación. Si sois muchos o queréis una zona concreta, llámanos al +34 933 51 59 13 y lo organizamos.",
  },
  {
    q: "¿Se puede reservar mesa en la terraza?",
    a: "Tenemos terraza y mesas en el interior. En la reserva puedes indicar tu preferencia; la terraza tiene un suplemento del 10%. La asignación final depende de la disponibilidad del día.",
  },
  {
    q: "¿Cuál es el horario de Positano?",
    a: "Abrimos de martes a domingo. Martes a jueves de 13:00 a 16:00 y de 20:00 a 23:30; viernes hasta medianoche; sábado de 13:00 a 24:00; domingo de 13:00 a 23:30. Lunes cerrado.",
  },
  {
    q: "¿Cómo modifico o cancelo mi reserva?",
    a: "Recibirás un email de confirmación con las opciones para modificar o cancelar. Si tienes cualquier problema, llámanos al +34 933 51 59 13 y te ayudamos.",
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

export default function ReservasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Reservas", path: "/reservas" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <SiteHeader />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-10 pt-28 text-center md:pb-12 md:pt-32">
          {/* Foto del local de fondo: quien aterriza aquí desde un anuncio no
              ha visto el hero de la home — la imagen vende el sitio antes de
              pedirle datos. El velo navy mantiene la legibilidad del texto. */}
          <Image
            src="/hero/positano.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(29,39,80,0.92)_0%,rgba(29,39,80,0.62)_52%,rgba(29,39,80,0.94)_100%)]" />
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Reservas
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Reserva tu mesa
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              Elige día, hora y número de comensales. Recibirás la
              confirmación al momento.
            </p>
          </div>
        </section>

        {/* Widget DISH */}
        <section className="bg-cream px-6 py-10 md:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-3 shadow-[0_24px_60px_-24px_rgba(29,39,80,0.35)] sm:p-5 md:p-6">
              <iframe
                src={DISH_WIDGET_URL}
                title="Reservar mesa en Positano"
                className="block h-[500px] w-full border-0 sm:h-[540px]"
                loading="lazy"
              />
              <DishReservationTracker />
            </div>
            <p className="mt-8 text-center font-serif text-base italic text-ink-soft">
              ¿Algún problema con la reserva? Llámanos al{" "}
              <a
                href="tel:+34933515913"
                className="text-ink underline-offset-4 transition-colors hover:text-lemon hover:underline"
              >
                +34 933 515 913
              </a>
              .
            </p>
            <p className="mt-3 text-center font-serif text-base italic text-ink-soft">
              ¿Comida de equipo o cena de empresa? Mira cómo organizamos los{" "}
              <a
                href="/grupos-barcelona"
                className="text-ink underline underline-offset-4 transition-colors hover:text-lemon"
              >
                grupos y empresas
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
              Reservar mesa en Positano, tu pizzería napolitana en el corazón del
              Eixample, es muy fácil: elige día, hora y comensales y recibirás la
              confirmación al instante. Te esperamos en Carrer del Rosselló, 24,
              para disfrutar de pizza napolitana de masa fermentada 48 horas,
              pasta fresca y antipasti.
            </p>

            <h2 className="mt-14 text-center font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Preguntas sobre tu reserva
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
      <Script
        src="https://reservation.dish.co/widget.js"
        strategy="lazyOnload"
      />
      <SiteFooter />
    </>
  );
}
