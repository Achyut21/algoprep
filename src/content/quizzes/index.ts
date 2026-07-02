import { milestone1 } from "./milestone-1";
import type { Quiz, Topic } from "./types";

export const quizzes: Quiz[] = [milestone1];

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.slug === slug);
}

/** Which notes page covers each topic — used to link weak topics to study material. */
export const topicNotes: Record<Topic, string> = {
  Introduction: "introduction",
  "Big O": "big-o",
  Arrays: "arrays",
};
