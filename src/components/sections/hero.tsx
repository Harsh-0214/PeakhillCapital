import { ContourField } from '@/components/art/contour-field';
import { ButtonLink } from '@/components/ui/button';
import { FigureLabel } from '@/components/ui/figure-label';
import { Reveal } from '@/components/ui/reveal';
import { Container, GridOverlay } from '@/components/ui/section';
import { firm } from '@/content/firm';

/**
 * The home page opening.
 *
 * One claim, stated plainly, over a survey drawing of a peak. The restraint is
 * the point: an institutional investor evaluating a manager is not persuaded by
 * a video background, and a firm that needs one is telling on itself.
 *
 * `min-h-[88dvh]` rather than `100vh` — mobile browsers include the collapsing
 * URL bar in `vh`, which pushes the CTA below the fold on exactly the devices
 * where that matters most.
 */
export function Hero() {
  return (
    <section
      data-surface="navy"
      className="relative flex min-h-[88dvh] items-center overflow-hidden bg-navy pt-32 pb-20 text-paper sm:pt-36 lg:min-h-[92dvh] lg:pb-28"
    >
      <ContourField tone="navy" />
      <GridOverlay surface="navy" />

      <Container>
        <div className="max-w-[46rem]">
          <Reveal>
            <FigureLabel index={1} tone="brass">
              Peakhill Capital
            </FigureLabel>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-8 text-6xl text-paper">
              Capital, structured
              <br />
              for the whole stack.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-[52ch] text-xl leading-[1.55] text-navy-muted">
              A commercial real estate investment manager operating across credit and equity in
              Canada and the United States — for institutional investors, family offices,
              high-net-worth individuals and wealth management firms.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink href="/investments" variant="primary-on-navy" size="lg">
                Investment strategies
              </ButtonLink>
              <ButtonLink href="/financing" variant="secondary-on-navy" size="lg">
                Financing solutions
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 border-t border-navy-line pt-9 sm:grid-cols-4">
              {firm.headlineStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <dt className="order-2 text-xs leading-snug text-navy-muted">{stat.label}</dt>
                  <dd className="order-1 m-0 font-mono tnum text-2xl leading-none tracking-[-0.03em] text-paper">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
