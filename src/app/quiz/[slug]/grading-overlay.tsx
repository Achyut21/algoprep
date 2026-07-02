"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TYPE_SPEED_MS = 14;
const LINE_DELAY_MS = 130;

type OutLine = { text: string; suffix?: string };

const OUTPUT: OutLine[] = [
  { text: "> collecting answers ......", suffix: "[30/30]" },
  { text: "> loading answer key ......", suffix: "ok" },
  { text: "> sha256 a91f3c07e2b44d10…" },
  { text: "> checking q01..q10 .......", suffix: "done" },
  { text: "> checking q11..q20 .......", suffix: "done" },
  { text: "> checking q21..q30 .......", suffix: "done" },
  { text: "> computing score ........." },
];

export function GradingOverlay({
  playerName,
  quizSlug,
  onDone,
}: {
  playerName: string;
  quizSlug: string;
  onDone: () => void;
}) {
  const command = `./grade --player ${playerName.toLowerCase()} --quiz ${quizSlug}`;
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (typed < command.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), TYPE_SPEED_MS);
      return () => clearTimeout(t);
    }
    if (lines < OUTPUT.length) {
      const t = setTimeout(() => setLines((n) => n + 1), LINE_DELAY_MS);
      return () => clearTimeout(t);
    }
    if (!fired.current) {
      fired.current = true;
      onDone();
    }
  }, [typed, lines, command.length, onDone]);

  const finished = lines >= OUTPUT.length;

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="w-full max-w-md overflow-hidden rounded-lg border bg-[oklch(0.13_0.012_165)]"
        initial={{ scale: 0.96, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 border-b bg-[oklch(0.17_0.012_165)] px-3 py-2">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-amber/70" />
            <span className="size-2.5 rounded-full bg-primary/70" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            grade.sh
          </span>
        </div>
        <div className="p-4 font-mono text-xs leading-6 sm:text-sm">
          <p>
            <span className="text-primary">$ </span>
            {command.slice(0, typed)}
            {typed < command.length && (
              <span className="text-primary">▌</span>
            )}
          </p>
          {OUTPUT.slice(0, lines).map((line, i) => (
            <p key={i} className="text-muted-foreground">
              {line.text}{" "}
              {line.suffix && (
                <span className="text-primary">{line.suffix}</span>
              )}
            </p>
          ))}
          {finished && (
            <p>
              <span className="text-muted-foreground">
                &gt; generating report{" "}
              </span>
              <span className="cursor-blink text-primary">▌</span>
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
