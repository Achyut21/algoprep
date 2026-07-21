"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getQuiz, quizzes } from "@/content/quizzes";
import { getDb } from "@/db";
import { attemptAnswers, attempts, profiles } from "@/db/schema";
import { hashPin } from "@/lib/pin";
import { matchesBlank } from "@/lib/quiz-utils";
import { activeProfileId, PROFILE_COOKIE } from "@/lib/session";

const ONE_YEAR = 60 * 60 * 24 * 365;

const loginSchema = z.object({
  profileId: z.number().int(),
  pin: z.string().regex(/^\d{4}$/, "PIN must be 4 digits"),
});

export async function loginProfile(input: z.infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { error: "Your PIN must be 4 digits." };

  const { profileId, pin } = parsed.data;
  const db = getDb();
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
  });
  if (!profile) return { error: "That player doesn't exist anymore." };

  const hashed = hashPin(profileId, pin);
  if (profile.pinHash === null) {
    await db
      .update(profiles)
      .set({ pinHash: hashed })
      .where(eq(profiles.id, profileId));
  } else if (profile.pinHash !== hashed) {
    return { error: "That's not the right PIN. Try again!" };
  }

  const cookieStore = await cookies();
  cookieStore.set(PROFILE_COOKIE, String(profileId), { maxAge: ONE_YEAR });
  return { error: null };
}

export async function switchProfile() {
  const cookieStore = await cookies();
  cookieStore.delete(PROFILE_COOKIE);
}

export async function getActiveProfile() {
  const id = await activeProfileId();
  if (id === null) return null;
  const profile = await getDb().query.profiles.findFirst({
    where: eq(profiles.id, id),
  });
  return profile ?? null;
}

const submitSchema = z.object({
  quizSlug: z.string(),
  durationSeconds: z.number().int().min(0).max(86400).nullable(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      chosenIndex: z.number().int().min(0).max(3).nullable(),
      answerText: z.string().max(100).nullable().optional(),
    })
  ),
});

export async function submitAttempt(input: z.infer<typeof submitSchema>) {
  const { quizSlug, durationSeconds, answers } = submitSchema.parse(input);

  const quiz = getQuiz(quizSlug);
  if (!quiz) throw new Error(`Unknown quiz: ${quizSlug}`);

  const profile = await getActiveProfile();
  if (!profile) redirect("/");

  const byQuestion = new Map(answers.map((a) => [a.questionId, a]));

  const graded = quiz.questions.map((question) => {
    const answer = byQuestion.get(question.id);
    const chosenIndex = answer?.chosenIndex ?? null;
    const answerText = answer?.answerText ?? null;
    const isCorrect = question.blankAnswers
      ? answerText !== null && matchesBlank(question.blankAnswers, answerText)
      : chosenIndex === question.correctIndex;
    return { questionId: question.id, chosenIndex, answerText, isCorrect };
  });

  const score = graded.filter((g) => g.isCorrect).length;

  const db = getDb();
  const [attempt] = await db
    .insert(attempts)
    .values({
      profileId: profile.id,
      quizSlug,
      score,
      total: quiz.questions.length,
      durationSeconds,
    })
    .returning();

  await db
    .insert(attemptAnswers)
    .values(graded.map((g) => ({ ...g, attemptId: attempt.id })));

  redirect(`/results/${attempt.id}`);
}

const checkSchema = z.object({
  questionId: z.string(),
  chosenIndex: z.number().int().min(0).max(3).nullable(),
  answerText: z.string().max(100).nullable().optional(),
});

/** Practice mode: reveal the answer for ONE question after the player commits a pick. */
export async function checkAnswer(input: z.infer<typeof checkSchema>) {
  const { questionId, chosenIndex, answerText } = checkSchema.parse(input);
  const question = quizzes
    .flatMap((quiz) => [...quiz.questions, ...(quiz.practiceQuestions ?? [])])
    .find((q) => q.id === questionId);
  if (!question) throw new Error(`Unknown question: ${questionId}`);

  if (question.blankAnswers) {
    return {
      correctIndex: -1,
      correctAnswer: question.blankAnswers[0],
      isCorrect:
        answerText != null && matchesBlank(question.blankAnswers, answerText),
      explanation: question.explanation,
    };
  }
  return {
    correctIndex: question.correctIndex,
    correctAnswer: null,
    isCorrect: chosenIndex === question.correctIndex,
    explanation: question.explanation,
  };
}
