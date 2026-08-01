import type { Metadata } from 'next';
import { CapitalStack } from '@/components/sections/capital-stack';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { LinkCard } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatGrid } from '@/components/ui/stat';
import { firm } from '@/content/firm';
import { strategies } from '@/content/strategies';
import { breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Investments',
  description:
    'Peakhill Capital’s investment management platform: credit, preferred equity and opportunistic equity strategies across North America for institutional investors, family offices and wealth management firms.',
  path: '/investments',
});

export default function InvestmentsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Investments', path: '/investments' }])} />

      <PageHeader
        figureIndex={1}
        eyebrow="Investment management"
        title="Strategies across the capital structure."
        lede="A suite of investment products spanning senior credit through opportunistic equity, built for allocators who want exposure to North American commercial real estate underwritten by the people who originate it."
        crumbs={[{ name: 'Investments', path: '/investments' }]}
      />

      {/* Strategies */}
      <Section surface="paper" padding="lg" aria-labelledby="strategies-heading">
        <Container>
          <SectionHeading
            id="strategies-heading"
            figureIndex={2}
            eyebrow="Strategies"
            title="Three vehicles, one underwriting standard."
            lede="Each product occupies a different position and a different risk profile. What does not change between them is how a transaction is assessed before capital is committed."
            align="wide"
          />

          <div className="mt-16 flex flex-col gap-5">
            {strategies.map((strategy, index) => (
              <Reveal key={strategy.slug} delay={index * 60}>
                <LinkCard
                  href={`/investments/${strategy.slug}`}
                  eyebrow={`${strategy.position} · ${strategy.geography}`}
                  title={strategy.name}
                  body={strategy.summary}
                  meta="View strategy"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Capital stack */}
      <Section surface="navy" padding="lg" aria-labelledby="stack-heading">
        <Container>
          <SectionHeading
            id="stack-heading"
            figureIndex={3}
            eyebrow="Position"
            title="Where each strategy sits."
            lede="Most managers occupy one layer and structure every transaction to fit it. Select a layer to see what it is compensated for and where we participate."
            tone="paper"
            align="wide"
          />
          <div className="mt-14 lg:mt-18">
            <CapitalStack />
          </div>
        </Container>
      </Section>

      {/* Who we serve */}
      <Section surface="paper" padding="lg" aria-labelledby="investors-heading">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              id="investors-heading"
              figureIndex={4}
              eyebrow="Our investors"
              title="Capital partners across the spectrum."
              lede="We work with allocators whose mandates, horizons and reporting requirements differ substantially. The platform is structured so that a strategy can be accessed on terms appropriate to the investor rather than only to the product."
            />

            <Reveal delay={80}>
              <ul className="flex flex-col">
                {firm.clientTypes.map((type, index) => (
                  <li
                    key={type}
                    className="flex items-baseline gap-6 border-b border-paper-line py-6 first:border-t"
                  >
                    <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xl text-ink">{type}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-20">
            <StatGrid stats={firm.platformStats} />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Investor relations"
        title="Request strategy materials."
        body="Detailed product information is available to qualified investors. Tell us which strategies are relevant and our fund management team will follow up."
        primary={{ href: '/contact', label: 'Contact investor relations' }}
        secondary={{ href: '/about', label: 'About the firm' }}
      />
    </>
  );
}
