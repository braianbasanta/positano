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
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  CANAL_LABEL,
  CANALES,
  type Canales,
  type DayRecord,
  dayTotal,
  hasSplit,
  sumCanales,
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
  weeklySummary,
  yearAgoByDay,
} from "@/lib/facturacion/analytics";
import { mediaDiariaObjetivo, objetivoDelDia, objetivoDia, objetivoMensual } from "@/lib/facturacion/objetivos";
import { holidayFactor } from "@/lib/facturacion/calendario";
import {
  type DayWeather,
  corrStrength,
  pearson,
  tempFactor,
  weatherIcon,
  weatherLabel,
} from "@/lib/facturacion/weather";
import EntradaDatos from "./EntradaDatos";
import AdminNav from "../AdminNav";

// Inicial del día por getDay() (0=domingo … 6=sábado). M=martes, X=miércoles.
const INICIAL_DIA = ["D", "L", "M", "X", "J", "V", "S"];
// Días seleccionables en la vista "evolución por día" (lunes cerrado, fuera).
const WEEKDAY_PICK = [2, 3, 4, 5, 6, 0];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Formatea un coeficiente de correlación con signo (+/−).
const fmtR = (r: number | null) => (r === null ? "—" : `${r >= 0 ? "+" : ""}${r.toFixed(2)}`);

// Lectura en una frase de las correlaciones temperatura/lluvia con la caja.
function climateReading(rTemp: number | null, rRain: number | null): string {
  const parts: string[] = [];
  if (rTemp !== null && Math.abs(rTemp) >= 0.2) {
    parts.push(rTemp > 0 ? "con más calor, más caja" : "con más calor, menos caja");
  }
  if (rRain !== null && Math.abs(rRain) >= 0.2) {
    parts.push(rRain < 0 ? "los días de lluvia baja la caja" : "curiosamente, los días de lluvia sube");
  }
  if (!parts.length) return "De momento el clima apenas mueve la caja con los datos disponibles.";
  return cap(parts.join(" y ")) + ".";
}

const INK = "#1d2750";
const LEMON = "#c49b5a";
const EMERALD = "#2f7d54";
const ZINC = "#d4d4d8";
const RECORD = "#e8743b"; // terracota — día de mayor facturación de la serie
// Colores del desglose por servicio en la gráfica diaria.
const MEDIODIA = "#e8743b"; // terracota
const CENA = INK; // navy
const SLATE = "#8b93a7"; // días sin desglose (histórico)
const PREV_YEAR = "#7d6b9e"; // línea comparativa del año anterior
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

export default function FacturacionDashboard({
  days,
  today,
  weather = [],
}: {
  days: DayRecord[];
  today: string;
  weather?: DayWeather[];
}) {
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
  // Filtro de servicio en la gráfica diaria: todo / solo mediodía / solo cena.
  const [servicio, setServicio] = useState<"todo" | "almuerzo" | "cena">("todo");
  // Líneas superpuestas en la gráfica diaria: objetivo (on por defecto) y año anterior (off).
  const [showObjetivo, setShowObjetivo] = useState(true);
  const [showYearAgo, setShowYearAgo] = useState(false);

  const effectiveDays = useMemo(
    () => (includeDelivery ? days : days.map(stripDelivery)),
    [days, includeDelivery],
  );

  const wxByDate = useMemo(() => new Map(weather.map((w) => [w.date, w] as const)), [weather]);

  // Años con datos (para el selector rápido del navegador de mes), más reciente primero.
  const availableYears = useMemo(() => {
    const set = new Set(days.map((d) => Number(d.date.slice(0, 4))));
    set.add(curY);
    return Array.from(set).sort((a, b) => b - a);
  }, [days, curY]);

  // Serie histórica de un mismo día de la semana (p. ej. todos los martes),
  // ordenada por fecha y acotada a las últimas ~53 ocurrencias (~1 año).
  const weekdaySeries = useMemo(() => {
    const objHoy = objetivoDia(weekday); // objetivo vigente HOY, solo para el Mini "Objetivo del día"
    const recs = effectiveDays
      .filter((r) => !r.closed && weekdayOf(r.date) === weekday)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-53);
    const maxTotal = recs.reduce((m, r) => Math.max(m, dayTotal(r)), 0);
    const data = recs.map((r) => {
      const t = dayTotal(r);
      // Objetivo que regía ESE día según el historial (respeta subidas/bajadas
      // pasadas): así un día que cumplió en su momento no aparece luego como
      // incumplido solo porque después subimos el objetivo.
      const obj = objetivoDelDia(r.date);
      const d = parseLocal(r.date);
      const dnum = dayOfMonth(r.date);
      const mon = monthLabel(d.getMonth()).slice(0, 3);
      let color = INK;
      if (t > 0 && t === maxTotal) color = RECORD;
      else if (obj && t >= obj) color = EMERALD;
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
      obj: objHoy,
      avg: withData.length ? sum / withData.length : 0,
      count: withData.length,
      metGoal: withData.filter((d) => d.objetivo != null && d.total >= d.objetivo).length,
      best: withData.reduce((m, d) => Math.max(m, d.total), 0),
      worst: withData.reduce((m, d) => (m === 0 ? d.total : Math.min(m, d.total)), 0),
    };
  }, [effectiveDays, weekday]);

  // Clima vs facturación: correlación (Pearson) sobre días operativos con dato
  // de clima, nube de puntos caja↔temperatura, y una tira continua con el
  // histórico reciente (caja real) + previsión (media del weekday).
  const climate = useMemo(() => {
    if (!weather.length) return null;
    const recByDate = new Map(effectiveDays.map((r) => [r.date, r] as const));

    const rows = effectiveDays
      .filter((r) => !r.closed)
      .map((r) => ({ date: r.date, total: dayTotal(r), w: wxByDate.get(r.date) }))
      .filter((x) => x.total > 0 && x.w);

    const tempPairs = rows
      .filter((x) => x.w!.tMax != null)
      .map((x) => [x.w!.tMax!, x.total] as [number, number]);
    const rainPairs = rows
      .filter((x) => x.w!.precip != null)
      .map((x) => [x.w!.precip!, x.total] as [number, number]);

    const scatter = rows
      .filter((x) => x.w!.tMax != null)
      .map((x) => ({ temp: x.w!.tMax!, caja: x.total, rain: (x.w!.precip ?? 0) >= 1 }));

    // Media histórica de caja por día de la semana (todo el histórico cargado).
    const wkSum = new Map<number, { s: number; c: number }>();
    for (const x of rows) {
      const wd = weekdayOf(x.date);
      const cur = wkSum.get(wd) ?? { s: 0, c: 0 };
      cur.s += x.total;
      cur.c += 1;
      wkSum.set(wd, cur);
    }
    const wkAvg = (wd: number) => {
      const v = wkSum.get(wd);
      return v && v.c ? v.s / v.c : 0;
    };

    // Tira cronológica: hasta 11 días pasados con registro + 8 días futuros.
    const build = (w: (typeof weather)[number], future: boolean) => {
      const wd = weekdayOf(w.date);
      const rec = recByDate.get(w.date);
      const obj = objetivoDelDia(w.date);
      const closed = obj === null || !!rec?.closed;
      const total = rec ? dayTotal(rec) : 0;
      return {
        date: w.date,
        wd,
        dnum: dayOfMonth(w.date),
        dia: cap(weekdayLabel(wd)),
        code: w.code,
        tMax: w.tMax,
        tMin: w.tMin,
        precip: w.precip,
        precipProb: w.precipProb,
        obj,
        closed,
        future,
        total,
        // Pronóstico: media del weekday × temperatura prevista × festivo/víspera.
        // La lluvia se midió y no afecta; la temperatura y los festivos sí.
        expected: wkAvg(wd) * tempFactor(w.tMax) * holidayFactor(w.date),
        met: !!obj && total >= obj,
      };
    };
    // Días recientes (≤ hoy): se muestran TODOS aunque la caja no esté cargada
    // todavía (saldrán como "pendiente"), para no dejar huecos en el calendario.
    const past = weather
      .filter((w) => w.date <= today)
      .slice(-11)
      .map((w) => build(w, false));
    const future = weather
      .filter((w) => w.date > today)
      .slice(0, 8)
      .map((w) => build(w, true));
    const timeline = [...past, ...future];

    return {
      rTemp: pearson(tempPairs),
      rRain: pearson(rainPairs),
      scatter,
      timeline,
      n: rows.length,
    };
  }, [weather, wxByDate, effectiveDays, today]);

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
    const weeks = weeklySummary(effectiveDays, year, month, objetivoDelDia);
    const yearAgo = yearAgoByDay(effectiveDays, year, month);

    // El negocio cierra los lunes (weekday 1) y no se pintan días cerrados
    // (festivos sin servicio): si no, salen como barras grises vacías e
    // inconsistentes (unos lunes con registro a 0, otros sin registro).
    const dailyData = recordsInMonth(effectiveDays, year, month)
      .filter((r) => !r.closed && weekdayOf(r.date) !== 1)
      .map((r) => {
      const wd = weekdayOf(r.date);
      const obj = objetivoDelDia(r.date);
      const t = dayTotal(r);
      const dnum = dayOfMonth(r.date);
      let color = INK;
      if (r.closed) color = ZINC;
      else if (obj && t >= obj) color = EMERALD;
      else if (t === 0) color = ZINC;
      // Desglose por servicio. Los días con registro a mano llevan lunch/dinner;
      // el histórico (sin split) vive en `total` → se pinta como "sin desglose".
      const split = hasSplit(r);
      const lunch = split ? sumCanales(r.lunch) : 0;
      const dinner = split ? sumCanales(r.dinner) : 0;
      // Resto sin desglose = total − (mediodía + cena). En días con split y
      // domicilio ON es el delivery (que no se reparte por servicio); en el
      // histórico es la caja entera; en "solo sala" da 0 y no se ve.
      const noSplit = Math.max(0, t - lunch - dinner);
      // Color del segmento sin desglose: verde si alcanza objetivo, gris si
      // cerrado, slate en el resto (distinto del navy de "cena").
      let noSplitColor = SLATE;
      if (r.closed) noSplitColor = ZINC;
      else if (obj && t >= obj) noSplitColor = EMERALD;
      const dia = weekdayLabel(wd);
      const wx = wxByDate.get(r.date);
      return {
        day: dnum,
        axis: `${INICIAL_DIA[wd]}${dnum}`,
        full: `${dia.charAt(0).toUpperCase()}${dia.slice(1)} ${dnum}`,
        total: t,
        lunch,
        dinner,
        noSplit,
        noSplitColor,
        split,
        objetivo: obj ?? null,
        lastYear: yearAgo.get(dnum) ?? null,
        closed: !!r.closed,
        color,
        tMax: wx?.tMax ?? null,
        rain: (wx?.precip ?? 0) >= 1,
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
      sel, prev, yoy, channels, ld, proj, best, trend, weeks, dailyData, compareData, weekdayData, channelData,
      opDaysCount: opDays.length, metGoal,
    };
  }, [days, effectiveDays, wxByDate, year, month, prevM, prevY, cutoff]);

  // Objetivo del mes = suma de los objetivos diarios de ESTE mes concreto (no
  // un número fijo): así queda siempre alineado con la suma semanal, sin
  // importar cuántos findes de semana caigan en el mes. Los cierres puntuales
  // registrados (closed) se descuentan, igual que en el objetivo semanal.
  const closedDates = useMemo(
    () => new Set(days.filter((d) => d.closed).map((d) => d.date)),
    [days],
  );
  const objetivoMes = objetivoMensual(year, month, closedDates);
  const monthGoalPct = objetivoMes ? (calc.sel.total / objetivoMes) * 100 : 0;
  const monthGoalGap = objetivoMes - calc.sel.total; // >0 = falta · <0 = superado

  const mediaObj = mediaDiariaObjetivo();
  const mediaDiaPct = mediaObj ? (calc.proj.perOperatingDay / mediaObj) * 100 : 0;
  const projVsObjetivo = calc.proj.projected - objetivoMes;

  function shiftMonth(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <AdminNav />
      {/* Cabecera + selector de mes */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink">Facturación</h1>
        </div>
        <MonthNav
          year={year}
          month={month}
          isCurrent={isCurrent}
          years={availableYears}
          onShift={shiftMonth}
          onSelectYear={setYear}
        />
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
            sub={`objetivo ${eur0(objetivoMes)}`}
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
              {objetivoMes ? ` · ref. mensual ${eur0(objetivoMes)}` : ""}
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
        hint={
          servicio === "todo"
            ? "Cada barra parte la caja en mediodía y cena (los días con desglose). Gris = histórico sin desglose. Pasa el ratón para ver el detalle."
            : `Solo la caja de ${servicio === "almuerzo" ? "mediodía" : "cena"} de los días con desglose registrado.`
        }
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(
            [
              ["todo", "Todo"],
              ["almuerzo", "Mediodía"],
              ["cena", "Cena"],
            ] as const
          ).map(([key, lbl]) => (
            <button
              key={key}
              onClick={() => setServicio(key)}
              className={`rounded-lg border px-3.5 py-1.5 font-sans text-sm transition ${
                servicio === key
                  ? "border-lemon bg-lemon/15 font-semibold text-ink"
                  : "border-ink/10 bg-white/70 text-ink/60 hover:border-lemon"
              }`}
            >
              {lbl}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-ink/10" aria-hidden />
          <button
            onClick={() => setShowObjetivo((v) => !v)}
            aria-pressed={showObjetivo}
            className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 font-sans text-sm transition ${
              showObjetivo
                ? "border-lemon bg-lemon/15 font-semibold text-ink"
                : "border-ink/10 bg-white/70 text-ink/40 hover:border-lemon"
            }`}
          >
            <span className="inline-block h-0.5 w-3 rounded-full" style={{ background: LEMON }} />
            Objetivo
          </button>
          <button
            onClick={() => setShowYearAgo((v) => !v)}
            aria-pressed={showYearAgo}
            className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 font-sans text-sm transition ${
              showYearAgo
                ? "border-lemon bg-lemon/15 font-semibold text-ink"
                : "border-ink/10 bg-white/70 text-ink/40 hover:border-lemon"
            }`}
          >
            <span className="inline-block h-0.5 w-3 rounded-full" style={{ background: PREV_YEAR }} />
            Año anterior ({year - 1})
          </button>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={calc.dailyData} margin={{ top: 10, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="axis" tick={{ fontSize: 12 }} interval={0} />
            <YAxis tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
            <Tooltip content={(p) => <DiaTooltip {...(p as TooltipShape)} data={calc.dailyData} showYearAgo={showYearAgo} />} />
            <Legend />
            {servicio === "todo" && (
              <>
                <Bar name="Mediodía" dataKey="lunch" stackId="dia" fill={MEDIODIA} maxBarSize={48} />
                <Bar name="Cena" dataKey="dinner" stackId="dia" fill={CENA} radius={[4, 4, 0, 0]} maxBarSize={48} />
                <Bar name="Sin desglose" dataKey="noSplit" stackId="dia" radius={[4, 4, 0, 0]} maxBarSize={48}>
                  {calc.dailyData.map((d, i) => (
                    <Cell key={i} fill={d.noSplitColor} />
                  ))}
                </Bar>
              </>
            )}
            {servicio === "almuerzo" && (
              <Bar name="Mediodía" dataKey="lunch" fill={MEDIODIA} radius={[4, 4, 0, 0]} maxBarSize={48} />
            )}
            {servicio === "cena" && (
              <Bar name="Cena" dataKey="dinner" fill={CENA} radius={[4, 4, 0, 0]} maxBarSize={48} />
            )}
            {showObjetivo && (
              <Line name="Objetivo" dataKey="objetivo" stroke={LEMON} strokeWidth={2.5} dot={false} connectNulls />
            )}
            {showYearAgo && (
              <Line
                name={`Año anterior (${year - 1})`}
                dataKey="lastYear"
                stroke={PREV_YEAR}
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                connectNulls
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Resumen por semanas del mes */}
      <Card
        className="mt-6"
        title="Resumen semanal"
        hint="Cada semana (lunes–domingo) frente a su objetivo. La barra es el avance hacia el objetivo de la semana (verde = alcanzado); Δ compara la media diaria (€/día) con la semana anterior."
      >
        {/* Selector de mes (sincronizado con el de la cabecera) para comparar meses sin subir */}
        <div className="mb-4">
          <MonthNav
            year={year}
            month={month}
            isCurrent={isCurrent}
            years={availableYears}
            onShift={shiftMonth}
            onSelectYear={setYear}
            compact
          />
        </div>

        {/* Acumulado del mes vs el objetivo del mes (suma de objetivos diarios) */}
        <div className="mb-5 rounded-xl border border-ink/10 bg-cream/40 p-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div className="font-sans text-xs font-semibold uppercase tracking-wide text-ink/40">
              {isCurrent ? "Acumulado del mes" : "Total del mes"} vs objetivo
            </div>
            <div className="font-sans text-sm font-semibold">
              {monthGoalGap > 0 ? (
                <span className="text-amber-600">Faltan {eur0(monthGoalGap)}</span>
              ) : (
                <span className="text-emerald-600">✓ Superado por {eur0(-monthGoalGap)}</span>
              )}
            </div>
          </div>
          <div className="mt-1 font-display text-2xl font-semibold text-ink">
            {eur0(calc.sel.total)}{" "}
            <span className="text-ink/40">/ {eur0(objetivoMes)}</span>
            <span className="ml-2 font-sans text-base font-semibold text-ink/50">{Math.round(monthGoalPct)}%</span>
          </div>
          <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-ink/10">
            <div
              className={`h-full rounded-full ${monthGoalGap <= 0 ? "bg-emerald-500" : "bg-lemon"}`}
              style={{ width: `${Math.min(100, Math.max(0, monthGoalPct))}%` }}
            />
          </div>
        </div>

        {calc.weeks.length ? (
          <div className="space-y-3">
            {calc.weeks.map((w, i) => {
              const inProgress = isCurrent && today >= w.weekStart && today <= w.weekEnd;
              const gap = w.objetivo - w.total; // >0 = falta · <0 = superado
              const goalPct = w.objetivo ? (w.total / w.objetivo) * 100 : 0;
              return (
                <div key={w.weekStart}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="font-sans text-sm font-semibold text-ink">Sem {i + 1}</span>
                      <span className="font-sans text-xs text-ink/40">
                        {w.startDay}–{w.endDay} {monthLabel(month).slice(0, 3)} · {w.operatingDays} días
                        {inProgress && <span className="ml-1 text-lemon">· en curso</span>}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`min-w-[48px] text-right font-sans text-xs font-semibold ${
                          w.delta === null ? "text-ink/30" : w.delta >= 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {pctLabel(w.delta)}
                      </span>
                      <span className="min-w-[90px] text-right font-display text-base font-semibold text-ink">
                        {eur0(w.total)} <span className="font-sans text-xs font-normal text-ink/40">/ {eur0(w.objetivo)}</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/5">
                      <div
                        className={`h-full rounded-full ${w.metGoal ? "bg-emerald-500" : "bg-lemon"}`}
                        style={{ width: `${Math.min(100, Math.max(0, goalPct))}%` }}
                      />
                    </div>
                    <span
                      className={`min-w-[92px] text-right font-sans text-xs font-semibold ${
                        w.metGoal ? "text-emerald-600" : "text-ink/50"
                      }`}
                    >
                      {w.metGoal ? `✓ +${eur0(-gap)}` : `faltan ${eur0(gap)}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty>Sin datos este mes.</Empty>
        )}
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
        hint="Cada barra es un mismo día a lo largo del tiempo (p. ej. todos los martes). Naranja = récord del periodo · verde = alcanzó su objetivo · línea dorada = objetivo del día."
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

      {/* Clima vs facturación + previsión */}
      {climate && (
        <Card
          className="mt-6"
          title="Clima y facturación"
          hint="Correlación entre el tiempo en Barcelona y la caja, y previsión de los próximos días para dimensionar plantilla."
        >
          {climate.n >= 3 ? (
            <>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <div className="grid grid-cols-2 gap-3">
                    <Mini
                      label="Temperatura ↔ caja"
                      value={`${fmtR(climate.rTemp)} · ${corrStrength(climate.rTemp)}`}
                    />
                    <Mini
                      label="Lluvia ↔ caja"
                      value={`${fmtR(climate.rRain)} · ${corrStrength(climate.rRain)}`}
                    />
                  </div>
                  <p className="mt-3 font-sans text-sm text-ink/60">{climateReading(climate.rTemp, climate.rRain)}</p>
                  <p className="mt-2 font-sans text-xs text-ink/40">
                    Basado en {climate.n} días con caja y datos de clima. La correlación no implica causa; úsala como
                    pista, no como verdad absoluta.
                  </p>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={240}>
                    <ScatterChart margin={{ top: 10, right: 12, left: 4, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis
                        type="number"
                        dataKey="temp"
                        name="Tª máx"
                        unit="°"
                        tick={{ fontSize: 12 }}
                        domain={["dataMin - 1", "dataMax + 1"]}
                      />
                      <YAxis type="number" dataKey="caja" name="Caja" tickFormatter={eurAxis} tick={{ fontSize: 12 }} width={46} />
                      <ZAxis range={[55, 55]} />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        formatter={(val, name) =>
                          name === "Caja" ? [eur0(Number(val)), "Caja"] : [`${Number(val)}°`, "Tª máx"]
                        }
                      />
                      <Legend />
                      <Scatter name="Día seco" data={climate.scatter.filter((p) => !p.rain)} fill={INK} />
                      <Scatter name="Día de lluvia" data={climate.scatter.filter((p) => p.rain)} fill="#3b82f6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <Empty>Aún faltan días con caja y clima para calcular la correlación.</Empty>
          )}

          {climate.timeline.length > 0 && (
            <div className="mt-6">
              <div className="font-sans text-xs font-semibold uppercase tracking-wide text-ink/40">
                Historial reciente y previsión
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {climate.timeline.map((f) => (
                  <div
                    key={f.date}
                    className={`min-w-[100px] flex-1 rounded-xl border p-3 text-center ${
                      f.future
                        ? "border-dashed border-lemon/50 bg-lemon/[0.06]"
                        : f.closed
                          ? "border-ink/5 bg-ink/[0.03]"
                          : "border-ink/10 bg-white/60"
                    }`}
                  >
                    <div className="font-sans text-xs font-medium text-ink/60">
                      {f.dia.slice(0, 3)} {f.dnum}
                    </div>
                    <div className="mt-1 text-2xl leading-none" title={weatherLabel(f.code)}>
                      {weatherIcon(f.code)}
                    </div>
                    <div className="mt-1 font-display text-base font-semibold text-ink">
                      {f.tMax != null ? `${Math.round(f.tMax)}°` : "—"}
                      {f.tMin != null && (
                        <span className="font-sans text-xs font-normal text-ink/40"> / {Math.round(f.tMin)}°</span>
                      )}
                    </div>
                    <div className="mt-0.5 font-sans text-[11px] text-blue-500">
                      {f.future && f.precipProb != null
                        ? `💧 ${f.precipProb}%`
                        : f.precip
                          ? `💧 ${f.precip} mm`
                          : "—"}
                    </div>
                    <div className="mt-1.5 border-t border-ink/5 pt-1.5 font-sans text-[11px]">
                      {f.closed ? (
                        <span className="text-ink/30">Cerrado</span>
                      ) : f.future ? (
                        f.expected > 0 ? (
                          <span className="text-ink/50">~{eur0(f.expected)}</span>
                        ) : (
                          <span className="text-ink/30">—</span>
                        )
                      ) : f.total > 0 ? (
                        <span className={`font-semibold ${f.met ? "text-emerald-600" : "text-ink/70"}`}>
                          {eur0(f.total)}
                        </span>
                      ) : f.expected > 0 ? (
                        <span className="text-ink/40">
                          ~{eur0(f.expected)}
                          <span className="ml-1 text-[10px] text-ink/30">est.</span>
                        </span>
                      ) : (
                        <span className="text-ink/30">pendiente</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-sans text-xs text-ink/40">
                Caja real en los días pasados (verde = alcanzó objetivo) · recuadro punteado = previsión, «~importe» =
                media de ese día de la semana ajustada por la temperatura prevista y por festivos/vísperas (que
                facturan ~12% menos). La lluvia, medida, no afecta.
              </p>
            </div>
          )}
        </Card>
      )}

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

function MonthNav({
  year,
  month,
  isCurrent,
  years,
  onShift,
  onSelectYear,
  compact = false,
}: {
  year: number;
  month: number;
  isCurrent: boolean;
  years: number[];
  onShift: (delta: number) => void;
  onSelectYear: (y: number) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={() => onShift(-1)}
        aria-label="Mes anterior"
        className={`rounded-lg border border-ink/10 bg-white/70 text-base text-ink transition hover:border-lemon ${compact ? "px-3 py-1.5" : "px-3.5 py-2"}`}
      >
        ‹
      </button>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`rounded-lg text-center font-sans font-semibold text-ink transition hover:bg-white/70 ${compact ? "min-w-[150px] py-1 text-sm" : "min-w-[170px] py-1.5 text-base"}`}
      >
        {monthLabel(month)} {year}
        {isCurrent && <span className="ml-1 text-xs font-normal text-ink/40">(en curso)</span>}
      </button>
      <button
        onClick={() => onShift(1)}
        disabled={isCurrent}
        aria-label="Mes siguiente"
        className={`rounded-lg border border-ink/10 bg-white/70 text-base text-ink transition hover:border-lemon disabled:opacity-40 ${compact ? "px-3 py-1.5" : "px-3.5 py-2"}`}
      >
        ›
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-full z-20 mt-1 flex -translate-x-1/2 gap-1 rounded-lg border border-ink/10 bg-white p-1 shadow-md">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  onSelectYear(y);
                  setOpen(false);
                }}
                className={`rounded-md px-3 py-1.5 font-sans text-sm transition ${
                  y === year ? "bg-ink text-cream" : "text-ink hover:bg-cream"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </>
      )}
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

type TooltipShape = { active?: boolean; label?: string | number };
type DiaDatum = {
  axis: string;
  full: string;
  total: number;
  lunch: number;
  dinner: number;
  split: boolean;
  closed: boolean;
  objetivo: number | null;
  lastYear: number | null;
};

// Tooltip de la gráfica diaria: muestra mediodía/cena por separado (días con
// desglose) o la caja total (histórico sin desglose), más el objetivo del día
// y, si está activada, la caja del mismo día del mes un año antes.
function DiaTooltip({
  active,
  label,
  data,
  showYearAgo,
}: TooltipShape & { data: DiaDatum[]; showYearAgo: boolean }) {
  if (!active) return null;
  const d = data.find((x) => x.axis === label);
  if (!d) return null;
  return (
    <div className="rounded-lg border border-ink/10 bg-white/95 px-3 py-2 font-sans text-xs shadow-md">
      <div className="font-semibold text-ink">{d.full}</div>
      {d.closed ? (
        <div className="mt-1 text-ink/50">Cerrado</div>
      ) : d.split ? (
        <>
          <div className="mt-1 flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-ink/60">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: MEDIODIA }} />
              Mediodía
            </span>
            <span className="font-semibold text-ink">{eur0(d.lunch)}</span>
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-ink/60">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: CENA }} />
              Cena
            </span>
            <span className="font-semibold text-ink">{eur0(d.dinner)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4 border-t border-ink/10 pt-1">
            <span className="text-ink/60">Total</span>
            <span className="font-semibold text-ink">{eur0(d.total)}</span>
          </div>
        </>
      ) : (
        <div className="mt-1 text-ink/70">
          Caja {eur0(d.total)} <span className="text-ink/40">(sin desglose)</span>
        </div>
      )}
      {d.objetivo != null && (
        <div className="mt-1 text-ink/50">Objetivo {eur0(d.objetivo)}</div>
      )}
      {showYearAgo && (
        <div className="mt-0.5 text-ink/50">
          Año anterior {d.lastYear != null ? eur0(d.lastYear) : "—"}
        </div>
      )}
    </div>
  );
}
