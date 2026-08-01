import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { Prose } from '@/components/ui/prose';
import { Container, Section } from '@/components/ui/section';
import { getLegalDocument, legalDocuments } from '@/content/legal';
import { breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata, truncate } from '@/lib/seo';

type Props = { params: Promise<{ doc: string }> };

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ doc: document.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doc } = await params;
  const document = getLegalDocument(doc);

  if (!document) {
    return { title: 'Not found', robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: document.title,
    description: truncate(document.description),
    path: `/legal/${document.slug}`,
  });
}

export default async function LegalPage({ params }: Props) {
  const { doc } = await params;
  const document = getLegalDocument(doc);

  if (!document) notFound();

  const updated = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(document.updated));

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([{ name: document.title, path: `/legal/${document.slug}` }])}
      />

      <PageHeader
        eyebrow="Legal"
        title={document.title}
        crumbs={[{ name: document.title, path: `/legal/${document.slug}` }]}
      >
        <p className="mt-8 font-mono text-2xs tracking-[0.14em] text-navy-muted uppercase">
          Last updated <time dateTime={document.updated}>{updated}</time>
        </p>
      </PageHeader>

      <Section surface="paper" padding="lg" grid={false}>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Prose blocks={document.body} />

            <nav aria-label="Other legal documents" className="mt-20 border-t border-paper-line pt-8">
              <p className="figure-label mb-5 text-brass-ink">Related</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {legalDocuments
                  .filter((item) => item.slug !== document.slug)
                  .map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/legal/${item.slug}`}
                        className="inline-flex min-h-11 items-center text-[0.9375rem] text-ink underline decoration-ink/25 underline-offset-[6px] transition-[text-decoration-color] duration-(--duration-fast) hover:decoration-ink/70"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </Container>
      </Section>
    </>
  );
}
