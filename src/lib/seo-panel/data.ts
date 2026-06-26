// Panel SEO local de Positano. Datos introducidos a mano una vez al mes.
// Para añadir una lectura nueva: copia el último snapshot, cambia `month`/`label`
// y los valores, y ponlo AL FINAL del array. El panel calcula solo las
// variaciones contra el mes anterior y dibuja las tendencias.

export type SeoSnapshot = {
  month: string; // "2026-06"
  label: string; // "Jun 2026"
  isBaseline?: boolean;
  /** Reseñas de Google y nota media. */
  reviews: number;
  rating: number;
  /** Posición en el mapa (local pack) para "italiano" buscando cerca del local. null = sin medir. */
  rankItaliano: number | null;
  /** Keywords del panel que entran en el top-3 del mapa. */
  localPack: { score: number; total: number };
  /** Keywords del panel que aparecen en la página 1 del orgánico. */
  organicP1: { score: number; total: number };
  /** Consultas en las que ChatGPT (con web) menciona a Positano. */
  ai: { score: number; total: number };
  /** GSC: clics y posición de las búsquedas NO de marca (captación de demanda nueva). */
  gscNonBrandClicks: number;
  gscNonBrandImpr: number;
  /** GSC: clics de marca (gente que ya te busca por nombre). */
  gscBrandClicks: number;
  note?: string;
};

// Histórico (más reciente al final). Baseline consolidado de junio 2026:
// GSC 31-may · local pack + IA 12-jun · rank "italiano" + reseñas 26-jun.
export const SNAPSHOTS: SeoSnapshot[] = [
  {
    month: "2026-06",
    label: "Jun 2026",
    isBaseline: true,
    reviews: 1446,
    rating: 4.8,
    rankItaliano: 4,
    localPack: { score: 0, total: 4 },
    organicP1: { score: 2, total: 4 },
    ai: { score: 1, total: 4 },
    gscNonBrandClicks: 7,
    gscNonBrandImpr: 7878,
    gscBrandClicks: 812,
    note: 'Baseline. Gana en el nicho "Eixample + napolitana" (orgánico e IA); el reto es entrar en el local pack del mapa.',
  },
];

// Las 4 keywords objetivo que se re-miden cada mes (DataForSEO, nivel ciudad).
export type KeywordRow = {
  kw: string;
  inLocalPack: boolean;
  organic: string; // posición aproximada o "—"
  target: string;
};

export const KEYWORDS: KeywordRow[] = [
  { kw: "pizzeria eixample", inLocalPack: false, organic: "~#7", target: "Entrar en el pack" },
  { kw: "restaurante italiano eixample", inLocalPack: false, organic: "~#9", target: "Entrar en el pack" },
  { kw: "pizzeria napolitana barcelona", inLocalPack: false, organic: "—", target: "Top 20 orgánico" },
  { kw: "mejor pizzeria barcelona", inLocalPack: false, organic: "—", target: "Largo plazo (prensa)" },
];

// Competidores que dominan el mapa local, para dimensionar el gap de reseñas.
export type Competitor = {
  name: string;
  note: string;
  reviews: number;
  rating: number;
  isUs?: boolean;
};

export const COMPETITORS: Competitor[] = [
  { name: "Buon Appetito", note: "Volumen masivo de reseñas", reviews: 17000, rating: 4.8 },
  { name: "Pummarola", note: "", reviews: 6200, rating: 4.8 },
  { name: "Da Michele", note: "", reviews: 4900, rating: 4.8 },
  { name: "Anema E Core", note: "Misma calle · Rosselló 213", reviews: 2200, rating: 4.8 },
  { name: "Positano", note: "Tú", reviews: 1446, rating: 4.8, isUs: true },
  { name: "MAMA Pizza Napoletana", note: "València 229", reviews: 177, rating: 4.8 },
];

// Los 3 que hoy salen por encima de Positano en el mapa para "italiano".
export const ITALIANO_ABOVE = ["Ristorante Meraviglioso", "AZZURRO", "Mo Te Magno"];
