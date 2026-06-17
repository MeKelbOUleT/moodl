// Plausible-compatible analytics helper.
// In dev or when Plausible has not loaded, every call is a no-op.

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: {props?: Props; callback?: () => void}) => void;
  }
}

export function track(event: string, props?: Props): void {
  if (typeof window === 'undefined') return;
  try {
    const cleaned: Props = {};
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v !== undefined && v !== null && v !== '') cleaned[k] = v;
      }
    }
    window.plausible?.(event, {props: cleaned});
  } catch {
    // swallow
  }
}

// Scroll depth tracking, fire once per page at 25 / 50 / 75 / 100 %.
export function setupScrollDepth(): () => void {
  if (typeof window === 'undefined') return () => undefined;
  const milestones = [25, 50, 75, 100];
  const fired = new Set<number>();
  let ticking = false;

  function onScroll(): void {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const doc = document.documentElement;
      const scrollable = (doc.scrollHeight - doc.clientHeight) || 1;
      const depth = Math.round((window.scrollY / scrollable) * 100);
      for (const m of milestones) {
        if (depth >= m && !fired.has(m)) {
          fired.add(m);
          track('scroll_depth', {depth: m, path: window.location.pathname});
        }
      }
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}

// Click delegation on elements with data-analytics-cta="label".
export function setupCtaTracking(): () => void {
  if (typeof window === 'undefined') return () => undefined;
  function onClick(e: MouseEvent): void {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const cta = target.closest<HTMLElement>('[data-analytics-cta]');
    if (!cta) return;
    const label = cta.dataset.analyticsCta || 'unknown';
    const href = cta.getAttribute('href') || undefined;
    track('cta_click', {label, href, path: window.location.pathname});
  }
  document.addEventListener('click', onClick, {passive: true});
  return () => document.removeEventListener('click', onClick);
}
