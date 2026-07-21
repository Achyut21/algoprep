import { notFound, redirect } from "next/navigation";
import { getActiveProfile } from "@/app/actions";
import { getQuiz } from "@/content/quizzes";
import { shuffled, toClientQuestion } from "@/lib/quiz-utils";
import { PracticeRunner } from "./practice-runner";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz || quiz.noPractice) notFound();

  const profile = await getActiveProfile();
  if (!profile) redirect("/");

  const questions = shuffled(quiz.practiceQuestions ?? quiz.questions).map(
    toClientQuestion
  );

  return (
    <PracticeRunner
      quizSlug={quiz.slug}
      playerName={profile.name}
      questions={questions}
    />
  );
}
