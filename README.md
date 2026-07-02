# AlgoPrep

Milestone quiz site for kids working through a Data Structures & Algorithms course. After each course milestone they take a ~30-question MCQ exam, get graded server-side, and see explanations for every question. Scores persist in Postgres with a leaderboard across players.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind + shadcn/ui, motion for animations
- Drizzle ORM + Neon Postgres
- Server Actions with Zod validation

## How it works

- Questions live in the repo (`src/content/quizzes/`), not the database — the DB only stores profiles, attempts, and per-question answers.
- Exam mode: the quiz page strips the answer key before anything reaches the browser; grading happens in a server action.
- No accounts: players are seeded by name and set a 4-digit PIN on first login.

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

## Deploy

Vercel: import the repo, set `DATABASE_URL`. Done.

## Resetting a forgotten PIN

```sql
update profiles set pin_hash = null where name = 'PlayerName';
```

Their next login sets a fresh PIN.
