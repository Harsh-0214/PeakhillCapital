import type { Stat as StatData } from '@/content/firm';
import { cn } from '@/lib/cn';
import { Reveal } from './reveal';

/**
 * A single figure.
 *
 * Mono and tabular, because these numbers are read in comparison to one
 * another and proportional digits make columns of figures wobble. The rule
 * above each one draws in on first sight.
 */
/**
 * A row of figures. Four reads well at desktop; three is the other good number.
 *
 * MARKUP CONSTRAINT worth stating, because it is easy to break: a `<dl>` may
 * only directly contain `<dt>`, `<dd>` and `<div>` grouping wrappers. The
 * `Reveal` wrapper therefore has to BE that grouping div and hold the dt/dd
 * pair itself — wrapping a pre-grouped block in another element puts an extra
 * level between the list and its items and invalidates the whole structure.
 *
 * Visual order is value-then-label, so `<dd>` is ordered before `<dt>` with
 * flex `order` rather than by swapping the elements. The semantics stay
 * correct for a screen reader; only the paint order changes.
 */
export function StatGrid({
  stats,
  tone = 'ink',
  size = 'md',
  className,
}: {
  stats: readonly StatData[];
  tone?: 'ink' | 'paper';
  size?: 'md' | 'lg';
  className?: string;
}) {
  const onNavy = tone === 'paper';

  return (
    <dl
      className={cn(
        'grid grid-cols-1 gap-10 sm:grid-cols-2',
        stats.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
        className
      )}
    >
      {stats.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 60} className="flex flex-col gap-4">
          <span
            aria-hidden="true"
            className={cn('block h-px w-full', onNavy ? 'bg-brass/55' : 'bg-brass-ink/40')}
          />

          <dd
            className={cn(
              'order-1 m-0 font-mono tnum leading-none font-normal tracking-[-0.03em]',
              size === 'lg' ? 'text-4xl' : 'text-3xl',
              onNavy ? 'text-paper' : 'text-ink'
            )}
          >
            {stat.value}
          </dd>

          <dt className="order-2 flex flex-col gap-1.5">
            <span
              className={cn(
                'text-[0.9375rem] leading-snug font-medium',
                onNavy ? 'text-paper' : 'text-ink'
              )}
            >
              {stat.label}
            </span>
            {stat.note ? (
              <span
                className={cn(
                  'text-sm leading-relaxed text-balance',
                  onNavy ? 'text-navy-muted' : 'text-ink-soft'
                )}
              >
                {stat.note}
              </span>
            ) : null}
          </dt>
        </Reveal>
      ))}
    </dl>
  );
}
