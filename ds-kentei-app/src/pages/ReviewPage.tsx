import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuizSession } from "../hooks/useQuizSession";
import { useProgress } from "../hooks/useProgress";
import { QuestionCard } from "../components/QuestionCard";
import { ProgressBar } from "../components/ProgressBar";

export function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    session,
    currentQuestion,
    progress,
    selectedAnswer,
    showExplanation,
    results,
    startReview,
    submitAnswer,
    nextQuestion,
  } = useQuizSession();
  const { wrongQuestionIds } = useProgress(results);

  const stateIds = (location.state as { questionIds?: string[] })?.questionIds;
  const ids = stateIds ?? wrongQuestionIds;

  useEffect(() => {
    if (!session && ids.length > 0) {
      startReview(ids);
    }
  }, []);

  if (!session || !currentQuestion || !progress) {
    if (ids.length === 0) {
      return (
        <div className="empty-state">
          <p>復習する問題はありません</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
            type="button"
            style={{ marginTop: 16 }}
          >
            トップに戻る
          </button>
        </div>
      );
    }
    return null;
  }

  const handleNext = () => {
    const result = nextQuestion();
    if (result) {
      navigate("/result", { state: { resultId: result.id } });
    }
  };

  return (
    <>
      <h2 className="section-title">復習モード</h2>
      <ProgressBar current={progress.current} total={progress.total} />
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showExplanation={showExplanation}
        onAnswer={submitAnswer}
      />
      {showExplanation && (
        <button
          className="btn btn-primary btn-block"
          onClick={handleNext}
          type="button"
          style={{ marginTop: 8 }}
        >
          {progress.current < progress.total ? "次の問題へ" : "結果を見る"}
        </button>
      )}
    </>
  );
}
