import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { FadeInOnScroll } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getQuiz } from "@/content/quizzes";
import type { Topic } from "@/content/quizzes/types";
import { getDb } from "@/db";
import { attemptAnswers, attempts, profiles } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ScoreSummary } from "./score-summary";

const LETTERS = ["A", "B", "C", "D"];

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const id = Number(attemptId);
  if (!Number.isInteger(id)) notFound();

  const db = getDb();
  const attempt = await db.query.attempts.findFirst({
    where: eq(attempts.id, id),
  });
  if (!attempt) notFound();

  const quiz = getQuiz(attempt.quizSlug);
  if (!quiz) notFound();

  const [profile, answers] = await Promise.all([
    db.query.profiles.findFirst({ where: eq(profiles.id, attempt.profileId) }),
    db.query.attemptAnswers.findMany({
      where: eq(attemptAnswers.attemptId, attempt.id),
    }),
  ]);

  const answerByQuestion = new Map(answers.map((a) => [a.questionId, a]));

  const topics = [...new Set(quiz.questions.map((q) => q.topic))] as Topic[];
  const byTopic = topics.map((topic) => {
    const topicQuestions = quiz.questions.filter((q) => q.topic === topic);
    const correct = topicQuestions.filter(
      (q) => answerByQuestion.get(q.id)?.isCorrect
    ).length;
    return { topic, correct, total: topicQuestions.length };
  });

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 p-6">
      <ScoreSummary
        name={profile?.name ?? "Player"}
        score={attempt.score}
        total={attempt.total}
        byTopic={byTopic}
        quizSlug={quiz.slug}
      />

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-medium">Review</h2>
        {quiz.questions.map((question, index) => {
          const answer = answerByQuestion.get(question.id);
          const chosen = answer?.chosenIndex ?? null;
          const correct = question.correctIndex;
          return (
            <FadeInOnScroll key={question.id}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <span className="text-sm font-medium">
                    {answer?.isCorrect ? "✅" : "❌"} Question {index + 1}
                  </span>
                  <Badge variant="secondary">{question.topic}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-medium">{question.prompt}</p>
                  {question.code && (
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
                      <code>{question.code}</code>
                    </pre>
                  )}
                  <div className="grid gap-2">
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border p-3 text-sm",
                          i === correct &&
                            "border-green-600/50 bg-green-50 dark:bg-green-950/30",
                          i === chosen &&
                            i !== correct &&
                            "border-red-600/50 bg-red-50 dark:bg-red-950/30"
                        )}
                      >
                        <span className="font-semibold">{LETTERS[i]}.</span>
                        <span>{option}</span>
                        {i === correct && (
                          <span className="ml-auto shrink-0 text-xs font-medium text-green-700 dark:text-green-400">
                            Correct answer
                          </span>
                        )}
                        {i === chosen && i !== correct && (
                          <span className="ml-auto shrink-0 text-xs font-medium text-red-700 dark:text-red-400">
                            Your pick
                          </span>
                        )}
                      </div>
                    ))}
                    {chosen === null && (
                      <p className="text-sm text-muted-foreground">
                        You didn&apos;t answer this one.
                      </p>
                    )}
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Why: </span>
                    {question.explanation}
                  </div>
                </CardContent>
              </Card>
            </FadeInOnScroll>
          );
        })}
      </section>
    </main>
  );
}
