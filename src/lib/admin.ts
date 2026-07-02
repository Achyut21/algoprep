import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin";

export function hashAdminPassword(password: string) {
  return createHash("sha256").update(`algoprep-admin:${password}`).digest("hex");
}

export function adminToken() {
  const password = process.env.ADMIN_PASSWORD;
  return password ? hashAdminPassword(password) : null;
}

export async function isAdmin() {
  const token = adminToken();
  if (!token) return false;
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === token;
}
