import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
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
        durationSeconds={attempt.durationSeconds}
      />

      <section className="space-y-4">
        <h2 className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          <span className="text-primary"># </span>review
        </h2>
        {quiz.questions.map((question, index) => {
          const answer = answerByQuestion.get(question.id);
          const chosen = answer?.chosenIndex ?? null;
          const correct = question.correctIndex;
          return (
            <FadeInOnScroll key={question.id}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-xs">
                    <span
                      className={cn(
                        "rounded-sm px-1.5 py-0.5 font-bold",
                        answer?.isCorrect
                          ? "bg-primary/15 text-primary"
                          : "bg-destructive/15 text-destructive"
                      )}
                    >
                      {answer?.isCorrect ? "PASS" : "FAIL"}
                    </span>
                    <span className="text-muted-foreground">
                      Q{String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <Badge
                    variant="secondary"
                    className="font-mono text-[10px] tracking-wider uppercase"
                  >
                    {question.topic}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-medium">{question.prompt}</p>
                  {question.code && (
                    <CodeBlock
                      code={question.code}
                      filename={`${question.id}.py`}
                    />
                  )}
                  <div className="grid gap-2">
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border p-3 text-sm",
                          i === correct && "border-primary/50 bg-primary/10",
                          i === chosen &&
                            i !== correct &&
                            "border-destructive/50 bg-destructive/10"
                        )}
                      >
                        <span className="font-mono font-semibold">
                          {LETTERS[i]}.
                        </span>
                        <span>{option}</span>
                        {i === correct && (
                          <span className="ml-auto shrink-0 font-mono text-xs font-medium text-primary">
                            ✓ correct
                          </span>
                        )}
                        {i === chosen && i !== correct && (
                          <span className="ml-auto shrink-0 font-mono text-xs font-medium text-destructive">
                            ✗ your pick
                          </span>
                        )}
                      </div>
                    ))}
                    {chosen === null && (
                      <p className="font-mono text-sm text-muted-foreground">
                        ∅ no answer given
                      </p>
                    )}
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    <span className="font-mono font-medium text-primary">
                      # why:{" "}
                    </span>
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
