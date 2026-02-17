import { NavLink, Outlet } from "react-router";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const { userId, logout } = useAuth();

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <h1>
            <a href="/">DS検定 リテラシーレベル 学習アプリ</a>
          </h1>
          {userId && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: "0.8rem", opacity: 0.85 }}>
                {userId}
              </span>
              <button
                type="button"
                onClick={logout}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "inherit",
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                }}
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </header>
      <nav className="app-nav">
        <div className="app-nav-inner">
          <NavLink to="/" end>
            ホーム
          </NavLink>
          <NavLink to="/quiz-home">問題集</NavLink>
          <NavLink to="/study">学習</NavLink>
          <NavLink to="/progress">成績</NavLink>
          <NavLink to="/review">復習</NavLink>
        </div>
      </nav>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}
