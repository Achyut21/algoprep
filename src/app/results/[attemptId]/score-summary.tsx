"use client";

import { animate, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CONFETTI_COLORS = ["#3dfc8e", "#ffd25e", "#7ee7c4", "#e6f0e8"];

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
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.3 },
          colors: CONFETTI_COLORS,
        });
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
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <span className="text-primary">$</span> ./grade --player{" "}
            {name.toLowerCase()}
          </p>
          <CardTitle className="font-mono text-5xl font-bold">
            <span className="text-primary text-glow tabular-nums">
              {String(displayScore).padStart(2, "0")}
            </span>
            <span className="text-muted-foreground">/{total}</span>
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
            <span className="shrink-0 font-mono text-sm font-medium">
              {pct}%
            </span>
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
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  {topic}
                </p>
                <p className="mt-1 font-mono text-lg font-semibold">
                  {correct}
                  <span className="text-muted-foreground">/{topicTotal}</span>
                </p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 font-mono">
            <Button asChild variant="outline">
              <Link href="/">← home</Link>
            </Button>
            <Button asChild>
              <Link href={`/quiz/${quizSlug}`}>retry ↺</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
