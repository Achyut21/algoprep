"use client";

import { useState, useTransition } from "react";
import { submitAttempt } from "@/app/actions";
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

export function QuizRunner({
  quizSlug,
  quizTitle,
  playerName,
  questions,
}: {
  quizSlug: string;
  quizTitle: string;
  playerName: string;
  questions: ClientQuestion[];
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [current, setCurrent] = useState(0);
  const [isPending, startTransition] = useTransition();

  const question = questions[current];
  const answered = answers.filter((a) => a !== null).length;
  const unanswered = questions.length - answered;

  function choose(optionIndex: number) {
    setAnswers((prev) =>
      prev.map((a, i) => (i === current ? optionIndex : a))
    );
  }

  function submit() {
    startTransition(async () => {
      await submitAttempt({
        quizSlug,
        answers: questions.map((q, i) => ({
          questionId: q.id,
          chosenIndex: answers[i],
        })),
      });
    });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 p-6">
      <header className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-semibold">{quizTitle}</h1>
          <span className="text-sm text-muted-foreground">{playerName}</span>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={(answered / questions.length) * 100} />
          <span className="shrink-0 text-sm text-muted-foreground">
            {answered}/{questions.length} answered
          </span>
        </div>
      </header>

      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <Badge variant="secondary">{question.topic}</Badge>
          <span className="text-sm text-muted-foreground">
            Question {current + 1} of {questions.length}
          </span>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base font-medium">{question.prompt}</p>
          {question.code && (
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
              <code>{question.code}</code>
            </pre>
          )}
          <div className="grid gap-2">
            {question.options.map((option, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => choose(i)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    )}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="pt-0.5">{option}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Previous
        </Button>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent((c) => c + 1)}>Next</Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Submit quiz</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit your answers?</DialogTitle>
                <DialogDescription>
                  {unanswered > 0
                    ? `You still have ${unanswered} unanswered ${
                        unanswered === 1 ? "question" : "questions"
                      } — they will count as wrong. You can go back and finish them first.`
                    : "All questions answered. Once you submit, you'll see your score and the explanations."}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton>
                <Button onClick={submit} disabled={isPending}>
                  {isPending ? "Grading…" : "Submit"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <nav className="grid grid-cols-10 gap-1.5">
        {questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to question ${i + 1}`}
            className={cn(
              "flex h-8 items-center justify-center rounded-md border text-xs font-medium transition-colors",
              i === current && "ring-2 ring-primary",
              answers[i] !== null
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </main>
  );
}
