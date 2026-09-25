import { company } from '~/data/company'

export interface ContactInput {
  name: string
  telephone: string
  email: string
  message: string
  consent: boolean
  marketing: boolean
  /** Honeypot. Must stay empty; bots fill it. */
  website: string
  /** Epoch ms captured when the form mounted. */
  startedAt: number
}

export type ContactErrors = Partial<Record<keyof ContactInput | 'form', string>>
export type ContactResult = { ok: true } | { ok: false; errors: ContactErrors }

/** Minimum time a genuine person takes to complete the form. */
export const MIN_FILL_MS = 3000

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * A single generic message for both bot checks. Telling a bot which check
 * it tripped would let it iterate; a person gets a way to reach Arepo.
 */
const REJECTED = `Your message could not be sent. Please call us on ${company.phone}.`

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}

  if (!input.name.trim()) {
    errors.name = 'Enter your name'
  }

  if (!input.email.trim()) {
    errors.email = 'Enter your email address'
  } else if (!EMAIL.test(input.email.trim())) {
    errors.email = 'Enter an email address in the format name@example.com'
  }

  if (!input.message.trim()) {
    errors.message = 'Enter your message'
  }

  if (!input.consent) {
    errors.consent = 'Confirm you have read the privacy policy'
  }

  return errors
}

/**
 * The backend seam, and the CAPTCHA replacement.
 *
 * The live site gates this form behind a distorted-text CAPTCHA with no
 * audio or non-visual alternative, which fails WCAG 1.1.1 on the one page
 * where failing it costs a lead. A honeypot field plus a minimum fill time
 * does the same job invisibly, needs no backend, and survives unchanged
 * when a real endpoint is wired in.
 *
 * To go live: replace the mocked delay with a POST. The signature and the
 * validation above do not change.
 */
export async function submitContactForm(input: ContactInput): Promise<ContactResult> {
  const errors = validateContact(input)
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  if (input.website.trim() !== '') {
    return { ok: false, errors: { form: REJECTED } }
  }

  if (Date.now() - input.startedAt < MIN_FILL_MS) {
    return { ok: false, errors: { form: REJECTED } }
  }

  // MOCK: replace this body with a real POST.
  await new Promise(resolve => setTimeout(resolve, 800))
  return { ok: true }
}
