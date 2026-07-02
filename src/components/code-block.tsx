import { cn } from "@/lib/utils";

type TokenType = "keyword" | "builtin" | "string" | "number" | "comment" | "plain";

const TOKEN_RE =
  /(#.*)|('[^']*'|"[^"]*")|\b(def|class|if|elif|else|return|for|while|in|not|and|or|import|from|None|True|False)\b|\b(print|range|len|max|min|append|insert)\b|(\b\d+(?:\.\d+)?\b)/g;

const TOKEN_COLORS: Record<Exclude<TokenType, "plain">, string> = {
  comment: "var(--syn-comment)",
  string: "var(--syn-string)",
  keyword: "var(--syn-keyword)",
  builtin: "var(--syn-builtin)",
  number: "var(--syn-number)",
};

function tokenize(line: string) {
  const tokens: { text: string; type: TokenType }[] = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN_RE)) {
    const index = match.index;
    if (index > last) tokens.push({ text: line.slice(last, index), type: "plain" });
    const type: TokenType = match[1]
      ? "comment"
      : match[2]
        ? "string"
        : match[3]
          ? "keyword"
          : match[4]
            ? "builtin"
            : "number";
    tokens.push({ text: match[0], type });
    last = index + match[0].length;
  }
  if (last < line.length) tokens.push({ text: line.slice(last), type: "plain" });
  return tokens;
}

export function CodeBlock({
  code,
  filename = "snippet.py",
  className,
}: {
  code: string;
  filename?: string;
  className?: string;
}) {
  const lines = code.split("\n");
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-[oklch(0.13_0.012_165)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b bg-[oklch(0.17_0.012_165)] px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-amber/70" />
          <span className="size-2.5 rounded-full bg-primary/70" />
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {filename}
        </span>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-sm leading-6">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-7 shrink-0 pr-3 text-right text-muted-foreground/40 select-none">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {tokenize(line).map((token, j) =>
                  token.type === "plain" ? (
                    token.text
                  ) : (
                    <span key={j} style={{ color: TOKEN_COLORS[token.type] }}>
                      {token.text}
                    </span>
                  )
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
