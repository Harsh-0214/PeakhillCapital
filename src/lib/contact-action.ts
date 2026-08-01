'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { clientKey, rateLimit } from '@/lib/rate-limit';
import { site } from '@/lib/site';

/**
 * Contact form submission handler.
 *
 * Defences, in the order they run:
 *  1. Rate limit by client IP — 5 submissions per 10 minutes.
 *  2. Honeypot field that no human ever sees or fills.
 *  3. Submission-timing check: a form completed in under 2.5 seconds was not
 *     typed by a person.
 *  4. Zod schema validation with hard length caps on every field, so an
 *     oversized payload is rejected before it reaches an email provider.
 *
 * A bot that trips (2) or (3) receives the SUCCESS response. Telling a scraper
 * exactly which control caught it is free tuning information; letting it
 * believe it succeeded is not.
 *
 * Nothing here logs the message body, the sender's name or their email.
 */

const ENQUIRY_TYPES = [
  'Financing enquiry',
  'Investor relations',
  'Careers',
  'General enquiry',
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z
    .string()
    .trim()
    .min(3, 'Please enter your email address.')
    .max(200)
    .email('Please enter a valid email address.'),
  organisation: z.string().trim().max(160).optional().or(z.literal('')),
  enquiryType: z.enum(ENQUIRY_TYPES, { message: 'Please choose an enquiry type.' }),
  message: z
    .string()
    .trim()
    .min(20, 'Please give us a little more detail — at least 20 characters.')
    .max(4000, 'Please keep your message under 4,000 characters.'),
  // Honeypot. Rendered off-screen and aria-hidden; must stay empty.
  website: z.string().max(0).optional().or(z.literal('')),
  // Client-stamped mount time, used for the timing check.
  renderedAt: z.string().optional(),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Field-level errors, keyed by input name, for inline display. */
  fieldErrors?: Partial<Record<'name' | 'email' | 'enquiryType' | 'message', string>>;
};

const MIN_FILL_MS = 2_500;

export async function submitContactForm(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  const requestHeaders = await headers();

  // 1. Rate limit
  const limited = rateLimit({
    key: `contact:${clientKey(requestHeaders)}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limited.allowed) {
    return {
      status: 'error',
      message: `Too many submissions. Please try again in about ${Math.ceil(
        limited.retryAfterSeconds / 60
      )} minute(s), or email us directly at ${site.email.general}.`,
    };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    organisation: formData.get('organisation'),
    enquiryType: formData.get('enquiryType'),
    message: formData.get('message'),
    website: formData.get('website'),
    renderedAt: formData.get('renderedAt'),
  });

  // 2 & 3. Honeypot and timing. Both answer "success" on purpose.
  const honeypot = formData.get('website');
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return { status: 'success', message: successMessage() };
  }

  const renderedAt = Number(formData.get('renderedAt'));
  if (Number.isFinite(renderedAt) && renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS) {
    return { status: 'success', message: successMessage() };
  }

  // 4. Validation
  if (!parsed.success) {
    const fieldErrors: ContactState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === 'name' ||
        field === 'email' ||
        field === 'enquiryType' ||
        field === 'message'
      ) {
        fieldErrors[field] ??= issue.message;
      }
    }

    return {
      status: 'error',
      message: 'Please check the highlighted fields and try again.',
      fieldErrors,
    };
  }

  const submission = parsed.data;

  // --- Delivery ------------------------------------------------------------
  // With no provider configured the submission is accepted and the visitor is
  // told plainly to email us. That is better than a success message for a
  // message that went nowhere.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email.general;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      status: 'success',
      message: `Thank you. Email delivery is not yet configured on this deployment, so please also send your note directly to ${site.email.general} to be certain it reaches us.`,
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject: `[Website] ${submission.enquiryType} — ${submission.name}`,
        // Plain text only. There is no HTML template to inject into.
        text: [
          `Enquiry type: ${submission.enquiryType}`,
          `Name: ${submission.name}`,
          `Email: ${submission.email}`,
          `Organisation: ${submission.organisation || '—'}`,
          '',
          submission.message,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      // Log the status only — never the payload, which contains personal data.
      console.error('[contact] delivery failed with status', response.status);
      return {
        status: 'error',
        message: `We could not send your message. Please email us directly at ${site.email.general}.`,
      };
    }
  } catch {
    return {
      status: 'error',
      message: `We could not send your message. Please email us directly at ${site.email.general}.`,
    };
  }

  return { status: 'success', message: successMessage() };
}

function successMessage(): string {
  return 'Thank you — your message has been received. Someone from the relevant team will be in touch shortly.';
}

export async function getEnquiryTypes(): Promise<readonly string[]> {
  return ENQUIRY_TYPES;
}
