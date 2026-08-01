import { cn } from '@/lib/cn';

/**
 * The mono eyebrow: `FIG. 01 — PLATFORM`.
 *
 * This is the site's connective tissue. Every major section carries one, and
 * the running figure numbers are what make a fourteen-page marketing site read
 * as a single continuous document rather than a set of templates.
 *
 * Rendered with a leading rule so it reads as a drawing annotation.
 */
export function FigureLabel({
  index,
  children,
  tone = 'ink',
  className,
}: {
  /** The figure number. Rendered zero-padded: 1 becomes "FIG. 01". */
  index?: number;
  children: React.ReactNode;
  tone?: 'ink' | 'paper' | 'brass';
  className?: string;
}) {
  // Brass text is only legible on navy. On paper it must be the darkened
  // brass-ink token — #C4A052 on #F4F2ED is 2.2:1 and fails WCAG AA.
  const toneClass =
    tone === 'paper' ? 'text-navy-muted' : tone === 'brass' ? 'text-brass' : 'text-brass-ink';

  const ruleClass =
    tone === 'paper' ? 'bg-navy-line' : tone === 'brass' ? 'bg-brass' : 'bg-brass-ink/45';

  return (
    <p className={cn('figure-label flex items-center gap-3', toneClass, className)}>
      <span aria-hidden="true" className={cn('h-px w-6 shrink-0', ruleClass)} />
      {typeof index === 'number' ? (
        <span className="tnum">
          Fig. {String(index).padStart(2, '0')}
          <span aria-hidden="true" className="mx-2 opacity-45">
            /
          </span>
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
