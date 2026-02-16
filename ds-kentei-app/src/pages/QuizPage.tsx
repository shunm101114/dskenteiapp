import { useNavigate } from "react-router";
import { useQuizSession } from "../hooks/useQuizSession";
import { QuestionCard } from "../components/QuestionCard";
import { ProgressBar } from "../components/ProgressBar";

export function QuizPage() {
  const {
    session,
    currentQuestion,
    progress,
    selectedAnswer,
    showExplanation,
    submitAnswer,
    nextQuestion,
  } = useQuizSession();
  const navigate = useNavigate();

  if (!session || !currentQuestion || !progress) {
    navigate("/", { replace: true });
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
