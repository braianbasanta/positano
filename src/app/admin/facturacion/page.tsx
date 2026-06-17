import { isAuthed } from "@/lib/admin/auth";
import { listDays, upsertManyDays } from "@/lib/facturacion/store";
import { readBlobDays } from "@/lib/facturacion/blob-legacy";
import { fetchBarcelonaWeather } from "@/lib/facturacion/weather";
import LoginForm from "../LoginForm";
import FacturacionDashboard from "./FacturacionDashboard";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!(await isAuthed())) {
    return <LoginForm title="Facturación · Positano" />;
  }
  // Auto-migración one-time: si Supabase está vacío pero el blob tiene datos,
  // los volcamos (runtime tiene el blob token y la service key). Se ejecuta una
  // sola vez; en cuanto haya filas, no vuelve a tocar el blob. Quitar tras migrar.
  let days = await listDays();
  if (days.length === 0) {
    const blobDays = await readBlobDays().catch(() => []);
    if (blobDays.length) {
      await upsertManyDays(blobDays).catch(() => {});
      days = await listDays();
    }
  }
  const weather = await fetchBarcelonaWeather();
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  return <FacturacionDashboard days={days} today={today} weather={weather} />;
}
