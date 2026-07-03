import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesForEn, socialFor } from "@/lib/i18n";

const doc = LEGAL.en.privacidad;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesForEn("/en/privacy-policy"),
  ...socialFor({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: "/en/privacy-policy",
    locale: "en",
  }),
};

export default function PrivacyPolicyPage() {
  return <LegalPage lang="en" doc={doc} path="/en/privacy-policy" />;
}
