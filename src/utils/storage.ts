function buildKey(userId: string, key: string): string {
  return `ds-kentei-${userId}-${key}`;
}

export function getItem<T>(userId: string, key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(buildKey(userId, key));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem<T>(userId: string, key: string, value: T): void {
  localStorage.setItem(buildKey(userId, key), JSON.stringify(value));
}

export function removeItem(userId: string, key: string): void {
  localStorage.removeItem(buildKey(userId, key));
}
