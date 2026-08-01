/**
 * Keyboard users should not have to tab through the entire navigation on every
 * page. Visually hidden until focused, then it lands on top of everything.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:inline-flex focus-visible:min-h-11 focus-visible:items-center focus-visible:bg-navy focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:font-medium focus-visible:text-paper"
    >
      Skip to main content
    </a>
  );
}
