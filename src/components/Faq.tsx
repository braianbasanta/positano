import Lemon from "./Lemon";
import LemonBranch from "./LemonBranch";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";
import type { Locale } from "@/lib/i18n";

// El FAQ vive solo en la home (es/en), por eso el FAQPage schema se inyecta
// aquí: así los datos estructurados y el contenido visible están en la misma
// página y nunca hay mismatch (antes el schema iba en el layout = todas).
const COPY = {
  es: {
    eyebrow: "Preguntas frecuentes",
    heading: "Todo lo que quieres saber",
    faqs: [
      { q: "¿Dónde está Positano Pizzería?", a: "Estamos en Carrer del Rosselló, 24, en el Eixample de Barcelona (08029). Puedes llamarnos al +34 933 51 59 13." },
      { q: "¿Cuál es el horario de Positano Pizzería?", a: "Los lunes cerramos. De martes a jueves abrimos de 13:00 a 16:00 y de 20:00 a 23:30. Los viernes de 13:00 a 16:00 y de 20:00 a 00:00. Los sábados de 13:00 a 00:00 y los domingos de 13:00 a 23:30, en horario continuo." },
      { q: "¿Qué tipo de pizza hacen en Positano?", a: "Hacemos auténtica pizza napolitana con masa de fermentación de 48 horas, cocida en horno de leña y elaborada con ingredientes DOP italianos. También ofrecemos pasta fresca casera, antipasti, ensaladas y postres." },
      { q: "¿Qué hace de Positano un buen restaurante italiano en Barcelona?", a: "Positano es un restaurante italiano en el Eixample de Barcelona llevado por tres napolitanos de Campania. Servimos cocina del sur de Italia tal cual se hace allí: pizza napolitana de horno de leña, pasta fresca casera, antipasti y postres italianos. Si buscas una pizzería en Barcelona con producto auténtico y sin atajos, este es tu sitio." },
      { q: "¿Positano Pizzería hace pizza a domicilio?", a: "Sí, llevamos nuestra pizza napolitana, pasta fresca y antipasti a domicilio en Barcelona a través de Uber Eats y Glovo. El radio exacto de reparto lo verás al introducir tu dirección. Aceptamos también Ticket Restaurant®." },
      { q: "¿Se puede reservar mesa en Positano Pizzería?", a: "Sí, puedes reservar mesa online desde nuestra página de reservas con confirmación inmediata, o llamando al +34 933 51 59 13." },
      { q: "¿Tienen opciones vegetarianas?", a: "Sí. Contamos con opciones vegetarianas como la pizza Ortolana, la Búfala, la lasaña vegetariana, ensaladas y antipasti como la parmesana de berenjena o la burrata." },
    ],
  },
  en: {
    eyebrow: "Frequently asked questions",
    heading: "Everything you want to know",
    faqs: [
      { q: "Where is Positano Pizzería located?", a: "We're at Carrer del Rosselló, 24, in the Eixample district of Barcelona (08029). You can call us on +34 933 51 59 13." },
      { q: "What are Positano Pizzería's opening hours?", a: "We are closed on Mondays. Tuesday to Thursday we open 1:00–4:00 pm and 8:00–11:30 pm. Friday 1:00–4:00 pm and 8:00 pm–12:00 am. Saturday 1:00 pm–12:00 am and Sunday 1:00–11:30 pm, with continuous service." },
      { q: "What kind of pizza does Positano make?", a: "We make authentic Neapolitan pizza with a 48-hour fermented dough, baked in a wood-fired oven and made with Italian DOP ingredients. We also serve homemade fresh pasta, antipasti, salads and desserts." },
      { q: "What makes Positano a great Italian restaurant in Barcelona?", a: "Positano is an Italian restaurant in the Eixample district of Barcelona run by three Neapolitans from Campania. We serve southern Italian cuisine exactly as it's made back home: wood-fired Neapolitan pizza, homemade fresh pasta, antipasti and Italian desserts. If you're after a pizzeria in Barcelona with authentic produce and no shortcuts, this is your place." },
      { q: "Does Positano Pizzería deliver?", a: "Yes, we deliver our Neapolitan pizza, fresh pasta and antipasti across Barcelona via Uber Eats and Glovo. You'll see the exact delivery radius when you enter your address. We also accept Ticket Restaurant®." },
      { q: "Can I book a table at Positano Pizzería?", a: "Yes, you can book a table online from our reservations page with instant confirmation, or by calling +34 933 51 59 13." },
      { q: "Do you have vegetarian options?", a: "Yes. We offer vegetarian options such as the Ortolana pizza, the Bufala, vegetarian lasagne, salads and antipasti like the aubergine parmigiana or the burrata." },
    ],
  },
} satisfies Record<Locale, { eyebrow: string; heading: string; faqs: { q: string; a: string }[] }>;

export default function Faq({ lang = "es" }: { lang?: Locale }) {
  const t = COPY[lang];
  const faqs = t.faqs;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-cream-deep px-6 py-24 md:py-32"
    >
      <JsonLd data={faqJsonLd} />
      <LemonBranch className="pointer-events-none absolute -left-16 -top-14 h-80 w-auto -rotate-[135deg] text-lemon/20" />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
            <Lemon className="h-5 w-5" />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {t.heading}
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
  );
}
