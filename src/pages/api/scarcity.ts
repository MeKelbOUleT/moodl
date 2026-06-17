import type {APIRoute} from 'astro';
import {getScarcitySnapshot} from '@/lib/scarcity';

export const prerender = false;

export const GET: APIRoute = async () => {
  const snapshot = await getScarcitySnapshot();
  return new Response(JSON.stringify(snapshot), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Edge cache: 5 minutes fresh, 1 hour stale-while-revalidate.
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
    },
  });
};
