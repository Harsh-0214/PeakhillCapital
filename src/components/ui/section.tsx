import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The page container. One max-width, one gutter scale, used everywhere.
 *
 * Everything on the site aligns to this, which is what lets the hairline column
 * grid actually line up with the content sitting on top of it.
 */
export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn(
        'relative z-10 mx-auto w-full max-w-(--container-page)',
        'px-6 sm:px-8 lg:px-12 xl:px-16',
        className
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * The hairline column grid.
 *
 * Four columns on small screens, twelve from `lg`, at the threshold of
 * perception. It is the structural device that makes every page read as part
 * of one drawing rather than a stack of unrelated blocks.
 *
 * Purely decorative, so it is hidden from assistive technology and cannot
 * intercept a pointer.
 */
export function GridOverlay({ surface }: { surface: Surface }) {
  const ruleColor =
    surface === 'navy'
      ? 'rgb(255 255 255 / 0.055)'
      : surface === 'paper-warm'
        ? 'rgb(10 27 57 / 0.055)'
        : 'rgb(10 27 57 / 0.045)';

  return (
    <>
      {/* 4 columns — mobile and tablet */}
      <div
        aria-hidden="true"
        className="grid-overlay lg:hidden"
        style={
          {
            '--rule-color': ruleColor,
            '--rule-step': '25%',
          } as React.CSSProperties
        }
      />
      {/* 12 columns — desktop */}
      <div
        aria-hidden="true"
        className="grid-overlay hidden lg:block"
        style={
          {
            '--rule-color': ruleColor,
            '--rule-step': '8.3333%',
          } as React.CSSProperties
        }
      />
    </>
  );
}

export type Surface = 'paper' | 'paper-warm' | 'navy' | 'navy-deep';

const surfaceStyles: Record<Surface, string> = {
  paper: 'bg-paper text-ink',
  'paper-warm': 'bg-paper-warm text-ink',
  navy: 'bg-navy text-paper',
  'navy-deep': 'bg-navy-deep text-paper',
};

/** Vertical rhythm. `flush` exists for sections that butt against each other. */
const paddingStyles = {
  none: '',
  sm: 'py-14 sm:py-16 lg:py-20',
  md: 'py-16 sm:py-20 lg:py-28',
  lg: 'py-20 sm:py-28 lg:py-36',
} as const;

/**
 * A full-bleed band of the page.
 *
 * `data-surface` is read by CSS for surface-dependent details (selection
 * colour, for one), so it is set even though Tailwind classes handle the rest.
 */
export function Section({
  children,
  surface = 'paper',
  padding = 'md',
  grid = true,
  className,
  id,
  as: Tag = 'section',
  'aria-labelledby': ariaLabelledBy,
}: {
  children: ReactNode;
  surface?: Surface;
  padding?: keyof typeof paddingStyles;
  /** Set false where the overlay would fight the content, e.g. behind a table. */
  grid?: boolean;
  className?: string;
  id?: string;
  as?: ElementType;
  'aria-labelledby'?: string;
}) {
  return (
    <Tag
      id={id}
      data-surface={surface.startsWith('navy') ? 'navy' : 'paper'}
      aria-labelledby={ariaLabelledBy}
      className={cn('relative overflow-hidden', surfaceStyles[surface], paddingStyles[padding], className)}
    >
      {grid ? <GridOverlay surface={surface} /> : null}
      {children}
    </Tag>
  );
}
