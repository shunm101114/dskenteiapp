import { useState } from "react";
import { useNavigate } from "react-router";
import type { StudyTopic } from "../types";
import { TopicDiagram } from "./TopicDiagrams";

interface Props {
  topic: StudyTopic;
  isRead?: boolean;
  onToggleRead?: (id: string) => void;
}

export function TopicCard({ topic, isRead, onToggleRead }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuiz = () => {
    navigate("/review", { state: { questionIds: topic.relatedQuestionIds } });
  };

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleRead?.(topic.id);
  };

  return (
    <div className={`topic-card${isRead ? " topic-card-read" : ""}`}>
      <button
        className="topic-card-header"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="topic-card-header-left">
          {onToggleRead && (
            <span
              className={`topic-card-checkbox${isRead ? " checked" : ""}`}
              onClick={handleCheck}
              role="checkbox"
              aria-checked={isRead}
            >
              {isRead && "✓"}
            </span>
          )}
          <span>{topic.title}</span>
        </span>
        <span className={`topic-card-arrow ${open ? "open" : ""}`}>&#9662;</span>
      </button>
      <div className={`topic-card-body ${open ? "open" : ""}`}>
        <div className="topic-card-content">
          <TopicDiagram topicId={topic.id} />

          <ul className="topic-points">
            {topic.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {topic.formula && (
            <div className="topic-formula">{topic.formula}</div>
          )}

          <p className="topic-detail">{topic.detail}</p>

          {topic.relatedQuestionIds.length > 0 && (
            <button
              className="btn btn-outline"
              onClick={handleQuiz}
              type="button"
            >
              関連問題を解く ({topic.relatedQuestionIds.length}問)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
