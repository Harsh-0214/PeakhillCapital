import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * A card that is entirely one link.
 *
 * The whole card is the anchor rather than a small "Read more" at the bottom:
 * a 300px-wide target beats a 90px one on every input device, and it removes
 * the duplicate-link problem screen readers hit when a card's title and its CTA
 * both point at the same URL.
 */
export function LinkCard({
  href,
  eyebrow,
  title,
  body,
  meta,
  tone = 'paper',
  className,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  body?: string;
  /** Small mono detail pinned to the bottom, e.g. a date or a position. */
  meta?: string;
  tone?: 'paper' | 'navy';
  className?: string;
}) {
  const onNavy = tone === 'navy';

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col gap-4 border p-6 sm:p-8',
        'transition-[border-color,background-color,transform] duration-(--duration-base) ease-(--ease-out)',
        'motion-safe:hover:-translate-y-[3px]',
        onNavy
          ? 'border-navy-line bg-navy-deep/35 hover:border-brass/70 hover:bg-navy-mid/45'
          : 'border-paper-line bg-paper hover:border-brass-ink/50 hover:bg-paper-warm/55',
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn('figure-label', onNavy ? 'text-brass' : 'text-brass-ink')}
        >
          {eyebrow}
        </span>
      ) : null}

      <h3
        className={cn(
          'text-2xl leading-[1.15] text-balance',
          onNavy ? 'text-paper' : 'text-ink'
        )}
      >
        {title}
      </h3>

      {body ? (
        <p
          className={cn(
            'text-[0.9375rem] leading-relaxed',
            onNavy ? 'text-navy-muted' : 'text-ink-soft'
          )}
        >
          {body}
        </p>
      ) : null}

      <span className="mt-auto flex items-center justify-between gap-4 pt-4">
        {meta ? (
          <span
            className={cn(
              'font-mono text-2xs tracking-[0.14em] uppercase',
              onNavy ? 'text-navy-muted' : 'text-ink-soft'
            )}
          >
            {meta}
          </span>
        ) : (
          <span />
        )}
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          className={cn(
            'shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out) motion-safe:group-hover:translate-x-1',
            onNavy ? 'text-brass' : 'text-brass-ink'
          )}
        >
          <path
            d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="square"
          />
        </svg>
      </span>
    </Link>
  );
}

/**
 * A key/value table of deal terms, set in mono.
 *
 * A real `<dl>`, not a grid of divs — the pairing is semantic and a screen
 * reader should be able to say "Amortisation, up to 50 years".
 */
export function TermsTable({
  terms,
  tone = 'paper',
  className,
}: {
  terms: ReadonlyArray<{ label: string; value: string }>;
  tone?: 'paper' | 'navy';
  className?: string;
}) {
  const onNavy = tone === 'navy';

  return (
    <dl
      className={cn(
        'grid grid-cols-1 border-t sm:grid-cols-2',
        onNavy ? 'border-navy-line' : 'border-paper-line',
        className
      )}
    >
      {terms.map((term) => (
        <div
          key={term.label}
          className={cn(
            'flex flex-col gap-1.5 border-b py-4 sm:py-5',
            'sm:odd:pr-8 sm:even:pl-8 sm:even:border-l',
            onNavy ? 'border-navy-line' : 'border-paper-line'
          )}
        >
          <dt
            className={cn(
              'font-mono text-2xs tracking-[0.14em] uppercase',
              onNavy ? 'text-navy-muted' : 'text-ink-soft'
            )}
          >
            {term.label}
          </dt>
          <dd
            className={cn(
              'm-0 font-mono tnum text-[0.9375rem]',
              onNavy ? 'text-paper' : 'text-ink'
            )}
          >
            {term.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
