import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesForEn } from "@/lib/i18n";

const doc = LEGAL.en.cookies;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesForEn("/en/cookie-policy"),
};

export default function CookiePolicyPage() {
  return <LegalPage lang="en" doc={doc} path="/en/cookie-policy" />;
}
