import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import MenuExplorer from "@/components/MenuExplorer";
import JsonLd from "@/components/JsonLd";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { alternatesForEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "The Menu · Neapolitan Pizza, Pasta & Cocktails · Positano",
  description:
    "Positano's menu: 48-hour fermented Neapolitan pizza, fresh pasta, antipasti, risotti and mains. Italian restaurant in the Eixample, Barcelona.",
  alternates: alternatesForEn("/en/menu"),
};

export default function MenuEnPage() {
  return (
    <>
      <JsonLd data={menuJsonLd("en")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Menu", path: "/en/menu" },
        ])}
      />
      <SiteHeader lang="en" />
      <main>
        {/* Title band */}
        <section className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              The Menu
            </span>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[1] tracking-[0.03em] text-lemon md:text-7xl">
              Our Menu
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-cream/85 md:text-xl">
              48-hour fermented Neapolitan pizza, baked at 400&nbsp;°C with
              100&nbsp;% Italian ingredients. Every dish, a story from southern
              Italy.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/en/drinks"
                className="inline-flex items-center gap-2 rounded-full border border-lemon/60 px-7 py-3 text-[0.85rem] uppercase tracking-[0.22em] text-lemon transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                <Lemon className="h-4 w-4" />
                View drinks
              </a>
            </div>
          </div>
        </section>

        {/* Menu body */}
        <div className="bg-cream px-6 py-20 md:py-28">
          <MenuExplorer lang="en" />

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.88rem] uppercase tracking-[0.22em] text-ink-soft">
              <span>Menu of the day · €14.90</span>
              <span className="hidden h-3 w-px bg-ink/25 sm:block" />
              <span>Terrace surcharge · 10 %</span>
            </div>
            <p className="mt-4 text-center font-serif text-base italic text-ink-soft">
              Please let our team know of any allergy or intolerance.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="/en/book-a-table"
                className="rounded-full bg-ink px-9 py-4 text-[0.9rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-lemon hover:text-ink hover:tracking-[0.27em]"
              >
                Book a table
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
