import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import EmpleoForm from "@/components/EmpleoForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn, socialFor } from "@/lib/i18n";

const title = "Careers · Positano Pizzería Lounge Bar Barcelona";
const description =
  "Passionate about Italian cuisine, front of house or the bar? Join the Positano team in the Eixample, Barcelona. Send us your CV in a few minutes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesForEn("/en/careers"),
  ...socialFor({ title, description, path: "/en/careers", locale: "en" }),
};

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Careers", path: "/en/careers" },
        ])}
      />
      <SiteHeader lang="en" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              Careers
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Join the team
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              We're looking for people who love Italian cuisine, the dining room
              and warm, personal service. If you want to be part of everyday life
              at Positano, tell us who you are and leave us your CV.
            </p>
          </div>
        </section>

        {/* Intro + form */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <p className="text-[0.82rem] uppercase tracking-[0.32em] text-lemon">
                Our team
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                We cook with heart. We serve with soul.
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink-soft">
                <p>
                  At Positano we value attitude over the CV. We're looking for
                  curious, reliable people who are eager to learn the craft.
                </p>
                <p>
                  If you're passionate about Neapolitan pizza, fresh pasta or
                  front-of-house service, we want to meet you. Fill in the form in
                  a few minutes and attach your CV — we'll review it personally.
                </p>
              </div>
              <ul className="mt-8 space-y-3 font-serif text-base text-ink-soft">
                {[
                  "Registered contract with legal conditions",
                  "Young, multicultural team",
                  "In-house Neapolitan pizza training",
                  "Eixample · Barcelona",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Lemon className="mt-1 h-4 w-4 shrink-0 text-lemon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <EmpleoForm lang="en" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
