// Request limits kept in server memory.
type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();
const MAX_TRACKED_KEYS = 10_000;

const pruneExpired = (now: number) => {
  windows.forEach((window, key) => {
    if (window.resetAt <= now) windows.delete(key);
  });
};

// True when 'key' has been seen more than 'limit' times within 'windowMs'
export const isRateLimited = (key: string, limit: number, windowMs: number) => {
  const now = Date.now();
  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    if (windows.size >= MAX_TRACKED_KEYS) pruneExpired(now);
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count++;
  return current.count > limit;
};

// The visitor's IP.
export const clientIp = (forwardedFor: string | null | undefined) =>
  forwardedFor?.split(',')[0]?.trim() || 'unknown';

export const TOO_MANY_REQUESTS = 'For mange forsøk. Prøv igjen senere.';
