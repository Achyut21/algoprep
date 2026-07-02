import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArraysNotes } from "../arrays-notes";
import { BigONotes } from "../big-o-notes";
import { IntroductionNotes } from "../introduction-notes";

const TOPICS = {
  introduction: { title: "Introduction", component: IntroductionNotes },
  "big-o": { title: "Big O Notation", component: BigONotes },
  arrays: { title: "Arrays", component: ArraysNotes },
} as const;

type TopicSlug = keyof typeof TOPICS;

const ORDER: TopicSlug[] = ["introduction", "big-o", "arrays"];

export function generateStaticParams() {
  return ORDER.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const entry = TOPICS[topic as TopicSlug];
  return { title: entry ? `${entry.title} — notes — AlgoPrep` : "AlgoPrep" };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const entry = TOPICS[topic as TopicSlug];
  if (!entry) notFound();

  const index = ORDER.indexOf(topic as TopicSlug);
  const prev = index > 0 ? ORDER[index - 1] : null;
  const next = index < ORDER.length - 1 ? ORDER[index + 1] : null;
  const Content = entry.component;

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="font-mono text-lg font-bold">
          <span className="text-primary">$ </span>
          cat notes/{topic}.md
          <span className="cursor-blink text-primary">▌</span>
        </h1>
        <Button asChild variant="ghost" className="font-mono text-xs">
          <Link href="/">← home</Link>
        </Button>
      </header>

      <Content />

      <footer className="flex items-center justify-between border-t pt-6 font-mono text-sm">
        {prev ? (
          <Button asChild variant="outline">
            <Link href={`/notes/${prev}`}>← {prev}</Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild variant="outline">
            <Link href={`/notes/${next}`}>{next} →</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/">ready? take the quiz →</Link>
          </Button>
        )}
      </footer>
    </main>
  );
}
