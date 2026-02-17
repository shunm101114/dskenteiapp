import { useState } from "react";
import { useNavigate } from "react-router";
import type { Category } from "../types";
import { CATEGORIES } from "../types";
import { CategorySelector } from "../components/CategorySelector";
import { useQuizSession } from "../hooks/useQuizSession";
import { useProgress } from "../hooks/useProgress";
import { allQuestions, questionNumberMap, questionsByCategory } from "../data/all-questions";

type Mode = "random" | "list";

const QUESTION_COUNTS = [10, 20, 30, 40, 50] as const;

export function HomePage() {
  const [mode, setMode] = useState<Mode>("random");
  const [selected, setSelected] = useState<Category[]>([...CATEGORIES]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [listCategory, setListCategory] = useState<Category>("データサイエンス力");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { startQuiz, startQuizWithIds, session, results, removeSession } = useQuizSession();
  const { answeredQuestionIds } = useProgress(results);
  const navigate = useNavigate();

  // --- Random mode handlers ---
  const handleStartRandom = () => {
    if (selected.length === 0) return;
    startQuiz(selected, questionCount);
    navigate("/quiz");
  };

  const handleResume = () => {
    navigate("/quiz");
  };

  // --- List mode handlers ---
  const toggleQuestion = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleStartList = () => {
    if (selectedIds.size === 0) return;
    startQuizWithIds([...selectedIds]);
    navigate("/quiz");
  };

  const currentListQuestions = questionsByCategory[listCategory];

  const selectAllInCategory = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const q of currentListQuestions) next.add(q.id);
      return next;
    });
  };

  const deselectAllInCategory = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const q of currentListQuestions) next.delete(q.id);
      return next;
    });
  };

  const selectedInCategory = currentListQuestions.filter((q) =>
    selectedIds.has(q.id)
  ).length;
  const allSelectedInCategory = selectedInCategory === currentListQuestions.length;

  // Max questions available for random mode
  const availableCount = allQuestions.filter((q) =>
    selected.includes(q.category)
  ).length;

  return (
    <>
      <h2 className="section-title">問題集</h2>

      {/* Suspended session warning (quiz only, not review) */}
      {session && session.mode !== "review" && (
        <div className="card" style={{ borderLeft: "4px solid var(--color-warning)" }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>
            中断中のクイズがあります
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 12 }}>
            {session.currentIndex + 1} / {session.questions.length} 問目まで進行中
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" onClick={handleResume} type="button">
              再開する
            </button>
            <button className="btn btn-outline" onClick={removeSession} type="button">
              破棄する
            </button>
          </div>
        </div>
      )}

      {/* Mode Tabs */}
      <div className="quiz-mode-tabs">
        <button
          className={`quiz-mode-tab ${mode === "random" ? "active" : ""}`}
          onClick={() => setMode("random")}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
          ランダム出題
        </button>
        <button
          className={`quiz-mode-tab ${mode === "list" ? "active" : ""}`}
          onClick={() => setMode("list")}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          リストから選択
        </button>
      </div>

      {/* ====== Random Mode ====== */}
      {mode === "random" && (
        <div className="card">
          <p style={{ fontWeight: 600, marginBottom: 12 }}>出題スキル領域を選択</p>
          <CategorySelector selected={selected} onChange={setSelected} />

          <p style={{ fontWeight: 600, marginBottom: 12 }}>出題数を選択</p>
          <div className="question-count-selector">
            {QUESTION_COUNTS.map((count) => (
              <button
                key={count}
                className={`question-count-chip ${questionCount === count ? "selected" : ""}`}
                onClick={() => setQuestionCount(count)}
                disabled={availableCount < count}
                type="button"
              >
                {count}問
              </button>
            ))}
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 16 }}>
            選択したスキル領域からランダムに{questionCount}問出題されます
            {availableCount > 0 && (
              <span>（対象: {availableCount}問）</span>
            )}
          </p>

          <button
            className="btn btn-primary btn-block"
            disabled={selected.length === 0}
            onClick={handleStartRandom}
            type="button"
          >
            クイズを開始する
          </button>
        </div>
      )}

      {/* ====== List Mode ====== */}
      {mode === "list" && (
        <>
          {/* Category Tabs */}
          <div className="study-tabs" style={{ marginBottom: 12 }}>
            {CATEGORIES.map((cat) => {
              const catQuestions = questionsByCategory[cat];
              const answeredInCat = catQuestions.filter((q) =>
                answeredQuestionIds.has(q.id)
              ).length;
              return (
                <button
                  key={cat}
                  className={`study-tab ${listCategory === cat ? "active" : ""}`}
                  onClick={() => setListCategory(cat)}
                  type="button"
                >
                  {cat.replace("力", "")}
                  <span className="qlist-tab-count">
                    {answeredInCat}/{catQuestions.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bulk select & Start */}
          <div className="qlist-toolbar">
            <button
              className="qlist-toolbar-btn"
              onClick={allSelectedInCategory ? deselectAllInCategory : selectAllInCategory}
              type="button"
            >
              {allSelectedInCategory ? "全解除" : "全選択"}
            </button>
            <span className="qlist-toolbar-info">
              {selectedIds.size > 0
                ? `${selectedIds.size}問を選択中`
                : "問題を選択してください"}
            </span>
            <button
              className="btn btn-primary"
              style={{ padding: "8px 20px", minHeight: 40, fontSize: "0.85rem" }}
              disabled={selectedIds.size === 0}
              onClick={handleStartList}
              type="button"
            >
              開始
            </button>
          </div>

          {/* Question List */}
          <div className="qlist">
            {currentListQuestions.map((q) => {
              const num = questionNumberMap.get(q.id) ?? "";
              const answered = answeredQuestionIds.has(q.id);
              const checked = selectedIds.has(q.id);
              return (
                <button
                  key={q.id}
                  className={`qlist-item ${checked ? "checked" : ""}`}
                  onClick={() => toggleQuestion(q.id)}
                  type="button"
                >
                  <span
                    className={`qlist-item-checkbox ${checked ? "on" : ""}`}
                  />
                  <span className="qlist-item-num">{num}</span>
                  <span className="qlist-item-text">{q.question}</span>
                  {answered && (
                    <span className="qlist-item-answered" title="回答済み">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
