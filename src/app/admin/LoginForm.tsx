"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm({ title = "Panel de administración · Positano" }: { title?: string }) {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string }, fd: FormData) => login(fd),
    {},
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-8 shadow-sm">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lemon">Positano</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">{title}</h1>
        <p className="mt-1 text-base text-ink/60">Introduce la contraseña de administrador.</p>
        <form action={action} className="mt-5 flex gap-2">
          <input
            name="token"
            type="password"
            placeholder="Contraseña"
            className="flex-1 rounded-lg border border-ink/15 bg-white px-3 py-2 font-sans text-sm text-ink outline-none focus:border-lemon focus:ring-1 focus:ring-lemon"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-ink px-4 py-2 font-sans text-sm font-medium text-cream transition hover:bg-ink-soft disabled:opacity-50"
          >
            Entrar
          </button>
        </form>
        {state.error && <p className="mt-3 font-sans text-sm text-red-600">{state.error}</p>}
      </div>
    </div>
  );
}
