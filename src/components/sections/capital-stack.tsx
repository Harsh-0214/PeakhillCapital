'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { ArrowLink } from '@/components/ui/button';
import { cn } from '@/lib/cn';

/**
 * The capital stack, as an argument rather than an illustration.
 *
 * Most managers occupy one layer and structure every deal to fit it. Peakhill
 * is active at all four, and that is the single most important thing the
 * Investments page has to communicate. A diagram makes the claim checkable in
 * a way that three paragraphs of prose does not.
 *
 * Implemented as an ARIA tablist with vertical orientation: arrow keys move
 * between layers, Home/End jump to the ends, and the panel is properly
 * associated. Each layer also carries its one-line summary inline, so the
 * diagram still reads as a labelled figure if the panel is never opened.
 */

type Layer = {
  id: string;
  name: string;
  /** Relative visual weight in the stack. Not a claim about allocation. */
  weight: number;
  position: string;
  summary: string;
  detail: string;
  compensatedFor: string;
  products: Array<{ label: string; href: string }>;
};

/** Ordered top-of-stack first, which is how a capital stack is drawn. */
const LAYERS: Layer[] = [
  {
    id: 'common-equity',
    name: 'Common equity',
    weight: 1.15,
    position: 'First loss · Unlimited upside',
    summary: 'Ownership. Takes the outcome, good or bad.',
    detail:
      'The only layer with unlimited upside and first-loss exposure. Every other position in the stack has a defined return and a defined place in the queue; common equity has neither, which is why its return depends entirely on whether the business plan actually worked.',
    compensatedFor: 'Outcomes',
    products: [
      { label: 'Peakhill Equity Partners', href: '/investments/equity-partners' },
      { label: 'Peakhill Opportunity REIT', href: '/investments/opportunity-reit' },
    ],
  },
  {
    id: 'preferred-equity',
    name: 'Preferred equity',
    weight: 0.85,
    position: 'Behind debt · Ahead of common',
    summary: 'Fills the gap without taking control from the sponsor.',
    detail:
      'Sits between what senior debt will advance and what a sponsor can contribute. It is paid for optionality — the ability to accrue rather than demand current pay, to sit outside the mortgage, and to be shaped around a business plan that a lender’s credit box would not accommodate.',
    compensatedFor: 'Flexibility',
    products: [{ label: 'U.S. Strategies', href: '/financing/us-strategies' }],
  },
  {
    id: 'mezzanine',
    name: 'Mezzanine',
    weight: 0.8,
    position: 'Subordinated debt',
    summary: 'Same asset risk as the senior, further back in the queue.',
    detail:
      'Mezzanine is not underwriting a materially different building than the senior lender is — the property either performs or it does not. What it is taking is subordination risk: in a workout it absorbs losses first. The premium is compensation for position, not for optimism.',
    compensatedFor: 'Position',
    products: [{ label: 'Conventional Financing', href: '/financing/conventional' }],
  },
  {
    id: 'senior-debt',
    name: 'Senior debt',
    weight: 2.2,
    position: 'First lien · Secured',
    summary: 'First in line, secured against the property itself.',
    detail:
      'A senior lender expects repayment in full and on time, and accepts a capped return in exchange for being first in line with recourse to the asset. Where the position is also CMHC-insured, the loss profile changes again — which is why insured multifamily debt behaves so differently from conventional debt on the same building.',
    compensatedFor: 'Patience',
    products: [
      { label: 'Income Opportunity LP', href: '/investments/income-opportunity' },
      { label: 'CMHC-Insured Financing', href: '/financing/cmhc' },
      { label: 'Bridge Financing', href: '/financing/bridge' },
    ],
  },
];

export function CapitalStack() {
  const [selectedId, setSelectedId] = useState<string>(LAYERS[0]!.id);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selected = LAYERS.find((layer) => layer.id === selectedId) ?? LAYERS[0]!;
  const selectedIndex = LAYERS.findIndex((layer) => layer.id === selected.id);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      let nextIndex: number | null = null;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          nextIndex = (selectedIndex + 1) % LAYERS.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          nextIndex = (selectedIndex - 1 + LAYERS.length) % LAYERS.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = LAYERS.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextLayer = LAYERS[nextIndex];
      if (!nextLayer) return;
      setSelectedId(nextLayer.id);
      tabRefs.current[nextIndex]?.focus();
    },
    [selectedIndex]
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      {/* The stack */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Capital stack layers"
        className="flex flex-col gap-1.5"
        onKeyDown={handleKeyDown}
      >
        {LAYERS.map((layer, index) => {
          const isSelected = layer.id === selected.id;
          return (
            <button
              key={layer.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${layer.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelectedId(layer.id)}
              style={{ minHeight: `${Math.max(4.5, layer.weight * 3.6)}rem` }}
              className={cn(
                'group relative flex w-full flex-col justify-center gap-1 px-5 py-4 text-left sm:px-6',
                'border transition-[background-color,border-color] duration-(--duration-fast) ease-(--ease-out)',
                isSelected
                  ? 'border-brass bg-navy-mid'
                  : 'border-navy-line bg-navy-deep/40 hover:border-navy-muted/50 hover:bg-navy-mid/50'
              )}
            >
              {/* Selection is marked by a brass bar as well as by colour —
                  colour alone is never the only signal. */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-y-0 left-0 w-[3px] origin-top bg-brass',
                  'transition-transform duration-(--duration-base) ease-(--ease-out)',
                  isSelected ? 'scale-y-100' : 'scale-y-0'
                )}
              />
              <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-[0.9375rem] font-medium text-paper">{layer.name}</span>
                <span className="font-mono text-2xs tracking-[0.14em] text-brass uppercase">
                  {layer.compensatedFor}
                </span>
              </span>
              <span className="text-sm leading-snug text-navy-muted">{layer.summary}</span>
            </button>
          );
        })}

        <p className="mt-4 flex items-center gap-3 font-mono text-2xs tracking-[0.14em] text-navy-muted uppercase">
          <span aria-hidden="true" className="h-px w-6 bg-navy-line" />
          Peakhill invests at every level
        </p>
      </div>

      {/* Detail */}
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${selected.id}`}
        tabIndex={0}
        className="flex flex-col gap-6 border-t border-navy-line pt-8 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-12"
      >
        <div className="flex flex-col gap-2">
          <p className="font-mono text-2xs tracking-[0.14em] text-brass uppercase">
            {selected.position}
          </p>
          <h3 className="text-3xl text-paper">{selected.name}</h3>
        </div>

        <p className="max-w-[52ch] text-lg leading-[1.62] text-navy-muted">{selected.detail}</p>

        <div className="flex flex-col gap-3 border-t border-navy-line pt-6">
          <p className="figure-label text-brass">Where Peakhill participates</p>
          <ul className="flex flex-col gap-1">
            {selected.products.map((product) => (
              <li key={product.href}>
                <ArrowLink href={product.href} tone="paper">
                  {product.label}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
