interface Props {
  index: number;
  text: string;
  selectedIndex: number | null;
  correctIndex: number;
  onSelect: (index: number) => void;
}

const LABELS = ["A", "B", "C", "D"];

export function ChoiceButton({
  index,
  text,
  selectedIndex,
  correctIndex,
  onSelect,
}: Props) {
  const answered = selectedIndex !== null;
  const isThis = selectedIndex === index;
  const isCorrect = index === correctIndex;

  let className = "choice-btn";
  if (answered) {
    if (isCorrect) className += " correct";
    else if (isThis) className += " incorrect";
    else className += " dimmed";
  }

  return (
    <button
      className={className}
      disabled={answered}
      onClick={() => onSelect(index)}
      type="button"
    >
      <strong>{LABELS[index]}.</strong> {text}
    </button>
  );
}
