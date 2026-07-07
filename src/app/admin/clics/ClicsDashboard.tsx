"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdminNav from "../AdminNav";
import { GO_TARGETS } from "@/lib/clics/config";
import type { ClickRow } from "@/lib/clics/store";

const INK = "#1d2750";
const LEMON = "#c49b5a";
const EMERALD = "#2f7d54";
const ZINC = "#a1a1aa";

// Color por slug para barras/leyenda. Slugs no listados caen en ZINC.
const SLUG_COLOR: Record<string, string> = {
  "ad-es": LEMON,
  "ad-en": EMERALD,
};

function n0(n: number): string {
  return Math.round(n).toLocaleString("es-ES");
}

// Fecha local (Europe/Madrid) en formato YYYY-MM-DD para agrupar por día.
const DATE_FMT = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Madrid",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
function dayKey(iso: string): string {
  return DATE_FMT.format(new Date(iso));
}
const DAY_LABEL = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  day: "2-digit",
  month: "short",
});
function dayLabel(key: string): string {
  return DAY_LABEL.format(new Date(`${key}T12:00:00`));
}

const RANGES = [
  { label: "7 días", days: 7 },
  { label: "30 días", days: 30 },
  { label: "90 días", days: 90 },
  { label: "Todo", days: 0 },
];

function Kpi({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white/70 p-4 shadow-sm">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ink/40">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold" style={{ color: accent ?? INK }}>
        {value}
      </p>
      {sub && <p className="mt-0.5 font-sans text-xs text-ink/50">{sub}</p>}
    </div>
  );
}

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white/70 p-4 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {hint && <p className="mt-0.5 font-sans text-xs text-ink/50">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function slugLabel(slug: string): string {
  return GO_TARGETS[slug]?.label ?? slug;
}

export default function ClicsDashboard({ rows }: { rows: ClickRow[] }) {
  const [days, setDays] = useState(30);
  const [includeBots, setIncludeBots] = useState(false);

  // Slugs presentes en los datos (más los configurados), en orden estable.
  const slugs = useMemo(() => {
    const set = new Set<string>(Object.keys(GO_TARGETS));
    for (const r of rows) set.add(r.slug);
    return [...set];
  }, [rows]);

  const filtered = useMemo(() => {
    const cutoff = days > 0 ? Date.now() - days * 24 * 60 * 60 * 1000 : 0;
    return rows.filter((r) => {
      if (!includeBots && r.is_bot) return false;
      if (cutoff && new Date(r.ts).getTime() < cutoff) return false;
      return true;
    });
  }, [rows, days, includeBots]);

  // Totales por slug + nº de bots descartados en el rango.
  const { totals, botCount, total } = useMemo(() => {
    const totals: Record<string, number> = {};
    let botCount = 0;
    const cutoff = days > 0 ? Date.now() - days * 24 * 60 * 60 * 1000 : 0;
    for (const r of rows) {
      if (cutoff && new Date(r.ts).getTime() < cutoff) continue;
      if (r.is_bot) {
        botCount++;
        if (!includeBots) continue;
      }
      totals[r.slug] = (totals[r.slug] ?? 0) + 1;
    }
    const total = Object.values(totals).reduce((a, b) => a + b, 0);
    return { totals, botCount, total };
  }, [rows, days, includeBots]);

  // Serie diaria apilada por slug.
  const series = useMemo(() => {
    const byDay = new Map<string, Record<string, number>>();
    for (const r of filtered) {
      const key = dayKey(r.ts);
      const entry = byDay.get(key) ?? {};
      entry[r.slug] = (entry[r.slug] ?? 0) + 1;
      byDay.set(key, entry);
    }
    return [...byDay.keys()]
      .sort()
      .map((key) => ({ day: dayLabel(key), ...byDay.get(key) }));
  }, [filtered]);

  const recent = filtered.slice(0, 25);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <AdminNav />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lemon">Positano</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Clics de anuncios</h1>
          <p className="mt-1 font-sans text-sm text-ink/50">
            Conteo server-side de /go/* — fiable aunque el visitante rechace cookies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-lg border border-ink/10 bg-white/70 p-1">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setDays(r.days)}
                className={`rounded-md px-2.5 py-1 font-sans text-xs font-medium transition ${
                  days === r.days ? "bg-ink text-cream" : "text-ink/60 hover:bg-ink/5"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1.5 font-sans text-xs text-ink/60">
            <input
              type="checkbox"
              checked={includeBots}
              onChange={(e) => setIncludeBots(e.target.checked)}
            />
            Incluir bots
          </label>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Clics totales" value={n0(total)} sub={`${days > 0 ? `últimos ${days} días` : "histórico"}`} />
        <Kpi label="Google Ads ES" value={n0(totals["ad-es"] ?? 0)} accent={LEMON} />
        <Kpi label="Google Ads EN" value={n0(totals["ad-en"] ?? 0)} accent={EMERALD} />
        <Kpi label="Bots filtrados" value={n0(botCount)} sub={includeBots ? "incluidos arriba" : "excluidos"} accent={ZINC} />
      </div>

      <div className="mt-6">
        <Card title="Clics por día" hint="Apilado por origen. Cada barra es un día.">
          {series.length === 0 ? (
            <p className="py-12 text-center font-sans text-sm text-ink/40">
              Sin clics en este rango todavía.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e3d6" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: INK }} interval="preserveStartEnd" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: INK }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e7e3d6", fontSize: 13 }}
                  labelStyle={{ color: INK, fontWeight: 600 }}
                />
                <Legend formatter={(value) => slugLabel(String(value))} wrapperStyle={{ fontSize: 12 }} />
                {slugs.map((slug) => (
                  <Bar
                    key={slug}
                    dataKey={slug}
                    stackId="clics"
                    name={slug}
                    fill={SLUG_COLOR[slug] ?? ZINC}
                    radius={[2, 2, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <Card title="Últimos clics" hint="Los 25 más recientes del rango seleccionado.">
          {recent.length === 0 ? (
            <p className="py-8 text-center font-sans text-sm text-ink/40">Nada que mostrar.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-sans text-sm">
                <thead>
                  <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/40">
                    <th className="py-2 pr-3 font-semibold">Fecha</th>
                    <th className="py-2 pr-3 font-semibold">Origen</th>
                    <th className="py-2 pr-3 font-semibold">País</th>
                    <th className="py-2 pr-3 font-semibold">gclid</th>
                    <th className="py-2 pr-3 font-semibold">Bot</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id} className="border-b border-ink/5 text-ink/80">
                      <td className="py-2 pr-3 whitespace-nowrap">
                        {new Intl.DateTimeFormat("es-ES", {
                          timeZone: "Europe/Madrid",
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(r.ts))}
                      </td>
                      <td className="py-2 pr-3">{slugLabel(r.slug)}</td>
                      <td className="py-2 pr-3">{r.country ?? "—"}</td>
                      <td className="py-2 pr-3">{r.gclid ? "✓" : "—"}</td>
                      <td className="py-2 pr-3">{r.is_bot ? "🤖" : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
