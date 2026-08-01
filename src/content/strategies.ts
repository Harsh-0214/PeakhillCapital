/**
 * Investment strategies — the asset-management side of the platform.
 *
 * Drives: /investments, /investments/[strategy], the home page strategy grid,
 * the header mega-menu, and the sitemap.
 *
 * Descriptions are written from public positioning material. Ranges and terms
 * marked // VERIFY must be confirmed before launch.
 */

export type Strategy = {
  slug: string;
  /** Full product name. */
  name: string;
  /** Short name for nav and breadcrumbs. */
  shortName: string;
  /** Where it sits in the capital stack. Ties to the CapitalStack diagram. */
  position: 'Senior debt' | 'Mezzanine' | 'Preferred equity' | 'Common equity';
  /** One line, used on cards and as the meta description seed. */
  summary: string;
  /** Opening paragraph on the strategy page. */
  intro: string;
  /** Key terms table. Rendered in mono. */
  terms: Array<{ label: string; value: string }>;
  /** What the strategy is designed to do, three or four points. */
  highlights: Array<{ title: string; body: string }>;
  /** Geographies. */
  geography: string;
};

export const strategies: Strategy[] = [
  {
    slug: 'income-opportunity',
    name: 'Peakhill Income Opportunity LP',
    shortName: 'Income Opportunity',
    position: 'Senior debt',
    summary:
      'The flagship credit vehicle: diversified Canadian commercial mortgage exposure with an emphasis on multifamily and CMHC-insured lending.',
    intro:
      'Income Opportunity is the firm’s flagship credit product. It holds a diversified book of Canadian commercial mortgage investments, weighted toward multifamily and CMHC-insured lending, and is designed to deliver consistent income from assets that sit at the most defensive point of the capital stack. The portfolio is originated, underwritten and serviced in-house — the same team that sources a loan is accountable for it through repayment.',
    terms: [
      { label: 'Strategy', value: 'Commercial mortgage credit' },
      { label: 'Structure', value: 'Limited partnership' },
      { label: 'Position', value: 'Senior secured' },
      { label: 'Geography', value: 'Canada' },
      { label: 'Primary sector', value: 'Multifamily' },
      { label: 'Credit facility', value: '$350M, closed 2026' }, // VERIFY
    ],
    highlights: [
      {
        title: 'Defensive by construction',
        body: 'Senior secured positions against income-producing real property, with a majority of exposure to multifamily assets that hold occupancy through cycles.',
      },
      {
        title: 'Insured where it counts',
        body: 'A significant share of the book carries CMHC insurance, which materially changes the loss profile of the underlying loan.',
      },
      {
        title: 'Originated, not acquired',
        body: 'Positions come from the firm’s own origination platform rather than the secondary market, so underwriting standards are set rather than inherited.',
      },
      {
        title: 'Institutionally financed',
        body: 'A $350 million credit facility arranged by BMO, TD and National Bank of Canada as co-lead arrangers supports the vehicle’s lending capacity.', // VERIFY
      },
    ],
    geography: 'Canada',
  },
  {
    slug: 'opportunity-reit',
    name: 'Peakhill Opportunity REIT',
    shortName: 'Opportunity REIT',
    position: 'Common equity',
    summary:
      'A private REIT holding income-producing apartment buildings across Canadian markets, managed for cash yield and long-term appreciation.',
    intro:
      'The Opportunity REIT is a private real estate investment trust that owns income-producing apartment buildings across Canada. It is built for investors who want direct ownership of residential rental assets — cash distributions from in-place rents, plus the appreciation that follows from active management of buildings in supply-constrained markets. Assets are acquired, financed and operated through the same platform that lends against them, which is an information advantage rather than a slogan.',
    terms: [
      { label: 'Strategy', value: 'Income-producing multifamily' },
      { label: 'Structure', value: 'Private REIT' },
      { label: 'Position', value: 'Common equity' },
      { label: 'Geography', value: 'Canada' },
      { label: 'Asset type', value: 'Apartment buildings' },
      { label: 'Return profile', value: 'Distribution + appreciation' },
    ],
    highlights: [
      {
        title: 'Ownership, not exposure',
        body: 'The trust holds the buildings directly. Investors own residential real property, with the operating control that comes with it.',
      },
      {
        title: 'Supply-constrained markets',
        body: 'Acquisitions concentrate in Canadian markets where new rental supply is structurally difficult to deliver and existing stock is durable.',
      },
      {
        title: 'Financed from the inside',
        body: 'Access to the firm’s CMHC and conventional lending expertise means the capital structure of each asset is optimised rather than accepted.',
      },
    ],
    geography: 'Canada',
  },
  {
    slug: 'equity-partners',
    name: 'Peakhill Equity Partners',
    shortName: 'Equity Partners',
    position: 'Common equity',
    summary:
      'The opportunistic equity platform, investing in ground-up development and value-add projects across Canada and the United States.',
    intro:
      'Equity Partners is the firm’s opportunistic equity platform. It invests in ground-up development and value-add projects across Canada and the United States, typically alongside experienced local sponsors, in co-GP and joint-venture structures. This is the highest-conviction, longest-duration capital on the platform: it goes into projects where the return comes from what gets built or repositioned, not from what already exists.',
    terms: [
      { label: 'Strategy', value: 'Opportunistic equity' },
      { label: 'Structure', value: 'Co-GP and joint venture' },
      { label: 'Position', value: 'Common equity' },
      { label: 'Geography', value: 'Canada and United States' },
      { label: 'Project types', value: 'Ground-up, value-add' },
      { label: 'Sponsorship', value: 'Alongside local operators' },
    ],
    highlights: [
      {
        title: 'Alongside the sponsor',
        body: 'Investments are made with operators who have built in the market before, in structures where our capital and their execution are aligned on the same outcome.',
      },
      {
        title: 'Ground-up and value-add',
        body: 'New development where supply is needed; repositioning where existing assets are underperforming what the location can support.',
      },
      {
        title: 'Cross-border by design',
        body: 'A single platform underwriting in both Canadian and U.S. markets, which means capital moves to where the opportunity is rather than where the mandate is.',
      },
    ],
    geography: 'Canada and United States',
  },
];

export function getStrategy(slug: string): Strategy | undefined {
  return strategies.find((strategy) => strategy.slug === slug);
}
