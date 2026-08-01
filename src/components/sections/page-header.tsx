import Link from 'next/link';
import { SectionDrawing } from '@/components/art/contour-field';
import { FigureLabel } from '@/components/ui/figure-label';
import { Container, GridOverlay } from '@/components/ui/section';
import { cn } from '@/lib/cn';

export type Crumb = { name: string; path: string };

/**
 * The standard interior-page opening.
 *
 * Every page below the home page begins the same way — eyebrow, breadcrumb,
 * one H1, one lede — so a visitor always lands in a known shape. The section
 * drawing behind it carries the home page's visual world into the interior
 * without repeating the full contour field, which would get tiresome by the
 * third page.
 *
 * `pt-32` accounts for the fixed header; without it the H1 sits under the nav.
 */
export function PageHeader({
  eyebrow,
  figureIndex,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  figureIndex?: number;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section
      data-surface="navy"
      className="relative overflow-hidden bg-navy pt-32 pb-16 text-paper sm:pt-36 lg:pt-44 lg:pb-24"
    >
      <GridOverlay surface="navy" />
      <SectionDrawing tone="navy" className="opacity-70" />

      <Container>
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-2xs tracking-[0.14em] uppercase">
              <li>
                <Link
                  href="/"
                  className="text-navy-muted transition-colors duration-(--duration-fast) hover:text-paper"
                >
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-navy-muted/50">
                      /
                    </span>
                    {isLast ? (
                      <span aria-current="page" className="text-paper">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="text-navy-muted transition-colors duration-(--duration-fast) hover:text-paper"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <FigureLabel index={figureIndex} tone="brass">
          {eyebrow}
        </FigureLabel>

        <h1
          className={cn(
            'mt-6 max-w-[16ch] text-5xl text-paper',
            title.length > 48 && 'max-w-[20ch] text-4xl'
          )}
        >
          {title}
        </h1>

        {lede ? (
          <p className="mt-7 max-w-[54ch] text-xl leading-[1.5] text-navy-muted">{lede}</p>
        ) : null}

        {children}
      </Container>
    </section>
  );
}
