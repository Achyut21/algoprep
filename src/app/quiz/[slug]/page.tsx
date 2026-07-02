import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { getActiveProfile } from "@/app/actions";
import { getQuiz } from "@/content/quizzes";
import { getDb } from "@/db";
import { quizLocks } from "@/db/schema";
import { shuffled, toClientQuestion } from "@/lib/quiz-utils";
import { QuizRunner } from "./quiz-runner";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) notFound();

  const profile = await getActiveProfile();
  if (!profile) redirect("/");

  const locked = await getDb().query.quizLocks.findFirst({
    where: eq(quizLocks.quizSlug, slug),
  });
  if (locked) redirect("/");

  // Fresh order every attempt; the answer key never leaves the server.
  const questions = shuffled(quiz.questions).map(toClientQuestion);

  return (
    <QuizRunner
      quizSlug={quiz.slug}
      profileId={profile.id}
      playerName={profile.name}
      questions={questions}
    />
  );
}
