import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const SESSION_KEY = (id: string) => `access:session:${id}`;
const SESSIONS_ZSET = "access:sessions";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // POST — record session events
  if (req.method === "POST") {
    const { action, sessionId, userId, userAgent } = req.body;

    if (!sessionId || !action) {
      return res.status(400).json({ error: "sessionId and action required" });
    }

    const now = Date.now();

    if (action === "start") {
      if (!userId) {
        return res.status(400).json({ error: "userId required for start" });
      }
      await redis.hset(SESSION_KEY(sessionId), {
        userId,
        startTime: now,
        lastActive: now,
        userAgent: userAgent || "",
      });
      await redis.zadd(SESSIONS_ZSET, { score: now, member: sessionId });
      return res.json({ ok: true });
    }

    if (action === "heartbeat" || action === "end") {
      await redis.hset(SESSION_KEY(sessionId), { lastActive: now });
      return res.json({ ok: true });
    }

    return res.status(400).json({ error: "invalid action" });
  }

  // GET — fetch logs for admin page
  if (req.method === "GET") {
    const days = parseInt(String(req.query.days || "7"), 10);
    const minScore = days > 0 ? Date.now() - days * 86_400_000 : 0;

    const sessionIds: string[] = await redis.zrange(
      SESSIONS_ZSET,
      "+inf",
      minScore,
      { byScore: true, rev: true }
    );

    if (sessionIds.length === 0) {
      return res.json({ sessions: [] });
    }

    const pipeline = redis.pipeline();
    for (const id of sessionIds) {
      pipeline.hgetall(SESSION_KEY(id));
    }
    const results = await pipeline.exec();

    const sessions = results
      .map((data: Record<string, string> | null, i: number) => {
        if (!data || !data.startTime) return null;
        const startTime = Number(data.startTime);
        const lastActive = Number(data.lastActive);
        return {
          sessionId: sessionIds[i],
          userId: data.userId,
          startTime,
          lastActive,
          durationMin: Math.round((lastActive - startTime) / 60_000),
          userAgent: data.userAgent || "",
        };
      })
      .filter(Boolean);

    return res.json({ sessions });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
