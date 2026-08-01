import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * The Peakhill lockup.
 *
 * These assets are derived from the client's own artwork by
 * `scripts/build-brand-assets.mjs`, which lifts an alpha mask out of the
 * supplied PNGs and re-tints it. The geometry is exactly as the client drew it;
 * only the colour changes, so the mark can sit on navy or on paper without a
 * white box behind it.
 *
 * Do not substitute a hand-traced SVG. A logo that is subtly wrong is worse
 * than one that is a raster.
 */

/**
 * Two lockups, and the choice between them is about legibility at size.
 *
 * `full` stacks PEAKHILL over CAPITAL. At the ~30px header height the
 * descriptor line renders about four pixels tall, which is mush rather than
 * branding — so the header uses `wordmark` (the single-line lockup) and the
 * footer, where there is vertical room, uses `full`.
 */
const LOCKUP = {
  full: {
    navy: '/brand/lockup-full-navy.png',
    paper: '/brand/lockup-full-paper.png',
    ratio: 1434 / 350,
  },
  wordmark: {
    navy: '/brand/lockup-navy.png',
    paper: '/brand/lockup-paper.png',
    ratio: 1212 / 281,
  },
} as const;

const MARK = {
  navy: '/brand/mark-navy.png',
  paper: '/brand/mark-paper.png',
} as const;

const MARK_RATIO = 528 / 464;

export type LogoVariant = keyof typeof LOCKUP;

export function Logo({
  tone = 'navy',
  variant = 'full',
  className,
  /** Rendered height in px. Width follows from the intrinsic ratio. */
  height = 34,
  priority = false,
}: {
  tone?: 'navy' | 'paper';
  variant?: LogoVariant;
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  const lockup = LOCKUP[variant];

  return (
    <Image
      src={lockup[tone]}
      alt="Peakhill Capital"
      width={Math.round(height * lockup.ratio)}
      height={height}
      priority={priority}
      className={cn('h-auto w-auto', className)}
      style={{ height: `${height}px` }}
    />
  );
}

export function LogoMark({
  tone = 'navy',
  className,
  size = 32,
  /** Decorative uses (watermarks, monograms) should not announce themselves. */
  decorative = false,
}: {
  tone?: 'navy' | 'paper';
  className?: string;
  size?: number;
  decorative?: boolean;
}) {
  return (
    <Image
      src={MARK[tone]}
      alt={decorative ? '' : 'Peakhill Capital'}
      aria-hidden={decorative || undefined}
      width={Math.round(size * MARK_RATIO)}
      height={size}
      className={cn('h-auto w-auto', className)}
      style={{ height: `${size}px` }}
    />
  );
}

/** The logo as a link home. Used in the header and the footer. */
export function LogoLink({
  tone = 'navy',
  variant = 'full',
  height = 34,
  priority = false,
  className,
}: {
  tone?: 'navy' | 'paper';
  variant?: LogoVariant;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Peakhill Capital — home"
      className={cn(
        'press inline-flex shrink-0 items-center rounded-xs',
        'transition-opacity duration-(--duration-fast) ease-(--ease-out) hover:opacity-80',
        className
      )}
    >
      <Logo tone={tone} variant={variant} height={height} priority={priority} />
    </Link>
  );
}
