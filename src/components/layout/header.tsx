'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LogoLink } from '@/components/brand/logo';
import { ButtonLink } from '@/components/ui/button';
import { financingProducts } from '@/content/financing';
import { primaryNav } from '@/content/navigation';
import { strategies } from '@/content/strategies';
import { cn } from '@/lib/cn';

/**
 * There are deliberately no hover dropdowns.
 *
 * Mega-menus on institutional sites are a hover trap on desktop, a tap-through
 * puzzle on touch, and a persistent accessibility liability. Five top-level
 * destinations, each of which is a real hub page that lists its own children,
 * is both simpler to use and simpler to keep correct. The nav is a map, not a
 * directory.
 */

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  /**
   * The menu must close on navigation — otherwise tapping a link on mobile
   * navigates behind a sheet that is still covering the page.
   *
   * Rather than watching `pathname` in an effect and calling `setState` (which
   * causes a cascading render on every navigation), the open state is stored
   * TOGETHER WITH the path it was opened on. If the path has since changed, the
   * menu is closed by definition. Derived, not synchronised.
   */
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const isMenuOpen = menu.open && menu.path === pathname;

  const toggleMenu = () => setMenu({ open: !isMenuOpen, path: pathname });
  const closeMenu = () => setMenu({ open: false, path: pathname });

  /**
   * At the top of the page the header is transparent over a navy band — every
   * route opens with either the Hero or a PageHeader, both of which are navy.
   * Its contents therefore have to invert, or the navy logo and navy nav links
   * disappear into the navy behind them.
   */
  const overDark = !isScrolled && !isMenuOpen;

  // Track scroll on rAF rather than on every scroll event, so a fast wheel
  // cannot queue up more style writes than the compositor can flush.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'transition-[background-color,border-color,box-shadow] duration-(--duration-base) ease-(--ease-out)',
          isScrolled || isMenuOpen
            ? 'border-b border-paper-line bg-paper/92 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-(--container-page) items-center justify-between gap-6 px-6 sm:px-8 lg:h-[5.5rem] lg:px-12 xl:px-16">
          <LogoLink
            tone={overDark ? 'paper' : 'navy'}
            variant="wordmark"
            height={26}
            priority
          />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex min-h-11 items-center px-4 text-[0.9375rem] font-medium',
                        'transition-colors duration-(--duration-fast) ease-(--ease-out)',
                        overDark
                          ? active
                            ? 'text-paper'
                            : 'text-navy-muted hover:text-paper'
                          : active
                            ? 'text-ink'
                            : 'text-ink-soft hover:text-ink'
                      )}
                    >
                      {item.label}
                      {/* The active marker is a brass rule, not a colour swap —
                          colour alone must never be the only signal. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-4 bottom-2 h-px origin-left',
                          overDark ? 'bg-brass' : 'bg-brass-ink',
                          'transition-transform duration-(--duration-base) ease-(--ease-out)',
                          active ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/contact"
              variant={overDark ? 'secondary-on-navy' : 'primary'}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Contact
            </ButtonLink>

            <MenuToggle isOpen={isMenuOpen} onToggle={toggleMenu} overDark={overDark} />
          </div>
        </div>
      </header>

      <MobileSheet isOpen={isMenuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}

function MenuToggle({
  isOpen,
  onToggle,
  overDark,
}: {
  isOpen: boolean;
  onToggle: () => void;
  overDark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={cn(
        'press -mr-2 inline-flex h-12 w-12 items-center justify-center rounded-xs lg:hidden',
        'transition-colors duration-(--duration-base) ease-(--ease-out)',
        overDark ? 'text-paper' : 'text-ink'
      )}
    >
      <span aria-hidden="true" className="relative block h-3.5 w-6">
        <span
          className={cn(
            'absolute left-0 block h-px w-full bg-current',
            'transition-transform duration-(--duration-base) ease-(--ease-out)',
            isOpen ? 'top-1/2 rotate-45' : 'top-0'
          )}
        />
        <span
          className={cn(
            'absolute left-0 block h-px w-full bg-current',
            'transition-transform duration-(--duration-base) ease-(--ease-out)',
            isOpen ? 'top-1/2 -rotate-45' : 'top-full'
          )}
        />
      </span>
    </button>
  );
}

const sheetGroups = [
  {
    heading: 'Investments',
    href: '/investments',
    links: strategies.map((s) => ({ href: `/investments/${s.slug}`, label: s.shortName })),
  },
  {
    heading: 'Financing',
    href: '/financing',
    links: financingProducts.map((p) => ({ href: `/financing/${p.slug}`, label: p.shortName })),
  },
  {
    heading: 'Firm',
    href: '/about',
    links: [
      { href: '/team', label: 'Team' },
      { href: '/insights', label: 'Insights' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

/**
 * Full-screen navigation sheet.
 *
 * A sheet rather than a slide-out drawer: at these viewport widths a drawer
 * leaves a sliver of unusable page behind it and invites accidental dismissal.
 * Focus is trapped while open, Escape closes, and the page behind cannot
 * scroll.
 */
function MobileSheet({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !sheetRef.current) return;

      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    // Compensate for the scrollbar so the page behind does not jump sideways.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousPaddingRight = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    document.addEventListener('keydown', handleKeyDown);
    sheetRef.current?.querySelector<HTMLElement>('a[href]')?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div
      id="mobile-navigation"
      ref={sheetRef}
      // Kept in the DOM so the exit transition can play, but fully removed from
      // the accessibility tree and the tab order while closed.
      inert={!isOpen}
      aria-hidden={!isOpen}
      className={cn(
        'fixed inset-0 top-20 z-40 overflow-y-auto overscroll-contain bg-paper lg:hidden',
        'transition-[opacity,transform] duration-(--duration-base) ease-(--ease-out)',
        isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      )}
    >
      <nav aria-label="Mobile" className="px-6 pb-16 sm:px-8">
        {sheetGroups.map((group) => (
          <div key={group.heading} className="border-b border-paper-line py-6">
            <Link
              href={group.href}
              className={cn(
                'inline-flex min-h-11 items-center font-display text-2xl',
                isActive(pathname, group.href) ? 'text-brass-ink' : 'text-ink'
              )}
            >
              {group.heading}
            </Link>
            <ul className="mt-1 flex flex-col">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-11 items-center text-[0.9375rem]',
                      pathname === link.href ? 'text-ink' : 'text-ink-soft'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <ButtonLink href="/contact" variant="primary" size="lg" className="mt-8 w-full">
          Contact us
        </ButtonLink>
      </nav>
    </div>
  );
}
