import type { Article } from '@/content/insights';
import { offices } from '@/content/offices';
import type { Person } from '@/content/team';
import { absoluteUrl, site, siteUrl } from '@/lib/site';

/**
 * Structured data builders.
 *
 * These return plain objects. Serialisation and escaping happen in one place
 * (`components/seo/json-ld.tsx`), so no caller can accidentally produce an
 * unescaped script payload.
 */

type Schema = Record<string, unknown>;

function postalAddress(office: (typeof offices)[number]): Schema {
  return {
    '@type': 'PostalAddress',
    streetAddress: office.street,
    addressLocality: office.locality,
    addressRegion: office.regionCode,
    postalCode: office.postalCode,
    addressCountry: office.countryCode,
  };
}

export function organizationSchema(): Schema {
  const headquarters = offices.find((office) => office.isHeadquarters) ?? offices[0]!;

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${siteUrl}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    logo: absoluteUrl('/icon-512.png'),
    image: absoluteUrl('/icon-512.png'),
    description: site.description,
    foundingDate: site.founded,
    email: site.email.general,
    telephone: site.phone,
    address: postalAddress(headquarters),
    location: offices.map((office) => ({
      '@type': 'Place',
      name: `${site.name} — ${office.city}`,
      address: postalAddress(office),
    })),
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
    ],
    knowsAbout: [
      'Commercial real estate finance',
      'CMHC-insured lending',
      'Multifamily lending',
      'Bridge financing',
      'Preferred equity',
      'Commercial mortgage-backed securities',
    ],
    sameAs: [site.social.linkedin],
  };
}

export function websiteSchema(): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    description: site.description,
    inLanguage: 'en-CA',
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

/**
 * Breadcrumbs. Pass the trail excluding "Home", which is prepended here so
 * every page's breadcrumb starts the same way.
 */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): Schema {
  const items = [{ name: 'Home', path: '/' }, ...trail];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function personSchema(person: Person): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    worksFor: { '@id': `${siteUrl}/#organization` },
    ...(person.bio ? { description: person.bio } : {}),
    ...(person.image ? { image: absoluteUrl(person.image) } : {}),
    ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
  };
}

export function articleSchema(article: Article): Schema {
  const url = absoluteUrl(`/insights/${article.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    inLanguage: 'en-CA',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
    image: absoluteUrl(`/insights/${article.slug}/opengraph-image`),
  };
}

/** Marks a strategy or financing product as an offered service. */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': `${siteUrl}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
    ],
  };
}
