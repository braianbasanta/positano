"use client";

import { useActionState, useState } from "react";
import { CANALES, CANAL_LABEL, type Canal } from "@/lib/facturacion/types";
import { importPaste, saveDay } from "./actions";

export default function EntradaDatos({ defaultDate }: { defaultDate: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DiaForm defaultDate={defaultDate} />
      <PegarExcel />
    </div>
  );
}

function ServicioInputs({ prefix, titulo }: { prefix: "lunch" | "dinner"; titulo: string }) {
  return (
    <fieldset className="rounded-lg border border-zinc-200 p-3">
      <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">{titulo}</legend>
      <div className="grid grid-cols-2 gap-2">
        {CANALES.map((c: Canal) => (
          <label key={c} className="text-xs text-zinc-500">
            {CANAL_LABEL[c]}
            <input
              name={`${prefix}_${c}`}
              type="text"
              inputMode="decimal"
              placeholder="0"
              className="mt-0.5 w-full rounded-md border border-zinc-200 p-1.5 text-sm text-zinc-900"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function DiaForm({ defaultDate }: { defaultDate: string }) {
  const [closed, setClosed] = useState(false);
  const [state, action, pending] = useActionState<{ error?: string; ok?: boolean }, FormData>(
    async (_prev, fd) => {
      const r = await saveDay(fd);
      return r.error ? { error: r.error } : { ok: true };
    },
    {},
  );

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-zinc-900">Registrar un día</h3>
      <p className="mt-0.5 text-xs text-zinc-400">Mediodía y cena por canal. Acepta coma decimal (1.234,56).</p>
      <form action={action} className="mt-3 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs text-zinc-500">
            Fecha
            <input
              name="date"
              type="date"
              defaultValue={defaultDate}
              className="ml-2 rounded-md border border-zinc-200 p-1.5 text-sm text-zinc-900"
            />
          </label>
          <label className="flex items-center gap-1.5 text-sm text-zinc-700">
            <input name="closed" type="checkbox" checked={closed} onChange={(e) => setClosed(e.target.checked)} />
            Cerrado
          </label>
        </div>

        {!closed && (
          <div className="grid grid-cols-2 gap-3">
            <ServicioInputs prefix="lunch" titulo="Mediodía" />
            <ServicioInputs prefix="dinner" titulo="Cena" />
          </div>
        )}

        <input
          name="note"
          type="text"
          placeholder="Nota (opcional)"
          className="w-full rounded-md border border-zinc-200 p-1.5 text-sm text-zinc-900"
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            Guardar día
          </button>
          {state.error && <span className="text-sm text-red-600">{state.error}</span>}
          {state.ok && <span className="text-sm text-emerald-600">Guardado ✓</span>}
        </div>
      </form>
    </div>
  );
}

function PegarExcel() {
  const [state, action, pending] = useActionState<{ error?: string; imported?: number; skipped?: number }, FormData>(
    async (_prev, fd) => importPaste(fd),
    {},
  );

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-zinc-900">Importar histórico (pegar del Excel)</h3>
      <p className="mt-0.5 text-xs text-zinc-400">
        Copia las filas desde el Excel (desde la columna de la fecha hasta Uber/TheFork). Se guardan como total del día;
        los días vacíos se marcan como cerrados.
      </p>
      <form action={action} className="mt-3 space-y-3">
        <textarea
          name="paste"
          rows={8}
          placeholder={"lunes, 1 de junio de 2026\t\t44,9\t771,92\t151,49\t128,9\t1.097,21\n…"}
          className="w-full rounded-md border border-zinc-200 p-2 font-mono text-xs text-zinc-900"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            Importar
          </button>
          {state.error && <span className="text-sm text-red-600">{state.error}</span>}
          {state.imported !== undefined && (
            <span className="text-sm text-emerald-600">
              {state.imported} días importados{state.skipped ? ` · ${state.skipped} líneas ignoradas` : ""} ✓
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
