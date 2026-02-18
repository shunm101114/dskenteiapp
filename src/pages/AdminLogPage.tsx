import { useState, useEffect, useMemo } from "react";

interface Session {
  sessionId: string;
  userId: string;
  startTime: number;
  lastActive: number;
  durationMin: number;
  userAgent: string;
}

type DaysFilter = 7 | 30 | 0;

function parseDevice(ua: string): string {
  if (/Mobile|Android|iPhone/i.test(ua)) return "Mobile";
  if (/Tablet|iPad/i.test(ua)) return "Tablet";
  return "Desktop";
}

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminLogPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<DaysFilter>(7);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/access-log?days=${days}`)
      .then((r) => r.json())
      .then((data) => setSessions(data.sessions ?? []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, [days]);

  // Per-user summary
  const userSummary = useMemo(() => {
    const map = new Map<string, { count: number; totalMin: number }>();
    for (const s of sessions) {
      const entry = map.get(s.userId) ?? { count: 0, totalMin: 0 };
      entry.count += 1;
      entry.totalMin += s.durationMin;
      map.set(s.userId, entry);
    }
    return [...map.entries()]
      .map(([userId, v]) => ({ userId, ...v }))
      .sort((a, b) => b.count - a.count);
  }, [sessions]);

  const filterButtons: { label: string; value: DaysFilter }[] = [
    { label: "7日", value: 7 },
    { label: "30日", value: 30 },
    { label: "全件", value: 0 },
  ];

  return (
    <>
      <div className="card">
        <h2 className="section-title">アクセスログ</h2>

        {/* Filter buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {filterButtons.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`btn ${days === f.value ? "btn-primary" : "btn-outline"}`}
              onClick={() => setDays(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "var(--color-text-secondary)" }}>読み込み中...</p>
        ) : sessions.length === 0 ? (
          <p style={{ color: "var(--color-text-secondary)" }}>ログがありません</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid var(--color-border)",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "8px 6px" }}>ユーザーID</th>
                  <th style={{ padding: "8px 6px" }}>アクセス日時</th>
                  <th style={{ padding: "8px 6px" }}>利用時間(分)</th>
                  <th style={{ padding: "8px 6px" }}>デバイス</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr
                    key={s.sessionId}
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                  >
                    <td style={{ padding: "8px 6px" }}>{s.userId}</td>
                    <td style={{ padding: "8px 6px" }}>{fmtDate(s.startTime)}</td>
                    <td style={{ padding: "8px 6px" }}>{s.durationMin}</td>
                    <td style={{ padding: "8px 6px" }}>{parseDevice(s.userAgent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User summary */}
      {userSummary.length > 0 && (
        <div className="card">
          <h3 className="section-title">ユーザー別サマリ</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid var(--color-border)",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "8px 6px" }}>ユーザーID</th>
                  <th style={{ padding: "8px 6px" }}>アクセス回数</th>
                  <th style={{ padding: "8px 6px" }}>合計利用時間(分)</th>
                </tr>
              </thead>
              <tbody>
                {userSummary.map((u) => (
                  <tr
                    key={u.userId}
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                  >
                    <td style={{ padding: "8px 6px" }}>{u.userId}</td>
                    <td style={{ padding: "8px 6px" }}>{u.count}</td>
                    <td style={{ padding: "8px 6px" }}>{u.totalMin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
