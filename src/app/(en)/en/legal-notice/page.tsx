import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesForEn, socialFor } from "@/lib/i18n";

const doc = LEGAL.en.aviso;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesForEn("/en/legal-notice"),
  ...socialFor({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: "/en/legal-notice",
    locale: "en",
  }),
};

export default function LegalNoticePage() {
  return <LegalPage lang="en" doc={doc} path="/en/legal-notice" />;
}
