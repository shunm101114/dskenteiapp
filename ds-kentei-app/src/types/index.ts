export type Category = "データサイエンス力" | "データエンジニアリング力" | "ビジネス力";

export const CATEGORIES: Category[] = [
  "データサイエンス力",
  "データエンジニアリング力",
  "ビジネス力",
];

export interface Question {
  id: string;
  category: Category;
  question: string;
  choices: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface QuizResult {
  id: string;
  date: string;
  categories: Category[];
  totalQuestions: number;
  correctCount: number;
  answers: AnswerRecord[];
  scoreByCategory: Record<string, { correct: number; total: number }>;
}

export interface QuizSession {
  questions: Question[];
  currentIndex: number;
  answers: AnswerRecord[];
  categories: Category[];
  startedAt: string;
}

export interface StudyTopic {
  id: string;
  category: Category;
  title: string;
  points: string[];
  formula?: string;
  detail: string;
  relatedQuestionIds: string[];
}
