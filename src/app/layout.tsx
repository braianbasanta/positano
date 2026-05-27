import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ReelViewerProvider from "@/components/reels/ReelViewerProvider";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://positanopizzeriabcn.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Positano · Pizzería Napolitana en el Eixample, Barcelona",
  description:
    "Pizzería napolitana y restaurante italiano en el Eixample de Barcelona. Pizza de masa fermentada 48 h, pasta fresca y cócteles. El sabor de Nápoles en Barcelona.",
  keywords: [
    "pizzería napolitana Barcelona",
    "pizzería Barcelona",
    "restaurante italiano Barcelona",
    "pizza Barcelona",
    "pizzería Eixample",
    "restaurante italiano Eixample",
    "mejor pizzería Barcelona",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Positano Pizzería",
    title: "Positano · Pizzería Napolitana en el Eixample, Barcelona",
    description:
      "Pizzería napolitana y restaurante italiano en el Eixample de Barcelona. Pizza de masa fermentada 48 h, pasta fresca y cócteles.",
    url: SITE_URL,
    images: ["/hero/positano.jpg"],
  },
};

// Datos estructurados — ayudan a Google a entender el negocio local.
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Positano Pizzería",
  description:
    "Pizzería napolitana y restaurante italiano en el Eixample de Barcelona.",
  url: SITE_URL,
  telephone: "+34933515913",
  email: "positanopizzeria2023@gmail.com",
  image: `${SITE_URL}/hero/positano.jpg`,
  priceRange: "€€",
  servesCuisine: ["Pizza napolitana", "Cocina italiana", "Italiana"],
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrer del Rosselló, 24",
    addressLocality: "Barcelona",
    addressRegion: "Barcelona",
    postalCode: "08029",
    addressCountry: "ES",
  },
  areaServed: "Barcelona",
  sameAs: ["https://instagram.com/positanopizzeriabcn/"],
  hasMenu: `${SITE_URL}/carta`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "13:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "20:00",
      closes: "00:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bodoni.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <ReelViewerProvider>{children}</ReelViewerProvider>
      </body>
    </html>
  );
}
