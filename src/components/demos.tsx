"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-[oklch(0.13_0.012_165)] p-4">
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 font-mono text-xs text-muted-foreground">{children}</p>
  );
}

function Cell({
  value,
  index,
  state = "idle",
}: {
  value: number;
  index: number;
  state?: "idle" | "scan" | "hit" | "dim";
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-md border font-mono text-sm transition-all duration-200",
          state === "idle" && "border-border",
          state === "scan" && "border-amber bg-amber/15 text-amber",
          state === "hit" && "border-primary bg-primary/15 text-primary box-glow",
          state === "dim" && "border-border opacity-30"
        )}
      >
        {value}
      </div>
      <span className="font-mono text-[10px] text-muted-foreground/60">
        {index}
      </span>
    </div>
  );
}

/* ── How fast does work grow? ─────────────────────────────── */

const GROWTH_NS = [2, 4, 6, 8, 10];

export function GrowthDemo() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % GROWTH_NS.length), 1500);
    return () => clearInterval(t);
  }, []);
  const n = GROWTH_NS[idx];
  const rows = [
    { label: "O(1)", steps: 1, color: "bg-primary" },
    { label: "O(log n)", steps: Math.ceil(Math.log2(n)), color: "bg-cyan" },
    { label: "O(n)", steps: n, color: "bg-amber" },
    { label: "O(n²)", steps: n * n, color: "bg-destructive" },
  ];
  return (
    <Frame>
      <p className="font-mono text-xs text-muted-foreground">
        the list has <span className="text-foreground">n = {n}</span> items —
        each block is one step of work
      </p>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-16 shrink-0 font-mono text-xs">
              {row.label}
            </span>
            <div className="flex flex-wrap gap-0.5">
              {Array.from({ length: row.steps }).map((_, i) => (
                <span
                  key={i}
                  className={cn("size-1.5 rounded-[2px]", row.color)}
                />
              ))}
            </div>
            <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">
              {row.steps}
            </span>
          </div>
        ))}
      </div>
      <Caption>same list size, wildly different amounts of work</Caption>
    </Frame>
  );
}

/* ── Array access is one step ─────────────────────────────── */

const ACCESS_VALUES = [7, 2, 9, 4, 8, 1, 6, 3];
const ACCESS_TARGETS = [5, 0, 3, 7, 2];

export function ArrayAccessDemo() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % ACCESS_TARGETS.length),
      1900
    );
    return () => clearInterval(t);
  }, []);
  const target = ACCESS_TARGETS[idx];
  return (
    <Frame>
      <p className="font-mono text-xs">
        <span style={{ color: "var(--syn-builtin)" }}>print</span>
        (array[<span style={{ color: "var(--syn-number)" }}>{target}</span>])
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {ACCESS_VALUES.map((v, i) => (
          <Cell key={i} value={v} index={i} state={i === target ? "hit" : "idle"} />
        ))}
      </div>
      <Caption>
        no searching — the computer calculates where box {target} lives and
        jumps straight to it. always 1 step: O(1)
      </Caption>
    </Frame>
  );
}

/* ── Linear search scans box by box ───────────────────────── */

const SEARCH_VALUES = [7, 2, 9, 4, 8, 1, 6, 3];
const SEARCH_TARGETS = [8, 6, 2, 3];

export function LinearSearchDemo() {
  const [round, setRound] = useState(0);
  const [pos, setPos] = useState(0);
  const target = SEARCH_TARGETS[round % SEARCH_TARGETS.length];
  const found = SEARCH_VALUES[pos] === target;

  useEffect(() => {
    const t = setTimeout(
      () => {
        if (found) {
          setPos(0);
          setRound((r) => r + 1);
        } else {
          setPos((p) => p + 1);
        }
      },
      found ? 1700 : 400
    );
    return () => clearTimeout(t);
  }, [pos, found]);

  return (
    <Frame>
      <p className="font-mono text-xs text-muted-foreground">
        searching for <span className="text-foreground">{target}</span>…
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {SEARCH_VALUES.map((v, i) => (
          <Cell
            key={i}
            value={v}
            index={i}
            state={
              i === pos ? (found ? "hit" : "scan") : i < pos ? "dim" : "idle"
            }
          />
        ))}
      </div>
      <Caption>
        {found
          ? `found ${target} at index ${pos} — took ${pos + 1} checks`
          : `checking index ${pos}… no shortcut, one box at a time: O(n)`}
      </Caption>
    </Frame>
  );
}

/* ── Inserting at the front shifts everyone ───────────────── */

const SHIFT_START = [
  { id: 1, v: 4 },
  { id: 2, v: 8 },
  { id: 3, v: 15 },
  { id: 4, v: 16 },
];

export function InsertShiftDemo() {
  const [inserted, setInserted] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setInserted((s) => !s), 2100);
    return () => clearInterval(t);
  }, []);
  const items = inserted ? [{ id: 0, v: 99 }, ...SHIFT_START] : SHIFT_START;
  return (
    <Frame>
      <p className="font-mono text-xs">
        my_array.insert(<span style={{ color: "var(--syn-number)" }}>0</span>,{" "}
        <span style={{ color: "var(--syn-number)" }}>99</span>)
      </p>
      <div className="mt-3 flex h-14 items-start gap-1.5">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={item.id === 0 ? { opacity: 0, y: -16 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
            >
              <Cell value={item.v} index={i} state={item.id === 0 ? "hit" : "idle"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Caption>
        {inserted
          ? "99 took index 0 — all 4 boxes had to move one spot right: O(n)"
          : "watch what happens to the other boxes…"}
      </Caption>
    </Frame>
  );
}

/* ── A for loop, live ─────────────────────────────────────── */

const LOOP_ITEMS = [4, 8, 15, 16];

export function ForLoopDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => (s + 1) % (LOOP_ITEMS.length + 2)),
      1000
    );
    return () => clearInterval(t);
  }, []);
  const active = step < LOOP_ITEMS.length ? step : -1;
  const printed = active === -1 ? LOOP_ITEMS.length : active + 1;
  return (
    <Frame>
      <p className="font-mono text-xs">
        <span style={{ color: "var(--syn-keyword)" }}>for</span> item{" "}
        <span style={{ color: "var(--syn-keyword)" }}>in</span> [
        {LOOP_ITEMS.map((v, i) => (
          <span key={i}>
            <span style={{ color: "var(--syn-number)" }}>{v}</span>
            {i < LOOP_ITEMS.length - 1 && ", "}
          </span>
        ))}
        ]:
      </p>
      <p className="font-mono text-xs">
        {"    "}
        <span style={{ color: "var(--syn-builtin)" }}>print</span>(item)
      </p>
      <div className="mt-3 flex gap-1.5">
        {LOOP_ITEMS.map((v, i) => (
          <Cell
            key={i}
            value={v}
            index={i}
            state={i === active ? "hit" : i < printed ? "dim" : "idle"}
          />
        ))}
      </div>
      <div className="mt-3 rounded-md border bg-black/30 p-2 font-mono text-xs leading-5">
        {LOOP_ITEMS.slice(0, printed).map((v, i) => (
          <p key={i}>{v}</p>
        ))}
        <p>
          <span className="cursor-blink text-primary">▌</span>
        </p>
      </div>
      <Caption>
        {active === -1
          ? "loop done — the body ran once per item, in order"
          : `item is ${LOOP_ITEMS[active]} right now → print(item) outputs it`}
      </Caption>
    </Frame>
  );
}

/* ── A function is a machine ──────────────────────────────── */

const CALLS = [3, 5, 12];

export function FunctionMachineDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => s + 1), 1100);
    return () => clearInterval(t);
  }, []);
  const idx = Math.floor(step / 2) % CALLS.length;
  const revealed = step % 2 === 1;
  const n = CALLS[idx];
  return (
    <Frame>
      <p className="font-mono text-xs">
        <span style={{ color: "var(--syn-keyword)" }}>def</span> double(n):
      </p>
      <p className="font-mono text-xs">
        {"    "}
        <span style={{ color: "var(--syn-keyword)" }}>return</span> n *{" "}
        <span style={{ color: "var(--syn-number)" }}>2</span>
      </p>
      <div className="mt-3 flex items-center gap-3 font-mono text-sm">
        <span className="rounded-md border border-cyan/50 bg-cyan/10 px-2.5 py-1.5">
          double(<span style={{ color: "var(--syn-number)" }}>{n}</span>)
        </span>
        <span className="text-muted-foreground">→</span>
        <span
          className={cn(
            "rounded-md border border-primary/50 bg-primary/10 px-2.5 py-1.5 text-primary transition-opacity duration-300",
            revealed ? "opacity-100" : "opacity-0"
          )}
        >
          {n * 2}
        </span>
      </div>
      <Caption>
        {revealed
          ? `n became ${n}, so it returned ${n} * 2 = ${n * 2}`
          : `calling double(${n}) — the value ${n} goes in as n…`}
      </Caption>
    </Frame>
  );
}

/* ── Halving: why log n is tiny ───────────────────────────── */

const HALVING_STEPS = [16, 8, 4, 2, 1];

export function HalvingDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => (s + 1) % (HALVING_STEPS.length + 1)),
      1000
    );
    return () => clearInterval(t);
  }, []);
  const active = Math.min(step, HALVING_STEPS.length - 1);
  const visible = HALVING_STEPS[active];
  return (
    <Frame>
      <p className="font-mono text-xs text-muted-foreground">
        {HALVING_STEPS.map((count, i) => (
          <span key={count}>
            <span className={i === active ? "font-bold text-primary" : undefined}>
              {count}
            </span>
            {i < HALVING_STEPS.length - 1 && " → "}
          </span>
        ))}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "size-4 rounded-[3px] border transition-all duration-300",
              i < visible
                ? "border-primary bg-primary/20"
                : "border-border opacity-20"
            )}
          />
        ))}
      </div>
      <Caption>
        cut the pile in half each step: 16 items are gone in just 4 halvings.
        that&apos;s O(log n) — log₂(16) = 4
      </Caption>
    </Frame>
  );
}
