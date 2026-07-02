export type Topic = "Introduction" | "Big O" | "Arrays";

export type Question = {
  id: string;
  topic: Topic;
  prompt: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Quiz = {
  slug: string;
  title: string;
  description: string;
  sections: string[];
  questions: Question[];
};

/** Question shape that is safe to send to the browser during the exam. */
export type ClientQuestion = Omit<Question, "correctIndex" | "explanation">;
