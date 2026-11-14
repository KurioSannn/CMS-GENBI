import type { NextApiRequest } from 'next';

/**
 * Rate limiter sederhana berbasis memori proses (fixed window) untuk melindungi endpoint login
 * dari tebak-password berulang.
 *
 * Catatan:
 * - Cocok untuk deployment satu proses (VPS + `next start`/PM2 satu instance).
 * - Pada serverless (mis. Vercel) memori tiap instance terpisah sehingga limit bersifat best-effort.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitStatus {
  blocked: boolean;
  retryAfterSeconds: number;
}

const buckets = new Map<string, Bucket>();
const SWEEP_THRESHOLD = 1000;

function sweepExpired(now: number) {
  if (buckets.size < SWEEP_THRESHOLD) return;
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) buckets.delete(key);
  });
}

export function getRateLimitStatus(key: string, maxFailures: number, now = Date.now()): RateLimitStatus {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    return { blocked: false, retryAfterSeconds: 0 };
  }
  if (bucket.count >= maxFailures) {
    return { blocked: true, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }
  return { blocked: false, retryAfterSeconds: 0 };
}

export function recordFailure(key: string, windowMs: number, now = Date.now()) {
  sweepExpired(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  bucket.count += 1;
}

export function resetFailures(key: string) {
  buckets.delete(key);
}

/**
 * IP klien. Header `x-forwarded-for` HANYA dipercaya jika TRUST_PROXY=true
 * (aplikasi berjalan di belakang reverse proxy seperti Nginx), agar tidak bisa dipalsukan
 * oleh klien saat aplikasi diakses langsung.
 */
export function getClientIp(req: NextApiRequest): string {
  if (process.env.TRUST_PROXY === 'true') {
    const forwarded = req.headers['x-forwarded-for'];
    const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim();
    if (first) return first;
  }
  return req.socket?.remoteAddress || 'unknown';
}
