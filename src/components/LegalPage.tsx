import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Lemon from "@/components/Lemon";
import LemonBranch from "@/components/LemonBranch";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { LEGAL_UPDATED, type LegalDoc } from "@/data/legal";
import type { Locale } from "@/lib/i18n";

export default function LegalPage({
  lang,
  doc,
  path,
}: {
  lang: Locale;
  doc: LegalDoc;
  path: string;
}) {
  const home = lang === "en" ? { name: "Home", path: "/en" } : { name: "Inicio", path: "/" };
  const updatedLabel = lang === "en" ? "Last updated" : "Última actualización";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([home, { name: doc.title, path }])}
      />
      <SiteHeader lang={lang} />
      <main>
        {/* Banda de título */}
        <section className="relative overflow-hidden bg-ink px-6 pb-16 pt-36 text-center md:pt-44">
          <LemonBranch className="pointer-events-none absolute -right-16 -top-10 h-80 w-auto rotate-[150deg] text-lemon/20" />
          <LemonBranch variant="bottom" className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-auto -rotate-12 text-lemon/15" />
          <div className="relative mx-auto max-w-2xl">
            <span className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.34em] text-lemon">
              <Lemon className="h-5 w-5" />
              {doc.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl uppercase leading-[1.05] tracking-[0.03em] text-lemon md:text-6xl">
              {doc.title}
            </h1>
            <p className="mt-5 text-[0.82rem] uppercase tracking-[0.24em] text-cream/55">
              {updatedLabel}: {LEGAL_UPDATED[lang === "es" ? "es" : "en"]}
            </p>
          </div>
        </section>

        {/* Cuerpo */}
        <div className="bg-cream px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="font-serif text-lg leading-relaxed text-ink-soft">
              {doc.intro}
            </p>

            <div className="mt-12 flex flex-col gap-10">
              {doc.sections.map((section) => (
                <section key={section.heading ?? section.paragraphs?.[0]}>
                  {section.heading && (
                    <h2 className="font-display text-2xl leading-tight text-ink md:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs?.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mt-4 font-serif text-lg leading-relaxed text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Lemon className="mt-1.5 h-4 w-4 shrink-0 text-lemon" />
                          <span className="font-serif text-lg leading-relaxed text-ink-soft">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
