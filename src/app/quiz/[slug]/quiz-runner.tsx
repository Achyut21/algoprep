"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { submitAttempt } from "@/app/actions";
import { GradingOverlay } from "./grading-overlay";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { ClientQuestion } from "@/content/quizzes/types";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

const slideVariants = {
  enter: (direction: number) => ({ x: direction * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -48, opacity: 0 }),
};

type SavedState = {
  startedAt: number;
  picks: Record<string, number>;
};

function fmtElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function QuizRunner({
  quizSlug,
  profileId,
  playerName,
  questions,
}: {
  quizSlug: string;
  profileId: number;
  playerName: string;
  questions: ClientQuestion[];
}) {
  const storageKey = `algoprep:${quizSlug}:${profileId}`;

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [[current, direction], setNav] = useState<[number, number]>([0, 0]);
  const [grading, setGrading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(0);
  const [, startTransition] = useTransition();

  // Restore an interrupted run (answers by question id survive reshuffles),
  // then start the elapsed-time ticker.
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const saved: SavedState = JSON.parse(raw);
      startedAt.current = saved.startedAt;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore of an interrupted run
      setAnswers(questions.map((q) => saved.picks[q.id] ?? null));
    } else {
      startedAt.current = Date.now();
    }
    const t = setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)),
      1000
    );
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const question = questions[current];
  const answered = answers.filter((a) => a !== null).length;
  const unanswered = questions.length - answered;

  function goTo(index: number) {
    setNav(([c]) => [index, index > c ? 1 : -1]);
  }

  function choose(questionIndex: number, optionIndex: number) {
    setAnswers((prev) => {
      const next = prev.map((a, i) => (i === questionIndex ? optionIndex : a));
      const picks: Record<string, number> = {};
      questions.forEach((q, i) => {
        if (next[i] !== null) picks[q.id] = next[i];
      });
      localStorage.setItem(
        storageKey,
        JSON.stringify({ startedAt: startedAt.current, picks } as SavedState)
      );
      return next;
    });
  }

  const runSubmit = useCallback(() => {
    setSubmitError(false);
    startTransition(async () => {
      try {
        localStorage.removeItem(storageKey);
        await submitAttempt({
          quizSlug,
          durationSeconds: Math.floor((Date.now() - startedAt.current) / 1000),
          answers: questions.map((q, i) => ({
            questionId: q.id,
            chosenIndex: answers[i],
          })),
        });
      } catch (error) {
        if (
          error instanceof Error &&
          "digest" in error &&
          String(error.digest).startsWith("NEXT_REDIRECT")
        ) {
          throw error;
        }
        // Put the answers back so a reload after a failed submit loses nothing.
        const picks: Record<string, number> = {};
        questions.forEach((q, i) => {
          if (answers[i] !== null) picks[q.id] = answers[i];
        });
        localStorage.setItem(
          storageKey,
          JSON.stringify({ startedAt: startedAt.current, picks } as SavedState)
        );
        setSubmitError(true);
      }
    });
  }, [quizSlug, questions, answers, storageKey]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 p-6">
      {grading && (
        <GradingOverlay
          playerName={playerName}
          quizSlug={quizSlug}
          failed={submitError}
          onDone={runSubmit}
          onRetry={runSubmit}
        />
      )}
      <motion.header
        className="space-y-3"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between font-mono">
          <h1 className="text-lg font-bold">
            <span className="text-primary">$ </span>
            {quizSlug}
          </h1>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            {fmtElapsed(elapsed)} · {playerName.toLowerCase()}@algoprep
            <Button asChild variant="ghost" size="sm" className="font-mono text-xs">
              <Link href="/">exit ↩</Link>
            </Button>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={(answered / questions.length) * 100} />
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            [{String(answered).padStart(2, "0")}/{questions.length}]
          </span>
        </div>
      </motion.header>

      <Card className="flex-1 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <Badge
            variant="secondary"
            className="font-mono text-[10px] tracking-wider uppercase"
          >
            {question.topic}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            Q{String(current + 1).padStart(2, "0")}
            <span className="text-muted-foreground/50">
              /{questions.length}
            </span>
          </span>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current}
              className="space-y-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <p className="text-base font-medium">{question.prompt}</p>
              {question.code && (
                <CodeBlock
                  code={question.code}
                  filename={`${question.id}.py`}
                />
              )}
              <div className="grid gap-2">
                {question.options.map((option, i) => {
                  const selected = answers[current] === i;
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => choose(current, i)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all",
                        selected
                          ? "border-primary bg-primary/5 box-glow"
                          : "border-border hover:border-primary/40 hover:bg-muted"
                      )}
                    >
                      <motion.span
                        animate={selected ? { scale: [1, 1.25, 1] } : {}}
                        transition={{ duration: 0.25 }}
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        )}
                      >
                        {LETTERS[i]}
                      </motion.span>
                      <span className="pt-0.5">{option}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between font-mono">
        <Button
          variant="outline"
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
        >
          ← prev
        </Button>
        {current < questions.length - 1 ? (
          <Button onClick={() => goTo(current + 1)}>next →</Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-glow">submit ⏎</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-mono">
                  Submit your answers?
                </DialogTitle>
                <DialogDescription>
                  {unanswered > 0
                    ? `You still have ${unanswered} unanswered ${
                        unanswered === 1 ? "question" : "questions"
                      } — they will count as wrong. You can go back and finish them first.`
                    : "All questions answered. Once you submit, you'll see your score and the explanations."}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton>
                <Button
                  onClick={() => setGrading(true)}
                  disabled={grading}
                  className="font-mono"
                >
                  submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <nav className="grid grid-cols-10 gap-1.5">
        {questions.map((q, i) => (
          <motion.button
            key={q.id}
            type="button"
            onClick={() => goTo(i)}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to question ${i + 1}`}
            className={cn(
              "flex h-8 items-center justify-center rounded-md border font-mono text-xs transition-colors",
              i === current && "ring-2 ring-primary",
              answers[i] !== null
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {i + 1}
          </motion.button>
        ))}
      </nav>
    </main>
  );
}
