import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { LinkCard } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { financingProducts } from '@/content/financing';
import { breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Financing',
  description:
    'CMHC-insured, conventional, bridge and U.S. commercial real estate financing from a direct capital source. In-house credit, decisions made internally, funding on a transaction timeline.',
  path: '/financing',
});

/** The reasons a borrower chooses a direct lender over an intermediary. */
const differentiators = [
  {
    title: 'We are the capital',
    body: 'Not a broker placing your file with a third party. Credit is adjudicated in-house, which is why a committed date is a real one and terms do not move after diligence.',
  },
  {
    title: 'Every property type',
    body: 'Multifamily, retail, office, industrial, hospitality, seniors and student housing, and land — underwritten by people who cover that asset class specifically.',
  },
  {
    title: 'Across the border',
    body: 'Canadian and U.S. execution from one platform, which matters most to sponsors whose pipeline does not stop at the 49th parallel.',
  },
];

export default function FinancingPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Financing', path: '/financing' }])} />

      <PageHeader
        figureIndex={1}
        eyebrow="Commercial mortgages"
        title="A direct capital source, not an intermediary."
        lede="Insured and conventional lending across North American commercial real estate — originated, underwritten, funded and serviced by one platform, with credit decisions made in-house."
        crumbs={[{ name: 'Financing', path: '/financing' }]}
      />

      {/* Products */}
      <Section surface="paper" padding="lg" aria-labelledby="products-heading">
        <Container>
          <SectionHeading
            id="products-heading"
            figureIndex={2}
            eyebrow="Financing solutions"
            title="Structured to the project, not to a mandate."
            lede="Four programmes covering the situations commercial borrowers actually face — from a purpose-built rental construction file to a stabilised asset seeking long-term fixed-rate debt."
            align="wide"
          />

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
            {financingProducts.map((product, index) => (
              <Reveal key={product.slug} delay={index * 60} className="flex">
                <LinkCard
                  href={`/financing/${product.slug}`}
                  eyebrow={product.assetClasses.slice(0, 3).join(' · ')}
                  title={product.name}
                  body={product.summary}
                  meta="View programme"
                  className="w-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why direct */}
      <Section surface="navy" padding="lg" aria-labelledby="why-heading">
        <Container>
          <SectionHeading
            id="why-heading"
            figureIndex={3}
            eyebrow="Why a direct lender"
            title="Certainty is the product."
            lede="Borrowers do not choose a lender on rate alone. They choose one that closes, on the date it said it would, on the terms it quoted."
            tone="paper"
            align="wide"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
            {differentiators.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="flex flex-col gap-4 border-t border-navy-line pt-6">
                  <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl leading-tight text-paper">{item.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-navy-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Financing enquiries"
        title="Tell us about the transaction."
        body="Send the asset, the ask and the timeline. A regional originator will come back to you with a view — including when the answer is that we are not the right lender for it."
        primary={{ href: '/contact', label: 'Start a conversation' }}
        secondary={{ href: '/investments', label: 'Investment strategies' }}
      />
    </>
  );
}
