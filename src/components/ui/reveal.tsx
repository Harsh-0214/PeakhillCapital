'use client';

import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useInView } from '@/lib/use-in-view';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * Stagger, in milliseconds. Keep between 30 and 80 per item — longer and the
   * interface reads as slow rather than composed.
   */
  delay?: number;
  as?: ElementType;
};

/**
 * Content that rises slightly as it first enters view.
 *
 * The transition itself lives in `globals.css` (`.reveal`) so it stays in CSS
 * and off the main thread; this component only decides *when* to flip the
 * `data-visible` attribute. Under `prefers-reduced-motion` the CSS neutralises
 * the transform entirely and the hook resolves immediately.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-visible={isInView}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  );
}

/**
 * A hairline that draws itself in, left to right, on first sight.
 *
 * Uses `clip-path` rather than animating width: nothing reflows, and the whole
 * thing stays on the compositor.
 */
export function DrawnRule({
  className,
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'paper' | 'brass';
}) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  const toneClass =
    tone === 'brass' ? 'bg-brass' : tone === 'paper' ? 'bg-navy-line' : 'bg-paper-line';

  return (
    <div
      ref={ref}
      data-visible={isInView}
      aria-hidden="true"
      className={cn('rule-draw h-px w-full', toneClass, className)}
    />
  );
}
