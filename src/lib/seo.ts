import type { Metadata } from 'next';
import { site } from '@/lib/site';

/**
 * Build page metadata with the canonical URL, Open Graph and Twitter cards all
 * derived from one call.
 *
 * Centralised so no page can ship with a canonical pointing at the wrong path,
 * an OG title that drifted from the H1, or a missing description — the three
 * SEO mistakes that actually cost traffic.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  /** Site-relative, with a leading slash. */
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${title} — ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

/** Trim to a clean length for a meta description, breaking on a word. */
export function truncate(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}
