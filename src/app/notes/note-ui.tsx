import Link from "next/link";
import { FadeInOnScroll } from "@/components/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PythonHint() {
  return (
    <p className="font-mono text-xs text-muted-foreground">
      new to the syntax?{" "}
      <Link href="/notes/python" className="text-primary hover:underline">
        cat python.md →
      </Link>{" "}
      explains every keyword used in these snippets.
    </p>
  );
}

export function Tldr({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
      <span className="font-mono font-bold text-primary">TL;DR — </span>
      {children}
    </div>
  );
}

export function NoteCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeInOnScroll>
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-base text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          {children}
        </CardContent>
      </Card>
    </FadeInOnScroll>
  );
}

export function Term({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <p>
      <span className="font-mono font-semibold text-foreground">{name}</span>{" "}
      <span className="text-muted-foreground">→</span> {children}
    </p>
  );
}

export type ComplexityRow = {
  op: string;
  time: string;
  space: string;
  note?: string;
};

function costColor(cost: string) {
  const inner = cost.match(/O\(([^)]*)\)/)?.[1] ?? "";
  if (inner.includes("²") || inner.includes("ⁿ") || inner.includes("mn"))
    return "text-destructive";
  if (inner.includes("log")) return "text-cyan";
  if (/[nkm]/.test(inner)) return "text-amber";
  if (inner) return "text-primary";
  return "text-muted-foreground";
}

export function ComplexityTable({ rows }: { rows: ComplexityRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-mono text-xs">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="py-2 text-left font-medium">operation</th>
            <th className="py-2 text-left font-medium">time</th>
            <th className="py-2 text-left font-medium">space</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {rows.map((row) => (
            <tr key={row.op} className="border-b last:border-0">
              <td className="py-2 pr-3">
                {row.op}
                {row.note && (
                  <span className="block text-[10px] text-muted-foreground">
                    {row.note}
                  </span>
                )}
              </td>
              <td className={`py-2 pr-3 whitespace-nowrap ${costColor(row.time)}`}>
                {row.time}
              </td>
              <td className={`py-2 whitespace-nowrap ${costColor(row.space)}`}>
                {row.space}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
