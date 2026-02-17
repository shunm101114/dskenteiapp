import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KNOWN_KEYS = ["session", "results", "readTopics"];

function buildKey(userId: string, key: string): string {
  return `user:${userId}:${key}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // GET - fetch all user data
  if (req.method === "GET") {
    const userId = req.query.userId;
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "userId required" });
    }

    const keys = KNOWN_KEYS.map((k) => buildKey(userId, k));
    const values = await redis.mget<unknown[]>(...keys);

    const data: Record<string, unknown> = {};
    KNOWN_KEYS.forEach((k, i) => {
      if (values[i] != null) data[k] = values[i];
    });

    return res.json(data);
  }

  // POST - save a single key
  if (req.method === "POST") {
    const { userId, key, value } = req.body;
    if (!userId || !key) {
      return res.status(400).json({ error: "userId and key required" });
    }

    await redis.set(buildKey(userId, key), JSON.stringify(value));
    return res.json({ ok: true });
  }

  // DELETE - remove a single key
  if (req.method === "DELETE") {
    const { userId, key } = req.body;
    if (!userId || !key) {
      return res.status(400).json({ error: "userId and key required" });
    }

    await redis.del(buildKey(userId, key));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
