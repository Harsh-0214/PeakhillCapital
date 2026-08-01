import type { Metadata } from 'next';
import { CapitalStack } from '@/components/sections/capital-stack';
import { CtaBand } from '@/components/sections/cta-band';
import { Hero } from '@/components/sections/hero';
import { ArrowLink } from '@/components/ui/button';
import { LinkCard } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatGrid } from '@/components/ui/stat';
import { financingProducts } from '@/content/financing';
import { firm } from '@/content/firm';
import { relatedArticles } from '@/content/insights';
import { strategies } from '@/content/strategies';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Commercial Real Estate Credit & Equity',
  description: site.description,
  path: '/',
});

export default function HomePage() {
  const latest = relatedArticles(undefined, 2);

  return (
    <>
      <Hero />

      {/* ---- The platform ------------------------------------------------ */}
      <Section surface="paper" padding="lg" aria-labelledby="platform-heading">
        <Container>
          <SectionHeading
            id="platform-heading"
            figureIndex={2}
            eyebrow="The platform"
            title="One firm, active at every level of the stack."
            lede="Most managers occupy a single position in a capital structure and shape every transaction to fit it. Peakhill invests across senior debt, mezzanine, preferred equity and common equity — which means we can start from what a project needs rather than from what a mandate permits."
            align="wide"
          />

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-20 lg:gap-x-16">
            {firm.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 60}>
                <div className="flex flex-col gap-4 border-t border-paper-line pt-6">
                  <h3 className="text-2xl leading-tight text-ink">{principle.title}</h3>
                  <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Capital stack ----------------------------------------------- */}
      <Section surface="navy" padding="lg" aria-labelledby="stack-heading">
        <Container>
          <SectionHeading
            id="stack-heading"
            figureIndex={3}
            eyebrow="Capital stack"
            title="What each layer is actually paid for."
            lede="The stack is usually drawn as a ladder with cheap money at the bottom. That picture is shallow enough to be misleading — the layers are compensated for genuinely different risks. Select one to see where we participate."
            tone="paper"
            align="wide"
          />

          <div className="mt-14 lg:mt-18">
            <CapitalStack />
          </div>
        </Container>
      </Section>

      {/* ---- Investments ------------------------------------------------- */}
      <Section surface="paper" padding="lg" aria-labelledby="investments-heading">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="investments-heading"
              figureIndex={4}
              eyebrow="Investment management"
              title="Strategies for institutional and private capital."
            />
            <Reveal delay={80}>
              <ArrowLink href="/investments">All strategies</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {strategies.map((strategy, index) => (
              <Reveal key={strategy.slug} delay={index * 60} className="flex">
                <LinkCard
                  href={`/investments/${strategy.slug}`}
                  eyebrow={strategy.position}
                  title={strategy.shortName}
                  body={strategy.summary}
                  meta={strategy.geography}
                  className="w-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Financing --------------------------------------------------- */}
      <Section surface="paper-warm" padding="lg" aria-labelledby="financing-heading">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="financing-heading"
              figureIndex={5}
              eyebrow="Financing"
              title="Direct capital for borrowers and sponsors."
            />
            <Reveal delay={80}>
              <ArrowLink href="/financing">All financing solutions</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {financingProducts.map((product, index) => (
              <Reveal key={product.slug} delay={index * 60} className="flex">
                <LinkCard
                  href={`/financing/${product.slug}`}
                  eyebrow={product.assetClasses.slice(0, 2).join(' · ')}
                  title={product.name}
                  body={product.summary}
                  className="w-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Scale ------------------------------------------------------- */}
      <Section surface="paper" padding="lg" aria-labelledby="scale-heading">
        <Container>
          <SectionHeading
            id="scale-heading"
            figureIndex={6}
            eyebrow="Scale"
            title="The platform behind the position."
            lede="Origination, underwriting, credit, fund management, asset management and loan servicing under one roof, across five North American offices."
            align="wide"
          />
          <div className="mt-14">
            <StatGrid stats={firm.platformStats} />
          </div>
        </Container>
      </Section>

      {/* ---- Insights ---------------------------------------------------- */}
      <Section surface="paper-warm" padding="lg" aria-labelledby="insights-heading">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="insights-heading"
              figureIndex={7}
              eyebrow="Insights"
              title="Notes from the market."
            />
            <Reveal delay={80}>
              <ArrowLink href="/insights">All insights</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {latest.map((article, index) => (
              <Reveal key={article.slug} delay={index * 60} className="flex">
                <LinkCard
                  href={`/insights/${article.slug}`}
                  eyebrow={article.category}
                  title={article.title}
                  body={article.excerpt}
                  meta={`${article.readingMinutes} min read`}
                  className="w-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Work with us"
        title="Let's talk about the transaction in front of you."
        body="Whether you are allocating capital or financing a project, the conversation starts the same way — with the specifics. Our regional teams cover Canada and the United States."
        primary={{ href: '/contact', label: 'Contact our team' }}
        secondary={{ href: '/about', label: 'About the firm' }}
      />
    </>
  );
}
