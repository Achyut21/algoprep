"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { checkAnswer } from "@/app/actions";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ClientQuestion } from "@/content/quizzes/types";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

type Verdict = {
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
};

export function PracticeRunner({
  quizSlug,
  playerName,
  questions,
}: {
  quizSlug: string;
  playerName: string;
  questions: ClientQuestion[];
}) {
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const question = questions[current];

  function pick(optionIndex: number) {
    if (verdict || isPending) return;
    setChosen(optionIndex);
    startTransition(async () => {
      const result = await checkAnswer({
        questionId: question.id,
        chosenIndex: optionIndex,
      });
      setVerdict(result);
      if (result.isCorrect) setRight((r) => r + 1);
    });
  }

  function next() {
    if (current + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setCurrent((c) => c + 1);
    setChosen(null);
    setVerdict(null);
  }

  if (done) {
    const pct = Math.round((right / questions.length) * 100);
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 p-6">
        <Card>
          <CardContent className="space-y-4 pt-6 text-center">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              practice complete
            </p>
            <p className="font-mono text-4xl font-bold">
              <span className="text-primary text-glow">{right}</span>
              <span className="text-muted-foreground">
                /{questions.length}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {pct >= 70
                ? "You're ready for the real thing!"
                : "Nice warm-up — the notes can patch the gaps."}
            </p>
            <div className="flex justify-center gap-2 font-mono">
              <Button asChild variant="outline">
                <Link href="/">← home</Link>
              </Button>
              <Button asChild>
                <Link href={`/quiz/${quizSlug}`}>take the real quiz →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 p-6">
      <header className="space-y-3">
        <div className="flex items-center justify-between font-mono">
          <h1 className="text-lg font-bold">
            <span className="text-primary">$ </span>
            {quizSlug} <span className="text-amber">--practice</span>
          </h1>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            {playerName.toLowerCase()}@algoprep
            <Button asChild variant="ghost" size="sm" className="font-mono text-xs">
              <Link href="/">← home</Link>
            </Button>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={(current / questions.length) * 100} />
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {right} right · no scores saved
          </span>
        </div>
      </header>

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
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              className="space-y-4"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
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
                  const isChosen = chosen === i;
                  const isCorrect = verdict?.correctIndex === i;
                  const isWrongPick = verdict && isChosen && !isCorrect;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pick(i)}
                      disabled={verdict !== null || isPending}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all",
                        !verdict &&
                          (isChosen
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40 hover:bg-muted"),
                        isCorrect && "border-primary/60 bg-primary/10",
                        isWrongPick && "border-destructive/60 bg-destructive/10"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold",
                          isCorrect
                            ? "border-primary bg-primary text-primary-foreground"
                            : isWrongPick
                              ? "border-destructive bg-destructive/20 text-destructive"
                              : "border-border text-muted-foreground"
                        )}
                      >
                        {LETTERS[i]}
                      </span>
                      <span className="pt-0.5">{option}</span>
                      {isCorrect && (
                        <span className="ml-auto shrink-0 font-mono text-xs font-medium text-primary">
                          ✓
                        </span>
                      )}
                      {isWrongPick && (
                        <span className="ml-auto shrink-0 font-mono text-xs font-medium text-destructive">
                          ✗
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {isPending && (
                <p className="font-mono text-xs text-muted-foreground">
                  checking<span className="cursor-blink">…</span>
                </p>
              )}
              {verdict && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    <span
                      className={cn(
                        "font-mono font-medium",
                        verdict.isCorrect ? "text-primary" : "text-destructive"
                      )}
                    >
                      {verdict.isCorrect ? "✓ correct! " : "✗ not quite. "}
                    </span>
                    {verdict.explanation}
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={next} className="font-mono">
                      {current + 1 >= questions.length
                        ? "finish →"
                        : "next →"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </main>
  );
}
