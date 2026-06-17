import { isAuthed } from "@/lib/admin/auth";
import { DISH, FORK } from "@/lib/reservas/analytics";
import LoginForm from "../LoginForm";
import ReservasDashboard from "./ReservasDashboard";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!(await isAuthed())) {
    return <LoginForm title="Reservas · Positano" />;
  }
  // Pasamos los datos crudos (686 + 90 filas, trivial) y el cliente filtra y
  // recalcula todo según el rango de meses elegido.
  return <ReservasDashboard dish={DISH} fork={FORK} />;
}
