interface Props {
  explanation: string;
  open: boolean;
}

export function ExplanationPanel({ explanation, open }: Props) {
  return (
    <div className={`explanation-panel ${open ? "open" : ""}`}>
      <div className="explanation-inner">
        <strong>解説：</strong>
        {explanation}
      </div>
    </div>
  );
}
