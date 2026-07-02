import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

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
  finishedAt: timestamp("finished_at").notNull().defaultNow(),
});

export const attemptAnswers = pgTable("attempt_answers", {
  id: serial("id").primaryKey(),
  attemptId: integer("attempt_id")
    .notNull()
    .references(() => attempts.id),
  questionId: text("question_id").notNull(),
  chosenIndex: integer("chosen_index"),
  isCorrect: boolean("is_correct").notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type Attempt = typeof attempts.$inferSelect;
export type AttemptAnswer = typeof attemptAnswers.$inferSelect;
