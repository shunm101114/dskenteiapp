import type { Question, Category } from "../types";
import { questions } from "./questions";
import { newMathMlQuestions } from "./questions-new-math-ml";
import { newDeBizQuestions } from "./questions-new-de-biz";
import { questionsMathAdvanced } from "./questions-math-advanced";
import { questionsMlAdvanced } from "./questions-ml-advanced";
import { questionsDeAdvanced } from "./questions-de-advanced";
import { questionsBizAdvanced } from "./questions-biz-advanced";

export const allQuestions: Question[] = [
  ...questions,
  ...newMathMlQuestions,
  ...newDeBizQuestions,
  ...questionsMathAdvanced,
  ...questionsMlAdvanced,
  ...questionsDeAdvanced,
  ...questionsBizAdvanced,
];

/** Category prefix for question numbering */
const CATEGORY_PREFIX: Record<Category, string> = {
  "データサイエンス力": "S",
  "データエンジニアリング力": "E",
  "ビジネス力": "B",
};

/** Map from question id to display number (e.g. "S-1", "E-3", "B-12") */
export const questionNumberMap: Map<string, string> = (() => {
  const map = new Map<string, string>();
  const counters: Record<string, number> = { S: 0, E: 0, B: 0 };
  for (const q of allQuestions) {
    const prefix = CATEGORY_PREFIX[q.category];
    counters[prefix] += 1;
    map.set(q.id, `${prefix}-${counters[prefix]}`);
  }
  return map;
})();

/** Questions grouped by category (preserves original order) */
export const questionsByCategory: Record<Category, Question[]> = (() => {
  const grouped: Record<string, Question[]> = {
    "データサイエンス力": [],
    "データエンジニアリング力": [],
    "ビジネス力": [],
  };
  for (const q of allQuestions) {
    grouped[q.category].push(q);
  }
  return grouped as Record<Category, Question[]>;
})();
