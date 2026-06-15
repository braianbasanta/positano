"use server";

import { revalidatePath } from "next/cache";
import { checkPassword, setSession, clearSession } from "@/lib/admin/auth";

export async function login(formData: FormData): Promise<{ error?: string }> {
  const value = String(formData.get("token") || "");
  if (!checkPassword(value)) return { error: "Contraseña incorrecta." };
  await setSession(value);
  revalidatePath("/admin");
  return {};
}

export async function logout(): Promise<void> {
  await clearSession();
  revalidatePath("/admin");
}
