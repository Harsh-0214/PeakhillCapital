import { FigureLabel } from '@/components/ui/figure-label';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/cn';

/**
 * The opening of a section within a page: eyebrow, H2, optional lede.
 *
 * Every section on every page uses this, which is most of why the site reads
 * as one document. The running figure number is the thread.
 */
export function SectionHeading({
  eyebrow,
  figureIndex,
  title,
  lede,
  tone = 'ink',
  align = 'left',
  className,
  id,
}: {
  eyebrow: string;
  figureIndex?: number;
  title: string;
  lede?: string;
  tone?: 'ink' | 'paper';
  align?: 'left' | 'wide';
  className?: string;
  /** Set when the parent section uses `aria-labelledby`. */
  id?: string;
}) {
  const onNavy = tone === 'paper';

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Reveal>
        <FigureLabel index={figureIndex} tone={onNavy ? 'brass' : 'ink'}>
          {eyebrow}
        </FigureLabel>
      </Reveal>

      <Reveal delay={50}>
        <h2
          id={id}
          className={cn(
            'text-4xl',
            align === 'wide' ? 'max-w-[24ch]' : 'max-w-[18ch]',
            onNavy ? 'text-paper' : 'text-ink'
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={100}>
          <p
            className={cn(
              'max-w-[56ch] text-lg leading-[1.62]',
              onNavy ? 'text-navy-muted' : 'text-ink-soft'
            )}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
