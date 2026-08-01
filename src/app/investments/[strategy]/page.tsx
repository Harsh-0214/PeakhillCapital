import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { LinkCard, TermsTable } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { getStrategy, strategies } from '@/content/strategies';
import { breadcrumbSchema, serviceSchema } from '@/lib/jsonld';
import { pageMetadata, truncate } from '@/lib/seo';

type Props = { params: Promise<{ strategy: string }> };

/** Pre-enumerate the slugs so unknown ones 404 rather than rendering empty. */
export function generateStaticParams() {
  return strategies.map((strategy) => ({ strategy: strategy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { strategy: slug } = await params;
  const strategy = getStrategy(slug);

  if (!strategy) {
    return { title: 'Strategy not found', robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: strategy.name,
    description: truncate(strategy.summary),
    path: `/investments/${strategy.slug}`,
  });
}

export default async function StrategyPage({ params }: Props) {
  const { strategy: slug } = await params;
  const strategy = getStrategy(slug);

  if (!strategy) notFound();

  const others = strategies.filter((item) => item.slug !== strategy.slug);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Investments', path: '/investments' },
          { name: strategy.shortName, path: `/investments/${strategy.slug}` },
        ])}
      />
      <JsonLd
        schema={serviceSchema({
          name: strategy.name,
          description: strategy.summary,
          path: `/investments/${strategy.slug}`,
        })}
      />

      <PageHeader
        figureIndex={1}
        eyebrow={`${strategy.position} · ${strategy.geography}`}
        title={strategy.name}
        lede={strategy.summary}
        crumbs={[
          { name: 'Investments', path: '/investments' },
          { name: strategy.shortName, path: `/investments/${strategy.slug}` },
        ]}
      />

      {/* Overview + terms */}
      <Section surface="paper" padding="lg" aria-labelledby="overview-heading">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-8">
              <SectionHeading
                id="overview-heading"
                figureIndex={2}
                eyebrow="Overview"
                title="The strategy."
              />
              <Reveal delay={80}>
                <p className="prose-measure text-lg leading-[1.68] text-ink-soft">
                  {strategy.intro}
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="flex flex-col gap-6">
                <p className="figure-label text-brass-ink">Key terms</p>
                <TermsTable terms={strategy.terms} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Highlights */}
      <Section surface="navy" padding="lg" aria-labelledby="highlights-heading">
        <Container>
          <SectionHeading
            id="highlights-heading"
            figureIndex={3}
            eyebrow="What it is designed to do"
            title="How the strategy earns its position."
            tone="paper"
            align="wide"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {strategy.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={index * 60}>
                <div className="flex flex-col gap-4 border-t border-navy-line pt-6">
                  <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl leading-tight text-paper">{highlight.title}</h3>
                  <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-navy-muted">
                    {highlight.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Other strategies */}
      <Section surface="paper-warm" padding="md" aria-labelledby="other-heading">
        <Container>
          <SectionHeading
            id="other-heading"
            figureIndex={4}
            eyebrow="Also on the platform"
            title="Other strategies."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 60} className="flex">
                <LinkCard
                  href={`/investments/${item.slug}`}
                  eyebrow={item.position}
                  title={item.shortName}
                  body={item.summary}
                  className="w-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Investor relations"
        title="Request materials for this strategy."
        body="Detailed product information is available to qualified investors in jurisdictions where these strategies may lawfully be offered."
        primary={{ href: '/contact', label: 'Contact investor relations' }}
        secondary={{ href: '/investments', label: 'All strategies' }}
      />
    </>
  );
}
