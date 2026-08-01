import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { ArrowLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatGrid } from '@/components/ui/stat';
import { firm } from '@/content/firm';
import { offices } from '@/content/offices';
import { disciplines } from '@/content/team';
import { breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About the Firm',
  description:
    'Founded in 2019, Peakhill Capital is a commercial real estate investment manager operating across credit and equity in Canada and the United States, from five North American offices.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Firm', path: '/about' }])} />

      <PageHeader
        figureIndex={1}
        eyebrow="The firm"
        title="Built to underwrite the whole capital structure."
        lede={`Founded in ${firm.founded} and headquartered in ${firm.headquarters}, Peakhill Capital invests and lends across North American commercial real estate — with origination, credit, fund management, asset management and loan servicing under one roof.`}
        crumbs={[{ name: 'Firm', path: '/about' }]}
      />

      {/* Vision */}
      <Section surface="paper" padding="lg" aria-labelledby="vision-heading">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
            <Reveal>
              <p id="vision-heading" className="figure-label text-brass-ink lg:pt-4">
                <span aria-hidden="true" className="mr-3 inline-block h-px w-6 bg-brass-ink/45 align-middle" />
                Our vision
              </p>
            </Reveal>
            <Reveal delay={70}>
              <blockquote className="max-w-[24ch] font-display text-4xl leading-[1.12] text-balance text-ink">
                {firm.vision}
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section surface="navy" padding="lg" aria-labelledby="principles-heading">
        <Container>
          <SectionHeading
            id="principles-heading"
            figureIndex={2}
            eyebrow="How we operate"
            title="Four commitments that shape every file."
            tone="paper"
            align="wide"
          />

          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
            {firm.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 60}>
                <div className="flex flex-col gap-4 border-t border-navy-line pt-6">
                  <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl leading-tight text-paper">{principle.title}</h3>
                  <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-navy-muted">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Disciplines */}
      <Section surface="paper" padding="lg" aria-labelledby="disciplines-heading">
        <Container>
          <SectionHeading
            id="disciplines-heading"
            figureIndex={3}
            eyebrow="Under one roof"
            title="Six disciplines, one platform."
            lede="A borrower or an allocator deals with one firm. Behind that is a set of specialist functions that most managers of this size outsource — which is what makes the certainty we promise deliverable."
            align="wide"
          />

          <dl className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline, index) => (
              <Reveal
                key={discipline.name}
                delay={index * 50}
                className="flex flex-col gap-3 border-t border-paper-line pt-5"
              >
                <dt className="text-xl text-ink">{discipline.name}</dt>
                <dd className="m-0 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {discipline.body}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={140} className="mt-12">
            <ArrowLink href="/team">Meet the team</ArrowLink>
          </Reveal>
        </Container>
      </Section>

      {/* Scale */}
      <Section surface="paper-warm" padding="lg" aria-labelledby="scale-heading">
        <Container>
          <SectionHeading
            id="scale-heading"
            figureIndex={4}
            eyebrow="Scale"
            title="The platform in figures."
          />
          <div className="mt-14">
            <StatGrid stats={firm.headlineStats} />
          </div>
          <div className="mt-16 border-t border-paper-line pt-14">
            <StatGrid stats={firm.platformStats} />
          </div>
        </Container>
      </Section>

      {/* Footprint */}
      <Section surface="paper" padding="lg" aria-labelledby="footprint-heading">
        <Container>
          <SectionHeading
            id="footprint-heading"
            figureIndex={5}
            eyebrow="Footprint"
            title="Five offices, two countries."
            lede="Origination is regional by design. Local teams know their submarkets, their sponsors and their municipalities — which is not something a national desk can replicate from a distance."
            align="wide"
          />

          <ol className="mt-14 flex flex-col">
            {offices.map((office, index) => (
              <Reveal
                key={office.id}
                as="li"
                delay={index * 50}
                className="flex flex-col gap-2 border-b border-paper-line py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 first:border-t"
              >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-2xl text-ink">
                      {office.city}
                      {office.isHeadquarters ? (
                        <span className="ml-3 font-mono text-2xs tracking-[0.14em] text-brass-ink align-middle">
                          HQ
                        </span>
                      ) : null}
                    </span>
                  </span>
                <span className="text-sm text-ink-soft sm:text-right">
                  {office.region}, {office.country}
                </span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Get in touch"
        title="Start with the specifics."
        body="Whether you are allocating capital or financing a project, the useful conversation is about the transaction in front of you."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/careers', label: 'Careers at Peakhill' }}
      />
    </>
  );
}
