import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { offices } from '@/content/offices';
import { disciplines } from '@/content/team';
import { breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description:
    'Peakhill Capital is growing across origination, underwriting, credit, fund management, asset management and loan servicing, in five North American offices.',
  path: '/careers',
});

const whatItIsLike = [
  {
    title: 'Decisions get made',
    body: 'Credit is adjudicated in-house. That means the analysis you do is the analysis the decision rests on, not a package that disappears into somebody else’s committee.',
  },
  {
    title: 'Range, quickly',
    body: 'A platform active across senior debt, bridge, mezzanine, preferred equity and common equity gives you exposure to structures that would take years to see at a single-strategy shop.',
  },
  {
    title: 'Two markets',
    body: 'Canadian and U.S. execution from one firm. Programme-driven insured lending on one side, institutional conduit and preferred equity on the other.',
  },
  {
    title: 'Work that compounds',
    body: 'Most of what we finance is housing people live in. Growing rental supply is a commercial strategy and a public one at the same time.',
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Careers', path: '/careers' }])} />

      <PageHeader
        figureIndex={1}
        eyebrow="Careers"
        title="Build in a market that is still being built."
        lede="Peakhill is growing across every discipline and every region. If you want responsibility early, decisions made near you, and a platform wide enough to keep learning on, we would like to hear from you."
        crumbs={[{ name: 'Careers', path: '/careers' }]}
      >
        <div className="mt-10">
          <ButtonLink
            href={`mailto:${site.email.careers}?subject=Career%20enquiry`}
            variant="primary-on-navy"
            size="lg"
          >
            Send us your CV
          </ButtonLink>
        </div>
      </PageHeader>

      {/* What it's like */}
      <Section surface="paper" padding="lg" aria-labelledby="life-heading">
        <Container>
          <SectionHeading
            id="life-heading"
            figureIndex={2}
            eyebrow="What it is like"
            title="Four things that are actually true here."
            align="wide"
          />

          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
            {whatItIsLike.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="flex flex-col gap-4 border-t border-paper-line pt-6">
                  <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl leading-tight text-ink">{item.title}</h3>
                  <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Where we hire */}
      <Section surface="navy" padding="lg" aria-labelledby="hiring-heading">
        <Container>
          <SectionHeading
            id="hiring-heading"
            figureIndex={3}
            eyebrow="Where we hire"
            title="Every discipline, every office."
            lede="We do not run a fixed requisition list on this page. Roles open continuously across the platform, so the most reliable route in is to tell us what you do and where you want to do it."
            tone="paper"
            align="wide"
          />

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="flex flex-col gap-4">
                <p className="figure-label text-brass">Disciplines</p>
                <ul className="flex flex-col">
                  {disciplines.map((discipline) => (
                    <li
                      key={discipline.name}
                      className="border-b border-navy-line py-4 text-lg text-paper first:border-t"
                    >
                      {discipline.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex flex-col gap-4">
                <p className="figure-label text-brass">Locations</p>
                <ul className="flex flex-col">
                  {offices.map((office) => (
                    <li
                      key={office.id}
                      className="flex items-baseline justify-between gap-6 border-b border-navy-line py-4 first:border-t"
                    >
                      <span className="text-lg text-paper">{office.city}</span>
                      <span className="text-sm text-navy-muted">{office.region}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* How to apply */}
      <Section surface="paper" padding="lg" aria-labelledby="apply-heading">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              id="apply-heading"
              figureIndex={4}
              eyebrow="How to apply"
              title="One email is enough."
              lede="Send a CV and a short note about the kind of work you want to be doing. Tell us the discipline and the city. We read everything that comes in, and we reply."
            />

            <Reveal delay={80}>
              <div className="flex flex-col gap-6 border-t border-paper-line pt-8">
                <p className="figure-label text-brass-ink">Applications</p>
                <a
                  href={`mailto:${site.email.careers}?subject=Career%20enquiry`}
                  className="w-fit font-display text-3xl text-ink underline decoration-brass-ink/40 underline-offset-8 transition-[text-decoration-color] duration-(--duration-fast) hover:decoration-brass-ink"
                >
                  {site.email.careers}
                </a>
                <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  Please do not include sensitive personal information beyond what is normally on a
                  CV. We use what you send only to assess your application.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Questions"
        title="Not sure where you'd fit?"
        body="If you are unsure which discipline matches your background, write to us anyway and describe the work you have done. We would rather have the conversation."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/about', label: 'About the firm' }}
      />
    </>
  );
}
