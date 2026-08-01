import type { Metadata } from 'next';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { PersonCard } from '@/components/sections/person-card';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { firm } from '@/content/firm';
import { offices } from '@/content/offices';
import { disciplines, leadership } from '@/content/team';
import { breadcrumbSchema, personSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Team',
  description:
    'Peakhill Capital brings origination, underwriting, credit, fund management, asset management and loan servicing under one roof, across five North American offices.',
  path: '/team',
});

export default function TeamPage() {
  const headcount = firm.headlineStats.find((stat) => stat.label === 'Professionals');

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Team', path: '/team' }])} />
      {leadership.map((person) => (
        <JsonLd key={person.slug} schema={personSchema(person)} />
      ))}

      <PageHeader
        figureIndex={1}
        eyebrow="Our people"
        title="The platform is the people in it."
        lede={`${headcount?.value ?? '175+'} professionals across ${offices.length} offices in Canada and the United States. Origination is regional, credit is central, and the person who assesses a file is accountable for it.`}
        crumbs={[{ name: 'Team', path: '/team' }]}
      />

      {/* Leadership */}
      <Section surface="paper" padding="lg" aria-labelledby="leadership-heading">
        <Container>
          <SectionHeading
            id="leadership-heading"
            figureIndex={2}
            eyebrow="Leadership"
            title="Who leads the firm."
          />

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, index) => (
              <Reveal key={person.slug} delay={index * 60}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Disciplines */}
      <Section surface="navy" padding="lg" aria-labelledby="disciplines-heading">
        <Container>
          <SectionHeading
            id="disciplines-heading"
            figureIndex={3}
            eyebrow="How the firm is organised"
            title="Six disciplines under one roof."
            lede="What matters when you are evaluating a manager is not only who signs the letter — it is which functions sit inside the firm and which are farmed out. All six of these are ours."
            tone="paper"
            align="wide"
          />

          <dl className="mt-16 grid grid-cols-1 gap-x-12 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline, index) => (
              <Reveal
                key={discipline.name}
                delay={index * 50}
                className="flex flex-col gap-3 border-t border-navy-line pt-5"
              >
                <dt className="flex items-baseline gap-4 text-xl text-paper">
                  <span className="font-mono tnum text-2xs tracking-[0.14em] text-brass">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {discipline.name}
                </dt>
                <dd className="m-0 text-[0.9375rem] leading-relaxed text-navy-muted">
                  {discipline.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Offices */}
      <Section surface="paper-warm" padding="lg" aria-labelledby="offices-heading">
        <Container>
          <SectionHeading
            id="offices-heading"
            figureIndex={4}
            eyebrow="Where we work"
            title="Regional by design."
            lede="Local teams know their submarkets, their sponsors and their municipalities. That is not something a national desk replicates from a distance."
            align="wide"
          />

          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {offices.map((office, index) => (
              <Reveal
                key={office.id}
                as="li"
                delay={index * 50}
                className="flex flex-col gap-2 border-t border-paper-line pt-5"
              >
                <span className="text-xl text-ink">{office.city}</span>
                <span className="text-sm text-ink-soft">{office.region}</span>
                {office.isHeadquarters ? (
                  <span className="font-mono text-2xs tracking-[0.14em] text-brass-ink uppercase">
                    Head office
                  </span>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Join us"
        title="We are hiring across the platform."
        body="Peakhill is growing in every discipline and every region. If you want to build in a fast-moving corner of commercial real estate, we would like to hear from you."
        primary={{ href: '/careers', label: 'View careers' }}
        secondary={{ href: '/contact', label: 'Contact us' }}
      />
    </>
  );
}
