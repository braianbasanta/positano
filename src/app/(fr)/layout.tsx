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
import { SITE_URL, alternatesForPage } from "@/lib/i18n";
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

// Cifras de reseñas con formato europeo (coma decimal, punto de miles).
const reviewCount = reviewStats.count.replace("+", "") + "+";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Positano · Pizza napolitaine et restaurant italien dans l'Eixample",
  description:
    `Pizzeria napolitaine et restaurant italien dans le quartier de l'Eixample, à Barcelone : pâtes fraîches, carbonara et pizzas cuites au feu de bois. ${reviewStats.rating}★ sur ${reviewCount} avis.`,
  keywords: ["restaurant italien barcelone", "pizzeria napolitaine barcelone", "meilleure pizza barcelone", "pizza barcelone", "restaurant italien eixample", "pizzeria eixample barcelone"],
  alternates: alternatesForPage("home", "fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "es_ES",
    siteName: "Positano Pizzería",
    title: 'Positano · Pizza napolitaine et restaurant italien à Barcelone',
    description:
      "Pizzeria napolitaine et restaurant italien dans le quartier de l'Eixample, à Barcelone : pâtes fraîches, carbonara et pizzas cuites au feu de bois. L'un des restaurants italiens les mieux notés du quartier.",
    url: `${SITE_URL}/fr`,
    // Sin og:image file-based en este segmento: se usa la copia estática EN.
    images: [
      { url: `${SITE_URL}/og/positano-og-en.png`, width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Positano · Pizza napolitaine et restaurant italien à Barcelone',
    description:
      "Pizza napolitaine, pâtes fraîches et la carbonara recommandée par les habitants du quartier. L'un des restaurants italiens les mieux notés de l'Eixample, à Barcelone.",
  },
};

// Datos estructurados del negocio local (fr).
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Positano Pizzería",
  description:
    "Pizzeria napolitaine et restaurant italien dans le quartier de l'Eixample, à Barcelone. Pizzas cuites au feu de bois, pâtes fraîches (sa carbonara figure parmi les plats les plus recommandés) et tiramisu à la pistache ; l'un des restaurants italiens les mieux notés du quartier, réputé pour son accueil chaleureux.",
  url: `${SITE_URL}/fr`,
  telephone: "+34933515913",
  email: "positanopizzeria2023@gmail.com",
  image: `${SITE_URL}/hero/positano.jpg`,
  priceRange: "€€",
  servesCuisine: ["Pizza napolitaine", "Pâtes fraîches", "Italien", "Pâtes"],
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
  hasMenu: `${SITE_URL}/fr/carte`,
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

export default function FrLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bodoni.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* GTM/gtag pesa ~330 KB: el preconnect ahorra ~350 ms en móvil
            (Lighthouse). React lo eleva al <head>. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <GtmConsentDefault />
        <GtmNoScript />
        <noscript>
          <style>{`.hero-rise,[data-reveal]{opacity:1!important;transform:none!important;animation:none!important;}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        {/* Renderizado ANTES de {children}: el banner es fixed, así que el
            orden del DOM no se ve, pero pinta con el primer flush del HTML. */}
        <ConsentBanner lang="fr" />
        <ReelViewerProvider lang="fr">{children}</ReelViewerProvider>
        <FloatingReserva lang="fr" />
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
