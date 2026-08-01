/**
 * People and disciplines.
 *
 * ⚠️  THESE ARE REAL INDIVIDUALS.
 *
 * Names, titles and biographical facts below were taken from public sources
 * (the firm's own indexed pages, LinkedIn, press releases). They are held to a
 * higher bar than marketing copy: nothing here is invented, characterised or
 * embellished, and every entry is marked // VERIFY.
 *
 * NO SYNTHETIC PORTRAITS. The `image` field is intentionally optional. Until a
 * real photograph exists at the given path, the card renders a designed
 * monogram built from the Peakhill mark. Drop a file into /public/team and set
 * `image` — no other change is needed.
 *
 * IMAGE SPEC for supplied headshots:
 *   • 1:1 square, minimum 800×800px, ideally 1200×1200
 *   • Subject's eyes on the upper third; head and shoulders
 *   • Neutral or architectural background; consistent across the set
 *   • JPEG or WebP, sRGB, under 400KB
 *   • Filename: /public/team/<slug>.jpg
 * The card applies a navy duotone treatment in CSS, so unretouched originals
 * are fine and preferred — do not pre-grade them.
 */

export type Person = {
  slug: string;
  name: string;
  title: string;
  /** Two initials for the monogram fallback. */
  initials: string;
  /** Factual, sourced. Keep to one or two sentences. Never characterise. */
  bio?: string;
  /** Path under /public. Omit until a real photograph exists. */
  image?: string;
  linkedin?: string;
};

/**
 * Named leadership. This array is designed to scale to a full masthead —
 * the grid, detail pages and Person JSON-LD are all driven from it, so adding
 * people is a data edit and nothing else.
 */
export const leadership: Person[] = [
  {
    slug: 'harley-gold',
    name: 'Harley Gold',
    title: 'President & Chief Executive Officer',
    initials: 'HG',
    bio: 'Harley leads Peakhill Capital. Over twenty-five years in Canadian and U.S. commercial real estate finance, he has closed in excess of $25 billion of loans across more than 5,000 transactions.', // VERIFY
  },
  {
    slug: 'jen-harrop',
    name: 'Jen Harrop',
    title: 'Senior Vice President, Fund Management',
    initials: 'JH',
    bio: 'Jen leads fund management, focused on delivering value for investor clients across the firm’s managed funds and third-party initiatives.', // VERIFY
  },
];

/**
 * The firm by function.
 *
 * This is not filler for a short leadership list — it is how a 175-person
 * platform actually presents itself. A visitor evaluating a manager wants to
 * know which disciplines sit under one roof, and that answer does not depend
 * on which individuals have a headshot on file.
 */
export type Discipline = {
  name: string;
  body: string;
};

export const disciplines: Discipline[] = [
  {
    name: 'Origination',
    body: 'Regional teams in five offices sourcing credit and equity opportunities directly from sponsors, brokers and owners across North America.',
  },
  {
    name: 'Underwriting & Credit',
    body: 'In-house credit analysis and adjudication. The people who assess a file are the people accountable for it, and decisions are made internally rather than referred out.',
  },
  {
    name: 'CMHC & Insured Lending',
    body: 'Specialists in MLI Select and standard CMHC programmes, structuring applications to meet affordability, accessibility and energy thresholds.',
  },
  {
    name: 'Fund Management',
    body: 'Product structuring, investor reporting and capital formation across the firm’s managed vehicles, serving institutions, family offices and wealth managers.',
  },
  {
    name: 'Asset Management',
    body: 'Active management of owned real property and of positions held through the credit book, from lease-up through stabilisation and disposition.',
  },
  {
    name: 'Loan Servicing',
    body: 'Administration of a servicing portfolio in excess of $17 billion on behalf of lenders, insurers and institutional investors.', // VERIFY
  },
];

export function getPerson(slug: string): Person | undefined {
  return leadership.find((person) => person.slug === slug);
}
