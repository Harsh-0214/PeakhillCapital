import type { MetadataRoute } from 'next';
import { financingProducts } from '@/content/financing';
import { sortedArticles } from '@/content/insights';
import { legalDocuments } from '@/content/legal';
import { staticRoutes } from '@/content/navigation';
import { strategies } from '@/content/strategies';
import { absoluteUrl } from '@/lib/site';

/**
 * The sitemap is generated from the same content modules that generate the
 * pages, so it cannot drift. Add a strategy and it appears here automatically;
 * remove one and it disappears. There is no list to remember to update.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes
    // Legal pages are enumerated from their own module below.
    .filter((route) => !route.path.startsWith('/legal/'))
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const strategyEntries: MetadataRoute.Sitemap = strategies.map((strategy) => ({
    url: absoluteUrl(`/investments/${strategy.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const financingEntries: MetadataRoute.Sitemap = financingProducts.map((product) => ({
    url: absoluteUrl(`/financing/${product.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = sortedArticles.map((article) => ({
    url: absoluteUrl(`/insights/${article.slug}`),
    // Real publication date, not "now" — a sitemap that claims everything
    // changed today teaches crawlers to ignore the field.
    lastModified: new Date(article.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const legalEntries: MetadataRoute.Sitemap = legalDocuments.map((document) => ({
    url: absoluteUrl(`/legal/${document.slug}`),
    lastModified: new Date(document.updated),
    changeFrequency: 'yearly',
    priority: 0.2,
  }));

  return [
    ...staticEntries,
    ...strategyEntries,
    ...financingEntries,
    ...articleEntries,
    ...legalEntries,
  ];
}
