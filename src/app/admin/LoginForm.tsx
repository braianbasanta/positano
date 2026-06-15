"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm({ title = "Panel de administración · Positano" }: { title?: string }) {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string }, fd: FormData) => login(fd),
    {},
  );

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-lg font-bold text-zinc-900">{title}</h1>
      <p className="mt-1 text-sm text-zinc-500">Introduce la contraseña de administrador.</p>
      <form action={action} className="mt-4 flex gap-2">
        <input
          name="token"
          type="password"
          placeholder="Contraseña"
          className="flex-1 rounded-lg border border-zinc-200 p-2 text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          Entrar
        </button>
      </form>
      {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
    </div>
  );
}
