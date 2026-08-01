/**
 * ============================================================================
 * FIRM FACTS — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * Every quantitative claim the website makes lives in this file and nowhere
 * else. Change a number here and it changes everywhere it is displayed.
 *
 * PROVENANCE: these figures were compiled from PUBLIC sources (CNW/Newswire
 * releases, Preqin and PitchBook profiles, and Peakhill's own indexed pages) as
 * of August 2026. They were NOT supplied by Peakhill.
 *
 * Every entry marked `// VERIFY` must be confirmed by the client before this
 * site goes to production. Marketing claims about capital deployed, headcount
 * and portfolio size carry regulatory weight for a registered manager.
 */

export type Stat = {
  /** The figure itself. Rendered in mono, tabular. */
  value: string;
  /** What the figure measures. Sentence case, no trailing period. */
  label: string;
  /** Optional qualifier rendered small beneath the label. */
  note?: string;
};

export const firm = {
  founded: '2019', // VERIFY — widely reported inception year
  headquarters: 'Toronto, Ontario',

  /** Headline figures. Shown on the home page stat band. Keep to four. */
  headlineStats: [
    {
      value: '$20B+',
      label: 'Financed since inception',
      note: 'Across more than 3,000 transactions', // VERIFY
    },
    {
      value: '3,000+',
      label: 'Transactions closed',
      note: 'Credit and equity, Canada and the U.S.', // VERIFY
    },
    {
      value: '175+',
      label: 'Professionals',
      note: 'Across five North American offices', // VERIFY
    },
    {
      value: '5',
      label: 'Offices',
      note: 'Toronto, Montreal, Calgary, Vancouver, Minneapolis',
    },
  ] satisfies Stat[],

  /** Secondary figures used on the About and Investments pages. */
  platformStats: [
    {
      value: '$17B+',
      label: 'Servicing portfolio',
      note: 'Loans administered on behalf of lenders and investors', // VERIFY
    },
    {
      value: '230+',
      label: 'Mortgage investments',
      note: 'Held across Canadian markets', // VERIFY
    },
    {
      value: '$350M',
      label: 'Credit facility',
      note: 'Closed 2026 for the Income Opportunity LP', // VERIFY
    },
  ] satisfies Stat[],

  /**
   * The vision statement, supplied by the client.
   * Do not paraphrase this without approval — it is board-level copy.
   */
  vision:
    'Our vision is to shape the future of commercial real estate through a comprehensive platform defined by value creation and innovation.',

  /**
   * Who the firm serves. Ordered by how the client lists them.
   */
  clientTypes: [
    'Institutional investors',
    'Family offices',
    'High-net-worth individuals',
    'Wealth management firms',
  ],

  /** What the firm actually does, in plain language, for the About page. */
  principles: [
    {
      title: 'Certainty of execution',
      body: 'Borrowers and partners are underwritten by the same people who fund the loan. Decisions are made in-house, on a timeline we commit to at the outset, and we do not re-trade.',
    },
    {
      title: 'The whole capital stack',
      body: 'Senior debt, bridge, mezzanine, preferred equity and common equity. Sitting at every level means we can structure to what a project needs rather than to what a single mandate permits.',
    },
    {
      title: 'Alignment with investors',
      body: 'We invest alongside our capital partners across the platform. Our credit discipline is the same whether the risk sits on our balance sheet or in a managed fund.',
    },
    {
      title: 'Housing where it is needed',
      body: 'A majority of our lending supports purpose-built rental and multifamily housing across Canada. Growing the national housing supply is a commercial strategy and a public good at the same time.',
    },
  ],
} as const;

/**
 * The list handed to the client for sign-off before launch. Rendered nowhere —
 * this exists so the verification obligation is legible in code review.
 */
export const claimsRequiringVerification = [
  '$20B+ financed since inception',
  '3,000+ transactions closed',
  '175+ professionals',
  '$17B+ servicing portfolio',
  '230+ mortgage investments',
  '$350M credit facility (2026, Income Opportunity LP)',
  '2019 inception year',
  'All five office addresses and the head-office phone number',
  'Named individuals and their titles in content/team.ts',
] as const;
