import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { LinkCard } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { sortedArticles } from '@/content/insights';
import { breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Insights',
  description:
    'Market commentary, CMHC programme advisories and capital markets notes from Peakhill Capital’s credit and equity teams across North America.',
  path: '/insights',
});

/** Format for display without pulling in a date library for one call. */
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export default function InsightsPage() {
  const [lead, ...rest] = sortedArticles;

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Insights', path: '/insights' }])} />

      <PageHeader
        figureIndex={1}
        eyebrow="Insights"
        title="Notes from the market."
        lede="Commentary on Canadian and U.S. commercial real estate, CMHC programme mechanics, and how capital is actually being structured — written by the people underwriting it."
        crumbs={[{ name: 'Insights', path: '/insights' }]}
      />

      <Section surface="paper" padding="lg">
        <Container>
          {/* Lead article gets the weight it deserves rather than being one of
              an undifferentiated grid. */}
          {lead ? (
            <Reveal>
              <article className="border-b border-paper-line pb-14">
                <a
                  href={`/insights/${lead.slug}`}
                  className="group flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16"
                >
                  <div className="flex flex-col gap-5">
                    <span className="figure-label flex items-center gap-3 text-brass-ink">
                      <span aria-hidden="true" className="h-px w-6 bg-brass-ink/45" />
                      Latest · {lead.category}
                    </span>
                    <h2 className="max-w-[20ch] text-4xl leading-[1.08] text-balance text-ink">
                      {lead.title}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="max-w-[52ch] text-lg leading-[1.6] text-ink-soft">
                      {lead.excerpt}
                    </p>
                    <span className="flex items-center gap-4 font-mono text-2xs tracking-[0.14em] text-ink-soft uppercase">
                      <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                      <span aria-hidden="true" className="h-px w-4 bg-paper-line" />
                      {lead.readingMinutes} min read
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-brass-ink transition-transform duration-(--duration-base) ease-(--ease-out) motion-safe:group-hover:translate-x-1"
                      >
                        <path
                          d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                </a>
              </article>
            </Reveal>
          ) : null}

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, index) => (
              <Reveal key={article.slug} delay={index * 60} className="flex">
                <LinkCard
                  href={`/insights/${article.slug}`}
                  eyebrow={article.category}
                  title={article.title}
                  body={article.excerpt}
                  meta={`${formatDate(article.date)} · ${article.readingMinutes} min`}
                  className="w-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Stay in touch"
        title="Talk to the people who wrote this."
        body="Our origination and fund management teams are the same people producing this commentary. If something here is relevant to a transaction you are working on, get in touch."
        primary={{ href: '/contact', label: 'Contact us' }}
      />
    </>
  );
}
