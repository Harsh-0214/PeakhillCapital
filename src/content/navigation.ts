import { financingProducts } from './financing';
import { strategies } from './strategies';

/**
 * Site navigation. Derived from the content modules wherever possible so the
 * menu, the sitemap and the pages themselves cannot drift apart.
 *
 * Five top-level items. Beyond about seven, a nav stops being scannable and
 * starts being a directory.
 */

export type NavChild = {
  href: string;
  label: string;
  description: string;
};

export type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  {
    href: '/investments',
    label: 'Investments',
    children: strategies.map((strategy) => ({
      href: `/investments/${strategy.slug}`,
      label: strategy.shortName,
      description: strategy.summary,
    })),
  },
  {
    href: '/financing',
    label: 'Financing',
    children: financingProducts.map((product) => ({
      href: `/financing/${product.slug}`,
      label: product.shortName,
      description: product.summary,
    })),
  },
  { href: '/about', label: 'Firm' },
  { href: '/team', label: 'Team' },
  { href: '/insights', label: 'Insights' },
];

export const footerNav: Array<{ heading: string; links: Array<{ href: string; label: string }> }> = [
  {
    heading: 'Investments',
    links: strategies.map((strategy) => ({
      href: `/investments/${strategy.slug}`,
      label: strategy.shortName,
    })),
  },
  {
    heading: 'Financing',
    links: financingProducts.map((product) => ({
      href: `/financing/${product.slug}`,
      label: product.shortName,
    })),
  },
  {
    heading: 'Firm',
    links: [
      { href: '/about', label: 'About' },
      { href: '/team', label: 'Team' },
      { href: '/insights', label: 'Insights' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/legal/privacy', label: 'Privacy' },
      { href: '/legal/terms', label: 'Terms of Use' },
      { href: '/legal/disclosures', label: 'Disclosures' },
    ],
  },
];

/** Routes that appear in the sitemap, with their relative priority. */
export const staticRoutes: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/investments', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/financing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/team', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/careers', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/legal/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/legal/terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/legal/disclosures', priority: 0.3, changeFrequency: 'yearly' },
];
