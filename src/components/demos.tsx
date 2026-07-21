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

export function InsertShiftDemo({ hideCaption = false }: { hideCaption?: boolean }) {
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
      {!hideCaption && (
        <Caption>
          {inserted
            ? "99 took index 0 — all 4 boxes had to move one spot right: O(n)"
            : "watch what happens to the other boxes…"}
        </Caption>
      )}
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

/* ── Class = blueprint, objects = things built from it ────── */

const INSTANCES = [
  { name: "'Rohan'", age: 13 },
  { name: "'Ana'", age: 11 },
];

export function ClassBlueprintDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 1400);
    return () => clearInterval(t);
  }, []);
  const built = Math.min(step, INSTANCES.length);
  return (
    <Frame>
      <div className="flex flex-wrap items-start gap-4">
        <div className="rounded-md border border-cyan/50 bg-cyan/10 p-3 font-mono text-xs leading-5">
          <p style={{ color: "var(--syn-keyword)" }}>class Cousin:</p>
          <p className="text-muted-foreground">{"    "}name</p>
          <p className="text-muted-foreground">{"    "}age</p>
          <p className="text-muted-foreground">{"    "}greet()</p>
        </div>
        <span className="self-center font-mono text-muted-foreground">→</span>
        <div className="flex gap-2">
          {INSTANCES.map((inst, i) => (
            <div
              key={i}
              className={cn(
                "rounded-md border p-3 font-mono text-xs leading-5 transition-all duration-300",
                i < built
                  ? "border-primary/60 bg-primary/10 opacity-100"
                  : "scale-90 opacity-0"
              )}
            >
              <p className="text-primary">Cousin(…)</p>
              <p>
                name: <span style={{ color: "var(--syn-string)" }}>{inst.name}</span>
              </p>
              <p>
                age: <span style={{ color: "var(--syn-number)" }}>{inst.age}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Caption>
        {built === 0
          ? "the class is only a BLUEPRINT — it stores nothing yet"
          : built === 1
            ? "Cousin('Rohan', 13) stamps out an object with its OWN values"
            : "one blueprint, many independent objects — each with its own data"}
      </Caption>
    </Frame>
  );
}

/* ── Immutability: lists say yes, tuples say NO ───────────── */

const IMMUTABLE_PHASES = [
  { line: "myList[0] = 99", target: "list", changed: false },
  { line: "myList[0] = 99", target: "list", changed: true },
  { line: "myTuple[0] = 99", target: "tuple", changed: false },
  { line: "myTuple[0] = 99", target: "tuple", error: true, changed: false },
] as const;

export function ImmutabilityDemo({ hideCaption = false }: { hideCaption?: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => (s + 1) % IMMUTABLE_PHASES.length),
      1500
    );
    return () => clearInterval(t);
  }, []);
  const phase = IMMUTABLE_PHASES[step];
  const isError = "error" in phase && phase.error;
  const listValues = phase.target === "list" && phase.changed ? [99, 2, 3] : [1, 2, 3];
  return (
    <Frame>
      <p className="font-mono text-xs">
        {phase.line}{" "}
        {isError && (
          <span className="text-destructive">
            # TypeError: &apos;tuple&apos; object does not support item
            assignment
          </span>
        )}
        {phase.target === "list" && phase.changed && (
          <span className="text-primary"># sure, done!</span>
        )}
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
            list
          </span>
          <div className="flex gap-1.5">
            {listValues.map((v, i) => (
              <Cell
                key={i}
                value={v}
                index={i}
                state={
                  phase.target === "list" && phase.changed && i === 0
                    ? "hit"
                    : "idle"
                }
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
            tuple 🔒
          </span>
          <div
            className={cn(
              "flex gap-1.5 rounded-lg transition-all duration-300",
              isError && "ring-2 ring-destructive"
            )}
          >
            {[1, 2, 3].map((v, i) => (
              <Cell key={i} value={v} index={i} state={isError ? "dim" : "idle"} />
            ))}
          </div>
        </div>
      </div>
      {!hideCaption && (
        <Caption>
          {isError
            ? "tuples are IMMUTABLE — once built, nothing can be changed, added or removed"
            : phase.changed
              ? "lists are mutable: change whatever you like"
              : "same boxes, very different rules…"}
        </Caption>
      )}
    </Frame>
  );
}

/* ── Amortized append: cheap, cheap, cheap … RESIZE! ──────── */

type AmortizedFrame = { count: number; cap: number; resizing?: boolean };

const AMORTIZED_FRAMES: AmortizedFrame[] = [
  { count: 1, cap: 4 },
  { count: 2, cap: 4 },
  { count: 3, cap: 4 },
  { count: 4, cap: 4 },
  { count: 4, cap: 8, resizing: true },
  { count: 5, cap: 8 },
  { count: 6, cap: 8 },
  { count: 7, cap: 8 },
  { count: 8, cap: 8 },
  { count: 8, cap: 16, resizing: true },
];

export function AmortizedDemo({ hideCaption = false }: { hideCaption?: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => (s + 1) % AMORTIZED_FRAMES.length),
      1100
    );
    return () => clearInterval(t);
  }, []);
  const frame = AMORTIZED_FRAMES[step];
  return (
    <Frame>
      <p className="font-mono text-xs">
        my_list.append(<span style={{ color: "var(--syn-number)" }}>x</span>)
        {"  "}
        <span
          className={cn(
            "transition-colors duration-200",
            frame.resizing ? "text-amber" : "text-primary"
          )}
        >
          {frame.resizing
            ? "# FULL! copying everything to a bigger home…"
            : "# free slot waiting — instant"}
        </span>
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {Array.from({ length: frame.cap }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "size-4 rounded-[3px] border transition-all duration-300",
              i < frame.count
                ? frame.resizing
                  ? "border-amber bg-amber/25"
                  : i === frame.count - 1
                    ? "border-primary bg-primary/40"
                    : "border-primary/50 bg-primary/15"
                : "border-border"
            )}
          />
        ))}
      </div>
      {!hideCaption && (
        <Caption>
          {frame.resizing
            ? `rare & expensive: all ${frame.count} items copied into a row twice the size — O(n) this one time`
            : `cheap append #${frame.count} — the resize cost is "paid off" across all these: amortized O(1)`}
        </Caption>
      )}
    </Frame>
  );
}

/* ── Dictionary lookup: the key IS the address ────────────── */

const DICT_ENTRIES = [
  { key: "'name'", value: "'Edy'" },
  { key: "'age'", value: "26" },
  { key: "'address'", value: "'London'" },
];

export function KeyLookupDemo() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % DICT_ENTRIES.length),
      1600
    );
    return () => clearInterval(t);
  }, []);
  const active = DICT_ENTRIES[idx];
  return (
    <Frame>
      <p className="font-mono text-xs">
        myDict[<span style={{ color: "var(--syn-string)" }}>{active.key}</span>]
      </p>
      <div className="mt-3 space-y-1.5">
        {DICT_ENTRIES.map((entry, i) => {
          const hit = i === idx;
          return (
            <div
              key={entry.key}
              className={cn(
                "flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-xs transition-all duration-200",
                hit ? "border-primary bg-primary/10 box-glow" : "border-border"
              )}
            >
              <span
                className={cn(hit ? "text-primary" : "text-muted-foreground")}
              >
                {entry.key}
              </span>
              <span className="text-muted-foreground">:</span>
              <span className={cn(!hit && "text-muted-foreground")}>
                {entry.value}
              </span>
              {hit && (
                <span className="ml-auto text-primary">← found instantly</span>
              )}
            </div>
          );
        })}
      </div>
      <Caption>
        no scanning, no counting boxes — the KEY takes you straight to the
        value. that&apos;s O(1) lookup
      </Caption>
    </Frame>
  );
}

/* ── b = a does NOT copy ──────────────────────────────────── */

const REF_STEPS = [
  "a = [1, 2, 3]",
  "b = a          # no copy — b points at the SAME list!",
  "b.append(4)",
  "print(a)       # [1, 2, 3, 4]  😱",
];

export function ReferenceCopyDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => (s + 1) % REF_STEPS.length),
      1700
    );
    return () => clearInterval(t);
  }, []);
  const showB = step >= 1;
  const appended = step >= 2;
  return (
    <Frame>
      <div className="font-mono text-xs leading-5">
        {REF_STEPS.map((line, i) => (
          <p
            key={i}
            className={cn(
              "transition-opacity duration-300",
              i > step && "opacity-25",
              i === step && "text-foreground",
              i < step && "text-muted-foreground"
            )}
          >
            {line}
          </p>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex flex-col gap-1 font-mono text-sm">
          <span>
            a <span className="text-primary">→</span>
          </span>
          <span
            className={cn(
              "transition-opacity duration-300",
              showB ? "opacity-100" : "opacity-0"
            )}
          >
            b <span className="text-amber">→</span>
          </span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((v, i) => (
            <Cell key={i} value={v} index={i} />
          ))}
          <div
            className={cn(
              "transition-all duration-300",
              appended ? "opacity-100" : "scale-75 opacity-0"
            )}
          >
            <Cell value={4} index={3} state="hit" />
          </div>
        </div>
      </div>
      <Caption>
        {step < 2
          ? "one list, two name tags pointing at it"
          : "b changed the shared list — and a sees it. use a[:] for a real copy"}
      </Caption>
    </Frame>
  );
}

/* ── Halving: why log n is tiny ───────────────────────────── */

const HALVING_STEPS = [16, 8, 4, 2, 1];

export function HalvingDemo({ hideCaption = false }: { hideCaption?: boolean }) {
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
      {!hideCaption && (
        <Caption>
          cut the pile in half each step: 16 items are gone in just 4
          halvings. that&apos;s O(log n) — log₂(16) = 4
        </Caption>
      )}
    </Frame>
  );
}
