import { ImageResponse } from 'next/og';
import { articles, getArticle } from '@/content/insights';

export const alt = 'Peakhill Capital — Insights';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

/**
 * Per-article share card.
 *
 * Articles are the pages most likely to be shared into a feed, and a card that
 * carries the actual headline earns far more clicks than a generic brand plate.
 */
export default async function ArticleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  const headline = article?.title ?? 'Insights';
  const category = article?.category ?? 'Peakhill Capital';

  // Long headlines need to step down or they overflow the plate.
  const fontSize = headline.length > 62 ? 52 : headline.length > 44 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A1B39',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', position: 'absolute', inset: 0 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                width: '100px',
                height: '100%',
                borderLeft: '1px solid rgba(255,255,255,0.05)',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '2px', backgroundColor: '#C4A052' }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.24em',
              color: '#C4A052',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            fontSize,
            lineHeight: 1.1,
            color: '#F4F2ED',
            letterSpacing: '-0.02em',
            maxWidth: '980px',
            display: 'flex',
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.14)',
            paddingTop: '26px',
            fontSize: 20,
            letterSpacing: '0.16em',
            color: '#8FA0B8',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>Peakhill Capital · Insights</div>
          <div style={{ display: 'flex', color: '#F4F2ED' }}>peakhillcapital.com</div>
        </div>
      </div>
    ),
    size
  );
}
