import { notFound, redirect } from "next/navigation";
import { getActiveProfile } from "@/app/actions";
import { getQuiz } from "@/content/quizzes";
import type { ClientQuestion } from "@/content/quizzes/types";
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

  // Strip the answer key so it never reaches the browser.
  const questions: ClientQuestion[] = quiz.questions.map(
    ({ id, topic, prompt, code, options }) => ({
      id,
      topic,
      prompt,
      code,
      options,
    })
  );

  return (
    <QuizRunner
      quizSlug={quiz.slug}
      quizTitle={quiz.title}
      playerName={profile.name}
      questions={questions}
    />
  );
}
