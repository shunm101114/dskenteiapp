import { useLocation, useNavigate } from "react-router";
import { useQuizSession } from "../hooks/useQuizSession";

export function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = useQuizSession();

  const resultId = (location.state as { resultId?: string })?.resultId;
  const result = results.find((r) => r.id === resultId) ?? results[results.length - 1];

  if (!result) {
    navigate("/", { replace: true });
    return null;
  }

  const rate = Math.round((result.correctCount / result.totalQuestions) * 100);
  const wrongIds = result.answers.filter((a) => !a.isCorrect).map((a) => a.questionId);
  const categoryEntries = Object.entries(result.scoreByCategory);

  return (
    <>
      <div className="card">
        <div className="result-score">
          <div className="result-score-number">{rate}%</div>
          <div className="result-score-label">
            {result.correctCount} / {result.totalQuestions} 問正解
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: 16 }}>
          分野別スコア
        </h3>
        {categoryEntries.map(([cat, score]) => {
          const catRate = score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100);
          const color =
            catRate >= 80
              ? "var(--color-success)"
              : catRate >= 50
                ? "var(--color-warning)"
                : "var(--color-danger)";
          return (
            <div key={cat} className="category-rate">
              <div className="category-rate-header">
                <span>{cat}</span>
                <span>
                  {score.correct}/{score.total} ({catRate}%)
                </span>
              </div>
              <div className="category-rate-track">
                <div
                  className="category-rate-fill"
                  style={{ width: `${catRate}%`, background: color }}
                />
              </div>
            </div>
          );
        })}

        <div className="result-actions">
          {wrongIds.length > 0 && (
            <button
              className="btn btn-outline btn-block"
              onClick={() => navigate("/review", { state: { questionIds: wrongIds } })}
              type="button"
            >
              間違えた問題を復習する（{wrongIds.length}問）
            </button>
          )}
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate("/")}
            type="button"
          >
            トップに戻る
          </button>
        </div>
      </div>
    </>
  );
}
