import { milestone1 } from "./milestone-1";
import type { Quiz } from "./types";

export const quizzes: Quiz[] = [milestone1];

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.slug === slug);
}
