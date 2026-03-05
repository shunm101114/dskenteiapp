/** SVG-based diagrams for study topics, keyed by topic ID */
import type { ReactNode } from "react";
import { mathStatsDiagrams } from "./diagrams/MathStatsDiagrams";
import { mlAlgorithmDiagrams } from "./diagrams/MlAlgorithmDiagrams";
import { deepLearningDiagrams } from "./diagrams/DeepLearningDiagrams";
import { deDiagrams } from "./diagrams/DeDiagrams";
import { bizDiagrams } from "./diagrams/BizDiagrams";

const diagramMap: Record<string, () => ReactNode> = {
  ...mathStatsDiagrams,
  ...mlAlgorithmDiagrams,
  ...deepLearningDiagrams,
  ...deDiagrams,
  ...bizDiagrams,
};

export function TopicDiagram({ topicId }: { topicId: string }) {
  const DiagramComponent = diagramMap[topicId];
  if (!DiagramComponent) return null;
  return (
    <div className="topic-diagram-wrapper">
      <DiagramComponent />
    </div>
  );
}
