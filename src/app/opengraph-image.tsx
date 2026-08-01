import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — Commercial real estate credit and equity across North America`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The social share card.
 *
 * Generated rather than a static file so it stays in step with the brand
 * tokens, and typographic rather than photographic so it reads at the size
 * these are actually displayed — a 400px-wide preview in a LinkedIn feed.
 *
 * Deliberately no logo mark: the client's artwork is a raster with baked-in
 * padding, and rasterising it into an OG plate at this size produces a soft,
 * off-register result. Letterspaced caps and the brass rule carry the brand
 * cleanly instead.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A1B39',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Hairline column grid — the site's structural device */}
        <div style={{ display: 'flex', position: 'absolute', inset: 0 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                width: '100px',
                height: '100%',
                borderLeft: '1px solid rgba(255,255,255,0.05)',
              }}
            />
          ))}
        </div>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '2px', backgroundColor: '#C4A052' }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.24em',
              color: '#C4A052',
              textTransform: 'uppercase',
            }}
          >
            Peakhill Capital
          </div>
        </div>

        {/* Statement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.08,
              color: '#F4F2ED',
              letterSpacing: '-0.02em',
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            Capital, structured for the whole stack.
          </div>
          <div
            style={{
              fontSize: 27,
              lineHeight: 1.4,
              color: '#8FA0B8',
              maxWidth: '760px',
              display: 'flex',
            }}
          >
            Commercial real estate credit and equity across North America.
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.14)',
            paddingTop: '26px',
            fontSize: 20,
            letterSpacing: '0.16em',
            color: '#8FA0B8',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>Toronto · Montreal · Calgary · Vancouver · Minneapolis</div>
          <div style={{ display: 'flex', color: '#F4F2ED' }}>peakhillcapital.com</div>
        </div>
      </div>
    ),
    size
  );
}
