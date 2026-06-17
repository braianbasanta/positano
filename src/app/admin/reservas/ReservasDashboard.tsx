"use client";

import { useMemo, useState } from "react";
import AdminNav from "../AdminNav";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  allMonths,
  dishByHour,
  dishByPartySize,
  dishByWeekday,
  dishYoY,
  filterDish,
  filterFork,
  forkByChannel,
  forkByOffer,
  monthLabel,
  monthSeries,
  movingAvg,
  totalsFrom,
} from "@/lib/reservas/compute";
import type { DishReserva, ForkMonthRow } from "@/lib/reservas/types";

const INK = "#1d2750";
const LEMON = "#c6a253";
const EMERALD = "#2f7d54";
const CORAL = "#e8743b";
const ZINC = "#a1a1aa";
const YEAR_COLORS = [ZINC, LEMON, INK, EMERALD];

const DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const DIA_CORTO = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function n0(n: number): string {
  return Math.round(n).toLocaleString("es-ES");
}
function pct(n: number): string {
  return `${n.toLocaleString("es-ES", { maximumFractionDigits: 0 })}%`;
}

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
      {hint && <p className="mt-0.5 font-sans text-xs text-ink/40">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function ReservasDashboard({ dish, fork }: { dish: DishReserva[]; fork: ForkMonthRow[] }) {
  const months = useMemo(() => allMonths(dish, fork), [dish, fork]);
  const first = months[0];
  const last = months[months.length - 1];

  const [tab, setTab] = useState<"resumen" | "thefork" | "dish">("resumen");
  const [from, setFrom] = useState(first);
  const [to, setTo] = useState(last);

  // Datos filtrados al rango elegido.
  const fDish = useMemo(() => filterDish(dish, from, to), [dish, from, to]);
  const fFork = useMemo(() => filterFork(fork, from, to), [fork, from, to]);
  const serie = useMemo(() => monthSeries(dish, fork, from, to), [dish, fork, from, to]);
  const totals = useMemo(() => totalsFrom(serie), [serie]);

  // Serie mensual con línea de tendencia (media móvil 3 meses de cubiertos online).
  const serieChart = useMemo(() => {
    const covers = serie.map((m) => m.dishComensales + m.forkCovers);
    const trend = movingAvg(covers, 3);
    return serie.map((m, i) => ({
      label: monthLabel(m.period),
      forkCena: m.forkCena,
      forkComida: m.forkComida,
      dishComensales: m.dishComensales,
      tendencia: trend[i],
      tasaCancel: m.forkSolicitadas
        ? Math.round(((m.forkCancelaciones + m.forkNoShows) / m.forkSolicitadas) * 100)
        : 0,
      forkSolicitadas: m.forkSolicitadas,
    }));
  }, [serie]);
  const serieFork = useMemo(() => serieChart.filter((s) => s.forkSolicitadas > 0), [serieChart]);

  const byChannel = useMemo(() => forkByChannel(fFork), [fFork]);
  const byOffer = useMemo(() => forkByOffer(fFork), [fFork]);
  const byWeekday = useMemo(() => dishByWeekday(fDish), [fDish]);
  const byHour = useMemo(() => dishByHour(fDish), [fDish]);
  const byPartySize = useMemo(() => dishByPartySize(fDish), [fDish]);
  const yoy = useMemo(() => dishYoY(dish), [dish]); // YoY siempre con todo el histórico
  const ultimasDish = useMemo(
    () => [...fDish].sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time)).slice(0, 200),
    [fDish],
  );

  const channelData = byChannel.map((c) => ({ name: c.channel.replace("TheFork ", ""), value: c.covers }));
  const offerData = byOffer.map((o) => ({
    name: o.offer === 0 ? "Sin dto." : `${o.offer}%`,
    value: o.covers,
    offer: o.offer,
  }));
  const offerColor = (offer: number) => (offer === 0 ? EMERALD : offer >= 50 ? CORAL : LEMON);
  const channelColors = [INK, LEMON, EMERALD, CORAL];

  const tabs: { id: typeof tab; label: string }[] = [
    { id: "resumen", label: "Resumen" },
    { id: "thefork", label: "TheFork" },
    { id: "dish", label: "DISH (web)" },
  ];

  // Atajos de rango rápido.
  const years = [...new Set(months.map((m) => m.slice(0, 4)))];
  function setYear(y: string) {
    const ms = months.filter((m) => m.startsWith(y));
    if (ms.length) {
      setFrom(ms[0]);
      setTo(ms[ms.length - 1]);
    }
  }
  function setAll() {
    setFrom(first);
    setTo(last);
  }
  function setLast12() {
    setFrom(months[Math.max(0, months.length - 12)]);
    setTo(last);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <AdminNav />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lemon">Positano</p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-ink">Reservas online</h1>
          <p className="mt-1 font-sans text-sm text-ink/50">DISH (web) + TheFork</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-ink/10 bg-white/60 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3 py-1.5 font-sans text-sm font-medium transition ${
                tab === t.id ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro de periodo */}
      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-ink/10 bg-white/60 p-3">
        <span className="font-sans text-xs font-semibold uppercase tracking-wide text-ink/40">Periodo</span>
        <label className="font-sans text-sm text-ink/60">
          Desde{" "}
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value > to ? to : e.target.value)}
            className="ml-1 rounded-md border border-ink/15 bg-white px-2 py-1 text-ink outline-none focus:border-lemon"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </label>
        <label className="font-sans text-sm text-ink/60">
          Hasta{" "}
          <select
            value={to}
            onChange={(e) => setTo(e.target.value < from ? from : e.target.value)}
            className="ml-1 rounded-md border border-ink/15 bg-white px-2 py-1 text-ink outline-none focus:border-lemon"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className="rounded-md border border-ink/15 bg-white px-2.5 py-1 font-sans text-xs font-medium text-ink/70 transition hover:border-lemon hover:text-ink"
            >
              {y}
            </button>
          ))}
          <button
            onClick={setLast12}
            className="rounded-md border border-ink/15 bg-white px-2.5 py-1 font-sans text-xs font-medium text-ink/70 transition hover:border-lemon hover:text-ink"
          >
            Últ. 12m
          </button>
          <button
            onClick={setAll}
            className="rounded-md border border-ink/15 bg-white px-2.5 py-1 font-sans text-xs font-medium text-ink/70 transition hover:border-lemon hover:text-ink"
          >
            Todo
          </button>
        </div>
      </div>

      {/* KPIs del rango */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="Cubiertos TheFork"
          value={n0(totals.forkCovers)}
          sub={`${n0(totals.forkBookings)} reservas cumplidas`}
          accent={LEMON}
        />
        <Kpi
          label="Reservas DISH (web)"
          value={n0(totals.dishReservas)}
          sub={`${n0(totals.dishComensales)} comensales · ${totals.mediaDishComensales.toFixed(1)}/reserva`}
        />
        <Kpi
          label="Cubiertos con descuento"
          value={totals.forkCovers ? pct(totals.pctDescuento) : "—"}
          sub="TheFork · la mayoría al 30%"
          accent={CORAL}
        />
        <Kpi
          label="No llegan (TheFork)"
          value={totals.forkSolicitadas ? pct(totals.tasaCancelacion) : "—"}
          sub={`${n0(totals.forkCancelaciones)} canc. + ${n0(totals.forkNoShows)} no-show`}
          accent={CORAL}
        />
      </div>

      {tab === "resumen" && (
        <div className="mt-6 grid gap-5">
          <Card
            title="Cubiertos online por mes"
            hint="Barras = cena/comida de TheFork + comensales de la web. Línea = tendencia (media de 3 meses). 2024 solo tiene DISH."
          >
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={serieChart} margin={{ top: 8, right: 8, left: -16, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="label" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 11, fill: ZINC }} />
                <YAxis tick={{ fontSize: 11, fill: ZINC }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="forkCena" name="TheFork cena" stackId="a" fill={INK} />
                <Bar dataKey="forkComida" name="TheFork comida" stackId="a" fill={LEMON} />
                <Bar dataKey="dishComensales" name="DISH web" stackId="a" fill={EMERALD} radius={[3, 3, 0, 0]} />
                <Line dataKey="tendencia" name="Tendencia (3m)" stroke={CORAL} strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          <Card
            title="Comparativa año contra año (mejora)"
            hint="Comensales de la web (DISH) por mes, una línea por año. Si la línea de un año va por encima de la del anterior, ese mes ha mejorado."
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yoy.rows} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: ZINC }} />
                <YAxis tick={{ fontSize: 11, fill: ZINC }} />
                <Tooltip />
                <Legend />
                {yoy.years.map((y, i) => (
                  <Line
                    key={y}
                    dataKey={y}
                    name={y}
                    stroke={YEAR_COLORS[i % YEAR_COLORS.length]}
                    strokeWidth={i === yoy.years.length - 1 ? 3 : 2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Reparto por canal" hint="Cubiertos de TheFork por origen. La web (DISH) va aparte.">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={channelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {channelData.map((_, i) => (
                      <Cell key={i} fill={channelColors[i % channelColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Cena vs Comida (TheFork)" hint="El mediodía SÍ trae reservas por TheFork (la web es solo cena).">
              <div className="flex h-[240px] flex-col justify-center gap-4">
                <Splitbar label="Cena" value={totals.forkCena} total={totals.forkCena + totals.forkComida} color={INK} />
                <Splitbar
                  label="Comida (mediodía)"
                  value={totals.forkComida}
                  total={totals.forkCena + totals.forkComida}
                  color={LEMON}
                />
              </div>
            </Card>
          </div>

          <Glosario />
        </div>
      )}

      {tab === "thefork" && (
        <div className="mt-6 grid gap-5">
          <Card
            title="Reservas que no llegan, por mes"
            hint="La mitad de lo que se reserva en TheFork se cancela o no aparece. Barras = solicitadas, línea = % que no llega."
          >
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={serieFork} margin={{ top: 8, right: 8, left: -16, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="label" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 11, fill: ZINC }} />
                <YAxis yAxisId="l" tick={{ fontSize: 11, fill: ZINC }} />
                <YAxis yAxisId="r" orientation="right" unit="%" domain={[0, 100]} tick={{ fontSize: 11, fill: ZINC }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="l" dataKey="forkSolicitadas" name="Reservas solicitadas" fill={INK} radius={[3, 3, 0, 0]} />
                <Line yAxisId="r" dataKey="tasaCancel" name="% no llegan" stroke={CORAL} strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Cubiertos por descuento" hint="La mayoría de cubiertos de TheFork llevan 30% off. Volumen alto, margen bajo.">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={offerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {offerData.map((d, i) => (
                      <Cell key={i} fill={offerColor(d.offer)} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Desglose de cancelaciones" hint="Sobre el total de reservas solicitadas en TheFork.">
              <div className="flex h-[240px] flex-col justify-center gap-3">
                <Splitbar label="Cumplidas" value={totals.forkBookings} total={totals.forkSolicitadas} color={EMERALD} />
                <Splitbar
                  label="Canceladas"
                  value={totals.forkCancelaciones}
                  total={totals.forkSolicitadas}
                  color={LEMON}
                />
                <Splitbar label="No-show" value={totals.forkNoShows} total={totals.forkSolicitadas} color={CORAL} />
              </div>
            </Card>
          </div>

          <Glosario />
        </div>
      )}

      {tab === "dish" && (
        <div className="mt-6 grid gap-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Reservas por día de la semana" hint="Reservas de la web en el periodo elegido. Cierra los lunes.">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={byWeekday} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="weekday" tickFormatter={(w) => DIA_CORTO[w]} tick={{ fontSize: 11, fill: ZINC }} />
                  <YAxis tick={{ fontSize: 11, fill: ZINC }} />
                  <Tooltip labelFormatter={(w) => DIA[w as number]} />
                  <Bar dataKey="comensales" name="Comensales" fill={INK} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Reservas por hora" hint="Franja de llegada. DISH (web) es solo cena.">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={byHour} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: ZINC }} />
                  <YAxis tick={{ fontSize: 11, fill: ZINC }} />
                  <Tooltip />
                  <Bar dataKey="reservas" name="Reservas" fill={LEMON} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card title="Tamaño de grupo" hint="Cuántas reservas por nº de comensales.">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byPartySize} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="size" tickFormatter={(s) => `${s}p`} tick={{ fontSize: 11, fill: ZINC }} />
                <YAxis tick={{ fontSize: 11, fill: ZINC }} />
                <Tooltip labelFormatter={(s) => `${s} comensales`} />
                <Bar dataKey="reservas" name="Reservas" fill={EMERALD} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Reservas DISH" hint={`${ultimasDish.length} reservas del periodo, más recientes primero.`}>
            <div className="max-h-[420px] overflow-auto">
              <table className="w-full font-sans text-sm">
                <thead className="sticky top-0 bg-white/95 text-left text-xs uppercase tracking-wide text-ink/40">
                  <tr>
                    <th className="py-2 pr-3">Fecha</th>
                    <th className="py-2 pr-3">Hora</th>
                    <th className="py-2 pr-3">Comensales</th>
                    <th className="py-2 pr-3">Nombre</th>
                    <th className="py-2">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimasDish.map((r, i) => (
                    <tr key={i} className="border-t border-ink/5 text-ink/80">
                      <td className="py-1.5 pr-3 tabular-nums">{r.date}</td>
                      <td className="py-1.5 pr-3 tabular-nums">{r.time}</td>
                      <td className="py-1.5 pr-3 tabular-nums">{r.guests}</td>
                      <td className="py-1.5 pr-3">{r.name ?? <span className="text-ink/30">—</span>}</td>
                      <td className="py-1.5 text-ink/50">{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function Splitbar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const p = total ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between font-sans text-sm">
        <span className="text-ink/70">{label}</span>
        <span className="font-medium text-ink">
          {n0(value)} <span className="text-ink/40">({pct(p)})</span>
        </span>
      </div>
      <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full" style={{ width: `${p}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// Glosario en lenguaje llano para que Antonio entienda de dónde sale cada cosa.
function Glosario() {
  const items: { term: string; desc: string }[] = [
    {
      term: "DISH (web)",
      desc: "Reservas que entran por el botón de reservar de nuestra propia web. Son clientes que ya nos buscaban.",
    },
    {
      term: "TheFork Network",
      desc: "Reservas hechas desde la app o la web de TheFork. Son clientes nuevos que nos descubren en su buscador de restaurantes. Es nuestra mayor fuente de reservas online.",
    },
    {
      term: "TheFork Partners",
      desc: "Reservas que llegan desde otras webs asociadas a TheFork (Google, buscadores y portales que usan su sistema de reservas), no desde la propia TheFork. En nuestro caso son muy pocas.",
    },
    {
      term: "TripAdvisor",
      desc: "Reservas que entran por TripAdvisor (que es la empresa dueña de TheFork). También muy pocas.",
    },
    {
      term: "Cubiertos con descuento",
      desc: "Porcentaje de clientes de TheFork que vinieron con una oferta (normalmente 30% en la comida). Dan volumen, pero dejan menos margen porque encima TheFork cobra comisión.",
    },
    {
      term: "No llegan",
      desc: "Reservas que se cancelan o que directamente no aparecen (no-show). En TheFork es alto: la mitad de lo que se reserva no acaba sentándose.",
    },
  ];
  return (
    <div className="rounded-xl border border-ink/10 bg-cream/40 p-5">
      <h3 className="font-display text-lg font-semibold text-ink">¿Qué significa cada cosa?</h3>
      <p className="mt-0.5 font-sans text-xs text-ink/40">Pequeña guía de los términos del panel.</p>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <div key={it.term}>
            <dt className="font-sans text-sm font-semibold text-ink">{it.term}</dt>
            <dd className="mt-0.5 font-sans text-sm leading-snug text-ink/60">{it.desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
