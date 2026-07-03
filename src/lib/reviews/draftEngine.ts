// Motor de borradores: recibe una reseña y devuelve un borrador de respuesta
// usando el SDK oficial de Anthropic. Es independiente del transporte (manual o API).
import Anthropic from "@anthropic-ai/sdk";
import type { Review } from "./types";

// Modelo por defecto: Opus 4.8 (el más capaz). Configurable por si se quiere
// bajar a un modelo más barato para alto volumen (p.ej. REVIEW_MODEL=claude-haiku-4-5).
const MODEL = process.env.REVIEW_MODEL || "claude-opus-4-8";

// Contexto del negocio. Lo usa Claude para personalizar y meter SEO local natural.
const BUSINESS_CONTEXT = `Eres quien responde las reseñas de Google de "Positano Pizzeria",
una pizzería napolitana italiana en Carrer del Rosselló 24, barrio del Eixample, Barcelona.
Tiene 4,8★ con más de 1.450 reseñas. Teléfono: +34 933 51 59 13. Terraza, comida vegetariana,
ambiente acogedor. Muchos clientes son italianos y turistas internacionales.`;

const SYSTEM_PROMPT = `${BUSINESS_CONTEXT}

Redacta la respuesta del propietario a una reseña. Reglas:
- Responde SIEMPRE en el mismo idioma del texto de la reseña (italiano, inglés, español, catalán, francés...). Si la reseña no tiene texto, responde en español.
- Usa el nombre de la persona de forma natural (no en exceso).
- Varía el estilo y las frases: NUNCA uses una plantilla calcada. Google penaliza respuestas idénticas.
- Reseña de 5★ sin texto: respuesta breve, cálida y agradecida (1-2 frases).
- Reseña con texto positivo: agradece y menciona algo CONCRETO de lo que dijo el cliente.
- Reseña negativa o crítica (1-3★): tono empático y humano, sin excusas defensivas ni negar la experiencia; discúlpate con sinceridad e invita a contactar en privado (teléfono o pasarse por el local) para arreglarlo. No prometas compensaciones concretas.
- SEO local: de vez en cuando (no siempre, ~1 de cada 3), incluye de forma natural una expresión como "pizzería en el Eixample" o "pizza napolitana en Barcelona". Que no suene forzado ni repetitivo.
- Emojis: como mucho uno, y solo en respuestas positivas. Nada de spam de emojis.
- No inventes datos (platos, ofertas, premios) que no estén en la reseña.
- Tono: cercano, italiano, de restaurante familiar que cuida a sus clientes. Sin sonar corporativo.`;

// Schema de salida estructurada: forzamos JSON limpio {detectedLanguage, reply}.
const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    detectedLanguage: {
      type: "string",
      description: "Idioma en el que has redactado la respuesta (es, it, en, ca, fr...)",
    },
    reply: {
      type: "string",
      description: "El texto de la respuesta a publicar, sin comillas ni prefijos.",
    },
  },
  required: ["detectedLanguage", "reply"],
  additionalProperties: false,
} as const;

export interface DraftResult {
  reply: string;
  detectedLanguage: string;
  model: string;
}

export function isConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export async function generateDraft(review: Review): Promise<DraftResult> {
  if (!isConfigured()) {
    throw new Error(
      "Falta ANTHROPIC_API_KEY en el entorno. Añádela a .env.local para generar borradores.",
    );
  }

  const client = new Anthropic();

  const userContent = [
    `Reseña de: ${review.authorName || "(anónimo)"}`,
    `Puntuación: ${review.rating}/5 estrellas`,
    review.text?.trim()
      ? `Texto de la reseña:\n"""${review.text.trim()}"""`
      : `(La reseña no tiene texto, solo la puntuación.)`,
  ].join("\n");

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    output_config: { format: { type: "json_schema", schema: OUTPUT_SCHEMA } },
    messages: [{ role: "user", content: userContent }],
  });

  // Con structured outputs la respuesta es un único bloque de texto con el JSON.
  const textBlock = response.content.find((b) => b.type === "text");
  const raw = textBlock && "text" in textBlock ? textBlock.text : "";
  let parsed: { detectedLanguage?: string; reply?: string };
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`La respuesta del modelo no era JSON válido: ${raw.slice(0, 200)}`);
  }
  if (!parsed.reply) {
    throw new Error("El modelo no devolvió ninguna respuesta.");
  }

  return {
    reply: parsed.reply.trim(),
    detectedLanguage: parsed.detectedLanguage || review.language || "es",
    model: response.model,
  };
}
