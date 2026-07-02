import Link from "next/link";
import {
  createOrPickProfile,
  getActiveProfile,
  selectProfile,
  switchProfile,
} from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { quizzes } from "@/content/quizzes";
import { getDb } from "@/db";
import type { Attempt } from "@/db/schema";

export const dynamic = "force-dynamic";

function bestScore(attempts: Attempt[], profileId: number, quizSlug: string) {
  const own = attempts.filter(
    (a) => a.profileId === profileId && a.quizSlug === quizSlug
  );
  if (own.length === 0) return null;
  return {
    best: Math.max(...own.map((a) => a.score)),
    total: own[0].total,
    tries: own.length,
  };
}

export default async function HomePage() {
  if (!process.env.DATABASE_URL) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center p-6">
        <Card>
          <CardHeader>
            <CardTitle>One step left: connect the database</CardTitle>
            <CardDescription>
              Add your Neon connection string as DATABASE_URL in .env.local,
              run <code>pnpm drizzle-kit push</code>, then restart the dev
              server.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  const db = getDb();
  const profile = await getActiveProfile();
  const allProfiles = await db.query.profiles.findMany();
  const allAttempts = await db.query.attempts.findMany();

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 p-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold">
            Summer Study Exam
          </h1>
          <p className="mt-2 text-muted-foreground">
            Who&apos;s taking the quiz today?
          </p>
        </div>
        {allProfiles.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {allProfiles.map((p) => (
              <form key={p.id} action={selectProfile.bind(null, p.id)}>
                <Button variant="outline" size="lg">
                  {p.name}
                </Button>
              </form>
            ))}
          </div>
        )}
        <form action={createOrPickProfile} className="flex gap-2">
          <Input
            name="name"
            placeholder="Or type your name…"
            maxLength={30}
            required
          />
          <Button type="submit">Let&apos;s go</Button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold">
            Summer Study Exam
          </h1>
          <p className="mt-1 text-muted-foreground">
            Ready when you are, {profile.name}.
          </p>
        </div>
        <form action={switchProfile}>
          <Button variant="ghost">Switch player</Button>
        </form>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-medium">Quizzes</h2>
        {quizzes.map((quiz) => {
          const stats = bestScore(allAttempts, profile.id, quiz.slug);
          return (
            <Card key={quiz.slug}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {quiz.sections.map((section) => (
                    <Badge key={section} variant="secondary">
                      {section}
                    </Badge>
                  ))}
                  <span className="text-sm text-muted-foreground">
                    {quiz.questions.length} questions
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {stats && (
                    <span className="text-sm text-muted-foreground">
                      Best: {stats.best}/{stats.total} · {stats.tries}{" "}
                      {stats.tries === 1 ? "attempt" : "attempts"}
                    </span>
                  )}
                  <Button asChild>
                    <Link href={`/quiz/${quiz.slug}`}>
                      {stats ? "Try again" : "Start"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-medium">Leaderboard</h2>
        {quizzes.map((quiz) => {
          const rows = allProfiles
            .map((p) => ({
              profile: p,
              stats: bestScore(allAttempts, p.id, quiz.slug),
            }))
            .filter((row) => row.stats !== null)
            .sort((a, b) => b.stats!.best - a.stats!.best);
          return (
            <Card key={quiz.slug}>
              <CardHeader>
                <CardTitle className="text-base">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {rows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nobody has taken this one yet. Be the first!
                  </p>
                ) : (
                  <ol className="space-y-2">
                    {rows.map((row, i) => (
                      <li
                        key={row.profile.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>
                          {["🥇", "🥈", "🥉"][i] ?? `${i + 1}.`}{" "}
                          {row.profile.name}
                          {row.profile.id === profile.id && " (you)"}
                        </span>
                        <span className="text-muted-foreground">
                          {row.stats!.best}/{row.stats!.total} ·{" "}
                          {row.stats!.tries}{" "}
                          {row.stats!.tries === 1 ? "attempt" : "attempts"}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
