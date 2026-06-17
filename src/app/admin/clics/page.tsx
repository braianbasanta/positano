import { isAuthed } from "@/lib/admin/auth";
import { listClicks } from "@/lib/clics/store";
import LoginForm from "../LoginForm";
import ClicsDashboard from "./ClicsDashboard";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!(await isAuthed())) {
    return <LoginForm title="Clics · Positano" />;
  }
  // Últimos 180 días: suficiente para ver tendencias sin traer el histórico entero.
  const since = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString();
  const rows = await listClicks(since);
  return <ClicsDashboard rows={rows} />;
}
