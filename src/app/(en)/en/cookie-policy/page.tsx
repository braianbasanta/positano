import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LEGAL } from "@/data/legal";
import { alternatesForEn, socialFor } from "@/lib/i18n";

const doc = LEGAL.en.cookies;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: alternatesForEn("/en/cookie-policy"),
  ...socialFor({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: "/en/cookie-policy",
    locale: "en",
  }),
};

export default function CookiePolicyPage() {
  return <LegalPage lang="en" doc={doc} path="/en/cookie-policy" />;
}
