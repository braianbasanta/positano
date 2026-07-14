import { isAuthed } from "@/lib/admin/auth";
import { DISH, DISH_MESES, FORK } from "@/lib/reservas/analytics";
import LoginForm from "../LoginForm";
import ReservasDashboard from "./ReservasDashboard";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!(await isAuthed())) {
    return <LoginForm title="Reservas · Positano" />;
  }
  // Pasamos los datos crudos (pocas filas, trivial) y el cliente filtra y
  // recalcula todo según el rango de meses elegido.
  return <ReservasDashboard dish={DISH} dishMeses={DISH_MESES} fork={FORK} />;
}
