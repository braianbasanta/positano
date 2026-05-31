import { renderOgImage, size, contentType } from "@/lib/og";

export const alt = "Positano · Pizzería Napolitana en el Eixample, Barcelona";
export { size, contentType };

export default function Image() {
  return renderOgImage("Pizzería Napolitana · Eixample, Barcelona");
}
