import { SectionDrawing } from '@/components/art/contour-field';
import { ButtonLink } from '@/components/ui/button';
import { Container, GridOverlay } from '@/components/ui/section';

/**
 * The closing band.
 *
 * One primary action per page. The secondary link is genuinely subordinate —
 * an outline against a filled button — because two equal-weight buttons is the
 * same as having no primary action at all.
 */
export function CtaBand({
  eyebrow = 'Get in touch',
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section
      data-surface="navy"
      className="relative overflow-hidden bg-navy py-20 text-paper lg:py-28"
    >
      <GridOverlay surface="navy" />
      <SectionDrawing tone="navy" className="opacity-60" />

      <Container>
        <div className="flex max-w-3xl flex-col gap-7">
          <p className="figure-label flex items-center gap-3 text-brass">
            <span aria-hidden="true" className="h-px w-6 bg-brass" />
            {eyebrow}
          </p>

          <h2 className="max-w-[18ch] text-4xl text-paper">{title}</h2>

          {body ? (
            <p className="max-w-[52ch] text-lg leading-[1.6] text-navy-muted">{body}</p>
          ) : null}

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href={primary.href} variant="primary-on-navy" size="lg">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="secondary-on-navy" size="lg">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
