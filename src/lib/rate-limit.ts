/**
 * Rate limiter in-memory simple par clé (typiquement IP).
 *
 * Limitations :
 * - Sur Vercel serverless, chaque instance a sa propre mémoire — un attaquant
 *   distribué peut donc multiplier les requêtes en frappant plusieurs cold-starts.
 * - Acceptable pour un formulaire à faible trafic protégé en plus par un honeypot.
 * - Pour passer à l'échelle : migrer vers @upstash/ratelimit (Redis serverless).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitOptions {
  /** Nombre maximum de requêtes autorisées dans la fenêtre. */
  limit: number;
  /** Durée de la fenêtre en millisecondes. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Vérifie et incrémente le compteur pour une clé donnée.
 * Renvoie `allowed: false` quand la limite est atteinte.
 */
export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  // Nouvelle fenêtre
  if (!existing || existing.resetAt < now) {
    const resetAt = now + opts.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: opts.limit - 1, resetAt };
  }

  // Fenêtre courante : incrémenter
  existing.count += 1;
  const allowed = existing.count <= opts.limit;
  return {
    allowed,
    remaining: Math.max(0, opts.limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/**
 * Extrait l'IP du client à partir des headers Vercel/Cloudflare.
 * Fallback sur 'unknown' si aucun header IP n'est présent.
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    'unknown'
  );
}
