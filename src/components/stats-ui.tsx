import { pctOf } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase">
      <span className="text-primary"># </span>
      {children}
    </h2>
  );
}

export function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 font-mono text-2xl font-bold">{value}</p>
    </div>
  );
}

export function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Green ≥70, amber ≥40, red below — one severity scale everywhere. */
export function accuracyColor(pct: number) {
  return pct >= 70 ? "bg-primary" : pct >= 40 ? "bg-amber" : "bg-destructive";
}

export function accuracyText(pct: number) {
  return pct >= 70
    ? "text-primary"
    : pct >= 40
      ? "text-amber"
      : "text-destructive";
}

export function Spark({ scores, total }: { scores: number[]; total: number }) {
  return (
    <div className="flex h-8 items-end gap-0.5">
      {scores.slice(-14).map((score, i) => (
        <div
          key={i}
          className="w-1.5 rounded-t-[2px] bg-primary/70"
          style={{ height: `${Math.max(8, pctOf(score, total))}%` }}
          title={`${score}/${total}`}
        />
      ))}
    </div>
  );
}

export function fmtDate(d: Date) {
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
