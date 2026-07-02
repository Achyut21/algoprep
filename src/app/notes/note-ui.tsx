import { FadeInOnScroll } from "@/components/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
