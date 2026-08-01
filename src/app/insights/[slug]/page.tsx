import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { LinkCard } from '@/components/ui/card';
import { Prose } from '@/components/ui/prose';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { articles, getArticle, relatedArticles } from '@/content/insights';
import { articleSchema, breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata, truncate } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: 'Article not found', robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: article.title,
    description: truncate(article.excerpt),
    path: `/insights/${article.slug}`,
    type: 'article',
    publishedTime: article.date,
  });
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const related = relatedArticles(article.slug, 2);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Insights', path: '/insights' },
          { name: article.title, path: `/insights/${article.slug}` },
        ])}
      />
      <JsonLd schema={articleSchema(article)} />

      <PageHeader
        eyebrow={article.category}
        title={article.title}
        crumbs={[
          { name: 'Insights', path: '/insights' },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      >
        <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-2xs tracking-[0.14em] text-navy-muted uppercase">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true" className="h-px w-5 bg-navy-line" />
          <span>{article.readingMinutes} min read</span>
        </p>
      </PageHeader>

      {/* Body */}
      <Section surface="paper" padding="lg" grid={false}>
        <Container>
          <article className="mx-auto max-w-3xl">
            <Reveal>
              <p className="prose-measure border-l-2 border-brass pl-6 text-xl leading-[1.55] text-ink sm:pl-8">
                {article.excerpt}
              </p>
            </Reveal>

            <div className="mt-14">
              <Prose blocks={article.body} />
            </div>
          </article>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 ? (
        <Section surface="paper-warm" padding="md" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="figure-label flex items-center gap-3 text-brass-ink">
              <span aria-hidden="true" className="h-px w-6 bg-brass-ink/45" />
              Continue reading
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 60} className="flex">
                  <LinkCard
                    href={`/insights/${item.slug}`}
                    eyebrow={item.category}
                    title={item.title}
                    body={item.excerpt}
                    meta={`${item.readingMinutes} min read`}
                    className="w-full"
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="Get in touch"
        title="Relevant to something you're working on?"
        body="The people writing this commentary are the same ones underwriting transactions. Start a conversation with the specifics."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/insights', label: 'All insights' }}
      />
    </>
  );
}
