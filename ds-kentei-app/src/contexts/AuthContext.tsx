import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

const AUTH_KEY = "ds-kentei-current-user";

interface AuthContextValue {
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_KEY);
  });

  const login = useCallback((id: string) => {
    const trimmed = id.trim();
    if (!trimmed) return;
    localStorage.setItem(AUTH_KEY, trimmed);
    setUserId(trimmed);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
