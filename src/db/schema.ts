import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  // sha256 hash; null until the kid sets their PIN on first login
  pinHash: text("pin_hash"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const attempts = pgTable("attempts", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id")
    .notNull()
    .references(() => profiles.id),
  quizSlug: text("quiz_slug").notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  durationSeconds: integer("duration_seconds"),
  finishedAt: timestamp("finished_at").notNull().defaultNow(),
});

/** A row here means the exam for that quiz is closed (practice stays open). */
export const quizLocks = pgTable("quiz_locks", {
  quizSlug: text("quiz_slug").primaryKey(),
  lockedAt: timestamp("locked_at").notNull().defaultNow(),
});

/** One row per (player, notes doc): accumulated reading time + deepest scroll. */
export const noteViews = pgTable(
  "note_views",
  {
    id: serial("id").primaryKey(),
    profileId: integer("profile_id")
      .notNull()
      .references(() => profiles.id),
    topic: text("topic").notNull(),
    seconds: integer("seconds").notNull().default(0),
    maxScrollPct: integer("max_scroll_pct").notNull().default(0),
    lastViewedAt: timestamp("last_viewed_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("note_views_profile_topic").on(t.profileId, t.topic)]
);

export const attemptAnswers = pgTable("attempt_answers", {
  id: serial("id").primaryKey(),
  attemptId: integer("attempt_id")
    .notNull()
    .references(() => attempts.id),
  questionId: text("question_id").notNull(),
  chosenIndex: integer("chosen_index"),
  // typed answer for fill-in-the-blank questions
  answerText: text("answer_text"),
  isCorrect: boolean("is_correct").notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type Attempt = typeof attempts.$inferSelect;
export type AttemptAnswer = typeof attemptAnswers.$inferSelect;
