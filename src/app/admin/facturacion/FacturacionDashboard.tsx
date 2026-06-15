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
  type Canales,
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
  weekdayLabel,
  weekdayOf,
} from "@/lib/facturacion/analytics";
import { OBJETIVO_MENSUAL, objetivoDia } from "@/lib/facturacion/objetivos";
import EntradaDatos from "./EntradaDatos";

// Inicial del día por getDay() (0=domingo … 6=sábado). M=martes, X=miércoles.
const INICIAL_DIA = ["D", "L", "M", "X", "J", "V", "S"];

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

// Quita el domicilio (Glovo + Uber/TheFork) de un día → deja solo la sala
// (tarjeta + efectivo). Se usa para los KPIs "solo sala".
function noDelivery(c?: Canales): Canales | undefined {
  return c ? { ...c, glovo: 0, delivery: 0 } : c;
}
function stripDelivery(r: DayRecord): DayRecord {
  return { ...r, lunch: noDelivery(r.lunch), dinner: noDelivery(r.dinner), total: noDelivery(r.total) };
}

export default function FacturacionDashboard({ days, today }: { days: DayRecord[]; today: string }) {
  const todayD = parseLocal(today);
  const curY = todayD.getFullYear();
  const curM = todayD.getMonth();
  const curDay = todayD.getDate();

  const [year, setYear] = useState(curY);
  const [month, setMonth] = useState(curM);
  const [showEntry, setShowEntry] = useState(false);
  // Por defecto, KPIs SIN domicilio (solo sala). Toggle para incluir Glovo/Uber.
  const [includeDelivery, setIncludeDelivery] = useState(false);

  const effectiveDays = useMemo(
    () => (includeDelivery ? days : days.map(stripDelivery)),
    [days, includeDelivery],
  );

  const isCurrent = year === curY && month === curM;
  // En el mes en curso el corte es el último día CON datos (no "hoy"): así se
  // compara 1→N vs 1→N sin que el otro mes sume días que este aún no tiene.
  const curMonthRecs = recordsInMonth(days, curY, curM);
  const lastDataDay = curMonthRecs.length ? Math.max(...curMonthRecs.map((r) => dayOfMonth(r.date))) : curDay;
  const cutoff = isCurrent ? lastDataDay : daysInMonth(year, month);

  const prevM = month === 0 ? 11 : month - 1;
  const prevY = month === 0 ? year - 1 : year;

  const calc = useMemo(() => {
    const sel = monthTotalUpTo(effectiveDays, year, month, cutoff);
    const prev = monthTotalUpTo(effectiveDays, prevY, prevM, cutoff);
    const yoy = monthTotalUpTo(effectiveDays, year - 1, month, cutoff);
    // El reparto por canal SIEMPRE muestra los 4 canales (incl. domicilio).
    const channels = channelBreakdown(days, year, month);
    const weekdays = weekdayAverages(effectiveDays, year, month);
    const ld = lunchVsDinner(effectiveDays, year, month);
    const proj = projectMonth(effectiveDays, year, month);
    const best = bestDay(effectiveDays, year, month);
    const trend = monthlyTrend(effectiveDays, year, month, 13);

    const dailyData = recordsInMonth(effectiveDays, year, month).map((r) => {
      const wd = weekdayOf(r.date);
      const obj = objetivoDia(wd);
      const t = dayTotal(r);
      const dnum = dayOfMonth(r.date);
      let color = INK;
      if (r.closed) color = ZINC;
      else if (obj && t >= obj) color = EMERALD;
      else if (t === 0) color = ZINC;
      const dia = weekdayLabel(wd);
      return {
        day: dnum,
        axis: `${INICIAL_DIA[wd]}${dnum}`,
        full: `${dia.charAt(0).toUpperCase()}${dia.slice(1)} ${dnum}`,
        total: t,
        objetivo: obj ?? null,
        closed: !!r.closed,
        color,
      };
    });

    const opDays = dailyData.filter((d) => !d.closed && d.total > 0);
    const metGoal = opDays.filter((d) => d.objetivo && d.total >= d.objetivo).length;

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

    return {
      sel, prev, yoy, channels, ld, proj, best, trend, dailyData, compareData, weekdayData, channelData,
      opDaysCount: opDays.length, metGoal,
    };
  }, [days, effectiveDays, year, month, prevM, prevY, cutoff]);

  const objetivoMesPct = OBJETIVO_MENSUAL ? (calc.sel.total / OBJETIVO_MENSUAL) * 100 : 0;
  const projVsObjetivo = calc.proj.projected - OBJETIVO_MENSUAL;

  function shiftMonth(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      {/* Cabecera + selector de mes */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <a href="/admin" className="text-xs text-zinc-400 hover:text-zinc-600">
            ← Panel
          </a>
          <h1 className="text-3xl font-bold text-zinc-900">Facturación</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftMonth(-1)}
            className="rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-base hover:bg-zinc-50"
          >
            ‹
          </button>
          <span className="min-w-[170px] text-center text-base font-semibold text-zinc-900">
            {monthLabel(month)} {year}
            {isCurrent && <span className="ml-1 text-xs font-normal text-zinc-400">(en curso)</span>}
          </span>
          <button
            onClick={() => shiftMonth(1)}
            disabled={year === curY && month === curM}
            className="rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-base hover:bg-zinc-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>

      {/* Toggle domicilio */}
      <label className="mt-5 inline-flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 shadow-sm">
        <span className="text-sm font-medium text-zinc-700">Incluir domicilio (Glovo/Uber)</span>
        <span className={`relative h-6 w-11 rounded-full transition ${includeDelivery ? "bg-emerald-500" : "bg-zinc-300"}`}>
          <input
            type="checkbox"
            checked={includeDelivery}
            onChange={(e) => setIncludeDelivery(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${includeDelivery ? "translate-x-5" : ""}`}
          />
        </span>
        <span className="text-xs font-medium text-zinc-400">
          {includeDelivery ? "KPIs con domicilio" : "KPIs solo sala"}
        </span>
      </label>

      {/* KPIs */}
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
          sub={calc.yoy.total ? `${eur0(calc.yoy.total)} mismo tramo` : "sin datos año previo"}
          tone={pct(calc.sel.total, calc.yoy.total)}
        />
        {isCurrent ? (
          <Kpi
            label="Proyección cierre"
            value={eur0(calc.proj.projected)}
            sub={`media ${eur0(calc.proj.perOperatingDay)}/día operativo`}
            tone={projVsObjetivo >= 0 ? 1 : -1}
          />
        ) : (
          <Kpi
            label="Media diaria"
            value={eur0(calc.proj.perOperatingDay)}
            sub={calc.best ? `mejor: ${eur0(calc.best.total)} (${calc.best.date.slice(8)})` : "—"}
          />
        )}
      </div>

      {/* Progreso del objetivo mensual */}
      <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">Objetivo del mes</div>
            <div className="mt-0.5 text-xl font-bold text-zinc-900">
              {eur0(calc.sel.total)} <span className="text-zinc-400">/ {eur0(OBJETIVO_MENSUAL)}</span>
              <span className="ml-2 text-base font-semibold text-zinc-500">{Math.round(objetivoMesPct)}%</span>
            </div>
          </div>
          <div className="text-right text-sm">
            {isCurrent && (
              <div className={projVsObjetivo >= 0 ? "font-semibold text-emerald-600" : "font-semibold text-amber-600"}>
                Proyección {eur0(calc.proj.projected)} · {projVsObjetivo >= 0 ? "supera" : "a"} {eur0(Math.abs(projVsObjetivo))} {projVsObjetivo >= 0 ? "el objetivo" : "del objetivo"}
              </div>
            )}
            <div className="text-zinc-500">
              {calc.metGoal} de {calc.opDaysCount} días alcanzaron su objetivo diario
            </div>
          </div>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-[#1d2750]"
            style={{ width: `${Math.min(100, Math.max(0, objetivoMesPct))}%` }}
          />
        </div>
      </div>

      {/* Gráfico diario a ANCHO COMPLETO */}
      <Card
        className="mt-6"
        title="Facturación por día"
        hint="Barra verde = alcanza el objetivo del día · gris = cerrado · línea dorada = objetivo."
      >
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={calc.dailyData} margin={{ top: 10, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="axis" tick={{ fontSize: 12 }} interval={0} />
            <YAxis tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
            <Tooltip
              formatter={(v) => eur0(Number(v))}
              labelFormatter={(l) => calc.dailyData.find((d) => d.axis === l)?.full ?? String(l)}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={48}>
              {calc.dailyData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Bar>
            <Line dataKey="objetivo" stroke={LEMON} strokeWidth={2.5} dot={false} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Comparativa + día de la semana */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Comparativa (mismo tramo del mes)" hint={`Acotado al día ${cutoff} para que sea justo.`}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calc.compareData} margin={{ top: 10, right: 12, left: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
              <Tooltip formatter={(v) => eur0(Number(v))} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={90}>
                {calc.compareData.map((_, i) => (
                  <Cell key={i} fill={i === 2 ? INK : ZINC} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Media por día de la semana" hint="Barra = media real · línea = objetivo.">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={calc.weekdayData} margin={{ top: 10, right: 12, left: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
              <Tooltip formatter={(v) => eur0(Number(v))} />
              <Bar dataKey="media" fill={INK} radius={[4, 4, 0, 0]} maxBarSize={56} />
              <Line dataKey="objetivo" stroke={LEMON} strokeWidth={2.5} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Canales + mediodía/cena */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Reparto por canal" hint="Glovo · Tarjeta · Efectivo · Uber/TheFork">
          {calc.channelData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={calc.channelData} dataKey="value" nameKey="name" innerRadius={64} outerRadius={104} paddingAngle={2}>
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Mediodía", value: Math.round(calc.ld.lunch) },
                  { name: "Cena", value: Math.round(calc.ld.dinner) },
                ]}
                margin={{ top: 10, right: 12, left: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
                <Tooltip formatter={(v) => eur0(Number(v))} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={90}>
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
      </div>

      {/* Tendencia a ANCHO COMPLETO */}
      <Card className="mt-6" title="Tendencia (13 meses)" hint="Total facturado por mes.">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={calc.trend} margin={{ top: 10, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} />
            <YAxis tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
            <Tooltip formatter={(v) => eur0(Number(v))} />
            <Bar dataKey="total" fill={INK} radius={[4, 4, 0, 0]} maxBarSize={64} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Entrada de datos */}
      <div className="mt-8">
        <button
          onClick={() => setShowEntry((v) => !v)}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
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
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</div>
      <div className={`mt-1 text-3xl font-bold ${toneClass}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-zinc-500">{sub}</div>}
    </div>
  );
}

function Card({
  title,
  hint,
  children,
  className = "",
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm ${className}`}>
      <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-zinc-400">{hint}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="flex h-[300px] items-center justify-center text-center text-sm text-zinc-400">{children}</div>;
}
