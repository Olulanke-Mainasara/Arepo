import { useRef, useState } from 'react'
import { Button } from '~/components/ui/Button'
import { Field, controlClass } from '~/components/ui/Field'
import { company } from '~/data/company'
import {
  submitContactForm,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from '~/lib/contact'

type Touched = Partial<Record<keyof ContactInput, boolean>>

const EMPTY: Omit<ContactInput, 'startedAt'> = {
  name: '',
  telephone: '',
  email: '',
  message: '',
  consent: false,
  marketing: false,
  website: '',
}

export function ContactForm() {
  // Captured once on mount. Compared against submit time to reject bots.
  const [startedAt] = useState(() => Date.now())
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Touched>({})
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)

  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  const input = (): ContactInput => ({ ...values, startedAt })

  function set<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  /** Validate a single field, but only once the user has left it. */
  function handleBlur(key: keyof ContactInput) {
    setTouched(prev => ({ ...prev, [key]: true }))
    const all = validateContact(input())
    setErrors(prev => ({ ...prev, [key]: all[key] }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const found = validateContact(input())
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setTouched({ name: true, email: true, message: true, consent: true })
      // Move focus to the summary so the problem is announced, not just shown.
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    setPending(true)
    const result = await submitContactForm(input())
    setPending(false)

    if (result.ok) {
      setSent(true)
      requestAnimationFrame(() => successRef.current?.focus())
      return
    }

    setErrors(result.errors)
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  if (sent) {
    return (
      <div className="border-2 border-navy-800 p-8">
        <h2 ref={successRef} tabIndex={-1} className="text-h2 text-navy-800">
          Thank you, your message has been sent.
        </h2>
        <p className="mt-4 max-w-[52ch] text-base text-navy-600">
          We will get back to you shortly. If it is urgent, call us on{' '}
          <a href={company.phoneHref} className="text-cyan-700 underline">
            {company.phone}
          </a>
          .
        </p>
      </div>
    )
  }

  const shown = Object.entries(errors).filter(
    ([key, message]) => message && (key === 'form' || touched[key as keyof ContactInput]),
  ) as [string, string][]

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {shown.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-2 border-navy-800 p-5"
        >
          <h2 className="text-h3 text-navy-800">There is a problem</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {shown.map(([key, message]) => (
              <li key={key}>
                {key === 'form' ? (
                  <span className="text-base text-navy-800">{message}</span>
                ) : (
                  <a href={`#${key}`} className="text-base text-cyan-700 underline">
                    {message}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Field id="name" label="Name" required error={touched.name ? errors.name : undefined}>
        {a11y => (
          <input
            {...a11y}
            type="text"
            autoComplete="name"
            className={controlClass}
            value={values.name}
            onChange={e => set('name', e.target.value)}
            onBlur={() => handleBlur('name')}
          />
        )}
      </Field>

      <Field id="telephone" label="Telephone">
        {a11y => (
          <input
            {...a11y}
            type="tel"
            autoComplete="tel"
            className={controlClass}
            value={values.telephone}
            onChange={e => set('telephone', e.target.value)}
          />
        )}
      </Field>

      <Field
        id="email"
        label="Email"
        required
        error={touched.email ? errors.email : undefined}
      >
        {a11y => (
          <input
            {...a11y}
            type="email"
            autoComplete="email"
            placeholder="your.name@example.com"
            className={controlClass}
            value={values.email}
            onChange={e => set('email', e.target.value)}
            onBlur={() => handleBlur('email')}
          />
        )}
      </Field>

      <Field
        id="message"
        label="Message"
        required
        error={touched.message ? errors.message : undefined}
      >
        {a11y => (
          <textarea
            {...a11y}
            rows={6}
            placeholder="Type your message here"
            className={controlClass}
            value={values.message}
            onChange={e => set('message', e.target.value)}
            onBlur={() => handleBlur('message')}
          />
        )}
      </Field>

      {/*
        Honeypot. sr-only rather than display:none, because bots detect the latter.
        Never announced, never tabbable, never autofilled.
      */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={e => set('website', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            className="mt-1.5 size-4 shrink-0 accent-navy-800"
            checked={values.consent}
            aria-invalid={Boolean(touched.consent && errors.consent)}
            aria-describedby={touched.consent && errors.consent ? 'consent-error' : undefined}
            onChange={e => set('consent', e.target.checked)}
            onBlur={() => handleBlur('consent')}
          />
          <label htmlFor="consent" className="text-base">
            I have read and understood the{' '}
            <a
              href={company.privacyPolicyHref}
              rel="noreferrer"
              className="text-cyan-700 underline"
            >
              Arepo privacy policy
            </a>
            <span className="text-cyan-700" aria-hidden="true">
              {' '}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </label>
        </div>
        {touched.consent && errors.consent && (
          <p id="consent-error" className="border-l-2 border-cyan-700 pl-3 text-sm font-medium text-navy-800">
            {errors.consent}
          </p>
        )}

        <div className="flex items-start gap-3">
          <input
            id="marketing"
            type="checkbox"
            className="mt-1.5 size-4 shrink-0 accent-navy-800"
            checked={values.marketing}
            onChange={e => set('marketing', e.target.checked)}
          />
          <label htmlFor="marketing" className="text-base">
            I would like to receive news and updates from Arepo Solutions
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-xs text-navy-600">We operate a no-spam policy.</p>
      </div>
    </form>
  )
}
