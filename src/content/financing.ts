/**
 * Financing products — the borrower-facing side of the platform.
 *
 * Drives: /financing, /financing/[product], the header mega-menu, sitemap.
 *
 * Terms, ranges and programme details marked // VERIFY must be confirmed
 * before launch. CMHC programme rules in particular change on CMHC's schedule,
 * not ours — this content needs an owner.
 */

export type FinancingProduct = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  intro: string;
  /** Loan parameters. Rendered as a mono key/value table. */
  terms: Array<{ label: string; value: string }>;
  /** What this product is used for. */
  useCases: string[];
  /** Differentiators, three or four. */
  highlights: Array<{ title: string; body: string }>;
  /** Asset classes served. */
  assetClasses: string[];
};

export const financingProducts: FinancingProduct[] = [
  {
    slug: 'cmhc',
    name: 'CMHC-Insured Financing',
    shortName: 'CMHC',
    summary:
      'Insured multifamily lending, including MLI Select, for construction, acquisition, refinancing and conversion.',
    intro:
      'Peakhill is one of the most active CMHC-insured lenders in Canada. Insured financing carries lower borrowing costs and longer amortisations than conventional debt, but the programmes are procedural and unforgiving of a weak application. We underwrite to CMHC’s standards from the first conversation, which is why our files move.',
    terms: [
      { label: 'Programme', value: 'MLI Select and standard MLI' },
      { label: 'Insurance', value: 'CMHC-insured' },
      { label: 'Amortisation', value: 'Up to 50 years under MLI Select' }, // VERIFY
      { label: 'Recourse', value: 'Typically non-recourse' }, // VERIFY
      { label: 'Geography', value: 'Canada' },
      { label: 'Sector', value: 'Multifamily and specialty housing' },
    ],
    useCases: [
      'New construction of purpose-built rental',
      'Acquisition of existing rental buildings',
      'Refinancing of stabilised assets',
      'Energy and accessibility retrofits',
      'Conversion of existing buildings to residential',
    ],
    highlights: [
      {
        title: 'MLI Select fluency',
        body: 'MLI Select trades reduced premiums and longer amortisation for measurable commitments on affordability, accessibility and energy performance. Structuring an application to hit the point thresholds is the whole exercise, and it is most of what we do.', // VERIFY
      },
      {
        title: 'Volume that compounds',
        body: 'Doing this at scale means our underwriters have seen the edge cases before. That shows up as fewer surprises late in a file, not as a marketing claim.',
      },
      {
        title: 'Bridge to CMHC',
        body: 'Insured financing takes time that a purchase agreement often does not allow. We can fund the bridge and take out our own loan with the insured facility.',
      },
    ],
    assetClasses: ['Multifamily', 'Student housing', 'Seniors housing', 'Mixed-use'],
  },
  {
    slug: 'conventional',
    name: 'Conventional Financing',
    shortName: 'Conventional',
    summary:
      'Uninsured term and construction lending across multifamily, retail, office, industrial and land.',
    intro:
      'Not every asset fits an insured programme, and not every borrower wants the constraints that come with one. Our conventional book covers term debt and construction financing across the full range of commercial property types, priced to risk and structured to the business plan. Construction facilities advance through structured draws tied to the build schedule.',
    terms: [
      { label: 'Type', value: 'Term and construction' },
      { label: 'Position', value: 'First and second lien' },
      { label: 'Advances', value: 'Structured draws against progress' },
      { label: 'Geography', value: 'Canada' },
      { label: 'Rate', value: 'Fixed and floating' },
      { label: 'Decision', value: 'In-house credit' },
    ],
    useCases: [
      'Ground-up commercial construction',
      'Refinancing existing construction debt',
      'Land servicing and development',
      'Term debt on stabilised commercial assets',
      'Capital for repositioning and lease-up',
    ],
    highlights: [
      {
        title: 'Draws that track the build',
        body: 'Construction funds advance against verified progress on a schedule agreed at closing, so cash arrives when trades need paying rather than when a committee next meets.',
      },
      {
        title: 'Credit decided in-house',
        body: 'We are the capital source. There is no syndication risk between a term sheet and a funding, and no third party who can change the terms after diligence.',
      },
      {
        title: 'The whole property spectrum',
        body: 'Multifamily, retail, office, industrial, hospitality, seniors housing and land — underwritten by people who cover that asset class specifically.',
      },
    ],
    assetClasses: ['Multifamily', 'Retail', 'Office', 'Industrial', 'Hospitality', 'Land'],
  },
  {
    slug: 'bridge',
    name: 'Bridge Financing',
    shortName: 'Bridge',
    summary:
      'Short-duration capital that closes on a transaction timeline, including bridge-to-CMHC takeouts.',
    intro:
      'Bridge financing exists because opportunity and permanent capital run on different clocks. Ours is used to close acquisitions before insured or term financing is in place, to fund a repositioning through to stabilisation, and to refinance maturing debt while a longer-term solution is arranged. The distinctive piece is bridge-to-CMHC: we fund the bridge knowing precisely what the insured takeout will look like, because we will be arranging it.',
    terms: [
      { label: 'Duration', value: 'Short term' },
      { label: 'Position', value: 'First and second lien' },
      { label: 'Takeout', value: 'CMHC-insured or conventional' },
      { label: 'Geography', value: 'Canada' },
      { label: 'Sectors', value: 'Multifamily, mixed-use, industrial, retail' },
      { label: 'Speed', value: 'Transaction-timeline close' },
    ],
    useCases: [
      'Closing an acquisition ahead of permanent financing',
      'Funding a repositioning through to stabilisation',
      'Refinancing a maturing loan',
      'Bridging to a CMHC-insured takeout',
      'Funding a lease-up period before term debt',
    ],
    highlights: [
      {
        title: 'Bridge to CMHC, from one desk',
        body: 'We underwrite the bridge and the insured takeout together. The exit is not a hope at the end of the term — it is a file already in progress.',
      },
      {
        title: 'Priced for a real timeline',
        body: 'Short-duration capital should be structured to be repaid, not to trap a borrower. Terms are set against a defined exit.',
      },
      {
        title: 'Certainty at the deadline',
        body: 'Bridge lending is judged on whether it closes. In-house credit and in-house capital are what make a committed date a real one.',
      },
    ],
    assetClasses: ['Multifamily', 'Mixed-use', 'Industrial', 'Retail'],
  },
  {
    slug: 'us-strategies',
    name: 'U.S. Strategies',
    shortName: 'U.S. Strategies',
    summary:
      'CMBS execution and preferred equity for U.S. commercial real estate, from a platform that underwrites on both sides of the border.',
    intro:
      'The U.S. platform delivers two things Canadian sponsors and U.S. owners both need: institutional CMBS execution for stabilised assets, and preferred equity that fills the gap between senior debt and common equity. Both are underwritten by a team based in the market, backed by a firm that already understands the asset class from the credit side.',
    terms: [
      { label: 'CMBS size', value: '$5M – $100M' }, // VERIFY
      { label: 'CMBS terms', value: 'Long-term, fixed-rate, non-recourse' },
      { label: 'Preferred equity size', value: '$5M – $20M' }, // VERIFY
      { label: 'Geography', value: 'United States' },
      { label: 'Sectors', value: 'Multifamily, office, retail, industrial' },
      { label: 'Partnership', value: 'Joint venture with Declaration Partners' }, // VERIFY
    ],
    useCases: [
      'Long-term fixed-rate debt on stabilised assets',
      'Preferred equity to complete a capital stack',
      'Recapitalising an existing ownership structure',
      'Funding growth and repositioning of multifamily portfolios',
      'Cross-border execution for Canadian sponsors',
    ],
    highlights: [
      {
        title: 'CMBS with enhanced leverage',
        body: 'Institutional conduit execution on income-producing assets: long-term, fixed-rate, non-recourse, with pricing and proceeds that balance-sheet lenders generally cannot match.',
      },
      {
        title: 'Preferred equity that behaves',
        body: 'Flexible capital between senior debt and common equity, structured so sponsors can grow, reposition and optimise without giving up control of the asset.',
      },
      {
        title: 'One platform, two countries',
        body: 'The same credit discipline applied on both sides of the border, which matters most to sponsors whose pipeline does not stop at the 49th parallel.',
      },
    ],
    assetClasses: ['Multifamily', 'Office', 'Retail', 'Industrial', 'Specialty housing'],
  },
];

export function getFinancingProduct(slug: string): FinancingProduct | undefined {
  return financingProducts.find((product) => product.slug === slug);
}
