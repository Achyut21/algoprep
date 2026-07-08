"use client";

import { HalvingDemo, InsertShiftDemo } from "@/components/demos";

/** Caption-free variants — the notes captions would give the answer away. */
const DEMOS: Record<string, React.ReactNode> = {
  halving: <HalvingDemo hideCaption />,
  "insert-shift": <InsertShiftDemo hideCaption />,
};

/** Renders a named demo inside a quiz question; unknown names render nothing. */
export function QuestionDemo({ name }: { name: string }) {
  return DEMOS[name] ?? null;
}
