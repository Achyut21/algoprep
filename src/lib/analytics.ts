import { quizzes } from "@/content/quizzes";
import type { Question, Topic } from "@/content/quizzes/types";
import type { Attempt, AttemptAnswer } from "@/db/schema";

export function pctOf(part: number, whole: number) {
  return whole === 0 ? 0 : Math.round((part / whole) * 100);
}

export function questionLookup(): Map<string, Question> {
  return new Map(
    quizzes.flatMap((quiz) => quiz.questions.map((q) => [q.id, q]))
  );
}

export type RunSummary = {
  runs: number;
  total: number;
  scores: number[];
  best: number;
  avg: number;
  latest: number;
  delta: number | null;
};

/** Stats for one set of attempts (usually one player × one quiz). */
export function summarizeRuns(attempts: Attempt[]): RunSummary | null {
  if (attempts.length === 0) return null;
  const sorted = [...attempts].sort(
    (a, b) => a.finishedAt.getTime() - b.finishedAt.getTime()
  );
  const scores = sorted.map((a) => a.score);
  const latest = scores[scores.length - 1];
  const previous = scores.length > 1 ? scores[scores.length - 2] : null;
  return {
    runs: sorted.length,
    total: sorted[0].total,
    scores,
    best: Math.max(...scores),
    avg: Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length),
    latest,
    delta: previous === null ? null : latest - previous,
  };
}

export type TopicStat = {
  topic: Topic;
  correct: number;
  total: number;
  pct: number;
};

export function topicAccuracy(
  answers: AttemptAnswer[],
  questionById: Map<string, Question>
): TopicStat[] {
  const byTopic = new Map<Topic, { correct: number; total: number }>();
  for (const question of questionById.values()) {
    byTopic.set(question.topic, byTopic.get(question.topic) ?? { correct: 0, total: 0 });
  }
  for (const row of answers) {
    const topic = questionById.get(row.questionId)?.topic;
    if (!topic) continue;
    const stat = byTopic.get(topic)!;
    stat.total += 1;
    if (row.isCorrect) stat.correct += 1;
  }
  return [...byTopic.entries()].map(([topic, stat]) => ({
    topic,
    ...stat,
    pct: pctOf(stat.correct, stat.total),
  }));
}

export type PlayerBadge = {
  id: string;
  label: string;
  emoji: string;
  earned: boolean;
  hint: string;
};

export function computeBadges(attempts: Attempt[]): PlayerBadge[] {
  const pcts = attempts.map((a) => pctOf(a.score, a.total));
  const best = pcts.length ? Math.max(...pcts) : 0;
  const days = new Set(attempts.map((a) => a.finishedAt.toDateString())).size;

  const improved = [...new Set(attempts.map((a) => a.quizSlug))].some(
    (slug) => {
      const runs = attempts
        .filter((a) => a.quizSlug === slug)
        .sort((a, b) => a.finishedAt.getTime() - b.finishedAt.getTime());
      return runs.some((run, i) => i > 0 && run.score > runs[i - 1].score);
    }
  );

  return [
    { id: "first", label: "first steps", emoji: "🐣", earned: attempts.length >= 1, hint: "finish your first quiz" },
    { id: "regular", label: "regular", emoji: "🔁", earned: attempts.length >= 3, hint: "finish 3 quiz runs" },
    { id: "grinder", label: "grinder", emoji: "🔥", earned: days >= 3, hint: "practice on 3 different days" },
    { id: "climber", label: "climber", emoji: "📈", earned: improved, hint: "beat your previous score" },
    { id: "halfway", label: "halfway there", emoji: "🌗", earned: best >= 50, hint: "score 50% or more" },
    { id: "ninety", label: "90% club", emoji: "🏅", earned: best >= 90, hint: "score 90% or more" },
    { id: "flawless", label: "flawless", emoji: "💯", earned: best >= 100, hint: "get a perfect score" },
  ];
}

export type QuestionStat = {
  question: Question;
  total: number;
  misses: number;
  missPct: number;
  skips: number;
  topWrong: { index: number; count: number } | null;
  topWrongText: { text: string; count: number } | null;
};

/** Per-question miss stats, hardest first. Works for one player or everyone. */
export function questionDifficulty(
  answers: AttemptAnswer[],
  questionById: Map<string, Question>
): QuestionStat[] {
  const byQuestion = new Map<string, AttemptAnswer[]>();
  for (const row of answers) {
    const rows = byQuestion.get(row.questionId) ?? [];
    rows.push(row);
    byQuestion.set(row.questionId, rows);
  }
  const stats: QuestionStat[] = [];
  for (const [questionId, rows] of byQuestion) {
    const question = questionById.get(questionId);
    if (!question) continue;
    const misses = rows.filter((r) => !r.isCorrect);
    const wrongPicks = new Map<number, number>();
    const wrongTexts = new Map<string, number>();
    for (const miss of misses) {
      if (miss.chosenIndex !== null) {
        wrongPicks.set(
          miss.chosenIndex,
          (wrongPicks.get(miss.chosenIndex) ?? 0) + 1
        );
      }
      if (miss.answerText) {
        const text = miss.answerText.trim().toLowerCase();
        wrongTexts.set(text, (wrongTexts.get(text) ?? 0) + 1);
      }
    }
    const topWrong = [...wrongPicks.entries()].sort((a, b) => b[1] - a[1])[0];
    const topWrongText = [...wrongTexts.entries()].sort(
      (a, b) => b[1] - a[1]
    )[0];
    stats.push({
      question,
      total: rows.length,
      misses: misses.length,
      missPct: pctOf(misses.length, rows.length),
      skips: misses.filter((r) => r.chosenIndex === null && !r.answerText)
        .length,
      topWrong: topWrong ? { index: topWrong[0], count: topWrong[1] } : null,
      topWrongText: topWrongText
        ? { text: topWrongText[0], count: topWrongText[1] }
        : null,
    });
  }
  return stats.sort((a, b) => b.missPct - a.missPct || b.total - a.total);
}
