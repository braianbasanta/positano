"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CANAL_LABEL,
  CANALES,
  type DayRecord,
  dayTotal,
} from "@/lib/facturacion/types";
import {
  bestDay,
  channelBreakdown,
  dayOfMonth,
  lunchVsDinner,
  monthLabel,
  monthlyTrend,
  monthTotalUpTo,
  parseLocal,
  pct,
  projectMonth,
  recordsInMonth,
  weekdayAverages,
  weekdayOf,
} from "@/lib/facturacion/analytics";
import { OBJETIVO_MENSUAL, objetivoDia } from "@/lib/facturacion/objetivos";
import EntradaDatos from "./EntradaDatos";

const INK = "#1d2750";
const LEMON = "#c6a253";
const EMERALD = "#2f7d54";
const ZINC = "#d4d4d8";
const CHANNEL_COLORS: Record<string, string> = {
  glovo: "#e8743b",
  tarjeta: INK,
  efectivo: "#2f7d54",
  delivery: LEMON,
};

function eur0(n: number): string {
  return `${Math.round(n).toLocaleString("es-ES")} €`;
}
function eurAxis(n: number): string {
  if (Math.abs(n) >= 1000) return `${(n / 1000).toLocaleString("es-ES", { maximumFractionDigits: 1 })}k`;
  return String(Math.round(n));
}
function pctLabel(p: number | null): string {
  if (p === null) return "—";
  const s = p >= 0 ? "+" : "";
  return `${s}${p.toLocaleString("es-ES", { maximumFractionDigits: 1 })}%`;
}
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export default function FacturacionDashboard({ days, today }: { days: DayRecord[]; today: string }) {
  const todayD = parseLocal(today);
  const curY = todayD.getFullYear();
  const curM = todayD.getMonth();
  const curDay = todayD.getDate();

  const [year, setYear] = useState(curY);
  const [month, setMonth] = useState(curM);
  const [showEntry, setShowEntry] = useState(false);

  const isCurrent = year === curY && month === curM;
  const cutoff = isCurrent ? curDay : daysInMonth(year, month);

  const prevM = month === 0 ? 11 : month - 1;
  const prevY = month === 0 ? year - 1 : year;

  const calc = useMemo(() => {
    const sel = monthTotalUpTo(days, year, month, cutoff);
    const prev = monthTotalUpTo(days, prevY, prevM, cutoff);
    const yoy = monthTotalUpTo(days, year - 1, month, cutoff);
    const channels = channelBreakdown(days, year, month);
    const weekdays = weekdayAverages(days, year, month);
    const ld = lunchVsDinner(days, year, month);
    const proj = projectMonth(days, year, month);
    const best = bestDay(days, year, month);
    const trend = monthlyTrend(days, year, month, 13);

    const dailyData = recordsInMonth(days, year, month).map((r) => {
      const wd = weekdayOf(r.date);
      const obj = objetivoDia(wd);
      const t = dayTotal(r);
      let color = INK;
      if (r.closed) color = ZINC;
      else if (obj && t >= obj) color = EMERALD;
      else if (t === 0) color = ZINC;
      return { day: dayOfMonth(r.date), total: t, objetivo: obj ?? null, closed: !!r.closed, color };
    });

    const compareData = [
      { name: `${monthLabel(month).slice(0, 3)} ${year - 1}`, value: yoy.total },
      { name: `${monthLabel(prevM).slice(0, 3)} ${prevY}`, value: prev.total },
      { name: `${monthLabel(month).slice(0, 3)} ${year}`, value: sel.total },
    ];

    const weekdayData = weekdays.map((w) => ({
      label: w.label.slice(0, 3),
      media: Math.round(w.average),
      objetivo: objetivoDia(w.weekday) ?? 0,
    }));

    const channelData = CANALES.map((c) => ({ name: CANAL_LABEL[c], key: c, value: channels[c] })).filter(
      (d) => d.value > 0,
    );

    return { sel, prev, yoy, channels, ld, proj, best, trend, dailyData, compareData, weekdayData, channelData };
  }, [days, year, month, prevM, prevY, cutoff]);

  const objetivoMesPct = pct(calc.sel.total, OBJETIVO_MENSUAL);

  function shiftMonth(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Cabecera + selector de mes */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <a href="/admin" className="text-xs text-zinc-400 hover:text-zinc-600">
            ← Panel
          </a>
          <h1 className="text-2xl font-bold text-zinc-900">Facturación</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftMonth(-1)}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
          >
            ‹
          </button>
          <span className="min-w-[140px] text-center text-sm font-semibold text-zinc-900">
            {monthLabel(month)} {year}
            {isCurrent && <span className="ml-1 text-xs font-normal text-zinc-400">(en curso)</span>}
          </span>
          <button
            onClick={() => shiftMonth(1)}
            disabled={year === curY && month === curM}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          label={isCurrent ? `Mes en curso (1–${cutoff})` : "Total del mes"}
          value={eur0(calc.sel.total)}
          sub={`${calc.sel.operatingDays} días operativos`}
        />
        <Kpi
          label="vs mes anterior"
          value={pctLabel(pct(calc.sel.total, calc.prev.total))}
          sub={`${eur0(calc.prev.total)} mismo tramo`}
          tone={pct(calc.sel.total, calc.prev.total)}
        />
        <Kpi
          label="vs año pasado"
          value={pctLabel(pct(calc.sel.total, calc.yoy.total))}
          sub={calc.yoy.total ? `${eur0(calc.yoy.total)} mismo tramo` : "sin datos 2024/25"}
          tone={pct(calc.sel.total, calc.yoy.total)}
        />
        {isCurrent ? (
          <Kpi
            label="Proyección cierre"
            value={eur0(calc.proj.projected)}
            sub={`objetivo ${eur0(OBJETIVO_MENSUAL)} · ${pctLabel(objetivoMesPct)} hoy`}
            tone={calc.proj.projected >= OBJETIVO_MENSUAL ? 1 : -1}
          />
        ) : (
          <Kpi
            label="Media diaria"
            value={eur0(calc.proj.perOperatingDay)}
            sub={calc.best ? `mejor: ${eur0(calc.best.total)} (${calc.best.date.slice(8)})` : "—"}
          />
        )}
      </div>

      {/* Gráficas */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Facturación por día" hint="Barra verde = alcanza el objetivo del día. Gris = cerrado.">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={calc.dailyData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11 }} width={38} />
              <Tooltip formatter={(v) => eur0(Number(v))} labelFormatter={(l) => `Día ${l}`} />
              <Bar dataKey="total" radius={[3, 3, 0, 0]}>
                {calc.dailyData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
              <Line dataKey="objetivo" stroke={LEMON} strokeWidth={2} dot={false} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Comparativa (mismo tramo del mes)" hint={`Acotado al día ${cutoff} para que sea justo.`}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={calc.compareData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11 }} width={38} />
              <Tooltip formatter={(v) => eur0(Number(v))} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {calc.compareData.map((_, i) => (
                  <Cell key={i} fill={i === 2 ? INK : ZINC} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Media por día de la semana" hint="Barra = media real · línea = objetivo.">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={calc.weekdayData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11 }} width={38} />
              <Tooltip formatter={(v) => eur0(Number(v))} />
              <Bar dataKey="media" fill={INK} radius={[3, 3, 0, 0]} />
              <Line dataKey="objetivo" stroke={LEMON} strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Reparto por canal" hint="Glovo · Tarjeta · Efectivo · Uber/TheFork">
          {calc.channelData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={calc.channelData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {calc.channelData.map((d) => (
                    <Cell key={d.key} fill={CHANNEL_COLORS[d.key]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => eur0(Number(v))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Empty>Sin datos este mes.</Empty>
          )}
        </Card>

        <Card title="Mediodía vs cena" hint="Solo días registrados con desglose por servicio.">
          {calc.ld.daysWithSplit > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={[
                  { name: "Mediodía", value: Math.round(calc.ld.lunch) },
                  { name: "Cena", value: Math.round(calc.ld.dinner) },
                ]}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11 }} width={38} />
                <Tooltip formatter={(v) => eur0(Number(v))} />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  <Cell fill={LEMON} />
                  <Cell fill={INK} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Empty>
              Aún no hay días con desglose mediodía/cena. Empieza a registrarlos abajo y aparecerá aquí.
            </Empty>
          )}
        </Card>

        <Card title="Tendencia (13 meses)" hint="Total facturado por mes.">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={calc.trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={50} />
              <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11 }} width={38} />
              <Tooltip formatter={(v) => eur0(Number(v))} />
              <Bar dataKey="total" fill={INK} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Entrada de datos */}
      <div className="mt-8">
        <button
          onClick={() => setShowEntry((v) => !v)}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          {showEntry ? "Ocultar entrada de datos" : "Añadir / importar datos"}
        </button>
        {showEntry && (
          <div className="mt-4">
            <EntradaDatos defaultDate={today} />
          </div>
        )}
      </div>
    </div>
  );
}

function Kpi({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: number | null }) {
  const toneClass =
    tone === undefined || tone === null
      ? "text-zinc-900"
      : tone >= 0
        ? "text-emerald-600"
        : "text-red-600";
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${toneClass}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-zinc-500">{sub}</div>}
    </div>
  );
}

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-zinc-400">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="flex h-[260px] items-center justify-center text-center text-sm text-zinc-400">{children}</div>;
}
