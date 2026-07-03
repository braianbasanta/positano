import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesFor, socialFor } from "@/lib/i18n";

const doc = LEGAL.es.aviso;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesFor("/aviso-legal"),
  ...socialFor({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: "/aviso-legal",
    locale: "es",
  }),
};

export default function AvisoLegalPage() {
  return <LegalPage lang="es" doc={doc} path="/aviso-legal" />;
}
