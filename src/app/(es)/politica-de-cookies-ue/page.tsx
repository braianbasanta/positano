import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesFor, socialFor } from "@/lib/i18n";

const doc = LEGAL.es.cookies;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesFor("/politica-de-cookies-ue"),
  ...socialFor({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: "/politica-de-cookies-ue",
    locale: "es",
  }),
};

export default function PoliticaCookiesPage() {
  return <LegalPage lang="es" doc={doc} path="/politica-de-cookies-ue" />;
}
