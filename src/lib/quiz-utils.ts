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
  blankAnswers,
}: Question): ClientQuestion {
  return {
    id,
    topic,
    prompt,
    code,
    demo,
    options: blankAnswers ? [] : options,
    blank: blankAnswers ? true : undefined,
  };
}

/** Forgiving comparison for typed answers: trim + lowercase. */
export function matchesBlank(accepted: string[], typed: string) {
  const normalized = typed.trim().toLowerCase();
  return accepted.some((answer) => answer.trim().toLowerCase() === normalized);
}
