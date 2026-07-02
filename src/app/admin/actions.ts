"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { getDb } from "@/db";
import { profiles } from "@/db/schema";
import { ADMIN_COOKIE, adminToken, hashAdminPassword, isAdmin } from "@/lib/admin";

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

const nameSchema = z.string().trim().min(1).max(30);

export async function addPlayer(input: { name: string }) {
  if (!(await isAdmin())) return { error: "Not logged in as admin." };
  const parsed = nameSchema.safeParse(input.name);
  if (!parsed.success) return { error: "Name must be 1–30 characters." };

  const db = getDb();
  const existing = await db.query.profiles.findFirst({
    where: eq(profiles.name, parsed.data),
  });
  if (existing) return { error: `"${parsed.data}" already exists.` };

  await db.insert(profiles).values({ name: parsed.data });
  revalidatePath("/admin");
  return { error: null };
}

export async function resetPin(profileId: number) {
  if (!(await isAdmin())) return;
  await getDb()
    .update(profiles)
    .set({ pinHash: null })
    .where(eq(profiles.id, profileId));
  revalidatePath("/admin");
}
