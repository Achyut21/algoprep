"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_COOKIE, adminToken, hashAdminPassword } from "@/lib/admin";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

const loginSchema = z.object({ password: z.string().min(1) });

export async function adminLogin(input: z.infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { error: "Enter the password." };

  const token = adminToken();
  if (!token) return { error: "ADMIN_PASSWORD is not set on the server." };

  if (hashAdminPassword(parsed.data.password) !== token) {
    return { error: "Wrong password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    maxAge: THIRTY_DAYS,
  });
  return { error: null };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
