import type { Question } from "../types";

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 選択肢の並び順をシャッフルし、correctIndex を追従させる */
export function shuffleChoices(question: Question): Question {
  const indices = [0, 1, 2, 3];
  const shuffled = shuffle(indices);
  return {
    ...question,
    choices: shuffled.map((i) => question.choices[i]) as [string, string, string, string],
    correctIndex: shuffled.indexOf(question.correctIndex),
  };
}
