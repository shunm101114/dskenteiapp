import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchAllUserData } from "../utils/api-storage";
import { setItem } from "../utils/storage";
import { useAccessLog } from "../hooks/useAccessLog";

/**
 * On mount (when logged in), fetches all user data from the server
 * and writes it into localStorage so that useLocalStorage hooks
 * read the latest persisted values.
 *
 * Shows a brief loading indicator until the sync finishes (or fails).
 */
export function SyncProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const [ready, setReady] = useState(false);

  useAccessLog();

  useEffect(() => {
    if (!userId) {
      setReady(true);
      return;
    }

    let cancelled = false;

    fetchAllUserData(userId)
      .then((data) => {
        if (cancelled) return;
        for (const [key, value] of Object.entries(data)) {
          setItem(userId, key, value);
        }
      })
      .catch(() => {
        /* server unreachable – continue with localStorage */
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!ready) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          color: "var(--color-text-secondary)",
          fontSize: "0.9rem",
        }}
      >
        データを同期中...
      </div>
    );
  }

  return <>{children}</>;
}
