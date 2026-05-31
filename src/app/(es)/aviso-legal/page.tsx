import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesFor } from "@/lib/i18n";

const doc = LEGAL.es.aviso;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesFor("/aviso-legal"),
};

export default function AvisoLegalPage() {
  return <LegalPage lang="es" doc={doc} path="/aviso-legal" />;
}
