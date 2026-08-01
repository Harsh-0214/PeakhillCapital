import Link from 'next/link';
import { ContourField } from '@/components/art/contour-field';
import { ButtonLink } from '@/components/ui/button';
import { FigureLabel } from '@/components/ui/figure-label';
import { Container, GridOverlay } from '@/components/ui/section';
import { primaryNav } from '@/content/navigation';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/**
 * A 404 that does something useful.
 *
 * A dead end is a navigation failure, so the page's job is to get the visitor
 * moving again — which means offering the actual top-level destinations, not
 * an apology and a home link.
 */
export default function NotFound() {
  return (
    <section
      data-surface="navy"
      className="relative flex min-h-[82dvh] items-center overflow-hidden bg-navy pt-32 pb-20 text-paper"
    >
      <ContourField tone="navy" />
      <GridOverlay surface="navy" />

      <Container>
        <div className="max-w-2xl">
          <FigureLabel tone="brass">Error 404</FigureLabel>

          <h1 className="mt-8 text-5xl text-paper">This page isn&rsquo;t here.</h1>

          <p className="mt-7 max-w-[46ch] text-lg leading-[1.6] text-navy-muted">
            The address may have changed, or the link that brought you here may be out of date.
            Everything on the site is reachable from below.
          </p>

          <div className="mt-10">
            <ButtonLink href="/" variant="primary-on-navy" size="lg">
              Back to the home page
            </ButtonLink>
          </div>

          <nav aria-label="Site sections" className="mt-14 border-t border-navy-line pt-8">
            <p className="figure-label mb-5 text-brass">Or go to</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-1">
              {[...primaryNav, { href: '/contact', label: 'Contact' }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-paper underline decoration-paper/25 underline-offset-[6px] transition-[text-decoration-color] duration-(--duration-fast) hover:decoration-paper/70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
