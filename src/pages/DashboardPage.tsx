import { useNavigate } from "react-router";
import { useQuizSession } from "../hooks/useQuizSession";
import { useProgress } from "../hooks/useProgress";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { allQuestions } from "../data/all-questions";
import { allStudyTopics } from "../data/all-study-topics";

const navItems = [
  {
    label: "問題集",
    description: "ランダム出題で実力チェック",
    path: "/quiz-home",
    color: "#2563eb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    label: "学習",
    description: "トピック別に知識を深める",
    path: "/study",
    color: "#7c3aed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: "成績",
    description: "スコア推移と正答率を確認",
    path: "/progress",
    color: "#0891b2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: "復習",
    description: "間違えた問題を重点復習",
    path: "/review",
    color: "#dc2626",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { results } = useQuizSession();
  const { answeredQuestionIds } = useProgress(results);
  const [readTopics] = useLocalStorage<string[]>("readTopics", []);

  const totalQuestions = allQuestions.length;
  const answeredCount = answeredQuestionIds.size;
  const quizPercent = totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  const totalTopics = allStudyTopics.length;
  const readCount = readTopics.length;
  const studyPercent = totalTopics === 0 ? 0 : Math.round((readCount / totalTopics) * 100);

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-bg">
          {/* Decorative grid dots */}
          <div className="dashboard-grid-pattern" />
          {/* Decorative floating nodes */}
          <div className="dashboard-node dashboard-node-1" />
          <div className="dashboard-node dashboard-node-2" />
          <div className="dashboard-node dashboard-node-3" />
          <div className="dashboard-node dashboard-node-4" />
          <div className="dashboard-node dashboard-node-5" />
        </div>
        <div className="dashboard-hero-content">
          <h2 className="dashboard-hero-title">
            DS検定 リテラシーレベル
            <br />
            学習アプリ
          </h2>
          <p className="dashboard-hero-subtitle">
            データサイエンティスト検定 リテラシーレベルの合格を目指す学習支援アプリです。
            問題演習・トピック学習・成績分析・復習の4つの機能で効率的に学習を進めましょう。
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      {(answeredCount > 0 || readCount > 0) && (
        <div className="dashboard-progress">
          <div className="dashboard-progress-item">
            <div className="dashboard-progress-ring" style={{ "--progress": `${quizPercent * 3.6}deg` } as React.CSSProperties}>
              <span className="dashboard-progress-value">{quizPercent}%</span>
            </div>
            <span className="dashboard-progress-label">問題 {answeredCount}/{totalQuestions}</span>
          </div>
          <div className="dashboard-progress-item">
            <div className="dashboard-progress-ring" style={{ "--progress": `${studyPercent * 3.6}deg`, "--ring-color": "var(--color-success)" } as React.CSSProperties}>
              <span className="dashboard-progress-value">{studyPercent}%</span>
            </div>
            <span className="dashboard-progress-label">学習 {readCount}/{totalTopics}</span>
          </div>
        </div>
      )}

      {/* Navigation Cards */}
      <div className="dashboard-nav-grid">
        {navItems.map((item) => (
          <button
            key={item.path}
            className="dashboard-nav-card"
            onClick={() => navigate(item.path)}
            type="button"
            style={{ "--card-accent": item.color } as React.CSSProperties}
          >
            <div className="dashboard-nav-icon">
              {item.icon}
            </div>
            <div className="dashboard-nav-label">{item.label}</div>
            <div className="dashboard-nav-desc">{item.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
