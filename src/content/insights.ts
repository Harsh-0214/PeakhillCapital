/**
 * Insights — market commentary and programme advisories.
 *
 * ⚠️  THE ARTICLES BELOW ARE SAMPLE EDITORIAL.
 *
 * They demonstrate the article template with real structure and a real voice,
 * and they deliberately avoid asserting specific programme thresholds, rates,
 * dates or statistics — those change on CMHC's and the market's schedule, and
 * publishing a stale number under a registered manager's name is a liability,
 * not a typo. Replace the bodies with the firm's own commentary before launch.
 *
 * ARTICLE BODIES ARE STRUCTURED DATA, NOT HTML.
 * There is no `dangerouslySetInnerHTML` anywhere in the rendering path, so a
 * malformed or hostile string can never become markup. Adding a new block type
 * means adding a case to `<Prose>` — which is the point.
 */

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'note'; text: string };

export type Article = {
  slug: string;
  title: string;
  /** Shown on the index card and used as the meta description. */
  excerpt: string;
  /** ISO 8601. Drives sorting, <time> and Article JSON-LD. */
  date: string;
  category: 'Market Outlook' | 'CMHC Advisory' | 'Firm News' | 'Capital Markets';
  /** Approximate minutes. Computed at authoring time, not guessed at runtime. */
  readingMinutes: number;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'why-bridge-to-cmhc-exists',
    title: 'Why bridge-to-CMHC exists, and what it is actually solving',
    excerpt:
      'Insured financing and purchase agreements run on different clocks. The gap between them is a structural feature of the Canadian market, not a failure of planning.',
    date: '2026-06-18',
    category: 'CMHC Advisory',
    readingMinutes: 5,
    body: [
      {
        type: 'paragraph',
        text: 'Every experienced multifamily buyer in Canada has had the same conversation. The asset is right, the price is right, the insured financing is clearly available — and the closing date will arrive well before the insurance does. Nothing has gone wrong. Insured underwriting is thorough by design, and a vendor is under no obligation to wait for it.',
      },
      {
        type: 'paragraph',
        text: 'Bridge-to-CMHC exists to hold that gap. It is short-duration capital advanced against the asset, structured from the outset around a specific insured takeout rather than a general hope of refinancing. The distinction matters more than it sounds.',
      },
      { type: 'heading', text: 'The exit is the product' },
      {
        type: 'paragraph',
        text: 'A conventional bridge loan is underwritten to the asset and to the borrower. A bridge-to-CMHC loan is underwritten to the asset, the borrower, and the insured application that will repay it. That third element changes what the lender needs to be comfortable with, and it changes what the borrower is exposed to.',
      },
      {
        type: 'list',
        items: [
          'The insured file is assessed before the bridge funds, not after it.',
          'Programme eligibility questions are resolved while there is still time to restructure the deal.',
            'The borrower is not searching for a takeout under time pressure at maturity.',
          'Where the bridge lender is also arranging the insured facility, the two underwritings share one set of assumptions.',
        ],
      },
      {
        type: 'quote',
        text: 'Short-duration capital should be structured to be repaid. If the exit is not underwritten at the same time as the loan, it is not a bridge — it is a deadline.',
      },
      { type: 'heading', text: 'Where it goes wrong' },
      {
        type: 'paragraph',
        text: 'The failure mode is almost never the bridge itself. It is a bridge arranged against an insured takeout that nobody stress-tested. An application that does not qualify on the terms assumed, an asset that will not reach the occupancy the model requires, a programme requirement discovered late — each of these turns a routine refinancing into a forced sale.',
      },
      {
        type: 'paragraph',
        text: 'The mitigation is unglamorous: underwrite the exit first, then size the bridge to it. Borrowers should ask a prospective bridge lender to show their work on the takeout before they sign a term sheet, and should be sceptical of any lender who treats the question as somebody else’s problem.',
      },
      {
        type: 'note',
        text: 'CMHC programme parameters change periodically. This commentary describes the structure of the problem, not the current terms of any specific programme. Confirm all programme details with your lender before relying on them.',
      },
    ],
  },
  {
    slug: 'reading-the-capital-stack',
    title: 'Reading the capital stack: what each layer is actually being paid for',
    excerpt:
      'Senior debt, mezzanine, preferred equity and common equity are not points on a risk dial. Each one is compensated for a different thing.',
    date: '2026-05-07',
    category: 'Capital Markets',
    readingMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: 'The capital stack is usually drawn as a ladder, with cheap money at the bottom and expensive money at the top. That picture is not wrong, but it is shallow enough to be misleading. The layers are not the same instrument at different prices. They are compensated for genuinely different risks, and confusing them is how capital structures fail.',
      },
      { type: 'heading', text: 'Senior debt is paid for patience' },
      {
        type: 'paragraph',
        text: 'A senior lender expects to be repaid in full and on time, and prices accordingly. What it is really underwriting is the durability of the asset’s cash flow and the reliability of its own security. It accepts a capped return in exchange for being first in line and having recourse to the property itself. Where that position is also insured, the loss profile changes again — which is why insured multifamily debt behaves so differently from conventional debt on the same building.',
      },
      { type: 'heading', text: 'Mezzanine is paid for position' },
      {
        type: 'paragraph',
        text: 'Mezzanine capital sits behind the senior lender and ahead of the equity. It is not taking meaningfully more operating risk than the senior — the same building either performs or does not. It is taking subordination risk: in a workout, it absorbs losses first. The premium is compensation for standing further back in the queue.',
      },
      { type: 'heading', text: 'Preferred equity is paid for flexibility' },
      {
        type: 'paragraph',
        text: 'Preferred equity is where structure starts doing real work. It fills the gap between what senior debt will advance and what the sponsor can contribute, without forcing the sponsor to give up control. What it is being paid for is optionality — the ability to accrue rather than demand current pay, to sit outside the mortgage, and to be shaped around a business plan that a lender’s credit box would not accommodate.',
      },
      { type: 'heading', text: 'Common equity is paid for outcomes' },
      {
        type: 'paragraph',
        text: 'Common equity is the only layer with unlimited upside and first-loss exposure. Everything else in the stack has a defined return and a defined position. Common equity has neither, which is precisely why it is the only layer whose return depends on whether the plan actually worked.',
      },
      {
        type: 'quote',
        text: 'A capital structure is not a financing decision made once. It is a set of commitments about who absorbs which outcome, and it should be legible to everyone in it.',
      },
      { type: 'heading', text: 'Why a single platform sees this differently' },
      {
        type: 'paragraph',
        text: 'A manager active at only one level of the stack will structure every transaction to fit that level, because that is the only tool available. A platform underwriting at every level can start from the question of what the project needs. That is not a claim about being cleverer. It is a claim about having fewer reasons to force a fit.',
      },
    ],
  },
  {
    slug: 'purpose-built-rental-supply',
    title: 'Purpose-built rental: the supply problem is a financing problem',
    excerpt:
      'Canada does not have a shortage of demand for rental housing or a shortage of land. It has a shortage of projects that pencil.',
    date: '2026-03-24',
    category: 'Market Outlook',
    readingMinutes: 5,
    body: [
      {
        type: 'paragraph',
        text: 'The public conversation about Canadian housing supply tends to focus on approvals and zoning. Those constraints are real. But among developers who already hold approved sites, the binding constraint is more often arithmetic: at prevailing construction costs and prevailing debt terms, the project does not clear its cost of capital.',
      },
      {
        type: 'paragraph',
        text: 'That framing matters because it points at a different set of levers. If supply is limited by what pencils, then the terms on which capital is available are not a downstream detail — they are the constraint itself.',
      },
      { type: 'heading', text: 'What actually moves a pro forma' },
      {
        type: 'list',
        items: [
          'Amortisation period, which changes debt service far more than a modest rate difference does.',
          'Leverage, which determines how much equity a sponsor must find and therefore how many projects they can run at once.',
          'Certainty of funding, which is what allows a sponsor to commit to a site and a trade schedule.',
          'The cost of capital during construction, when the asset produces no income at all.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Insured lending programmes intervene on the first two directly. That is why a shift in insured programme terms tends to show up in construction starts with a lag, and why sponsors watch programme changes as closely as they watch rates.',
      },
      { type: 'heading', text: 'The lender’s side of the same problem' },
      {
        type: 'paragraph',
        text: 'None of this argues for lending into projects that should not be built. Rental construction carries genuine risk — cost overruns, absorption that arrives slower than modelled, interest-rate exposure across a multi-year build. A lender’s job is to distinguish between a project constrained by financing structure and a project constrained by fundamentals, and to fund only the first.',
      },
      {
        type: 'paragraph',
        text: 'Where those two are properly separated, the commercial case and the public one point the same way. Buildings that should exist get built, and the capital that funded them is repaid. That alignment is not always available in this business. Where it is, it is worth being deliberate about.',
      },
      {
        type: 'note',
        text: 'Market commentary reflects observations as of the date of publication and is not investment advice or a recommendation to transact.',
      },
    ],
  },
  {
    slug: 'what-institutional-investors-ask',
    title: 'The four questions institutional investors ask about a credit manager',
    excerpt:
      'After the track record and before the terms, allocators converge on the same short list. All four are really about one thing.',
    date: '2026-01-29',
    category: 'Capital Markets',
    readingMinutes: 4,
    body: [
      {
        type: 'paragraph',
        text: 'Diligence conversations with institutional allocators, family offices and wealth platforms vary enormously in length and almost not at all in substance. Beyond the returns, four questions come up nearly every time.',
      },
      { type: 'heading', text: '1. Where did these positions come from?' },
      {
        type: 'paragraph',
        text: 'A book assembled from the secondary market inherits somebody else’s underwriting standards. A book originated in-house sets its own. Allocators ask this first because it determines whether the manager’s stated credit discipline was ever actually applied to the assets in the portfolio.',
      },
      { type: 'heading', text: '2. Who makes the credit decision?' },
      {
        type: 'paragraph',
        text: 'The useful version of this question is not "do you have a credit committee" — everyone does. It is whether the people who source a transaction are separated from the people who approve it, and whether approval authority actually sits inside the firm.',
      },
      { type: 'heading', text: '3. What happens when a loan goes wrong?' },
      {
        type: 'paragraph',
        text: 'Every credit book has impairments eventually. What distinguishes managers is whether workouts are handled by people who understand the underlying real estate, and whether the servicing infrastructure exists to see a problem developing before it arrives.',
      },
      { type: 'heading', text: '4. Where is your own capital?' },
      {
        type: 'paragraph',
        text: 'Alignment is easy to assert and easy to verify. Allocators want to know whether the manager holds the same risk, on the same terms, and whether the answer changes between the balance sheet and the managed vehicle.',
      },
      {
        type: 'quote',
        text: 'All four questions are the same question asked from different angles: is the discipline you describe the discipline you actually operate?',
      },
      {
        type: 'paragraph',
        text: 'That is the right thing to be asked. A manager who finds these questions uncomfortable has told you something useful before answering any of them.',
      },
    ],
  },
];

/** Newest first. */
export const sortedArticles: Article[] = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** Two most recent, for the home page and the end of an article. */
export function relatedArticles(excludeSlug?: string, limit = 2): Article[] {
  return sortedArticles.filter((article) => article.slug !== excludeSlug).slice(0, limit);
}
