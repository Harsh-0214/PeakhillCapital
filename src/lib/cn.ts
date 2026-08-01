/**
 * Join class names, dropping anything falsy.
 *
 * Deliberately ~10 lines rather than a dependency: this site has no conflicting
 * utility merges to resolve, so `clsx`/`tailwind-merge` would be weight without
 * benefit.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
