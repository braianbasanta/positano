import { isAuthed } from "@/lib/admin/auth";
import LoginForm from "../LoginForm";
import AdminNav from "../AdminNav";
import {
  SNAPSHOTS,
  KEYWORDS,
  COMPETITORS,
  ITALIANO_ABOVE,
  type SeoSnapshot,
} from "@/lib/seo-panel/data";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

type Tone = "good" | "warn" | "bad";

const TONE: Record<Tone, { dot: string; text: string }> = {
  good: { dot: "bg-emerald-500", text: "text-emerald-600" },
  warn: { dot: "bg-amber-500", text: "text-amber-600" },
  bad: { dot: "bg-rose-500", text: "text-rose-600" },
};

const TONE_LABEL: Record<Tone, string> = {
  good: "Bien",
  warn: "A mejorar",
  bad: "Flojo",
};

function ratioTone(score: number, total: number): Tone {
  const r = total ? score / total : 0;
  if (r >= 0.6) return "good";
  if (r >= 0.3) return "warn";
  return "bad";
}

function nf(n: number) {
  return n.toLocaleString("es-ES");
}

type Kpi = {
  label: string;
  value: string;
  sub: string;
  tone: Tone;
  delta?: string;
  deltaTone?: Tone;
};

function buildKpis(s: SeoSnapshot, prev?: SeoSnapshot): Kpi[] {
  const reviewsDelta = prev ? s.reviews - prev.reviews : null;
  const nbDelta = prev ? s.gscNonBrandClicks - prev.gscNonBrandClicks : null;
  const rankTone: Tone =
    s.rankItaliano == null
      ? "warn"
      : s.rankItaliano <= 3
        ? "good"
        : s.rankItaliano <= 5
          ? "warn"
          : "bad";

  return [
    {
      label: "Reseñas Google",
      value: nf(s.reviews),
      sub: `${s.rating.toString().replace(".", ",")}★ de nota media`,
      tone: "good",
      delta:
        reviewsDelta == null
          ? "baseline"
          : `${reviewsDelta >= 0 ? "+" : ""}${nf(reviewsDelta)} vs mes ant.`,
      deltaTone: reviewsDelta != null && reviewsDelta < 0 ? "bad" : "good",
    },
    {
      label: 'Mapa · "italiano"',
      value: s.rankItaliano == null ? "—" : `#${s.rankItaliano}`,
      sub: "posición buscando cerca del local",
      tone: rankTone,
    },
    {
      label: "Local Pack",
      value: `${s.localPack.score}/${s.localPack.total}`,
      sub: "keywords en el top-3 del mapa",
      tone: ratioTone(s.localPack.score, s.localPack.total),
    },
    {
      label: "Orgánico pág. 1",
      value: `${s.organicP1.score}/${s.organicP1.total}`,
      sub: "keywords en la 1ª página de Google",
      tone: ratioTone(s.organicP1.score, s.organicP1.total),
    },
    {
      label: "IA (ChatGPT)",
      value: `${s.ai.score}/${s.ai.total}`,
      sub: "consultas que te mencionan",
      tone: ratioTone(s.ai.score, s.ai.total),
    },
    {
      label: "SEO no-marca",
      value: nf(s.gscNonBrandClicks),
      sub: `clics · ${nf(s.gscNonBrandImpr)} impresiones`,
      tone: "bad",
      delta:
        nbDelta == null
          ? "demanda nueva"
          : `${nbDelta >= 0 ? "+" : ""}${nf(nbDelta)} clics vs mes ant.`,
      deltaTone: nbDelta != null && nbDelta < 0 ? "bad" : "good",
    },
  ];
}

export default async function SeoPanelPage() {
  if (!(await isAuthed())) {
    return <LoginForm title="SEO · Positano" />;
  }

  const last = SNAPSHOTS[SNAPSHOTS.length - 1];
  const prev = SNAPSHOTS.length > 1 ? SNAPSHOTS[SNAPSHOTS.length - 2] : undefined;
  const kpis = buildKpis(last, prev);
  const maxReviews = Math.max(...COMPETITORS.map((c) => c.reviews));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <AdminNav />

      <div className="text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lemon">
          Positano
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
          Panel SEO local
        </h1>
        <p className="mt-2 text-lg text-ink/60">
          Cómo vamos en mapa, orgánico e IA. Última lectura: {last.label}.
        </p>
      </div>

      {/* KPIs */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="font-sans text-sm font-medium text-ink/60">
                {k.label}
              </p>
              <span className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${TONE[k.tone].dot}`} />
                <span className={`text-xs font-medium ${TONE[k.tone].text}`}>
                  {TONE_LABEL[k.tone]}
                </span>
              </span>
            </div>
            <p className="mt-3 font-display text-4xl font-semibold text-ink">
              {k.value}
            </p>
            <p className="mt-1 text-sm text-ink/55">{k.sub}</p>
            {k.delta && (
              <p
                className={`mt-2 text-xs font-medium ${
                  k.deltaTone ? TONE[k.deltaTone].text : "text-ink/40"
                }`}
              >
                {k.delta}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Keywords objetivo */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Keywords objetivo
        </h2>
        <p className="mt-1 text-sm text-ink/55">
          Las 4 que se re-miden cada mes (nivel ciudad, subestima la posición
          real cerca del local).
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-white/70 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Keyword</th>
                <th className="px-4 py-3 text-center font-medium">Mapa (top-3)</th>
                <th className="px-4 py-3 text-center font-medium">Orgánico</th>
                <th className="px-4 py-3 font-medium">Objetivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {KEYWORDS.map((row) => (
                <tr key={row.kw}>
                  <td className="px-4 py-3 font-medium text-ink">{row.kw}</td>
                  <td className="px-4 py-3 text-center">
                    {row.inLocalPack ? (
                      <span className="text-emerald-600">✓</span>
                    ) : (
                      <span className="text-rose-500">✗</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-ink/70">
                    {row.organic}
                  </td>
                  <td className="px-4 py-3 text-ink/55">{row.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reseñas vs competencia */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Reseñas vs competencia del mapa
        </h2>
        <p className="mt-1 text-sm text-ink/55">
          El gap del local pack es volumen de reseñas, no la nota (todos rondan
          4,8★). Hoy en "italiano" te pasan {ITALIANO_ABOVE.join(", ")}.
        </p>
        <div className="mt-4 space-y-2.5 rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
          {COMPETITORS.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-44 shrink-0 text-sm">
                <span
                  className={`font-medium ${c.isUs ? "text-lemon" : "text-ink"}`}
                >
                  {c.name}
                </span>
                {c.note && (
                  <span className="block text-xs text-ink/40">{c.note}</span>
                )}
              </div>
              <div className="h-5 flex-1 overflow-hidden rounded bg-ink/5">
                <div
                  className={`h-full rounded ${c.isUs ? "bg-lemon" : "bg-ink/25"}`}
                  style={{ width: `${(c.reviews / maxReviews) * 100}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-sm tabular-nums text-ink/70">
                {nf(c.reviews)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Histórico */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Histórico mensual
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10 bg-white/70 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Mes</th>
                <th className="px-4 py-3 text-center font-medium">Reseñas</th>
                <th className="px-4 py-3 text-center font-medium">Mapa "italiano"</th>
                <th className="px-4 py-3 text-center font-medium">Local pack</th>
                <th className="px-4 py-3 text-center font-medium">Orgánico</th>
                <th className="px-4 py-3 text-center font-medium">IA</th>
                <th className="px-4 py-3 text-center font-medium">No-marca</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {[...SNAPSHOTS].reverse().map((s) => (
                <tr key={s.month}>
                  <td className="px-4 py-3 font-medium text-ink">
                    {s.label}
                    {s.isBaseline && (
                      <span className="ml-2 rounded bg-ink/10 px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-ink/50">
                        base
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums text-ink/70">
                    {nf(s.reviews)}
                  </td>
                  <td className="px-4 py-3 text-center text-ink/70">
                    {s.rankItaliano == null ? "—" : `#${s.rankItaliano}`}
                  </td>
                  <td className="px-4 py-3 text-center text-ink/70">
                    {s.localPack.score}/{s.localPack.total}
                  </td>
                  <td className="px-4 py-3 text-center text-ink/70">
                    {s.organicP1.score}/{s.organicP1.total}
                  </td>
                  <td className="px-4 py-3 text-center text-ink/70">
                    {s.ai.score}/{s.ai.total}
                  </td>
                  <td className="px-4 py-3 text-center text-ink/70">
                    {nf(s.gscNonBrandClicks)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {last.note && (
          <p className="mt-3 text-sm italic text-ink/55">{last.note}</p>
        )}
      </section>

      <p className="mt-10 border-t border-ink/10 pt-4 text-xs text-ink/40">
        Datos introducidos a mano. Para añadir la lectura del mes, editar{" "}
        <code className="rounded bg-ink/5 px-1 py-0.5">
          src/lib/seo-panel/data.ts
        </code>{" "}
        (un snapshot nuevo al final del array). Fuentes: GBP, Google Search
        Console, DataForSEO (local pack + IA) y el rank checker de GMBEverywhere.
      </p>
    </div>
  );
}
