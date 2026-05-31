import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";
import ReelViewerProvider from "@/components/reels/ReelViewerProvider";
import { GtmScript, GtmNoScript } from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import { SITE_URL, alternatesFor } from "@/lib/i18n";
import { reviewStats } from "@/data/reviews";

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
  alternates: alternatesFor("/"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Positano Pizzería",
    title: "Positano · Pizzería Napolitana en el Eixample, Barcelona",
    description:
      "Pizzería napolitana y restaurante italiano en el Eixample de Barcelona. Pizza de masa fermentada 48 h, pasta fresca y cócteles.",
    url: SITE_URL,
    // La imagen para compartir la genera src/app/(es)/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: "Positano · Pizzería Napolitana en el Eixample, Barcelona",
    description:
      "Pizza napolitana de masa fermentada 48 h, pasta fresca y cócteles. El sabor de Nápoles en el Eixample de Barcelona.",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: reviewStats.rating.replace(",", "."),
    reviewCount: reviewStats.count.replace(/\D/g, ""),
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrer del Rosselló, 24",
    addressLocality: "Barcelona",
    addressRegion: "Barcelona",
    postalCode: "08029",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.3845148,
    longitude: 2.1458994,
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Positano+Pizzeria&query_place_id=ChIJsRxSfvqjpBIR1V-jzgurn2U",
  areaServed: "Barcelona",
  sameAs: ["https://instagram.com/positanopizzeriabcn/"],
  hasMenu: `${SITE_URL}/menu`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "13:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "20:00",
      closes: "23:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "13:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "20:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "13:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "13:00",
      closes: "23:30",
    },
  ],
};

export default function EsLayout({
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
        <GtmNoScript />
        {/* Sin JS, las animaciones de revelado no se disparan: forzamos
            todo el contenido visible para bots sin JS y robustez. */}
        <noscript>
          <style>{`.hero-rise,[data-reveal]{opacity:1!important;transform:none!important;animation:none!important;}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <ReelViewerProvider>{children}</ReelViewerProvider>
        <ConsentBanner lang="es" />
        <GtmScript />
      </body>
    </html>
  );
}
