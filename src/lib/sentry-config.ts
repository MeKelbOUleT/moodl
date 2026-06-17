/**
 * Sentry integration config, opt-in via env var `SENTRY_DSN`.
 *
 * Activation in `astro.config.mjs` once `@sentry/astro` is installed:
 *
 *   import sentry from '@sentry/astro';
 *   import {getSentryConfig} from './src/lib/sentry-config';
 *
 *   integrations: [
 *     ...(process.env.SENTRY_DSN ? [sentry(getSentryConfig())] : []),
 *     ...other integrations,
 *   ]
 *
 * No-op when SENTRY_DSN is empty, safe to commit.
 */

export interface SentryOptions {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
  replaysSessionSampleRate: number;
  replaysOnErrorSampleRate: number;
  release?: string;
  sourceMapsUploadOptions?: {project: string; authToken: string};
}

export function getSentryConfig(): SentryOptions {
  const env = process.env;
  return {
    dsn: env.SENTRY_DSN ?? '',
    environment: env.VERCEL_ENV ?? env.NODE_ENV ?? 'development',
    tracesSampleRate: Number(env.SENTRY_TRACES_SAMPLE_RATE ?? '0.1'),
    replaysSessionSampleRate: Number(env.SENTRY_REPLAYS_SESSION_RATE ?? '0.01'),
    replaysOnErrorSampleRate: Number(env.SENTRY_REPLAYS_ERROR_RATE ?? '1.0'),
    release: env.VERCEL_GIT_COMMIT_SHA,
    sourceMapsUploadOptions: env.SENTRY_AUTH_TOKEN
      ? {project: env.SENTRY_PROJECT ?? 'moodl-v3', authToken: env.SENTRY_AUTH_TOKEN}
      : undefined,
  };
}
