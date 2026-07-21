export type Topic =
  | "Introduction"
  | "Big O"
  | "Arrays"
  | "Lists"
  | "Dictionaries"
  | "Tuples"
  | "OOP";

export type Question = {
  id: string;
  topic: Topic;
  prompt: string;
  code?: string;
  /** Optional animated demo (see QuestionDemo) shown instead of a wordy setup. */
  demo?: string;
  options: string[];
  correctIndex: number;
  /** Present = fill-in-the-blank: the kid TYPES the answer (options are ignored).
   *  Compared case-insensitively after trimming; list accepted variants. */
  blankAnswers?: string[];
  explanation: string;
};

export type Quiz = {
  slug: string;
  title: string;
  description: string;
  sections: string[];
  /** Exam-only quiz: no practice mode, so the bank can't be farmed. */
  noPractice?: boolean;
  questions: Question[];
};

/** Question shape that is safe to send to the browser during the exam. */
export type ClientQuestion = Omit<
  Question,
  "correctIndex" | "explanation" | "blankAnswers"
> & {
  /** true = fill-in-the-blank (typed answer); the accepted answers stay server-side */
  blank?: boolean;
};
