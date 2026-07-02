import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { quizzes } from "@/content/quizzes";
import type { Question } from "@/content/quizzes/types";
import { getDb } from "@/db";
import { isAdmin } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { AdminLogin } from "./admin-login";
import { adminLogout } from "./actions";

export const dynamic = "force-dynamic";

const LETTERS = ["A", "B", "C", "D"];

function pctOf(part: number, whole: number) {
  return whole === 0 ? 0 : Math.round((part / whole) * 100);
}

function fmtDate(d: Date) {
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase">
      <span className="text-primary"># </span>
      {children}
    </h2>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 font-mono text-2xl font-bold">{value}</p>
    </div>
  );
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Spark({ scores, total }: { scores: number[]; total: number }) {
  return (
    <div className="flex h-8 items-end gap-0.5">
      {scores.slice(-14).map((score, i) => (
        <div
          key={i}
          className="w-1.5 rounded-t-[2px] bg-primary/70"
          style={{ height: `${Math.max(8, pctOf(score, total))}%` }}
          title={`${score}/${total}`}
        />
      ))}
    </div>
  );
}

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
  const questionById = new Map<string, Question>(
    quizzes.flatMap((quiz) => quiz.questions.map((q) => [q.id, q]))
  );

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

  const playerStats = profiles
    .map((profile) => {
      const own = attempts
        .filter((a) => a.profileId === profile.id)
        .sort((a, b) => a.finishedAt.getTime() - b.finishedAt.getTime());
      if (own.length === 0) {
        return {
          profile,
          runs: 0,
          total: 0,
          scores: [] as number[],
          best: 0,
          avg: 0,
          latest: 0,
          delta: null as number | null,
        };
      }
      const total = own[0].total;
      const scores = own.map((a) => a.score);
      const latest = scores[scores.length - 1];
      const previous = scores.length > 1 ? scores[scores.length - 2] : null;
      return {
        profile,
        runs: own.length,
        total,
        scores,
        best: Math.max(...scores),
        avg: Math.round(
          scores.reduce((s, v) => s + v, 0) / scores.length
        ),
        latest,
        delta: previous === null ? null : latest - previous,
      };
    })
    .sort((a, b) => b.runs - a.runs);

  const questionStats = [...questionById.values()]
    .map((question) => {
      const rows = answers.filter((a) => a.questionId === question.id);
      const misses = rows.filter((a) => !a.isCorrect);
      const skips = misses.filter((a) => a.chosenIndex === null).length;
      const wrongPicks = new Map<number, number>();
      for (const miss of misses) {
        if (miss.chosenIndex !== null) {
          wrongPicks.set(
            miss.chosenIndex,
            (wrongPicks.get(miss.chosenIndex) ?? 0) + 1
          );
        }
      }
      const topWrong = [...wrongPicks.entries()].sort(
        (a, b) => b[1] - a[1]
      )[0];
      return {
        question,
        total: rows.length,
        missPct: pctOf(misses.length, rows.length),
        skips,
        topWrong: topWrong
          ? { index: topWrong[0], count: topWrong[1] }
          : null,
      };
    })
    .filter((s) => s.total > 0)
    .sort((a, b) => b.missPct - a.missPct || b.total - a.total)
    .slice(0, 8);

  const topics = [...new Set([...questionById.values()].map((q) => q.topic))];
  const topicStats = topics.map((topic) => {
    const rows = answers.filter(
      (a) => questionById.get(a.questionId)?.topic === topic
    );
    const correct = rows.filter((a) => a.isCorrect).length;
    return { topic, pct: pctOf(correct, rows.length), total: rows.length };
  });

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
        {playerStats.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            no players seeded yet
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {playerStats.map((p) =>
              p.runs === 0 ? (
                <Card key={p.profile.id}>
                  <CardContent className="flex items-center justify-between pt-6 font-mono text-sm">
                    <span>{p.profile.name}</span>
                    <span className="text-muted-foreground">no runs yet</span>
                  </CardContent>
                </Card>
              ) : (
                <Card key={p.profile.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-mono text-base">
                      {p.profile.name}
                    </CardTitle>
                    <span className="font-mono text-xs text-muted-foreground">
                      {p.runs} {p.runs === 1 ? "run" : "runs"}
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-end justify-between">
                      <div className="space-y-1 font-mono text-sm">
                        <p>
                          best{" "}
                          <span className="text-primary">
                            {p.best}/{p.total}
                          </span>{" "}
                          · avg {p.avg}/{p.total}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          latest {p.latest}/{p.total}{" "}
                          {p.delta !== null && (
                            <span
                              className={cn(
                                p.delta > 0 && "text-primary",
                                p.delta < 0 && "text-destructive"
                              )}
                            >
                              (
                              {p.delta > 0 ? `▲ +${p.delta}` : ""}
                              {p.delta < 0 ? `▼ ${p.delta}` : ""}
                              {p.delta === 0 ? "= same" : ""})
                            </span>
                          )}
                        </p>
                      </div>
                      <Spark scores={p.scores} total={p.total} />
                    </div>
                    <Bar pct={pctOf(p.best, p.total)} color="bg-primary" />
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeading>hardest questions</SectionHeading>
        {questionStats.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            no attempts yet — nothing to analyze
          </p>
        ) : (
          <Card>
            <CardContent className="divide-y divide-border">
              {questionStats.map(({ question, missPct, total, skips, topWrong }) => (
                <div key={question.id} className="space-y-2 py-4 first:pt-2 last:pb-2">
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
                        missPct >= 60
                          ? "text-destructive"
                          : missPct >= 30
                            ? "text-amber"
                            : "text-primary"
                      )}
                    >
                      {missPct}% miss
                    </span>
                  </div>
                  <Bar
                    pct={missPct}
                    color={
                      missPct >= 60
                        ? "bg-destructive"
                        : missPct >= 30
                          ? "bg-amber"
                          : "bg-primary"
                    }
                  />
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
          {topicStats.map(({ topic, pct, total }) => (
            <div key={topic} className="space-y-2 rounded-lg border bg-card p-4">
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  {topic}
                </span>
                <span className="text-lg font-bold">{total === 0 ? "—" : `${pct}%`}</span>
              </div>
              <Bar
                pct={pct}
                color={
                  pct >= 70 ? "bg-primary" : pct >= 40 ? "bg-amber" : "bg-destructive"
                }
              />
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
                        pctOf(attempt.score, attempt.total) >= 70
                          ? "text-primary"
                          : pctOf(attempt.score, attempt.total) >= 40
                            ? "text-amber"
                            : "text-destructive"
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
