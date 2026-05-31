import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesForEn } from "@/lib/i18n";

const doc = LEGAL.en.privacidad;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesForEn("/en/privacy-policy"),
};

export default function PrivacyPolicyPage() {
  return <LegalPage lang="en" doc={doc} path="/en/privacy-policy" />;
}
