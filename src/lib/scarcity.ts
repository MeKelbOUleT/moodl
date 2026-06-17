import {sanityClient} from '@/sanity/client';
import {programmesAllQuery} from '@/sanity/queries';

export interface ScarcitySnapshot {
  programmesCount: number;
  totalLots: number;
  availableLots: number;
  soldLots: number;
  /** ISO date, mostly the last successful build. */
  lastUpdated: string;
  /** True if values come from Sanity, false if the static fallback was used. */
  fromSanity: boolean;
}

const FALLBACK: ScarcitySnapshot = {
  programmesCount: 3,
  totalLots: 18,
  availableLots: 12,
  soldLots: 6,
  lastUpdated: new Date().toISOString(),
  fromSanity: false,
};

export async function getScarcitySnapshot(): Promise<ScarcitySnapshot> {
  try {
    const programmes = await sanityClient.fetch(programmesAllQuery);
    if (!programmes || programmes.length === 0) return FALLBACK;

    const totalLots = programmes.reduce(
      (sum: number, p: {lots_total?: number | null}) => sum + (p.lots_total ?? 0),
      0,
    );
    const availableLots = programmes.reduce(
      (sum: number, p: {lots_disponibles?: number | null}) => sum + (p.lots_disponibles ?? 0),
      0,
    );

    if (totalLots === 0) return FALLBACK;

    return {
      programmesCount: programmes.length,
      totalLots,
      availableLots,
      soldLots: Math.max(0, totalLots - availableLots),
      lastUpdated: new Date().toISOString(),
      fromSanity: true,
    };
  } catch (err) {
    console.error('[scarcity] Sanity fetch failed, using fallback', err);
    return FALLBACK;
  }
}

export function formatRelativeFromNow(iso: string): string {
  const then = new Date(iso).getTime();
  const diffSec = Math.max(0, (Date.now() - then) / 1000);
  if (diffSec < 60) return "à l'instant";
  if (diffSec < 3600) return `il y a ${Math.floor(diffSec / 60)} min`;
  if (diffSec < 86400) return `il y a ${Math.floor(diffSec / 3600)} h`;
  return `il y a ${Math.floor(diffSec / 86400)} j`;
}
