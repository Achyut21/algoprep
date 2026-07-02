import { createHash } from "node:crypto";

export function hashPin(profileId: number, pin: string) {
  return createHash("sha256").update(`${profileId}:${pin}`).digest("hex");
}
