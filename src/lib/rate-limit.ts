/**
 * A small fixed-window rate limiter held in process memory.
 *
 * HONEST LIMITATION, stated up front: on a serverless platform each instance
 * keeps its own counters, so the effective limit is per-instance rather than
 * global, and everything resets on a cold start. That makes this a speed bump
 * against casual abuse, not a defence against a distributed attacker.
 *
 * It is the right amount of machinery for a contact form on a marketing site.
 * If this ever guards something that matters, replace the Map with Upstash,
 * Vercel KV or a Durable Object — the call signature is designed not to change.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Keep the Map from growing without bound on a long-lived server. */
const MAX_TRACKED_KEYS = 10_000;

function sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_KEYS) sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/**
 * Best-effort client identifier.
 *
 * `x-forwarded-for` is trivially spoofable unless a trusted proxy sets it, so
 * this is a heuristic for bucketing, never for authorisation. Only the
 * left-most entry is used, and it is truncated so a long header cannot be used
 * to bloat the Map.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  const candidate = forwarded?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
  return candidate.slice(0, 64);
}
