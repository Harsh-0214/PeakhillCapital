import Link from 'next/link';
import { LogoLink } from '@/components/brand/logo';
import { footerNav } from '@/content/navigation';
import { offices } from '@/content/offices';
import { site } from '@/lib/site';
import { OfficeClock } from './office-clock';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-deep text-paper" data-surface="navy">
      <div className="mx-auto w-full max-w-(--container-page) px-6 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
        {/* Offices — the firm's physical footprint, with local time. This is
            the one piece of live data on the site and it earns its place: it
            tells an investor in Vancouver whether Toronto is open. */}
        <div className="border-b border-navy-line pb-14">
          <h2 className="figure-label mb-8 text-brass">Offices</h2>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-5">
            {offices.map((office) => (
              <li key={office.id} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[0.9375rem] font-medium text-paper">
                    {office.city}
                    {office.isHeadquarters ? (
                      <span className="ml-2 font-mono text-2xs tracking-[0.14em] text-brass">
                        HQ
                      </span>
                    ) : null}
                  </span>
                  <OfficeClock timeZone={office.timeZone} />
                </div>
                <address className="text-sm leading-relaxed text-navy-muted not-italic">
                  {office.street}
                  <br />
                  {office.locality}, {office.regionCode} {office.postalCode}
                </address>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-[1.1fr_2fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <LogoLink tone="paper" variant="full" height={46} />
            <p className="max-w-[38ch] text-sm leading-relaxed text-navy-muted">{site.tagline}</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href={`mailto:${site.email.general}`}
                className="inline-flex min-h-9 w-fit items-center text-paper underline decoration-paper/25 underline-offset-4 transition-colors duration-(--duration-fast) hover:decoration-paper/70"
              >
                {site.email.general}
              </a>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex min-h-9 w-fit items-center font-mono tnum text-sm text-navy-muted transition-colors duration-(--duration-fast) hover:text-paper"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h3 className="figure-label mb-4 text-brass">{group.heading}</h3>
                <ul className="flex flex-col gap-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-9 items-center text-sm text-navy-muted transition-colors duration-(--duration-fast) ease-(--ease-out) hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-6 border-t border-navy-line pt-10">
          <p className="max-w-[92ch] text-xs leading-relaxed text-navy-muted/85">
            This website is for informational purposes only and does not constitute an offer to
            sell or a solicitation of an offer to buy any security, nor investment, legal, tax or
            accounting advice. Investment products are available only to qualified investors in
            jurisdictions where they may lawfully be offered, and past performance is not
            indicative of future results. See our{' '}
            <Link
              href="/legal/disclosures"
              className="text-paper underline decoration-paper/30 underline-offset-2 hover:decoration-paper/70"
            >
              disclosures
            </Link>{' '}
            for further information.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-2xs tracking-[0.14em] text-navy-muted uppercase">
              © {year} {site.name}. All rights reserved.
            </p>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 font-mono text-2xs tracking-[0.14em] text-navy-muted uppercase transition-colors duration-(--duration-fast) hover:text-paper"
            >
              LinkedIn
              <svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 9 9 3M4.2 3H9v4.8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
