import { level2 } from "./level-2";
import { level3 } from "./level-3";
import { level4 } from "./level-4";
import { milestone1 } from "./milestone-1";
import { milestone2 } from "./milestone-2";
import { milestone3 } from "./milestone-3";
import { milestone4 } from "./milestone-4";
import type { Quiz, Topic } from "./types";

export const quizzes: Quiz[] = [
  milestone1,
  milestone2,
  level2,
  milestone3,
  level3,
  milestone4,
  level4,
];

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.slug === slug);
}

/** Which notes page covers each topic — used to link weak topics to study material. */
export const topicNotes: Record<Topic, string> = {
  Introduction: "introduction",
  "Big O": "big-o",
  Arrays: "arrays",
  Lists: "lists",
  Dictionaries: "dictionaries",
  Tuples: "tuples",
};
