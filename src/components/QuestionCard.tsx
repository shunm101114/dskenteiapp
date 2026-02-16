import type { Question } from "../types";
import { ChoiceButton } from "./ChoiceButton";
import { ExplanationPanel } from "./ExplanationPanel";

interface Props {
  question: Question;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onAnswer: (index: number) => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  showExplanation,
  onAnswer,
}: Props) {
  return (
    <div className="card">
      <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 8 }}>
        {question.category}
      </p>
      <p style={{ fontWeight: 600, marginBottom: 20, lineHeight: 1.8 }}>
        {question.question}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.choices.map((choice, i) => (
          <ChoiceButton
            key={i}
            index={i}
            text={choice}
            selectedIndex={selectedAnswer}
            correctIndex={question.correctIndex}
            onSelect={onAnswer}
          />
        ))}
      </div>
      <ExplanationPanel
        explanation={question.explanation}
        open={showExplanation}
      />
    </div>
  );
}
