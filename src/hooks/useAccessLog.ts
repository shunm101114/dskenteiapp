import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

const HEARTBEAT_INTERVAL = 30_000; // 30 seconds

export function useAccessLog() {
  const { userId } = useAuth();
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const sessionId = crypto.randomUUID();
    sessionIdRef.current = sessionId;

    // Send start event
    fetch("/api/access-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "start",
        sessionId,
        userId,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});

    // Heartbeat — only when tab is visible
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetch("/api/access-log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "heartbeat", sessionId }),
        }).catch(() => {});
      }
    }, HEARTBEAT_INTERVAL);

    // End session via sendBeacon
    const sendEnd = () => {
      if (!sessionIdRef.current) return;
      const payload = JSON.stringify({
        action: "end",
        sessionId: sessionIdRef.current,
      });
      navigator.sendBeacon(
        "/api/access-log",
        new Blob([payload], { type: "application/json" })
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendEnd();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", sendEnd);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", sendEnd);
      sendEnd();
      sessionIdRef.current = null;
    };
  }, [userId]);
}
