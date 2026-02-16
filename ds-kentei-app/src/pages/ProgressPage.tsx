import { useNavigate } from "react-router";
import { useQuizSession } from "../hooks/useQuizSession";
import { useProgress } from "../hooks/useProgress";
import { allQuestions } from "../data/all-questions";
import { ScoreChart } from "../components/ScoreChart";
import { QuizSummaryCard } from "../components/QuizSummaryCard";

export function ProgressPage() {
  const { results } = useQuizSession();
  const { categoryStats, overallStats, scoreHistory, wrongQuestionIds, answeredQuestionIds } =
    useProgress(results);
  const totalQuestionCount = allQuestions.length;
  const navigate = useNavigate();

  if (results.length === 0) {
    return (
      <div className="empty-state">
        <p>まだ成績データがありません</p>
        <p style={{ fontSize: "0.85rem", marginTop: 8 }}>
          クイズを解くと成績がここに表示されます
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
          type="button"
          style={{ marginTop: 16 }}
        >
          クイズを始める
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Overall */}
      <div className="card">
        <h2 className="section-title">総合成績</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 12,
            textAlign: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-primary)" }}>
              {overallStats.overallRate}%
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              正答率
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>
              {overallStats.totalSessions}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              実施回数
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>
              {overallStats.totalQuestions}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              総回答数
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>
              {answeredQuestionIds.size}/{totalQuestionCount}問
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              回答カバー率
            </div>
          </div>
        </div>
      </div>

      {/* Score trend */}
      <div className="card">
        <h3 className="section-title">スコア推移</h3>
        <ScoreChart data={scoreHistory} />
      </div>

      {/* Category stats */}
      <div className="card">
        <h3 className="section-title">分野別正答率</h3>
        {categoryStats.map((cs) => {
          const color =
            cs.rate >= 80
              ? "var(--color-success)"
              : cs.rate >= 50
                ? "var(--color-warning)"
                : "var(--color-danger)";
          return (
            <div key={cs.category} className="category-rate">
              <div className="category-rate-header">
                <span>{cs.category}</span>
                <span>
                  {cs.total > 0
                    ? `${cs.correct}/${cs.total} (${cs.rate}%)`
                    : "未回答"}
                </span>
              </div>
              <div className="category-rate-track">
                <div
                  className="category-rate-fill"
                  style={{ width: `${cs.rate}%`, background: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Review button */}
      {wrongQuestionIds.length > 0 && (
        <button
          className="btn btn-outline btn-block"
          onClick={() => navigate("/review")}
          type="button"
          style={{ marginBottom: 16 }}
        >
          間違えた問題を復習する（{wrongQuestionIds.length}問）
        </button>
      )}

      {/* Past sessions */}
      <h3 className="section-title">過去のクイズ</h3>
      {[...results].reverse().map((r) => (
        <QuizSummaryCard key={r.id} result={r} />
      ))}
    </>
  );
}
