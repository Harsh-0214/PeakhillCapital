/**
 * Canonical site configuration. Single source of truth for anything that needs
 * to know where the site lives — metadata, canonicals, sitemap, JSON-LD, OG.
 */

const FALLBACK_ORIGIN = 'https://www.peakhillcapital.com';

/**
 * The canonical origin, without a trailing slash.
 *
 * Reads NEXT_PUBLIC_SITE_URL so preview deployments produce correct canonicals
 * rather than pointing every preview at production.
 */
export const siteUrl: string = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_ORIGIN).replace(
  /\/+$/,
  ''
);

export const site = {
  name: 'Peakhill Capital',
  shortName: 'Peakhill',
  url: siteUrl,
  locale: 'en_CA',
  /**
   * The positioning line. Everything on the site is downstream of this.
   */
  tagline: 'Commercial real estate credit and equity, across North America.',
  description:
    'Peakhill Capital is a commercial real estate investment manager focused on credit and equity investments across North America, serving institutional investors, family offices, high-net-worth individuals and wealth management firms.',
  founded: '2019',
  email: {
    general: 'info@peakhillcapital.com',
    investors: 'investors@peakhillcapital.com',
    careers: 'careers@peakhillcapital.com',
  },
  phone: '+1-416-363-7325',
  phoneDisplay: '(416) 363-7325',
  social: {
    linkedin: 'https://ca.linkedin.com/company/peakhill-capital',
  },
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
