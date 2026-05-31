import { renderOgImage, size, contentType } from "@/lib/og";

export const alt = "Positano · Neapolitan Pizza & Italian Restaurant Barcelona";
export { size, contentType };

export default function Image() {
  return renderOgImage("Neapolitan Pizza · Eixample, Barcelona");
}
