import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'primary-on-navy' | 'secondary-on-navy';
type Size = 'sm' | 'md' | 'lg';

/**
 * Every interactive surface on the site resolves to this.
 *
 * Non-negotiables baked in:
 *  - `press` gives `scale(0.97)` on `:active` within 140ms, so the UI confirms
 *    it heard the user. Buttons that do not move on press feel broken.
 *  - Transitions name their properties. Never `transition: all`.
 *  - Minimum 44px tall at every size, so a touch target is never a near-miss.
 *  - `touch-action: manipulation` removes the 300ms tap delay without
 *    disabling zoom.
 */
const base = cn(
  'press inline-flex items-center justify-center gap-2.5 text-center',
  'font-medium tracking-[-0.005em]',
  'transition-[background-color,color,border-color,transform] duration-(--duration-fast) ease-(--ease-out)',
  'disabled:pointer-events-none disabled:opacity-45'
);

const variants: Record<Variant, string> = {
  // On paper
  primary: 'bg-navy text-paper hover:bg-navy-deep',
  secondary: 'border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/[0.035]',
  ghost: 'text-ink hover:text-brass-ink',
  // On navy
  'primary-on-navy': 'bg-paper text-navy hover:bg-white',
  'secondary-on-navy':
    'border border-paper/30 text-paper hover:border-paper/70 hover:bg-paper/[0.07]',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 py-2.5 text-sm',
  md: 'min-h-12 px-6 py-3 text-[0.9375rem]',
  lg: 'min-h-14 px-8 py-4 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], 'rounded-xs', className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className'>) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  if (isExternal) {
    return (
      <a
        href={href}
        // `noreferrer` alongside `noopener` — the target must not learn where
        // the traffic came from, and must not get a handle on this window.
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cn(base, variants[variant], sizes[size], 'rounded-xs', className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], 'rounded-xs', className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/**
 * A text link with an arrow that advances on hover.
 *
 * The arrow motion is gated behind a hover-capable pointer — on touch, `:hover`
 * latches after a tap and the arrow would stay displaced.
 */
export function ArrowLink({
  href,
  children,
  tone = 'ink',
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: 'ink' | 'paper';
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-medium',
        'transition-colors duration-(--duration-fast) ease-(--ease-out)',
        tone === 'paper' ? 'text-paper hover:text-brass' : 'text-ink hover:text-brass-ink',
        className
      )}
    >
      <span className="underline decoration-current/25 underline-offset-[6px] transition-[text-decoration-color] duration-(--duration-fast) group-hover:decoration-current/70">
        {children}
      </span>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out) motion-safe:group-hover:translate-x-1"
      >
        <path
          d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
      </svg>
    </Link>
  );
}
