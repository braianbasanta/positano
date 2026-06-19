import { SITE_URL, alternatePath } from "@/lib/i18n";
import { reviewStats } from "@/data/reviews";

// llms.txt — guía para buscadores de IA (ChatGPT, Perplexity, Google AI…).
// Estándar https://llmstxt.org: Markdown servido en /llms.txt. Se genera desde
// las mismas fuentes que el resto del SEO (SITE_URL, reviewStats, los pares de
// ruta ES↔EN) para no desincronizarse. Estático: no depende de la request.
export const dynamic = "force-static";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

// Páginas ES con descripción curada. La URL EN se deriva con alternatePath para
// que no se rompa si cambian los slugs en ROUTE_PAIRS.
const PAGES: {
  es: string;
  label: string;
  desc: string;
  labelEn: string;
  descEn: string;
  esOnly?: boolean;
}[] = [
  {
    es: "/",
    label: "Inicio",
    desc: "Presentación del restaurante, especialidades y reservas.",
    labelEn: "Home",
    descEn: "Restaurant overview, specialities and reservations.",
  },
  {
    es: "/menu",
    label: "La Carta",
    desc: "Pizzas napolitanas, pasta fresca, antipasti y postres con precios.",
    labelEn: "Menu",
    descEn: "Neapolitan pizzas, fresh pasta, antipasti and desserts with prices.",
  },
  {
    es: "/menu-del-dia",
    label: "Menú del Día",
    desc: "Menú de mediodía (entre semana) para comer en el Eixample.",
    labelEn: "Lunch Menu",
    descEn: "Weekday lunch set menu in the Eixample.",
  },
  {
    es: "/reservas",
    label: "Reservar Mesa",
    desc: "Reserva online de mesa en el restaurante.",
    labelEn: "Book a Table",
    descEn: "Book a table online.",
  },
  {
    es: "/bebidas",
    label: "Bebidas",
    desc: "Carta de vinos italianos y cervezas.",
    labelEn: "Drinks",
    descEn: "Italian wines and beers list.",
  },
  {
    es: "/pizza-domicilio",
    label: "Pizza a Domicilio",
    desc: "Pizza napolitana a domicilio en el Eixample y alrededores.",
    labelEn: "Pizza Delivery",
    descEn: "Neapolitan pizza delivery in the Eixample and nearby.",
  },
  {
    es: "/pizza-napolitana-barcelona",
    label: "Pizza Napolitana en Barcelona",
    desc: "Masa fermentada 48 h y horno de leña: la auténtica pizza napolitana.",
    labelEn: "Neapolitan Pizza in Barcelona",
    descEn: "48 h fermented dough and wood-fired oven: authentic Neapolitan pizza.",
  },
  {
    es: "/pizzeria-eixample",
    label: "Pizzería en el Eixample",
    desc: "Pizzería italiana en el barrio del Eixample de Barcelona.",
    labelEn: "Pizzeria in the Eixample",
    descEn: "Italian pizzeria in Barcelona's Eixample district.",
  },
  {
    es: "/nuestra-historia",
    label: "Nuestra Historia",
    desc: "Origen del restaurante y filosofía de cocina napolitana.",
    labelEn: "Our Story",
    descEn: "The restaurant's origin and Neapolitan cooking philosophy.",
    esOnly: true, // sin versión EN: no aparece en la lista inglesa.
  },
];

const SECONDARY: { es: string; label: string }[] = [
  { es: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
  { es: "/aviso-legal", label: "Aviso legal" },
  { es: "/politica-de-privacidad", label: "Política de privacidad" },
  { es: "/politica-de-cookies-ue", label: "Política de cookies" },
];

function buildLlmsTxt(): string {
  const esPages = PAGES.map((p) => `- [${p.label}](${abs(p.es)}): ${p.desc}`).join("\n");
  const enPages = PAGES.filter((p) => !p.esOnly)
    .map((p) => `- [${p.labelEn}](${abs(alternatePath(p.es, "en"))}): ${p.descEn}`)
    .join("\n");
  const secondary = SECONDARY.map((p) => `- [${p.label}](${abs(p.es)})`).join("\n");

  return `# Positano Pizzería

> Pizzería napolitana y restaurante italiano en el Eixample de Barcelona: pizza al horno de leña, pasta fresca (su carbonara es de las más recomendadas de la ciudad) y tiramisú de pistacho; una de las italianas mejor valoradas del barrio, conocida por su trato cercano. Neapolitan pizzeria and Italian restaurant in Barcelona's Eixample: wood-fired pizza, fresh pasta (its carbonara is among the most recommended in town) and pistachio tiramisù; one of the neighbourhood's best-rated Italians, known for its warm service.

Positano es una pizzería napolitana y restaurante italiano en el barrio del Eixample de Barcelona. Especialidades: pizza napolitana al horno de leña, pasta fresca —su carbonara es de las más recomendadas de Barcelona— y su tiramisú de pistacho. Es una de las italianas mejor valoradas del Eixample y destaca por su trato cercano y una clientela que repite. Sirve menú del día a mediodía entre semana, cena, reservas y entrega a domicilio. El sitio está en español (raíz) y en inglés (bajo /en/).

Positano is a Neapolitan pizzeria and Italian restaurant in the Eixample district of Barcelona. Its specialities are wood-fired Neapolitan pizza, fresh pasta —its carbonara is among the most recommended in Barcelona— and its pistachio tiramisù. It is one of the best-rated Italians in the Eixample, known for its warm service and regulars who keep coming back. It serves a weekday lunch set menu, dinner, table reservations and delivery. The website is in Spanish (root) and English (under /en/).

## Datos del negocio / Business information

- Nombre / Name: Positano Pizzería
- Dirección / Address: Carrer del Rosselló, 24, 08029 Barcelona (Eixample)
- Teléfono / Phone: +34 933 51 59 13
- Email: positanopizzeria2023@gmail.com
- Cocina / Cuisine: pizza napolitana, pasta fresca, antipasti / Neapolitan pizza, fresh pasta, antipasti
- Rango de precios / Price range: €€ (menú del día a mediodía / weekday lunch set menu)
- Valoración / Rating: ${reviewStats.rating.replace(".", ",")}/5 · ${reviewStats.count} reseñas en Google / Google reviews
- Reservas / Reservations: en la web del restaurante / book directly on the restaurant's website
- A domicilio / Delivery: Glovo, Uber Eats

## Horarios / Opening hours

- Lunes / Monday: cerrado / closed
- Martes a jueves / Tue–Thu: 13:00–16:00, 20:00–23:30
- Viernes / Friday: 13:00–16:00, 20:00–00:00
- Sábado / Saturday: 13:00–00:00
- Domingo / Sunday: 13:00–23:30

## Páginas principales (español)

${esPages}

## Pages (English)

${enPages}

## Optional

${secondary}
`;
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
