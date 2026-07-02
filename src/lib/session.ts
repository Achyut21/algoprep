import { cookies } from "next/headers";

export const PROFILE_COOKIE = "profileId";

export async function activeProfileId(): Promise<number | null> {
  const cookieStore = await cookies();
  const id = Number(cookieStore.get(PROFILE_COOKIE)?.value);
  return Number.isInteger(id) ? id : null;
}
