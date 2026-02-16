import type { QuizResult } from "../types";

interface Props {
  result: QuizResult;
}

export function QuizSummaryCard({ result }: Props) {
  const rate = Math.round((result.correctCount / result.totalQuestions) * 100);
  const dateStr = new Date(result.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="summary-card">
      <div className="summary-card-left">
        <span className="summary-card-date">{dateStr}</span>
        <span className="summary-card-cats">
          {result.categories.join("・")}
        </span>
        <span style={{ fontSize: "0.85rem" }}>
          {result.correctCount} / {result.totalQuestions} 問正解
        </span>
      </div>
      <div className="summary-card-score">{rate}%</div>
    </div>
  );
}
