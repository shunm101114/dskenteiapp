import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const [id, setId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim()) {
      login(id);
    }
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "var(--color-bg)",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: 400 }}>
        <h1
          style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          DS検定 学習アプリ
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            color: "var(--color-text-secondary)",
            marginBottom: 24,
          }}
        >
          ユーザーIDを入力してログイン
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ユーザーID"
            autoFocus
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "1rem",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              marginBottom: 16,
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={!id.trim()}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
