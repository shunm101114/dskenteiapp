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
  mode?: "quiz" | "review";
}

export interface StudyTopic {
  id: string;
  category: Category;
  title: string;
  points: string[];
  formula?: string;
  detail: string;
  relatedQuestionIds: string[];
  subcategory?: string;
  level?: "literacy" | "advanced";
}

/** データサイエンス力のサブカテゴリ */
export const DS_SUBCATEGORIES = [
  "基礎統計",
  "確率・数理統計",
  "多変量解析・応用統計",
  "機械学習",
  "深層学習・ニューラルネットワーク",
  "自然言語処理・画像認識",
  "AI応用・最新技術",
] as const;

export type DsSubcategory = (typeof DS_SUBCATEGORIES)[number];

/** データエンジニアリング力のサブカテゴリ */
export const DE_SUBCATEGORIES = [
  "SQL・データベース",
  "プログラミング・開発ツール",
  "データ基盤・アーキテクチャ",
  "セキュリティ・ガバナンス",
  "クラウド・インフラ",
] as const;

export type DeSubcategory = (typeof DE_SUBCATEGORIES)[number];

/** ビジネス力のサブカテゴリ */
export const BIZ_SUBCATEGORIES = [
  "プロジェクト管理・分析手法",
  "データ倫理・法規制",
  "マーケティング・顧客分析",
  "組織・コミュニケーション",
  "ビジネスフレームワーク・戦略",
] as const;

export type BizSubcategory = (typeof BIZ_SUBCATEGORIES)[number];
