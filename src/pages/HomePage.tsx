import { useState } from "react";
import { useNavigate } from "react-router";
import type { Category } from "../types";
import { CATEGORIES } from "../types";
import { CategorySelector } from "../components/CategorySelector";
import { useQuizSession } from "../hooks/useQuizSession";
import { useProgress } from "../hooks/useProgress";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { allQuestions } from "../data/all-questions";
import { allStudyTopics } from "../data/all-study-topics";

export function HomePage() {
  const [selected, setSelected] = useState<Category[]>([...CATEGORIES]);
  const { startQuiz, session, results } = useQuizSession();
  const { answeredQuestionIds } = useProgress(results);
  const [readTopics] = useLocalStorage<string[]>("readTopics", []);
  const navigate = useNavigate();

  const handleStart = () => {
    if (selected.length === 0) return;
    startQuiz(selected);
    navigate("/quiz");
  };

  const handleResume = () => {
    navigate("/quiz");
  };

  const totalQuestions = allQuestions.length;
  const answeredCount = answeredQuestionIds.size;
  const quizPercent = totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  const totalTopics = allStudyTopics.length;
  const readCount = readTopics.length;
  const studyPercent = totalTopics === 0 ? 0 : Math.round((readCount / totalTopics) * 100);

  return (
    <>
      <h2 className="section-title">DS検定 リテラシーレベル クイズ</h2>

      {/* Progress summary */}
      {(answeredCount > 0 || readCount > 0) && (
        <div className="card progress-summary-card">
          <div className="progress-summary-row">
            <span className="progress-summary-label">[問題]</span>
            <span className="progress-summary-text">
              {answeredCount}/{totalQuestions}問 回答済み
            </span>
            <div className="progress-summary-bar-track">
              <div
                className="progress-summary-bar-fill"
                style={{ width: `${quizPercent}%`, background: "var(--color-primary)" }}
              />
            </div>
            <span className="progress-summary-pct">{quizPercent}%</span>
          </div>
          <div className="progress-summary-row">
            <span className="progress-summary-label">[学習]</span>
            <span className="progress-summary-text">
              {readCount}/{totalTopics}項目 既読
            </span>
            <div className="progress-summary-bar-track">
              <div
                className="progress-summary-bar-fill"
                style={{ width: `${studyPercent}%`, background: "var(--color-success)" }}
              />
            </div>
            <span className="progress-summary-pct">{studyPercent}%</span>
          </div>
        </div>
      )}

      {session && (
        <div className="card" style={{ borderLeft: "4px solid var(--color-warning)" }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>
            中断中のクイズがあります
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 12 }}>
            {session.currentIndex + 1} / {session.questions.length} 問目まで進行中
          </p>
          <button className="btn btn-primary" onClick={handleResume} type="button">
            クイズを再開する
          </button>
        </div>
      )}

      <div className="card">
        <p style={{ fontWeight: 600, marginBottom: 12 }}>出題スキル領域を選択</p>
        <CategorySelector selected={selected} onChange={setSelected} />

        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 16 }}>
          選択したスキル領域からランダムに10問出題されます（リテラシーレベル）
        </p>

        <button
          className="btn btn-primary btn-block"
          disabled={selected.length === 0}
          onClick={handleStart}
          type="button"
        >
          クイズを開始する
        </button>
      </div>
    </>
  );
}
