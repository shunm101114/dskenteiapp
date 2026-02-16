import type { Question } from "../types";
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
