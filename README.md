# AlgoPrep

Milestone quiz site for kids working through a Data Structures & Algorithms course. After each course milestone they take a ~30-question MCQ exam, get graded server-side, and see explanations for every question. Scores persist in Postgres with a leaderboard across players.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind + shadcn/ui, motion for animations
- Drizzle ORM + Neon Postgres
- Server Actions with Zod validation

## How it works

- Questions live in the repo (`src/content/quizzes/`), not the database — the DB only stores profiles, attempts, and per-question answers.
- Exam mode: questions are shuffled per attempt, the quiz page strips the
  answer key before anything reaches the browser, and grading happens in a
  server action. Answers persist in localStorage, so a mid-quiz refresh
  loses nothing. Each attempt records its duration.
- Practice mode (`/practice/<slug>`): instant feedback per question via a
  server action, nothing saved.
- Players get their own stats at `/me` — per-quiz progress, topic strengths
  linked to the notes, most-missed questions, badges.
- No accounts: players are added from the admin dashboard (or `pnpm seed`)
  and set a 4-digit PIN on first login.

## Setup

```bash
pnpm install
# put your Neon connection string in .env.local as DATABASE_URL
pnpm drizzle-kit push          # create tables
pnpm seed "Name One" "Name Two" # add players (safe to rerun)
pnpm dev
```

## Adding a milestone quiz

1. Create `src/content/quizzes/milestone-N.ts` (copy the shape of `milestone-1.ts`).
2. Register it in `src/content/quizzes/index.ts`.

## Admin dashboard

`/admin` — attempts, per-player progress, hardest questions (with the
most-picked wrong answer), and accuracy by topic. Protected by the
`ADMIN_PASSWORD` env var; without it the dashboard stays locked.

## Deploy

Vercel: import the repo, set `DATABASE_URL` and `ADMIN_PASSWORD`. Done.

## Resetting a forgotten PIN

```sql
update profiles set pin_hash = null where name = 'PlayerName';
```

Their next login sets a fresh PIN.
