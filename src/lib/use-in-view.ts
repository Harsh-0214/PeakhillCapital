'use client';

import { useCallback, useState } from 'react';

/**
 * Fire once, when an element first enters the viewport.
 *
 * This is the entire scroll-animation runtime for the site. It exists instead
 * of an animation library because every reveal here is a one-shot CSS
 * transition on `opacity`, `transform` or `clip-path` — all of which run on the
 * compositor, off the main thread. A JS animation library would do the same
 * work on `requestAnimationFrame` and drop frames during page load, which is
 * precisely when these animations play.
 *
 * Implemented as a REF CALLBACK rather than a `useEffect`. The observer needs
 * to be attached the moment the node exists and torn down when it goes away,
 * which is exactly what a ref callback's lifecycle describes — and it avoids
 * the cascading re-render that calling `setState` inside an effect body causes.
 * React 19 runs the returned function as the cleanup.
 *
 * `once` is deliberate and not configurable: an element that re-animates every
 * time it scrolls past is a distraction, not a delight.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Trigger this far before the element actually reaches the viewport. */
  rootMargin?: string;
  threshold?: number;
}) {
  const [isInView, setIsInView] = useState(false);

  const rootMargin = options?.rootMargin ?? '0px 0px -12% 0px';
  const threshold = options?.threshold ?? 0;

  const ref = useCallback(
    (node: T | null) => {
      if (!node) return;

      // No IntersectionObserver: show the content. A progressive enhancement
      // must never be the reason something stays hidden.
      if (typeof IntersectionObserver === 'undefined') {
        setIsInView(true);
        return;
      }

      // Someone who asked for reduced motion should not wait on a scroll
      // observer to see content that is only being animated for decoration.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin, threshold }
      );

      observer.observe(node);

      return () => observer.disconnect();
    },
    [rootMargin, threshold]
  );

  return { ref, isInView };
}
