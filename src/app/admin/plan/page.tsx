import { isAuthed } from "@/lib/admin/auth";
import LoginForm from "../LoginForm";
import { mediaDiariaObjetivo, objetivoDia, OBJETIVO_MENSUAL } from "@/lib/facturacion/objetivos";
import { DIAS_PLAN, FASES, PALANCAS, PASO_MEDIA } from "@/lib/facturacion/plan";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

function eur(n: number): string {
  return `${Math.round(n).toLocaleString("es-ES")} €`;
}

export default async function PlanPage() {
  if (!(await isAuthed())) {
    return <LoginForm title="Plan de facturación · Positano" />;
  }

  const mediaObj = mediaDiariaObjetivo();
  // Subir +250 € a un día concreto se nota ~4,3 veces al mes (ese día se repite
  // cada semana) ≈ +1.075 €/mes. Redondeado para mostrar.
  const pasoMensualDia = Math.round((PASO_MEDIA * 4.3) / 50) * 50;

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      {/* Cabecera */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <a href="/admin" className="font-sans text-xs text-ink/40 transition hover:text-lemon">
            ← Panel
          </a>
          <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lemon">
            Positano · Plan
          </p>
          <h1 className="font-display text-4xl font-semibold text-ink">Plan de facturación</h1>
        </div>
        <a
          href="/admin/facturacion"
          className="rounded-lg border border-ink/10 bg-white/70 px-4 py-2 font-sans text-sm font-medium text-ink transition hover:border-lemon"
        >
          Ver dashboard →
        </a>
      </div>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">
        Guía de referencia del equipo. El objetivo se mide en <strong>media diaria</strong>, no en total del mes:
        así es comparable entre meses con distinto número de días. El total sale solo (media × días operativos).
      </p>

      {/* KPI maestro */}
      <div className="mt-6 rounded-2xl bg-ink p-6 text-cream shadow-sm">
        <div className="font-sans text-xs font-semibold uppercase tracking-wide text-cream/50">
          KPI maestro · media diaria objetivo
        </div>
        <div className="mt-1 font-display text-5xl font-semibold text-lemon">
          {eur(mediaObj)} <span className="text-2xl text-cream/60">/ día operativo</span>
        </div>
        <p className="mt-2 max-w-2xl font-sans text-sm text-cream/70">
          <strong className="text-cream">Cómo se sube:</strong> cada día tiene su objetivo (tabla abajo). Cuando un
          día lo cumple de forma <strong className="text-cream">estable</strong> —no un día suelto bueno—, se sube
          ese objetivo <strong className="text-cream">+{PASO_MEDIA} €</strong>. Subir un día del finde se nota unos{" "}
          <strong className="text-cream">+{pasoMensualDia.toLocaleString("es-ES")} €/mes</strong>. Según van subiendo
          los días, la media diaria sube con ellos.
          {OBJETIVO_MENSUAL ? ` Referencia de total mensual: ${eur(OBJETIVO_MENSUAL)}.` : ""}
        </p>
      </div>

      {/* Techo y objetivo por día */}
      <section className="mt-9">
        <h2 className="font-display text-2xl font-semibold text-ink">El techo y el objetivo de cada día</h2>
        <p className="mt-0.5 font-sans text-xs text-ink/40">
          Objetivo = media a batir ese día · Techo = mejor día real observado (dic 2025 – jun 2026, solo sala).
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-white/70 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ink/15 font-sans text-[11px] font-semibold uppercase tracking-wide text-ink/40">
                <th className="px-4 py-3">Día</th>
                <th className="px-4 py-3 text-right">Objetivo / día</th>
                <th className="px-4 py-3 text-right">Techo observado</th>
                <th className="hidden px-4 py-3 sm:table-cell">Lectura</th>
              </tr>
            </thead>
            <tbody>
              {DIAS_PLAN.map((d) => {
                const obj = objetivoDia(d.weekday);
                return (
                  <tr key={d.weekday} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3 font-display text-lg font-semibold text-ink">{d.label}</td>
                    <td className="px-4 py-3 text-right font-sans text-sm font-medium text-ink">
                      {obj ? eur(obj) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-sans text-sm text-emerald-700">
                      {d.techo ? eur(d.techo) : "—"}
                    </td>
                    <td className="hidden px-4 py-3 font-sans text-xs text-ink/50 sm:table-cell">{d.nota}</td>
                  </tr>
                );
              })}
              <tr className="bg-cream-deep/60">
                <td className="px-4 py-3 font-display text-lg font-semibold text-ink">Lunes</td>
                <td className="px-4 py-3 text-right font-sans text-sm text-ink/40" colSpan={3}>
                  Cerrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Hoja de ruta / escalera de media diaria */}
      <section className="mt-9">
        <h2 className="font-display text-2xl font-semibold text-ink">Hoja de ruta · media diaria</h2>
        <p className="mt-0.5 font-sans text-xs text-ink/40">
          De corto a largo plazo. Cada fase se desbloquea al consolidar la anterior.
        </p>
        <div className="mt-4 space-y-3">
          {FASES.map((f, i) => {
            const isToday = i === 0;
            return (
              <div
                key={f.plazo}
                className={`flex items-center gap-4 rounded-2xl border p-4 shadow-sm ${
                  isToday ? "border-ink/15 bg-cream-deep/50" : "border-ink/10 bg-white/70"
                }`}
              >
                <div className="min-w-[120px]">
                  <span className="inline-block rounded-full bg-ink px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-cream">
                    {f.plazo}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg font-semibold text-ink">{f.nombre}</div>
                  <div className="font-sans text-xs text-ink/50">{f.detalle}</div>
                </div>
                <div className="text-right">
                  <div className={`font-display text-2xl font-semibold ${isToday ? "text-ink/60" : "text-emerald-700"}`}>
                    {eur(f.media)}
                  </div>
                  <div className="font-sans text-[11px] text-ink/40">€/día</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Palancas de crecimiento */}
      <section className="mt-9">
        <h2 className="font-display text-2xl font-semibold text-ink">Dónde está el crecimiento</h2>
        <p className="mt-0.5 font-sans text-xs text-ink/40">Tres bolsas, por prioridad.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {PALANCAS.map((p, i) => (
            <div key={p.titulo} className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
              <div className="font-display text-3xl font-semibold text-lemon">{i + 1}</div>
              <div className="mt-1 font-display text-lg font-semibold text-ink">{p.titulo}</div>
              <p className="mt-1 font-sans text-sm text-ink/60">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-9 font-sans text-xs text-ink/40">
        Pieza de información pendiente: registrar los cubiertos por servicio (mediodía / cena, con walk-ins) para
        medir la ocupación real y afinar dónde queda hueco.
      </p>
    </div>
  );
}
