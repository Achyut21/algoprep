import Link from "next/link";
import { getActiveProfile, switchProfile } from "@/app/actions";
import { ProfilePicker } from "@/app/profile-picker";
import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <FadeIn className="text-center">
          <h1 className="font-heading text-3xl font-semibold">
            AlgoPrep
          </h1>
          <p className="mt-2 text-muted-foreground">
            Who&apos;s taking the quiz today?
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          {allProfiles.length > 0 ? (
            <ProfilePicker
              profiles={allProfiles.map((p) => ({
                id: p.id,
                name: p.name,
                hasPin: p.pinHash !== null,
              }))}
            />
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No players yet. Add them with{" "}
              <code className="rounded bg-muted px-1.5 py-0.5">
                pnpm seed &quot;Name One&quot; &quot;Name Two&quot;
              </code>
            </p>
          )}
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 p-6">
      <FadeIn>
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold">
              AlgoPrep
            </h1>
            <p className="mt-1 text-muted-foreground">
              Ready when you are, {profile.name}.
            </p>
          </div>
          <form action={switchProfile}>
            <Button variant="ghost">Switch player</Button>
          </form>
        </header>
      </FadeIn>

      <FadeIn className="space-y-4" delay={0.1}>
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
      </FadeIn>

      <FadeIn className="space-y-4" delay={0.2}>
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
      </FadeIn>
    </main>
  );
}
