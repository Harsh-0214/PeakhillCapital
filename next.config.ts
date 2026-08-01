import type { NextConfig } from 'next';

/**
 * Security headers that do not depend on a per-request nonce.
 *
 * The Content-Security-Policy is NOT set here — it is generated per request in
 * `middleware.ts` so that it can carry a fresh nonce. Everything below is
 * static and therefore cheaper to serve from the config.
 */
const securityHeaders = [
  // Force HTTPS for two years, including subdomains. `preload` is safe to ship
  // only once the apex domain is served exclusively over HTTPS.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Never let a browser guess a response's type.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Legacy clickjacking defence. Modern browsers use CSP `frame-ancestors`.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Send the origin cross-site, the full URL same-origin, nothing over HTTP.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // This is a marketing site: it needs none of these capabilities.
  {
    key: 'Permissions-Policy',
    value: [
      'accelerometer=()',
      'autoplay=()',
      'camera=()',
      'display-capture=()',
      'encrypted-media=()',
      'geolocation=()',
      'gyroscope=()',
      'idle-detection=()',
      'interest-cohort=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'usb=()',
      'xr-spatial-tracking=()',
    ].join(', '),
  },
  // Isolate this origin from cross-origin popups and embeds.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Don't advertise the framework or its version.
  poweredByHeader: false,

  // Trailing slashes create duplicate-content pairs; pick one shape and stick to it.
  trailingSlash: false,

  images: {
    // Every image is committed to /public. No remote patterns are allowed, so
    // the image optimiser can never be pointed at a third-party origin.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Images are content-hashed by filename; cache them hard.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    dangerouslyAllowSVG: false,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Fonts and images in /public are immutable for the life of a deploy.
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  async redirects() {
    return [
      // The old site split Equity Partners onto its own subdomain and used a
      // few different URL shapes. Preserve the inbound link equity.
      { source: '/commercial-mortgages', destination: '/financing', permanent: true },
      { source: '/cmhc-financing', destination: '/financing/cmhc', permanent: true },
      { source: '/conventional-financing', destination: '/financing/conventional', permanent: true },
      { source: '/us-strategies', destination: '/financing/us-strategies', permanent: true },
      {
        source: '/peakhill-opportunity-reit',
        destination: '/investments/opportunity-reit',
        permanent: true,
      },
      { source: '/investment-strategy', destination: '/investments', permanent: true },
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/blog/:slug', destination: '/insights/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
