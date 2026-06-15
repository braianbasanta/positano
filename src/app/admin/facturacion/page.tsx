import { isAuthed } from "@/lib/admin/auth";
import { listDays } from "@/lib/facturacion/store";
import LoginForm from "../LoginForm";
import FacturacionDashboard from "./FacturacionDashboard";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!(await isAuthed())) {
    return <LoginForm title="Facturación · Positano" />;
  }
  const days = await listDays();
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  return <FacturacionDashboard days={days} today={today} />;
}
