import Image from 'next/image';
import { LogoMark } from '@/components/brand/logo';
import type { Person } from '@/content/team';

/**
 * A person, with or without a photograph.
 *
 * NO SYNTHETIC PORTRAITS. These are real individuals, and generating a
 * plausible-looking face for a named executive would be a fabrication, not a
 * placeholder. So the fallback is a designed object in its own right — the
 * Peakhill mark set as a watermark behind the person's initials in the display
 * serif — rather than a grey silhouette apologising for missing content.
 *
 * The image slot is fully wired. Drop `/public/team/<slug>.jpg` into place, set
 * `image` in `content/team.ts`, and the photograph renders with a navy duotone
 * treatment. Nothing else changes.
 */
export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="group flex flex-col gap-5">
      <div className="relative aspect-square overflow-hidden border border-navy-line bg-navy-mid">
        {person.image ? (
          <>
            <Image
              src={person.image}
              alt={`${person.name}, ${person.title}`}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-center grayscale-[35%] transition-[filter,transform] duration-(--duration-slow) ease-(--ease-out) motion-safe:group-hover:scale-[1.02] group-hover:grayscale-0"
            />
            {/* Navy duotone wash, so unretouched originals still sit together
                as a consistent set. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-navy/30 mix-blend-multiply transition-opacity duration-(--duration-slow) group-hover:opacity-60"
            />
          </>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            <LogoMark
              tone="paper"
              size={128}
              decorative
              className="absolute opacity-[0.07] select-none"
            />
            <span
              aria-hidden="true"
              className="relative font-display text-5xl tracking-[0.06em] text-paper/85"
            >
              {person.initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl leading-tight text-ink">{person.name}</h3>
        <p className="font-mono text-2xs tracking-[0.14em] text-brass-ink uppercase">
          {person.title}
        </p>
        {person.bio ? (
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{person.bio}</p>
        ) : null}
      </div>
    </article>
  );
}
