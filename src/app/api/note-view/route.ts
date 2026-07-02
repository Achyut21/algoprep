import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { topicNotes } from "@/content/quizzes";
import { getDb } from "@/db";
import { noteViews, profiles } from "@/db/schema";
import { activeProfileId } from "@/lib/session";

const bodySchema = z.object({
  topic: z
    .string()
    .refine((t) => Object.values(topicNotes).includes(t), "unknown topic"),
  secondsDelta: z.number().int().min(0).max(300),
  maxScrollPct: z.number().int().min(0).max(100),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const { topic, secondsDelta, maxScrollPct } = parsed.data;

  // Anonymous readers (no player cookie) are simply not tracked.
  const profileId = await activeProfileId();
  if (profileId === null) return NextResponse.json({ ok: true });

  const db = getDb();
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
  });
  if (!profile) return NextResponse.json({ ok: true });

  await db
    .insert(noteViews)
    .values({ profileId, topic, seconds: secondsDelta, maxScrollPct })
    .onConflictDoUpdate({
      target: [noteViews.profileId, noteViews.topic],
      set: {
        seconds: sql`${noteViews.seconds} + ${secondsDelta}`,
        maxScrollPct: sql`greatest(${noteViews.maxScrollPct}, ${maxScrollPct})`,
        lastViewedAt: new Date(),
      },
    });

  return NextResponse.json({ ok: true });
}
