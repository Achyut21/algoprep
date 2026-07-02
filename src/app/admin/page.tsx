import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  accuracyColor,
  accuracyText,
  Bar,
  fmtDate,
  SectionHeading,
  Spark,
  StatTile,
} from "@/components/stats-ui";
import { quizzes } from "@/content/quizzes";
import { getDb } from "@/db";
import {
  pctOf,
  questionDifficulty,
  questionLookup,
  summarizeRuns,
  topicAccuracy,
} from "@/lib/analytics";
import { isAdmin } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { AdminLogin } from "./admin-login";
import { adminLogout } from "./actions";

export const dynamic = "force-dynamic";

const LETTERS = ["A", "B", "C", "D"];

export default async function AdminPage() {
  if (!process.env.ADMIN_PASSWORD) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono">admin is locked</CardTitle>
            <CardDescription>
              Set an <code>ADMIN_PASSWORD</code> environment variable (in
              .env.local and in Vercel) to enable the dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  if (!(await isAdmin())) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center gap-6 p-6">
        <h1 className="text-center font-mono text-xl font-bold">
          <span className="text-primary">$ </span>sudo ./admin
          <span className="cursor-blink text-primary">▌</span>
        </h1>
        <AdminLogin />
      </main>
    );
  }

  const db = getDb();
  const [profiles, attempts, answers] = await Promise.all([
    db.query.profiles.findMany(),
    db.query.attempts.findMany(),
    db.query.attemptAnswers.findMany(),
  ]);

  const profileById = new Map(profiles.map((p) => [p.id, p]));
  const questionById = questionLookup();

  const avgPct =
    attempts.length === 0
      ? 0
      : Math.round(
          attempts.reduce((sum, a) => sum + pctOf(a.score, a.total), 0) /
            attempts.length
        );
  const lastAttempt = attempts.reduce<Date | null>(
    (latest, a) => (!latest || a.finishedAt > latest ? a.finishedAt : latest),
    null
  );

  const playerQuizStats = profiles.flatMap((profile) =>
    quizzes.flatMap((quiz) => {
      const summary = summarizeRuns(
        attempts.filter(
          (a) => a.profileId === profile.id && a.quizSlug === quiz.slug
        )
      );
      return summary ? [{ profile, quiz, summary }] : [];
    })
  );
  const idlePlayers = profiles.filter(
    (p) => !attempts.some((a) => a.profileId === p.id)
  );

  const hardest = questionDifficulty(answers, questionById).slice(0, 8);
  const topics = topicAccuracy(answers, questionById);
  const recent = [...attempts]
    .sort((a, b) => b.finishedAt.getTime() - a.finishedAt.getTime())
    .slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-4xl space-y-10 p-6">
      <header className="flex items-center justify-between">
        <h1 className="font-mono text-xl font-bold">
          <span className="text-primary">$ </span>sudo ./admin
          <span className="cursor-blink text-primary">▌</span>
        </h1>
        <div className="flex items-center gap-2 font-mono text-xs">
          <Button asChild variant="ghost" className="font-mono text-xs">
            <Link href="/">← home</Link>
          </Button>
          <form action={adminLogout}>
            <Button variant="outline" className="font-mono text-xs">
              logout
            </Button>
          </form>
        </div>
      </header>

      <section className="space-y-4">
        <SectionHeading>overview</SectionHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="players" value={String(profiles.length)} />
          <StatTile label="attempts" value={String(attempts.length)} />
          <StatTile label="avg score" value={`${avgPct}%`} />
          <StatTile
            label="last activity"
            value={lastAttempt ? fmtDate(lastAttempt) : "—"}
          />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading>players</SectionHeading>
        {profiles.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            no players seeded yet
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {playerQuizStats.map(({ profile, quiz, summary }) => (
              <Card key={`${profile.id}-${quiz.slug}`}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-mono text-base">
                    {profile.name}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {quiz.slug}
                    </span>
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
                            (
                            {summary.delta > 0 ? `▲ +${summary.delta}` : ""}
                            {summary.delta < 0 ? `▼ ${summary.delta}` : ""}
                            {summary.delta === 0 ? "= same" : ""})
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
                </CardContent>
              </Card>
            ))}
            {idlePlayers.map((profile) => (
              <Card key={profile.id}>
                <CardContent className="flex items-center justify-between pt-6 font-mono text-sm">
                  <span>{profile.name}</span>
                  <span className="text-muted-foreground">no runs yet</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeading>hardest questions</SectionHeading>
        {hardest.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            no attempts yet — nothing to analyze
          </p>
        ) : (
          <Card>
            <CardContent className="divide-y divide-border">
              {hardest.map(({ question, missPct, total, skips, topWrong }) => (
                <div
                  key={question.id}
                  className="space-y-2 py-4 first:pt-2 last:pb-2"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm">
                      <span className="font-mono text-xs text-muted-foreground">
                        {question.id} ·{" "}
                      </span>
                      {question.prompt.length > 80
                        ? question.prompt.slice(0, 80) + "…"
                        : question.prompt}
                    </p>
                    <span
                      className={cn(
                        "shrink-0 font-mono text-sm font-semibold",
                        accuracyText(100 - missPct)
                      )}
                    >
                      {missPct}% miss
                    </span>
                  </div>
                  <Bar pct={missPct} color={accuracyColor(100 - missPct)} />
                  <p className="font-mono text-xs text-muted-foreground">
                    {total} {total === 1 ? "answer" : "answers"}
                    {topWrong &&
                      ` · most-picked wrong: ${LETTERS[topWrong.index]}. “${
                        question.options[topWrong.index].length > 44
                          ? question.options[topWrong.index].slice(0, 44) + "…"
                          : question.options[topWrong.index]
                      }” ×${topWrong.count}`}
                    {skips > 0 && ` · skipped ×${skips}`}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeading>accuracy by topic</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-3">
          {topics.map(({ topic, pct, total }) => (
            <div key={topic} className="space-y-2 rounded-lg border bg-card p-4">
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  {topic}
                </span>
                <span className="text-lg font-bold">
                  {total === 0 ? "—" : `${pct}%`}
                </span>
              </div>
              <Bar pct={pct} color={accuracyColor(pct)} />
              <p className="font-mono text-[10px] text-muted-foreground">
                {total} answers graded
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading>recent attempts</SectionHeading>
        {recent.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            nothing yet — the leaderboard awaits
          </p>
        ) : (
          <Card>
            <CardContent className="divide-y divide-border font-mono text-sm">
              {recent.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between gap-4 py-2.5 first:pt-1 last:pb-1"
                >
                  <span>
                    {profileById.get(attempt.profileId)?.name ?? "?"}
                    <span className="ml-3 text-xs text-muted-foreground">
                      {attempt.quizSlug}
                    </span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">
                      {fmtDate(attempt.finishedAt)}
                    </span>
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
        )}
      </section>
    </main>
  );
}
