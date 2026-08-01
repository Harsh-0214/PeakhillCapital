import type { Block } from './insights';
import { site } from '@/lib/site';

/**
 * ⚠️  TEMPLATE LEGAL COPY — REQUIRES REVIEW BY COUNSEL BEFORE LAUNCH.
 *
 * These pages are structurally complete and written in plain language, but they
 * are a starting point, not advice. A registered investment manager's website
 * disclosures carry regulatory weight in every jurisdiction it operates in, and
 * Peakhill operates in two countries and several provinces and states.
 *
 * Specifically, counsel must confirm before this goes live:
 *   • Which regulator(s) and registration categories apply, and how they must
 *     be disclosed.
 *   • PIPEDA and provincial privacy obligations (Canada); state privacy law
 *     including CCPA/CPRA exposure (United States).
 *   • The exact accredited/qualified investor language for each offering.
 *   • Retention periods, the privacy officer's contact details, and the
 *     complaint escalation path.
 *   • Whether cookie consent is required — this build sets NO cookies and runs
 *     NO analytics, which is why no banner is present. That changes the moment
 *     analytics are added.
 */

export type LegalDocument = {
  slug: string;
  title: string;
  description: string;
  /** ISO date shown as "last updated". */
  updated: string;
  body: Block[];
};

const UPDATED = '2026-08-01';

export const legalDocuments: LegalDocument[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How Peakhill Capital collects, uses and protects personal information submitted through this website.',
    updated: UPDATED,
    body: [
      {
        type: 'paragraph',
        text: `This policy explains what personal information ${site.name} collects through this website, why we collect it, and what we do with it. It covers this website only. It does not cover information you provide to us in the course of a transaction or an investment relationship, which is governed by the agreements between us.`,
      },
      { type: 'heading', text: 'What we collect' },
      {
        type: 'paragraph',
        text: 'We collect only what you choose to send us. If you submit the contact form, that is your name, email address, organisation (if you provide one), the enquiry type you select, and the content of your message. If you email us directly, it is whatever your message contains.',
      },
      {
        type: 'paragraph',
        text: 'This website sets no cookies, runs no analytics or advertising scripts, and embeds no third-party trackers. We do not build a profile of your browsing, and there is nothing here for an advertising network to read.',
      },
      { type: 'heading', text: 'Server logs' },
      {
        type: 'paragraph',
        text: 'Our hosting provider records standard technical information for every request — IP address, timestamp, requested URL, and browser user-agent string. This is used to operate the site securely and to rate-limit abusive traffic. It is not combined with anything you submit and is not used to identify you.',
      },
      { type: 'heading', text: 'How we use what you send' },
      {
        type: 'list',
        items: [
          'To respond to your enquiry and route it to the right team.',
          'To provide information you have asked for about our strategies or financing programmes.',
          'To assess an application, where you have contacted us about a role.',
          'To meet our legal, regulatory and record-keeping obligations.',
        ],
      },
      {
        type: 'paragraph',
        text: 'We do not sell personal information. We do not share it with third parties for their own marketing. We share it only with service providers who help us operate the site and our email, and only to the extent they need it to perform that service.',
      },
      { type: 'heading', text: 'Where information is held' },
      {
        type: 'paragraph',
        text: 'We operate in Canada and the United States, and information you send may be stored or processed in either country. Where information is transferred across a border, it may be accessible to the courts and law enforcement of that jurisdiction under its laws.',
      },
      { type: 'heading', text: 'Your rights' },
      {
        type: 'paragraph',
        text: `Subject to applicable law, you may ask us to confirm what personal information we hold about you, to correct it if it is wrong, or to delete it where we are not required to retain it. Write to ${site.email.general} and we will respond within the period required by law.`,
      },
      { type: 'heading', text: 'Security' },
      {
        type: 'paragraph',
        text: 'This site is served over HTTPS with HSTS, a strict Content Security Policy and modern security headers. Form submissions are validated and rate-limited. No system is perfectly secure, and you should not send confidential or sensitive information through a web form.',
      },
      { type: 'heading', text: 'Changes and contact' },
      {
        type: 'paragraph',
        text: `We may update this policy. The date at the top of this page reflects the most recent change. Questions about privacy can be sent to ${site.email.general}.`,
      },
      {
        type: 'note',
        text: 'This document is a template pending review by counsel and does not yet reflect a final assessment of the firm’s obligations under PIPEDA, provincial privacy legislation or applicable U.S. state privacy law.',
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    description: 'The terms on which Peakhill Capital makes this website available.',
    updated: UPDATED,
    body: [
      {
        type: 'paragraph',
        text: `By accessing this website you agree to these terms. If you do not agree with them, please do not use the site.`,
      },
      { type: 'heading', text: 'Informational purposes only' },
      {
        type: 'paragraph',
        text: 'Everything on this website is provided for general information. It is not investment, legal, tax or accounting advice, and it is not a recommendation to enter into any transaction. Nothing here creates an advisory relationship or any other relationship between you and us.',
      },
      {
        type: 'paragraph',
        text: 'This website is not an offer to sell, or a solicitation of an offer to buy, any security or investment product. Any offering is made only through definitive offering documents, to investors who are eligible under applicable law, in jurisdictions where the offering may lawfully be made.',
      },
      { type: 'heading', text: 'Accuracy' },
      {
        type: 'paragraph',
        text: 'We take reasonable care with the information published here, but we do not warrant that it is complete, current or free from error. Market conditions, programme terms and regulatory requirements change, and content may not be updated the moment they do. Do not rely on this website as your only source when making a decision.',
      },
      { type: 'heading', text: 'Intellectual property' },
      {
        type: 'paragraph',
        text: `The content, design, trade marks and logos on this website belong to ${site.name} or its licensors. You may view and print pages for your own reference. You may not reproduce, republish or exploit them commercially without our written permission.`,
      },
      { type: 'heading', text: 'External links' },
      {
        type: 'paragraph',
        text: 'Where we link to a third-party website we do so for convenience. We do not control those sites, we are not responsible for their content, and a link does not imply endorsement.',
      },
      { type: 'heading', text: 'Limitation of liability' },
      {
        type: 'paragraph',
        text: 'To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or inability to use, this website, or from reliance on anything published on it.',
      },
      { type: 'heading', text: 'Governing law' },
      {
        type: 'paragraph',
        text: 'These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable in it, and you submit to the non-exclusive jurisdiction of the courts of that province.',
      },
      {
        type: 'note',
        text: 'This document is a template pending review by counsel. Governing law, liability and jurisdiction clauses must be confirmed against the firm’s cross-border operations before launch.',
      },
    ],
  },
  {
    slug: 'disclosures',
    title: 'Disclosures',
    description:
      'Important information about Peakhill Capital’s investment products, forward-looking statements and performance data.',
    updated: UPDATED,
    body: [
      { type: 'heading', text: 'No offer or solicitation' },
      {
        type: 'paragraph',
        text: 'Nothing on this website constitutes an offer to sell, or the solicitation of an offer to buy, any security, fund interest or investment product. Any such offer is made solely through definitive offering documents, which contain the full terms and the risk factors that apply.',
      },
      { type: 'heading', text: 'Eligible investors only' },
      {
        type: 'paragraph',
        text: 'The strategies described on this website are available only to investors who qualify under applicable securities legislation — including, in Canada, accredited investors and permitted clients as defined in National Instrument 45-106 and National Instrument 31-103, and, in the United States, accredited investors as defined under Regulation D. Availability differs by jurisdiction.',
      },
      { type: 'heading', text: 'Performance and figures' },
      {
        type: 'paragraph',
        text: 'Past performance does not indicate or guarantee future results. Figures describing capital deployed, transaction counts, portfolio size or headcount are presented as at the date indicated, are approximate, and are subject to change. They are not a projection of any investor’s return.',
      },
      {
        type: 'paragraph',
        text: 'All investment involves risk, including the possible loss of the entire amount invested. Real estate investments in particular are illiquid, are sensitive to interest rates and local market conditions, and may be leveraged, which magnifies both gains and losses.',
      },
      { type: 'heading', text: 'Forward-looking statements' },
      {
        type: 'paragraph',
        text: 'Some statements on this website are forward-looking. They reflect expectations as at the date made and involve assumptions, risks and uncertainties. Actual outcomes may differ materially. We undertake no obligation to update forward-looking statements except as required by law.',
      },
      { type: 'heading', text: 'Financing programmes' },
      {
        type: 'paragraph',
        text: 'Descriptions of financing programmes, including CMHC-insured products, are summaries. Programme parameters are set by the relevant insurer or authority, not by us, and change on their schedule. Eligibility, pricing and terms for any specific transaction are determined only through underwriting and are subject to credit approval and definitive documentation.',
      },
      {
        type: 'note',
        text: 'This document is a template pending review by counsel and must be confirmed against the firm’s actual registration categories and the securities legislation of each jurisdiction in which its products are offered.',
      },
    ],
  },
];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((document) => document.slug === slug);
}
