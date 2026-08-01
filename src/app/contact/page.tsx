import type { Metadata } from 'next';
import { ContactForm } from '@/components/sections/contact-form';
import { PageHeader } from '@/components/sections/page-header';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal } from '@/components/ui/reveal';
import { Container, Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { offices } from '@/content/offices';
import { breadcrumbSchema } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Peakhill Capital. Offices in Toronto, Montreal, Calgary, Vancouver and Minneapolis, serving borrowers and investors across North America.',
  path: '/contact',
});

/** Direct routes, offered before the form. Most people prefer them. */
const directContacts = [
  {
    label: 'Financing enquiries',
    detail: 'Borrowers, sponsors and brokers',
    value: site.email.general,
    href: `mailto:${site.email.general}`,
  },
  {
    label: 'Investor relations',
    detail: 'Allocators, family offices, wealth platforms',
    value: site.email.investors,
    href: `mailto:${site.email.investors}`,
  },
  {
    label: 'Careers',
    detail: 'Applications and recruitment',
    value: site.email.careers,
    href: `mailto:${site.email.careers}`,
  },
  {
    label: 'Head office',
    detail: 'Toronto, Ontario',
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Contact', path: '/contact' }])} />

      <PageHeader
        figureIndex={1}
        eyebrow="Contact"
        title="Start with the specifics."
        lede="The most useful first message names the asset, the ask and the timeline. Reach the right desk directly below, or send us a note and we will route it."
        crumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      {/* Direct contacts first — a form is a fallback, not a gate. */}
      <Section surface="paper" padding="lg" aria-labelledby="direct-heading">
        <Container>
          <SectionHeading
            id="direct-heading"
            figureIndex={2}
            eyebrow="Direct"
            title="Reach the right desk."
          />

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {directContacts.map((contact, index) => (
              <Reveal
                key={contact.label}
                as="li"
                delay={index * 50}
                className="flex flex-col gap-1.5 border-t border-paper-line py-6"
              >
                <span className="figure-label text-brass-ink">{contact.label}</span>
                <a
                  href={contact.href}
                  className="w-fit font-display text-2xl text-ink underline decoration-brass-ink/35 underline-offset-[7px] transition-[text-decoration-color] duration-(--duration-fast) hover:decoration-brass-ink"
                >
                  {contact.value}
                </a>
                <span className="text-sm text-ink-soft">{contact.detail}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Form */}
      <Section surface="paper-warm" padding="lg" grid={false} aria-labelledby="form-heading">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              id="form-heading"
              figureIndex={3}
              eyebrow="Send a message"
              title="Or write to us here."
              lede="Every message is read by a person. If we are not the right counterparty for what you are working on, we will tell you that rather than leave you waiting."
            />

            <Reveal delay={80}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Offices */}
      <Section surface="navy" padding="lg" aria-labelledby="offices-heading">
        <Container>
          <SectionHeading
            id="offices-heading"
            figureIndex={4}
            eyebrow="Offices"
            title="Five locations, two countries."
            tone="paper"
          />

          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, index) => (
              <Reveal
                key={office.id}
                as="li"
                delay={index * 50}
                className="flex flex-col gap-3 border-t border-navy-line pt-6"
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-2xl text-paper">{office.city}</span>
                  {office.isHeadquarters ? (
                    <span className="font-mono text-2xs tracking-[0.14em] text-brass uppercase">
                      HQ
                    </span>
                  ) : null}
                </span>
                <address className="text-[0.9375rem] leading-relaxed text-navy-muted not-italic">
                  {office.street}
                  <br />
                  {office.locality}, {office.regionCode} {office.postalCode}
                  <br />
                  {office.country}
                </address>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
