import { cn } from '@/lib/cn';

/**
 * A topographic contour field — a survey drawing of a peak, which is both the
 * firm's name and the geometry of its mark.
 *
 * The artwork itself is generated at build time by `scripts/build-art.mjs` and
 * served from /public/art. It is NOT inlined as JSX, deliberately: 22 paths of
 * several thousand characters each would appear twice in every response — once
 * in the HTML and again in the RSC flight payload — adding roughly 130KB of
 * uncacheable, duplicated path data to each page.
 *
 * As a file it is one cacheable request reused across every navigation. An SVG
 * inside an `<img>` cannot execute script, so it needs nothing beyond
 * `img-src 'self'` in the CSP.
 *
 * A plain `<img>` rather than `next/image`: the optimiser cannot improve on a
 * vector, and routing it through `/_next/image` would only add a hop.
 */
export function ContourField({
  className,
  tone = 'navy',
}: {
  className?: string;
  /** `navy` draws light lines on a dark ground; `paper` the reverse. */
  tone?: 'navy' | 'paper';
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/art/contour-field-${tone}.svg`}
      alt=""
      aria-hidden="true"
      loading="eager"
      decoding="async"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full object-cover select-none',
        className
      )}
    />
  );
}

/**
 * An architectural section: stacked floor plates behind a hairline datum.
 *
 * This one stays inline — it is a couple of hundred bytes of geometry, and
 * keeping it in JSX lets it inherit the surface tone without a second file.
 * Used as a quiet band divider and behind interior page headers, so the
 * "section drawing" language carries beyond the home page.
 */
export function SectionDrawing({
  className,
  tone = 'paper',
}: {
  className?: string;
  tone?: 'navy' | 'paper';
}) {
  const line = tone === 'navy' ? '#FFFFFF' : '#0A1B39';
  const PLATES = 9;

  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      <g stroke={line} fill="none" strokeWidth="1">
        {Array.from({ length: PLATES }, (_, i) => {
          const y = 300 - i * 30;
          // Upper plates are shorter — a mass stepping back as it rises.
          const inset = 120 + i * 42;
          return (
            <g key={i} opacity={0.13 - i * 0.008}>
              <line x1={inset} y1={y} x2={1440 - inset} y2={y} />
              <line x1={inset} y1={y} x2={inset} y2={y + 30} />
              <line x1={1440 - inset} y1={y} x2={1440 - inset} y2={y + 30} />
            </g>
          );
        })}
        {/* Datum line */}
        <line x1="0" y1="300" x2="1440" y2="300" opacity="0.16" />
      </g>
    </svg>
  );
}
