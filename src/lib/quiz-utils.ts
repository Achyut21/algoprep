import type { ClientQuestion, Question } from "@/content/quizzes/types";

export function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Strip the answer key before anything is sent to the browser. */
export function toClientQuestion({
  id,
  topic,
  prompt,
  code,
  demo,
  options,
}: Question): ClientQuestion {
  return { id, topic, prompt, code, demo, options };
}
