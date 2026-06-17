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
import { mediaDiariaObjetivo, OBJETIVO_MENSUAL, objetivoDia } from "@/lib/facturacion/objetivos";
import EntradaDatos from "./EntradaDatos";

// Inicial del día por getDay() (0=domingo … 6=sábado). M=martes, X=miércoles.
const INICIAL_DIA = ["D", "L", "M", "X", "J", "V", "S"];
// Días seleccionables en la vista "evolución por día" (lunes cerrado, fuera).
const WEEKDAY_PICK = [2, 3, 4, 5, 6, 0];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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
  // Vista "evolución por día de la semana": día seleccionado (2=martes por defecto).
  const [weekday, setWeekday] = useState(2);

  const effectiveDays = useMemo(
    () => (includeDelivery ? days : days.map(stripDelivery)),
    [days, includeDelivery],
  );

  // Serie histórica de un mismo día de la semana (p. ej. todos los martes),
  // ordenada por fecha y acotada a las últimas ~53 ocurrencias (~1 año).
  const weekdaySeries = useMemo(() => {
    const obj = objetivoDia(weekday);
    const recs = effectiveDays
      .filter((r) => !r.closed && weekdayOf(r.date) === weekday)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-53);
    const data = recs.map((r) => {
      const t = dayTotal(r);
      const d = parseLocal(r.date);
      const dnum = dayOfMonth(r.date);
      const mon = monthLabel(d.getMonth()).slice(0, 3);
      let color = INK;
      if (obj && t >= obj) color = EMERALD;
      else if (t === 0) color = ZINC;
      return {
        key: r.date,
        axis: `${dnum} ${mon}`,
        full: `${cap(weekdayLabel(weekday))} ${dnum} ${mon} ${d.getFullYear()}`,
        total: t,
        objetivo: obj ?? null,
        color,
      };
    });
    const withData = data.filter((d) => d.total > 0);
    const sum = withData.reduce((s, d) => s + d.total, 0);
    return {
      data,
      obj,
      avg: withData.length ? sum / withData.length : 0,
      count: withData.length,
      metGoal: obj ? withData.filter((d) => d.total >= obj).length : 0,
      best: withData.reduce((m, d) => Math.max(m, d.total), 0),
      worst: withData.reduce((m, d) => (m === 0 ? d.total : Math.min(m, d.total)), 0),
    };
  }, [effectiveDays, weekday]);

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

  const mediaObj = mediaDiariaObjetivo();
  const mediaDiaPct = mediaObj ? (calc.proj.perOperatingDay / mediaObj) * 100 : 0;
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
          <div className="flex items-center gap-3">
            <a href="/admin" className="font-sans text-xs text-ink/40 transition hover:text-lemon">
              ← Panel
            </a>
            <a href="/admin/plan" className="font-sans text-xs font-medium text-lemon transition hover:text-ink">
              Plan de facturación →
            </a>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink">Facturación</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftMonth(-1)}
            className="rounded-lg border border-ink/10 bg-white/70 px-3.5 py-2 text-base text-ink transition hover:border-lemon"
          >
            ‹
          </button>
          <span className="min-w-[170px] text-center font-sans text-base font-semibold text-ink">
            {monthLabel(month)} {year}
            {isCurrent && <span className="ml-1 text-xs font-normal text-ink/40">(en curso)</span>}
          </span>
          <button
            onClick={() => shiftMonth(1)}
            disabled={year === curY && month === curM}
            className="rounded-lg border border-ink/10 bg-white/70 px-3.5 py-2 text-base text-ink transition hover:border-lemon disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>

      {/* Toggle domicilio */}
      <label className="mt-5 inline-flex cursor-pointer items-center gap-3 rounded-xl border border-ink/10 bg-white/70 px-4 py-2.5 shadow-sm">
        <span className="font-sans text-sm font-medium text-ink/70">Incluir domicilio (Glovo/Uber)</span>
        <span className={`relative h-6 w-11 rounded-full transition ${includeDelivery ? "bg-lemon" : "bg-ink/20"}`}>
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
        <span className="font-sans text-xs font-medium text-ink/40">
          {includeDelivery ? "KPIs con domicilio" : "KPIs solo sala"}
        </span>
      </label>

      {/* KPIs */}
      <div className={`mt-5 grid grid-cols-2 gap-4 ${isCurrent ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
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
        <Kpi
          label="Media diaria"
          value={eur0(calc.proj.perOperatingDay)}
          sub={`objetivo ${eur0(mediaObj)} · ${Math.round(mediaDiaPct)}%`}
          tone={calc.proj.perOperatingDay - mediaObj}
        />
        {isCurrent && (
          <Kpi
            label="Proyección cierre"
            value={eur0(calc.proj.projected)}
            sub={`objetivo ${eur0(OBJETIVO_MENSUAL)}`}
            tone={projVsObjetivo >= 0 ? 1 : -1}
          />
        )}
      </div>

      {/* Progreso de la media diaria objetivo (KPI maestro) */}
      <div className="mt-4 rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="font-sans text-xs font-semibold uppercase tracking-wide text-ink/40">
              Media diaria del mes
            </div>
            <div className="mt-0.5 font-display text-2xl font-semibold text-ink">
              {eur0(calc.proj.perOperatingDay)} <span className="text-ink/40">/ {eur0(mediaObj)} objetivo</span>
              <span className="ml-2 font-sans text-base font-semibold text-ink/50">{Math.round(mediaDiaPct)}%</span>
            </div>
            <div className="mt-0.5 font-sans text-xs text-ink/40">
              Total del mes: {eur0(calc.sel.total)} en {calc.sel.operatingDays} días operativos
              {OBJETIVO_MENSUAL ? ` · ref. mensual ${eur0(OBJETIVO_MENSUAL)}` : ""}
            </div>
          </div>
          <div className="text-right font-sans text-sm">
            {isCurrent && (
              <div className={projVsObjetivo >= 0 ? "font-semibold text-emerald-600" : "font-semibold text-amber-600"}>
                Proyección {eur0(calc.proj.projected)} · {projVsObjetivo >= 0 ? "supera" : "a"} {eur0(Math.abs(projVsObjetivo))} {projVsObjetivo >= 0 ? "la ref. mensual" : "de la ref. mensual"}
              </div>
            )}
            <div className="text-ink/50">
              {calc.metGoal} de {calc.opDaysCount} días alcanzaron su objetivo diario
            </div>
          </div>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-lemon"
            style={{ width: `${Math.min(100, Math.max(0, mediaDiaPct))}%` }}
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

      {/* Evolución de un mismo día de la semana (todos los martes, etc.) */}
      <Card
        className="mt-6"
        title="Evolución por día de la semana"
        hint="Cada barra es un mismo día a lo largo del tiempo (p. ej. todos los martes). Verde = alcanzó su objetivo · línea dorada = objetivo del día."
      >
        <div className="flex flex-wrap gap-2">
          {WEEKDAY_PICK.map((wd) => (
            <button
              key={wd}
              onClick={() => setWeekday(wd)}
              className={`rounded-lg border px-3.5 py-1.5 font-sans text-sm transition ${
                weekday === wd
                  ? "border-lemon bg-lemon/15 font-semibold text-ink"
                  : "border-ink/10 bg-white/70 text-ink/60 hover:border-lemon"
              }`}
            >
              {cap(weekdayLabel(wd))}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Mini label="Media" value={eur0(weekdaySeries.avg)} />
          <Mini label="Objetivo del día" value={weekdaySeries.obj ? eur0(weekdaySeries.obj) : "—"} />
          <Mini label="Alcanzaron objetivo" value={`${weekdaySeries.metGoal}/${weekdaySeries.count}`} />
          <Mini
            label="Mejor / peor"
            value={weekdaySeries.count ? `${eur0(weekdaySeries.best)} / ${eur0(weekdaySeries.worst)}` : "—"}
          />
        </div>

        <div className="mt-4">
          {weekdaySeries.count ? (
            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={weekdaySeries.data} margin={{ top: 10, right: 12, left: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="axis" tick={{ fontSize: 12 }} interval="preserveStartEnd" minTickGap={8} />
                <YAxis tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
                <Tooltip
                  formatter={(v) => eur0(Number(v))}
                  labelFormatter={(l) => weekdaySeries.data.find((d) => d.axis === l)?.full ?? String(l)}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={48}>
                  {weekdaySeries.data.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
                <Line dataKey="objetivo" stroke={LEMON} strokeWidth={2.5} dot={false} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <Empty>Sin datos para {weekdayLabel(weekday)} todavía.</Empty>
          )}
        </div>
      </Card>

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
          className="rounded-lg bg-ink px-4 py-2.5 font-sans text-sm font-medium text-cream transition hover:bg-ink-soft"
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
      ? "text-ink"
      : tone >= 0
        ? "text-emerald-600"
        : "text-red-600";
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
      <div className="font-sans text-xs font-semibold uppercase tracking-wide text-ink/40">{label}</div>
      <div className={`mt-1 font-display text-3xl font-semibold ${toneClass}`}>{value}</div>
      {sub && <div className="mt-1 font-sans text-xs text-ink/50">{sub}</div>}
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white/60 px-3 py-2">
      <div className="font-sans text-[11px] font-semibold uppercase tracking-wide text-ink/40">{label}</div>
      <div className="mt-0.5 font-display text-lg font-semibold text-ink">{value}</div>
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
    <div className={`rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm ${className}`}>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      {hint && <p className="mt-0.5 font-sans text-xs text-ink/40">{hint}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="flex h-[300px] items-center justify-center text-center font-sans text-sm text-ink/40">{children}</div>;
}
