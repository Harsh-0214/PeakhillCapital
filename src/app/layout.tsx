import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google';
import '@/styles/globals.css';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SkipLink } from '@/components/layout/skip-link';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationSchema, websiteSchema } from '@/lib/jsonld';
import { site, siteUrl } from '@/lib/site';

/**
 * Display: high-contrast editorial serif with real optical sizing. Carries the
 * institutional weight without the stock-bank-serif look.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  axes: ['opsz'],
});

/** UI and body. Tight tracking at large sizes is applied per-component. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Data type — stats, figure labels, tables. The site's signature. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-jb',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Commercial Real Estate Credit & Equity`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Commercial Real Estate Credit & Equity`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Commercial Real Estate Credit & Equity`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'finance',
  formatDetection: { telephone: false, address: false, email: false },
};

/**
 * Render on request rather than at build time.
 *
 * This is a security decision with a performance cost, so it is worth stating
 * why it goes this way.
 *
 * `src/proxy.ts` issues a strict CSP with a fresh nonce per response, and
 * `'strict-dynamic'` means browsers ignore `'self'` and host allowlists
 * entirely — ONLY nonce-matched scripts execute. Next can only stamp that nonce
 * onto its script tags while rendering the request that generated it. A
 * prerendered page has no nonce, so under this CSP it would not hydrate at all.
 *
 * The alternative is keeping static output and falling back to
 * `script-src 'self' 'unsafe-inline'` — which is the single most common CSP
 * weakness, and the first thing an institutional client's security review will
 * flag. For a content site with no database, rendering costs a few milliseconds
 * of CPU per request and no database round-trips. That is the cheaper side of
 * the trade.
 *
 * Note that nonces and cached HTML are fundamentally incompatible: a nonce
 * reused across viewers is not a nonce. Cache assets aggressively, documents
 * not at all.
 */
export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never cap zoom — capping it fails WCAG 1.4.4.
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F2ED' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1B39' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <JsonLd schema={organizationSchema()} id="ld-organization" />
        <JsonLd schema={websiteSchema()} id="ld-website" />
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
