import { useState, useCallback } from "react";
import type { Question, AnswerRecord, Category, QuizResult, QuizSession } from "../types";
import { shuffle } from "../utils/shuffle";
import { allQuestions } from "../data/all-questions";
import { useLocalStorage } from "./useLocalStorage";

export function useQuizSession() {
  const [session, setSession, removeSession] = useLocalStorage<QuizSession | null>("session", null);
  const [results, setResults] = useLocalStorage<QuizResult[]>("results", []);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = useCallback(
    (categories: Category[], questionCount?: number) => {
      const filtered = allQuestions.filter((q) =>
        categories.includes(q.category)
      );
      const shuffled = shuffle(filtered);
      const count = questionCount ?? Math.min(shuffled.length, 10);
      const selected = shuffled.slice(0, count);

      setSession({
        questions: selected,
        currentIndex: 0,
        answers: [],
        categories,
        startedAt: new Date().toISOString(),
        mode: "quiz",
      });
      setSelectedAnswer(null);
      setShowExplanation(false);
    },
    [setSession]
  );

  const startQuizWithIds = useCallback(
    (questionIds: string[]) => {
      const selected = questionIds
        .map((id) => allQuestions.find((q) => q.id === id))
        .filter((q): q is Question => q != null);
      if (selected.length === 0) return;

      const categories = [...new Set(selected.map((q) => q.category))];
      setSession({
        questions: selected,
        currentIndex: 0,
        answers: [],
        categories,
        startedAt: new Date().toISOString(),
        mode: "quiz",
      });
      setSelectedAnswer(null);
      setShowExplanation(false);
    },
    [setSession]
  );

  const startReview = useCallback(
    (questionIds: string[]) => {
      const filtered = allQuestions.filter((q) => questionIds.includes(q.id));
      const shuffled = shuffle(filtered);
      if (shuffled.length === 0) return;

      const categories = [...new Set(shuffled.map((q) => q.category))];
      setSession({
        questions: shuffled,
        currentIndex: 0,
        answers: [],
        categories,
        startedAt: new Date().toISOString(),
        mode: "review",
      });
      setSelectedAnswer(null);
      setShowExplanation(false);
    },
    [setSession]
  );

  const submitAnswer = useCallback(
    (index: number) => {
      if (!session || selectedAnswer !== null) return;
      const current = session.questions[session.currentIndex];
      setSelectedAnswer(index);
      setShowExplanation(true);

      const record: AnswerRecord = {
        questionId: current.id,
        selectedIndex: index,
        isCorrect: index === current.correctIndex,
      };

      setSession({
        ...session,
        answers: [...session.answers, record],
      });
    },
    [session, selectedAnswer, setSession]
  );

  const nextQuestion = useCallback(() => {
    if (!session) return null;
    const nextIndex = session.currentIndex + 1;

    if (nextIndex >= session.questions.length) {
      // Quiz finished — build result
      const answers = session.answers;
      const scoreByCategory: Record<string, { correct: number; total: number }> = {};
      for (const q of session.questions) {
        if (!scoreByCategory[q.category]) {
          scoreByCategory[q.category] = { correct: 0, total: 0 };
        }
        scoreByCategory[q.category].total += 1;
      }
      for (const a of answers) {
        const q = session.questions.find((qq) => qq.id === a.questionId)!;
        if (a.isCorrect) {
          scoreByCategory[q.category].correct += 1;
        }
      }

      const result: QuizResult = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        categories: session.categories,
        totalQuestions: session.questions.length,
        correctCount: answers.filter((a) => a.isCorrect).length,
        answers,
        scoreByCategory,
      };

      setResults((prev) => [...prev, result]);
      removeSession();
      setSelectedAnswer(null);
      setShowExplanation(false);
      return result;
    }

    setSession({ ...session, currentIndex: nextIndex });
    setSelectedAnswer(null);
    setShowExplanation(false);
    return null;
  }, [session, setSession, setResults, removeSession]);

  const currentQuestion: Question | null =
    session ? session.questions[session.currentIndex] : null;

  const progress = session
    ? { current: session.currentIndex + 1, total: session.questions.length }
    : null;

  return {
    session,
    currentQuestion,
    progress,
    selectedAnswer,
    showExplanation,
    results,
    startQuiz,
    startQuizWithIds,
    startReview,
    submitAnswer,
    nextQuestion,
    removeSession,
  };
}
