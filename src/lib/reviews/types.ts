// Tipos del sistema de borradores asistidos para reseñas de Google Business Profile.
// El "transporte" (de dónde vienen las reseñas y a dónde se publica la respuesta)
// se abstrae detrás de ReviewSource para poder pasar de modo manual a la API oficial
// sin tocar el motor ni la UI.

export type ReviewStatus =
  | "pending" // tiene borrador, esperando aprobación
  | "approved" // aprobada, lista para publicar (o ya copiada en modo manual)
  | "published" // publicada en Google (solo modo API)
  | "skipped"; // descartada, no se responde

export interface Review {
  id: string; // id estable (en modo API: el reviewId de Google)
  authorName: string;
  rating: number; // 1..5
  text: string; // puede ser "" (reseña de solo estrellas)
  createdAt: string; // ISO 8601
  language?: string; // idioma detectado del texto, si se conoce
}

export interface Draft {
  reviewId: string;
  reply: string; // borrador generado por Claude
  editedReply?: string; // versión editada por el humano (si la hay)
  detectedLanguage: string; // idioma en el que se redactó la respuesta
  model: string; // modelo que lo generó
  generatedAt: string; // ISO 8601
}

// Una reseña + su borrador + su estado. Es la unidad que guarda el store y
// que renderiza la UI.
export interface ReviewItem {
  review: Review;
  draft?: Draft;
  status: ReviewStatus;
  updatedAt: string; // ISO 8601
}

// La respuesta final que se publica: la editada si existe, si no la generada.
export function finalReply(draft: Draft): string {
  return (draft.editedReply ?? draft.reply).trim();
}
