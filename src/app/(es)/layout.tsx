import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";
import ReelViewerProvider from "@/components/reels/ReelViewerProvider";
import { GtmScript, GtmNoScript, GtmConsentDefault } from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import AttributionCapture from "@/components/AttributionCapture";
import FloatingReserva from "@/components/FloatingReserva";
import Clarity from "@/components/Clarity";
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
  title: "Positano · Pizzería Napolitana e Italiano en el Eixample",
  description:
    `Pizzería napolitana e italiana en el Eixample, Barcelona: pasta fresca, carbonara y pizza al horno de leña. ${reviewStats.rating}★ con ${reviewStats.count} reseñas.`,
  alternates: alternatesFor("/"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Positano Pizzería",
    title: "Positano · Pizzería Napolitana e Italiano en el Eixample, Barcelona",
    description:
      "Pizzería napolitana e italiana en el Eixample, Barcelona: pasta fresca, carbonara y pizza al horno de leña. Una de las italianas mejor valoradas del barrio.",
    url: SITE_URL,
    // La imagen para compartir la genera src/app/(es)/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: "Positano · Pizzería Napolitana e Italiano en el Eixample, Barcelona",
    description:
      "Pizza napolitana, pasta fresca y la carbonara que recomiendan en el Eixample. Una de las italianas mejor valoradas de Barcelona.",
  },
};

// Datos estructurados — ayudan a Google a entender el negocio local.
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Positano Pizzería",
  description:
    "Pizzería napolitana y restaurante italiano en el Eixample de Barcelona. Pizza al horno de leña, pasta fresca (su carbonara es de las más recomendadas) y tiramisú de pistacho; una de las italianas mejor valoradas del barrio, conocida por su trato cercano.",
  url: SITE_URL,
  telephone: "+34933515913",
  email: "positanopizzeria2023@gmail.com",
  image: `${SITE_URL}/hero/positano.jpg`,
  priceRange: "€€",
  servesCuisine: ["Pizza napolitana", "Pasta fresca", "Cocina italiana", "Italiana"],
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
  sameAs: [
    "https://www.instagram.com/positanopizzeriabcn/",
    "https://www.facebook.com/positanopizzeriabcn/",
    "https://www.thefork.es/restaurante/positano-r804685",
    "https://www.tripadvisor.es/Restaurant_Review-g187497-d25455989-Reviews-POSITANO_PIZZERIA-Barcelona_Catalonia.html",
    "https://www.google.com/maps?cid=7322759586327519189",
    "https://glovoapp.com/en/es/barcelona/stores/positano-pizzeria-barcelona",
    "https://www.ubereats.com/es/store/positano-pizzeria/ciPAhMptSOeZGNeUsyhjKA",
  ],
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
        {/* GTM/gtag pesan ~330 KB: abrir la conexión por adelantado ahorra
            ~350 ms en móvil (Lighthouse). React lo hoistea al <head>. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <GtmConsentDefault />
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
        {/* El banner va ANTES de {children}: al ser fixed el orden DOM no
            cambia nada visual, pero así pinta con el primer flush del HTML.
            Al final del body no pintaba hasta parsear todo el documento y en
            móvil lento se convertía en el elemento LCP (~6,5 s). */}
        <ConsentBanner lang="es" />
        <ReelViewerProvider>{children}</ReelViewerProvider>
        <FloatingReserva lang="es" />
        <GtmScript />
        <Clarity />
        <Analytics />
        <Suspense>
          <AttributionCapture />
        </Suspense>
      </body>
    </html>
  );
}
