import { NextResponse, type NextRequest } from 'next/server';

/**
 * Per-request Content-Security-Policy with a fresh nonce.
 *
 * Next.js reads the nonce back out of the `Content-Security-Policy` request
 * header we set here and stamps it onto every script tag it emits, so no
 * framework script needs `'unsafe-inline'`.
 *
 * Trade-off, stated plainly: setting a nonce opts pages out of full static
 * rendering. For a content site with no database that costs a few milliseconds
 * of server render per request, and buys a CSP that actually stops injected
 * script from executing. That is the right side of the trade here.
 *
 * File name note: Next 16 renamed the `middleware` convention to `proxy`.
 * Same execution model, same edge runtime — only the file and export names
 * changed.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  const csp = [
    `default-src 'self'`,
    // `'strict-dynamic'` is what actually enforces this in modern browsers; the
    // `https:` and `'unsafe-inline'` entries are ignored by those browsers and
    // exist purely as a fallback for ones that do not support it.
    // Dev additionally needs 'unsafe-eval' for React Fast Refresh.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline'${
      isDev ? ` 'unsafe-eval'` : ''
    }`,
    // Next inlines critical CSS, which cannot carry a nonce.
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data:`,
    `font-src 'self'`,
    `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `frame-src 'none'`,
    `manifest-src 'self'`,
    `worker-src 'self' blob:`,
    `upgrade-insecure-requests`,
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('content-security-policy', csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on documents only. Static assets, the image optimiser, prefetches and
     * metadata files do not execute script and do not need a nonce, and keeping
     * middleware off them avoids paying for it on every asset request.
     */
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|images/|fonts/|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
