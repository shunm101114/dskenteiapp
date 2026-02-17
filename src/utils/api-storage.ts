const API_BASE = "/api/user-data";

/** Fetch all persisted data for a user from the server */
export async function fetchAllUserData(
  userId: string
): Promise<Record<string, unknown>> {
  const res = await fetch(
    `${API_BASE}?userId=${encodeURIComponent(userId)}`
  );
  if (!res.ok) return {};
  return res.json() as Promise<Record<string, unknown>>;
}

/** Fire-and-forget: persist a key to the server */
export function syncToServer(
  userId: string,
  key: string,
  value: unknown
): void {
  fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, key, value }),
  }).catch(() => {
    /* silent – localStorage is the fallback */
  });
}

/** Fire-and-forget: remove a key from the server */
export function removeFromServer(userId: string, key: string): void {
  fetch(API_BASE, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, key }),
  }).catch(() => {
    /* silent */
  });
}
