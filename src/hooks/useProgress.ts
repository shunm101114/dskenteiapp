import { useMemo } from "react";
import type { QuizResult, Category } from "../types";
import { CATEGORIES } from "../types";

export interface CategoryStats {
  category: Category;
  correct: number;
  total: number;
  rate: number;
}

export function useProgress(results: QuizResult[]) {
  const categoryStats = useMemo<CategoryStats[]>(() => {
    return CATEGORIES.map((cat) => {
      let correct = 0;
      let total = 0;
      for (const r of results) {
        const s = r.scoreByCategory[cat];
        if (s) {
          correct += s.correct;
          total += s.total;
        }
      }
      return {
        category: cat,
        correct,
        total,
        rate: total === 0 ? 0 : Math.round((correct / total) * 100),
      };
    });
  }, [results]);

  const overallStats = useMemo(() => {
    const totalCorrect = results.reduce((s, r) => s + r.correctCount, 0);
    const totalQuestions = results.reduce((s, r) => s + r.totalQuestions, 0);
    return {
      totalSessions: results.length,
      totalCorrect,
      totalQuestions,
      overallRate:
        totalQuestions === 0
          ? 0
          : Math.round((totalCorrect / totalQuestions) * 100),
    };
  }, [results]);

  const scoreHistory = useMemo(() => {
    return results.map((r, i) => ({
      index: i + 1,
      date: new Date(r.date).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      }),
      score: Math.round((r.correctCount / r.totalQuestions) * 100),
    }));
  }, [results]);

  const answeredQuestionIds = useMemo(() => {
    const ids = new Set<string>();
    for (const r of results) {
      for (const a of r.answers) {
        ids.add(a.questionId);
      }
    }
    return ids;
  }, [results]);

  const wrongQuestionIds = useMemo(() => {
    const ids = new Set<string>();
    for (const r of results) {
      for (const a of r.answers) {
        if (!a.isCorrect) ids.add(a.questionId);
      }
    }
    // Remove those that were answered correctly in a later session
    for (const r of [...results].reverse()) {
      for (const a of r.answers) {
        if (a.isCorrect) ids.delete(a.questionId);
      }
    }
    return [...ids];
  }, [results]);

  return { categoryStats, overallStats, scoreHistory, wrongQuestionIds, answeredQuestionIds };
}
