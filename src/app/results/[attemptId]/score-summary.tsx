"use client";

import { animate, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function verdict(pct: number) {
  if (pct >= 90) return "Outstanding! 🏆";
  if (pct >= 70) return "Great job! 🎉";
  if (pct >= 50) return "Good effort — review the misses below. 💪";
  return "Keep practicing — the explanations below will help. 📚";
}

export function ScoreSummary({
  name,
  score,
  total,
  byTopic,
  quizSlug,
}: {
  name: string;
  score: number;
  total: number;
  byTopic: { topic: string; correct: number; total: number }[];
  quizSlug: string;
}) {
  const pct = Math.round((score / total) * 100);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayScore(Math.round(v)),
    });
    if (pct >= 70) {
      import("canvas-confetti").then(({ default: confetti }) => {
        confetti({ particleCount: 140, spread: 90, origin: { y: 0.3 } });
      });
    }
    return () => controls.stop();
  }, [score, pct]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-2xl">
            {name}, you scored{" "}
            <span className="tabular-nums">{displayScore}</span>/{total}
          </CardTitle>
          <p className="text-muted-foreground">{verdict(pct)}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <span className="shrink-0 text-sm font-medium">{pct}%</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {byTopic.map(({ topic, correct, total: topicTotal }, i) => (
              <motion.div
                key={topic}
                className="rounded-lg border p-3 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.12 }}
              >
                <p className="text-sm text-muted-foreground">{topic}</p>
                <p className="mt-1 font-heading text-lg font-semibold">
                  {correct}/{topicTotal}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild>
              <Link href={`/quiz/${quizSlug}`}>Try again</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
