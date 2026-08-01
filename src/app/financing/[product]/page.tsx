import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { LinkCard, TermsTable } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { financingProducts, getFinancingProduct } from '@/content/financing';
import { breadcrumbSchema, serviceSchema } from '@/lib/jsonld';
import { pageMetadata, truncate } from '@/lib/seo';

type Props = { params: Promise<{ product: string }> };

export function generateStaticParams() {
  return financingProducts.map((product) => ({ product: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getFinancingProduct(slug);

  if (!product) {
    return { title: 'Programme not found', robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: product.name,
    description: truncate(product.summary),
    path: `/financing/${product.slug}`,
  });
}

export default async function FinancingProductPage({ params }: Props) {
  const { product: slug } = await params;
  const product = getFinancingProduct(slug);

  if (!product) notFound();

  const others = financingProducts.filter((item) => item.slug !== product.slug);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Financing', path: '/financing' },
          { name: product.shortName, path: `/financing/${product.slug}` },
        ])}
      />
      <JsonLd
        schema={serviceSchema({
          name: product.name,
          description: product.summary,
          path: `/financing/${product.slug}`,
        })}
      />

      <PageHeader
        figureIndex={1}
        eyebrow="Financing"
        title={product.name}
        lede={product.summary}
        crumbs={[
          { name: 'Financing', path: '/financing' },
          { name: product.shortName, path: `/financing/${product.slug}` },
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
                title="The programme."
              />
              <Reveal delay={80}>
                <p className="prose-measure text-lg leading-[1.68] text-ink-soft">
                  {product.intro}
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-4 flex flex-col gap-4">
                  <p className="figure-label text-brass-ink">Asset classes</p>
                  <ul className="flex flex-wrap gap-2">
                    {product.assetClasses.map((assetClass) => (
                      <li
                        key={assetClass}
                        className="border border-paper-line px-3 py-1.5 font-mono text-2xs tracking-[0.12em] text-ink-soft uppercase"
                      >
                        {assetClass}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="flex flex-col gap-6">
                <p className="figure-label text-brass-ink">Programme terms</p>
                <TermsTable terms={product.terms} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Use cases */}
      <Section surface="paper-warm" padding="lg" aria-labelledby="uses-heading">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              id="uses-heading"
              figureIndex={3}
              eyebrow="Applications"
              title="What borrowers use this for."
            />
            <Reveal delay={80}>
              <ul className="flex flex-col">
                {product.useCases.map((useCase, index) => (
                  <li
                    key={useCase}
                    className="flex items-baseline gap-6 border-b border-paper-line py-5 first:border-t"
                  >
                    <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lg leading-snug text-ink">{useCase}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Highlights */}
      <Section surface="navy" padding="lg" aria-labelledby="highlights-heading">
        <Container>
          <SectionHeading
            id="highlights-heading"
            figureIndex={4}
            eyebrow="What sets it apart"
            title="Where the programme earns its place."
            tone="paper"
            align="wide"
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
            {product.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={index * 60}>
                <div className="flex flex-col gap-4 border-t border-navy-line pt-6">
                  <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl leading-tight text-paper">{highlight.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-navy-muted">
                    {highlight.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Other programmes */}
      <Section surface="paper" padding="md" aria-labelledby="other-heading">
        <Container>
          <SectionHeading
            id="other-heading"
            figureIndex={5}
            eyebrow="Also available"
            title="Other financing solutions."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 60} className="flex">
                <LinkCard
                  href={`/financing/${item.slug}`}
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
        eyebrow="Financing enquiries"
        title="Send us the file."
        body="The asset, the ask and the timeline is enough to start. A regional originator will come back with a view."
        primary={{ href: '/contact', label: 'Start a conversation' }}
        secondary={{ href: '/financing', label: 'All financing solutions' }}
      />
    </>
  );
}
