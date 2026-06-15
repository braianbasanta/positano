// Auth compartida del área /admin. Token único en ADMIN_REVIEWS_TOKEN, cookie
// `positano_admin` con path "/admin" → cubre todas las secciones del panel
// (reseñas, facturación…). Sin token configurado: abierto SOLO en desarrollo;
// en producción queda cerrado para no exponer el panel.
import { cookies } from "next/headers";

const COOKIE = "positano_admin";

export function adminToken(): string | undefined {
  return process.env.ADMIN_REVIEWS_TOKEN;
}

export async function isAuthed(): Promise<boolean> {
  const token = adminToken();
  if (!token) return process.env.NODE_ENV !== "production";
  const c = await cookies();
  return c.get(COOKIE)?.value === token;
}

export function checkPassword(value: string): boolean {
  const token = adminToken();
  return !!token && value === token;
}

export async function setSession(value: string): Promise<void> {
  const c = await cookies();
  c.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}
