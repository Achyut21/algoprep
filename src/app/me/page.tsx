import { eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getActiveProfile } from "@/app/actions";
import {
  accuracyColor,
  accuracyText,
  Bar,
  fmtDate,
  SectionHeading,
  Spark,
  StatTile,
} from "@/components/stats-ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { quizzes, topicNotes } from "@/content/quizzes";
import { getDb } from "@/db";
import { attempts as attemptsTable, attemptAnswers } from "@/db/schema";
import {
  computeBadges,
  pctOf,
  questionDifficulty,
  questionLookup,
  summarizeRuns,
  topicAccuracy,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function MyStatsPage() {
  const profile = await getActiveProfile();
  if (!profile) redirect("/");

  const db = getDb();
  const attempts = await db.query.attempts.findMany({
    where: eq(attemptsTable.profileId, profile.id),
  });
  const answers =
    attempts.length === 0
      ? []
      : await db.query.attemptAnswers.findMany({
          where: inArray(
            attemptAnswers.attemptId,
            attempts.map((a) => a.id)
          ),
        });

  const questionById = questionLookup();
  const quizStats = quizzes.map((quiz) => ({
    quiz,
    summary: summarizeRuns(
      attempts.filter((a) => a.quizSlug === quiz.slug)
    ),
  }));
  const topics = topicAccuracy(answers, questionById);
  const missed = questionDifficulty(answers, questionById)
    .filter((s) => s.misses > 0)
    .slice(0, 5);
  const recent = [...attempts]
    .sort((a, b) => b.finishedAt.getTime() - a.finishedAt.getTime())
    .slice(0, 6);

  const bestPct =
    attempts.length === 0
      ? 0
      : Math.max(...attempts.map((a) => pctOf(a.score, a.total)));
  const avgPct =
    attempts.length === 0
      ? 0
      : Math.round(
          attempts.reduce((sum, a) => sum + pctOf(a.score, a.total), 0) /
            attempts.length
        );

  return (
    <main className="mx-auto w-full max-w-3xl space-y-10 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xl font-bold">
            <span className="text-primary">$ </span>whoami
            <span className="cursor-blink text-primary">▌</span>
          </h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {profile.name.toLowerCase()}@algoprep — your progress report
          </p>
        </div>
        <Button asChild variant="ghost" className="font-mono text-xs">
          <Link href="/">← home</Link>
        </Button>
      </header>

      {attempts.length === 0 ? (
        <Card>
          <CardContent className="space-y-4 pt-6 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              no runs yet — your stats will show up after your first quiz!
            </p>
            <Button asChild className="font-mono">
              <Link href="/">take a quiz →</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="space-y-4">
            <SectionHeading>overview</SectionHeading>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile label="quiz runs" value={String(attempts.length)} />
              <StatTile label="best score" value={`${bestPct}%`} />
              <StatTile label="average" value={`${avgPct}%`} />
              <StatTile
                label="last quiz"
                value={fmtDate(recent[0].finishedAt)}
              />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading>badges</SectionHeading>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {computeBadges(attempts).map((badge) => (
                <div
                  key={badge.id}
                  className={cn(
                    "rounded-lg border p-3 text-center",
                    badge.earned
                      ? "border-primary/50 bg-primary/10"
                      : "opacity-40"
                  )}
                  title={badge.hint}
                >
                  <p className="text-2xl">{badge.earned ? badge.emoji : "🔒"}</p>
                  <p className="mt-1 font-mono text-xs font-semibold">
                    {badge.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {badge.hint}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading>your quizzes</SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2">
              {quizStats.map(({ quiz, summary }) =>
                summary === null ? (
                  <Card key={quiz.slug}>
                    <CardContent className="flex items-center justify-between pt-6 font-mono text-sm">
                      <span>{quiz.slug}</span>
                      <Link
                        href={`/quiz/${quiz.slug}`}
                        className="text-primary hover:underline"
                      >
                        start →
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <Card key={quiz.slug}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="font-mono text-base">
                        {quiz.slug}
                      </CardTitle>
                      <span className="font-mono text-xs text-muted-foreground">
                        {summary.runs} {summary.runs === 1 ? "run" : "runs"}
                      </span>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-end justify-between">
                        <div className="space-y-1 font-mono text-sm">
                          <p>
                            best{" "}
                            <span className="text-primary">
                              {summary.best}/{summary.total}
                            </span>{" "}
                            · avg {summary.avg}/{summary.total}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            latest {summary.latest}/{summary.total}{" "}
                            {summary.delta !== null && (
                              <span
                                className={cn(
                                  summary.delta > 0 && "text-primary",
                                  summary.delta < 0 && "text-destructive"
                                )}
                              >
                                {summary.delta > 0 &&
                                  `▲ +${summary.delta} since last run!`}
                                {summary.delta < 0 &&
                                  `▼ ${summary.delta} since last run`}
                                {summary.delta === 0 && "= same as last run"}
                              </span>
                            )}
                          </p>
                        </div>
                        <Spark scores={summary.scores} total={summary.total} />
                      </div>
                      <Bar
                        pct={pctOf(summary.best, summary.total)}
                        color="bg-primary"
                      />
                      <Button
                        asChild
                        variant="outline"
                        className="w-full font-mono text-xs"
                      >
                        <Link href={`/quiz/${quiz.slug}`}>
                          beat your best ↺
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading>your topics</SectionHeading>
            <div className="grid gap-3 sm:grid-cols-3">
              {topics.map(({ topic, pct, total }) => (
                <div
                  key={topic}
                  className="space-y-2 rounded-lg border bg-card p-4"
                >
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                      {topic}
                    </span>
                    <span
                      className={cn("text-lg font-bold", accuracyText(pct))}
                    >
                      {total === 0 ? "—" : `${pct}%`}
                    </span>
                  </div>
                  <Bar pct={pct} color={accuracyColor(pct)} />
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {total === 0 ? (
                      "not tested yet"
                    ) : pct >= 70 ? (
                      "strong 💪"
                    ) : (
                      <Link
                        href={`/notes/${topicNotes[topic]}`}
                        className="text-primary hover:underline"
                      >
                        review the notes →
                      </Link>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {missed.length > 0 && (
            <section className="space-y-4">
              <SectionHeading>questions to practice</SectionHeading>
              <Card>
                <CardContent className="divide-y divide-border">
                  {missed.map(({ question, misses, total }) => (
                    <div
                      key={question.id}
                      className="flex items-baseline justify-between gap-4 py-3 first:pt-1 last:pb-1"
                    >
                      <p className="text-sm">
                        {question.prompt.length > 70
                          ? question.prompt.slice(0, 70) + "…"
                          : question.prompt}
                      </p>
                      <span className="flex shrink-0 items-center gap-3 font-mono text-xs">
                        <span className="text-destructive">
                          missed {misses}/{total}
                        </span>
                        <Link
                          href={`/notes/${topicNotes[question.topic]}`}
                          className="text-primary hover:underline"
                        >
                          study →
                        </Link>
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          )}

          <section className="space-y-4">
            <SectionHeading>recent runs</SectionHeading>
            <Card>
              <CardContent className="divide-y divide-border font-mono text-sm">
                {recent.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex items-center justify-between gap-4 py-2.5 first:pt-1 last:pb-1"
                  >
                    <span className="text-xs text-muted-foreground">
                      {attempt.quizSlug} · {fmtDate(attempt.finishedAt)}
                    </span>
                    <span className="flex items-center gap-4">
                      <span
                        className={cn(
                          "font-semibold",
                          accuracyText(pctOf(attempt.score, attempt.total))
                        )}
                      >
                        {attempt.score}/{attempt.total}
                      </span>
                      <Link
                        href={`/results/${attempt.id}`}
                        className="text-xs text-primary hover:underline"
                      >
                        review →
                      </Link>
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </main>
  );
}
