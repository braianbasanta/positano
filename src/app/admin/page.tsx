import Link from "next/link";
import { isAuthed } from "@/lib/admin/auth";
import LoginForm from "./LoginForm";
import AdminNav from "./AdminNav";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const SECTIONS = [
  {
    href: "/admin/facturacion",
    title: "Facturación",
    desc: "Caja diaria, gráficas y comparativas mes a mes y año a año.",
  },
  {
    href: "/admin/reservas",
    title: "Reservas online",
    desc: "Cubiertos y reservas de DISH (web) y TheFork: evolución, canales, descuentos y cancelaciones.",
  },
  {
    href: "/admin/plan",
    title: "Plan de facturación",
    desc: "Objetivos de media diaria, techo de cada día y hoja de ruta a corto, medio y largo plazo.",
  },
];

export default async function AdminHome() {
  if (!(await isAuthed())) {
    return <LoginForm />;
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <AdminNav />
      <div className="text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lemon">Positano</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Panel de gestión</h1>
        <p className="mt-2 text-lg text-ink/60">Herramientas internas del restaurante.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm transition hover:border-lemon hover:shadow-md"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">{s.title}</h2>
            <p className="mt-1.5 text-base text-ink/60">{s.desc}</p>
            <span className="mt-3 inline-block font-sans text-sm font-medium text-lemon opacity-0 transition group-hover:opacity-100">
              Abrir →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
