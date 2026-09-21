import type { ReactNode } from 'react'

/**
 * Carries the accessibility contract for the contact form: a real label,
 * and hint/error text associated programmatically rather than by proximity.
 *
 * The render-prop hands the control its a11y attributes so a caller cannot
 * forget them.
 */
export interface FieldA11y {
  id: string
  'aria-invalid': boolean
  'aria-describedby': string | undefined
  required: boolean
}

interface Props {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: (a11y: FieldA11y) => ReactNode
}

export function Field({ id, label, error, hint, required = false, children }: Props) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-medium">
        {label}
        {required && (
          <>
            <span className="text-cyan-700 ml-1" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>

      {hint && (
        <p id={hintId} className="text-sm text-navy-600">
          {hint}
        </p>
      )}

      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        required,
      })}

      {error && (
        <p id={errorId} className="text-sm font-medium text-navy-800 border-l-2 border-cyan-700 pl-3">
          {error}
        </p>
      )}
    </div>
  )
}

/** Shared input styling so every control in the form matches. */
export const controlClass =
  'w-full border border-navy-800/30 bg-white px-4 py-3 text-base text-navy-800 ' +
  'placeholder:text-navy-600/60 aria-[invalid=true]:border-navy-800 aria-[invalid=true]:border-2'
