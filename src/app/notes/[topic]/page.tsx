import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NoteTracker } from "@/components/note-tracker";
import { Button } from "@/components/ui/button";
import { noteDocs } from "@/content/notes";
import { isAdmin } from "@/lib/admin";
import { ArraysNotes } from "../arrays-notes";
import { BigONotes } from "../big-o-notes";
import { IntroductionNotes } from "../introduction-notes";
import { PythonNotes } from "../python-notes";

const CONTENT: Record<string, React.ComponentType> = {
  python: PythonNotes,
  introduction: IntroductionNotes,
  "big-o": BigONotes,
  arrays: ArraysNotes,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const doc = noteDocs.find((d) => d.slug === topic);
  return { title: doc ? `${doc.title} — notes — AlgoPrep` : "AlgoPrep" };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const index = noteDocs.findIndex((d) => d.slug === topic);
  const Content = CONTENT[topic];
  if (index === -1 || !Content) notFound();

  const prev = index > 0 ? noteDocs[index - 1].slug : null;
  const next = index < noteDocs.length - 1 ? noteDocs[index + 1].slug : null;
  const adminViewer = await isAdmin();

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <NoteTracker topic={topic} />
      <header className="flex items-center justify-between">
        <h1 className="font-mono text-lg font-bold">
          <span className="text-primary">$ </span>
          cat notes/{topic}.md
          <span className="cursor-blink text-primary">▌</span>
        </h1>
        <Button asChild variant="ghost" className="font-mono text-xs">
          {adminViewer ? (
            <Link href="/admin">← admin</Link>
          ) : (
            <Link href="/">← home</Link>
          )}
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
