'use client';

import { useActionState, useEffect, useId, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { submitContactForm, type ContactState } from '@/lib/contact-action';
import { cn } from '@/lib/cn';

const ENQUIRY_TYPES = [
  'Financing enquiry',
  'Investor relations',
  'Careers',
  'General enquiry',
] as const;

const initialState: ContactState = { status: 'idle' };

/**
 * Contact form.
 *
 * Form UX rules applied here rather than left to chance:
 *  - Every input has a real visible <label>. Placeholders are never labels.
 *  - Errors render beneath the field that caused them, tied by aria-describedby.
 *  - On a failed submit, focus moves to the first invalid field.
 *  - The result banner is a live region, so it is announced rather than only seen.
 *  - Submit is disabled with a visible pending state during the request.
 *  - Semantic input types and autocomplete tokens, so browsers can autofill.
 *
 * The honeypot is positioned off-screen instead of `display: none` — some bots
 * skip hidden fields, and off-screen is equally invisible to a sighted user
 * while `aria-hidden` and `tabIndex={-1}` keep it away from everyone else.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    if (state.status === 'error' && state.fieldErrors) {
      const firstInvalid = Object.keys(state.fieldErrors)[0];
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus({ preventScroll: false });
        return;
      }
    }
    if (state.status !== 'idle') {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="flex flex-col gap-4 border border-brass-ink/35 bg-paper-warm p-8"
      >
        <p className="figure-label text-brass-ink">Message received</p>
        <p className="max-w-[48ch] text-lg leading-relaxed text-ink">{state.message}</p>
      </div>
    );
  }

  const fieldError = (field: keyof NonNullable<ContactState['fieldErrors']>) =>
    state.fieldErrors?.[field];

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-7">
      {/* Honeypot — invisible to people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-website`}>Website</label>
        <input
          id={`${baseId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {/*
        Mount timestamp for the action's timing check.

        Written through a REF CALLBACK rather than rendered as a value. Ref
        callbacks run at commit, so `Date.now()` never executes during render
        (which must stay pure) and never runs during the server pass (which
        would disagree with the client on hydration). It also measures the
        moment the form actually became interactive, which is the number the
        "was this filled in faster than a human could type" check wants.
      */}
      <input
        type="hidden"
        name="renderedAt"
        ref={(node) => {
          if (node) node.value = String(Date.now());
        }}
      />

      {state.status === 'error' && !state.fieldErrors ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border border-danger/40 bg-danger/[0.06] p-5 text-[0.9375rem] leading-relaxed text-ink"
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <Field
          id={`${baseId}-name`}
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={fieldError('name')}
        />
        <Field
          id={`${baseId}-email`}
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          error={fieldError('email')}
        />
      </div>

      <Field
        id={`${baseId}-organisation`}
        name="organisation"
        label="Organisation"
        optional
        autoComplete="organization"
      />

      <div className="flex flex-col gap-2.5">
        <Label htmlFor={`${baseId}-type`} required>
          Enquiry type
        </Label>
        <select
          id={`${baseId}-type`}
          name="enquiryType"
          required
          defaultValue=""
          aria-describedby={fieldError('enquiryType') ? `${baseId}-type-error` : undefined}
          aria-invalid={fieldError('enquiryType') ? true : undefined}
          className={cn(
            'min-h-12 w-full appearance-none border bg-paper px-4 py-3 text-ink',
            'transition-colors duration-(--duration-fast) ease-(--ease-out)',
            fieldError('enquiryType')
              ? 'border-danger'
              : 'border-ink/25 hover:border-ink/45 focus:border-ink'
          )}
        >
          <option value="" disabled>
            Select one…
          </option>
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FieldError id={`${baseId}-type-error`} message={fieldError('enquiryType')} />
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor={`${baseId}-message`} required>
          Message
        </Label>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={6}
          required
          aria-describedby={
            fieldError('message') ? `${baseId}-message-error` : `${baseId}-message-hint`
          }
          aria-invalid={fieldError('message') ? true : undefined}
          className={cn(
            'w-full resize-y border bg-paper px-4 py-3 text-ink',
            'transition-colors duration-(--duration-fast) ease-(--ease-out)',
            fieldError('message')
              ? 'border-danger'
              : 'border-ink/25 hover:border-ink/45 focus:border-ink'
          )}
        />
        {fieldError('message') ? (
          <FieldError id={`${baseId}-message-error`} message={fieldError('message')} />
        ) : (
          <p id={`${baseId}-message-hint`} className="text-sm text-ink-soft">
            The asset, the ask and the timeline is plenty to start with.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5 border-t border-paper-line pt-7">
        <p className="max-w-[56ch] text-sm leading-relaxed text-ink-soft">
          By submitting this form you consent to us using the information you provide to respond to
          your enquiry. We do not sell personal information. See our{' '}
          <Link
            href="/legal/privacy"
            className="text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
          >
            privacy policy
          </Link>
          .
        </p>

        <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-fit">
          {isPending ? (
            <>
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
              />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </Button>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  optional,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
      {children}
      {required ? (
        <span className="ml-1 text-brass-ink" aria-hidden="true">
          *
        </span>
      ) : null}
      {optional ? <span className="ml-2 font-normal text-ink-soft">(optional)</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-2 text-sm text-danger">
      {/* Never colour alone — the icon carries the same meaning. */}
      <svg
        aria-hidden="true"
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        className="mt-[0.15em] shrink-0"
      >
        <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 4.8v4M8 10.9v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  type = 'text',
  required,
  optional,
  autoComplete,
  inputMode,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel';
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          'min-h-12 w-full border bg-paper px-4 py-3 text-ink',
          'transition-colors duration-(--duration-fast) ease-(--ease-out)',
          error ? 'border-danger' : 'border-ink/25 hover:border-ink/45 focus:border-ink'
        )}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
