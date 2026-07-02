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

function Brand() {
  return (
    <h1 className="font-heading text-3xl font-bold tracking-tight">
      <span className="text-primary">$ </span>
      algoprep
      <span className="cursor-blink text-primary">▌</span>
    </h1>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase">
      <span className="text-primary"># </span>
      {children}
    </h2>
  );
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
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-8 p-6">
        <FadeIn className="text-center">
          <div className="flex justify-center">
            <Brand />
          </div>
          <p className="mt-3 font-mono text-sm text-muted-foreground">
            <span className="text-primary">&gt;</span> select player to begin
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
            <p className="text-center font-mono text-sm text-muted-foreground">
              no players yet — run{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                pnpm seed &quot;Name One&quot; &quot;Name Two&quot;
              </code>
            </p>
          )}
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-center font-mono text-xs text-muted-foreground">
            study first?{" "}
            <Link
              href="/notes/introduction"
              className="text-primary hover:underline"
            >
              introduction
            </Link>
            {" · "}
            <Link href="/notes/big-o" className="text-primary hover:underline">
              big-o
            </Link>
            {" · "}
            <Link href="/notes/arrays" className="text-primary hover:underline">
              arrays
            </Link>
          </p>
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-10 p-6">
      <FadeIn>
        <header className="flex items-center justify-between">
          <div>
            <Brand />
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              <span className="text-primary">&gt;</span> logged in as{" "}
              <span className="text-foreground">{profile.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" className="font-mono text-xs">
              <Link href="/me">my stats</Link>
            </Button>
            <form action={switchProfile}>
              <Button variant="ghost" className="font-mono text-xs">
                switch player
              </Button>
            </form>
          </div>
        </header>
      </FadeIn>

      <FadeIn className="space-y-4" delay={0.1}>
        <SectionHeading>quizzes</SectionHeading>
        {quizzes.map((quiz) => {
          const stats = bestScore(allAttempts, profile.id, quiz.slug);
          return (
            <Card key={quiz.slug} className="hover-glow">
              <CardHeader>
                <CardTitle className="font-mono">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {quiz.sections.map((section) => (
                    <Badge
                      key={section}
                      variant="secondary"
                      className="font-mono text-[10px] tracking-wider uppercase"
                    >
                      {section}
                    </Badge>
                  ))}
                  <span className="font-mono text-xs text-muted-foreground">
                    {quiz.questions.length}q
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {stats && (
                    <span className="font-mono text-xs text-muted-foreground">
                      best {stats.best}/{stats.total} · {stats.tries}{" "}
                      {stats.tries === 1 ? "run" : "runs"}
                    </span>
                  )}
                  <Button asChild className="font-mono">
                    <Link href={`/quiz/${quiz.slug}`}>
                      {stats ? "retry ↺" : "start →"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </FadeIn>

      <FadeIn className="space-y-4" delay={0.15}>
        <SectionHeading>study notes</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { slug: "introduction", blurb: "structures, algorithms & friends" },
            { slug: "big-o", blurb: "counting steps, not seconds" },
            { slug: "arrays", blurb: "numbered boxes, side by side" },
          ].map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="hover-glow rounded-lg border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <p className="font-mono text-sm">
                <span className="text-primary">cat</span> {note.slug}.md
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {note.blurb}
              </p>
            </Link>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="space-y-4" delay={0.2}>
        <SectionHeading>leaderboard</SectionHeading>
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
                <CardTitle className="font-mono text-sm">
                  {quiz.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rows.length === 0 ? (
                  <p className="font-mono text-sm text-muted-foreground">
                    no runs yet — be the first!
                  </p>
                ) : (
                  <ol className="divide-y divide-border font-mono text-sm">
                    {rows.map((row, i) => (
                      <li
                        key={row.profile.id}
                        className="flex items-center justify-between py-2"
                      >
                        <span
                          className={
                            i === 0 ? "text-primary text-glow" : undefined
                          }
                        >
                          <span className="mr-3 text-muted-foreground/60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {row.profile.name}
                          {row.profile.id === profile.id && (
                            <span className="text-muted-foreground"> ← you</span>
                          )}
                        </span>
                        <span className="text-muted-foreground">
                          {row.stats!.best}/{row.stats!.total} ·{" "}
                          {row.stats!.tries}
                          {row.stats!.tries === 1 ? " run" : " runs"}
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
