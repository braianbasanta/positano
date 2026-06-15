import Link from "next/link";
import { isAuthed } from "@/lib/admin/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const SECTIONS = [
  {
    href: "/admin/facturacion",
    title: "Facturación",
    desc: "Caja diaria, gráficas y comparativas mes a mes y año a año.",
  },
  {
    href: "/admin/reviews",
    title: "Reseñas",
    desc: "Borradores asistidos de respuestas a reseñas de Google.",
  },
];

export default async function AdminHome() {
  if (!(await isAuthed())) {
    return <LoginForm />;
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-zinc-900">Panel · Positano</h1>
      <p className="mt-1 text-sm text-zinc-500">Herramientas internas de gestión.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-zinc-900">{s.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
