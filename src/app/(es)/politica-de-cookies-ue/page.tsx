import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesFor } from "@/lib/i18n";

const doc = LEGAL.es.cookies;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesFor("/politica-de-cookies-ue"),
};

export default function PoliticaCookiesPage() {
  return <LegalPage lang="es" doc={doc} path="/politica-de-cookies-ue" />;
}
