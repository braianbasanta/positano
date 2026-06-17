import { isAuthed } from "@/lib/admin/auth";
import {
  allMonthStats,
  DISH,
  dishByHour,
  dishByPartySize,
  dishByWeekday,
  forkByChannel,
  forkByOffer,
  totals,
} from "@/lib/reservas/analytics";
import LoginForm from "../LoginForm";
import ReservasDashboard from "./ReservasDashboard";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!(await isAuthed())) {
    return <LoginForm title="Reservas · Positano" />;
  }
  // Últimas reservas DISH (más recientes primero) para la tabla de detalle.
  const ultimasDish = [...DISH]
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
    .slice(0, 200);
  return (
    <ReservasDashboard
      months={allMonthStats()}
      totals={totals()}
      byChannel={forkByChannel()}
      byOffer={forkByOffer()}
      byWeekday={dishByWeekday()}
      byHour={dishByHour()}
      byPartySize={dishByPartySize()}
      ultimasDish={ultimasDish}
    />
  );
}
