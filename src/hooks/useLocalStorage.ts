import { useState, useCallback, useEffect, useRef } from "react";
import { getItem, setItem, removeItem } from "../utils/storage";
import { syncToServer, removeFromServer } from "../utils/api-storage";
import { useAuth } from "../contexts/AuthContext";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const { userId } = useAuth();
  const uid = userId!;
  const initialValueRef = useRef(initialValue);

  const [storedValue, setStoredValue] = useState<T>(() =>
    getItem(uid, key, initialValue)
  );

  // Re-read from storage when userId changes
  useEffect(() => {
    setStoredValue(getItem(uid, key, initialValueRef.current));
  }, [uid, key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        setItem(uid, key, next);
        syncToServer(uid, key, next);
        return next;
      });
    },
    [uid, key]
  );

  const remove = useCallback(() => {
    removeItem(uid, key);
    removeFromServer(uid, key);
    setStoredValue(initialValueRef.current);
  }, [uid, key]);

  return [storedValue, setValue, remove] as const;
}
