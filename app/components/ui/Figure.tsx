import { imageSlots } from '~/data/images'

/**
 * Reserves each slot's declared aspect ratio whether or not real
 * photography exists, so adding a `src` later causes zero layout shift.
 *
 * While `src` is undefined it renders a flat navy block carrying the
 * subject brief — useful in review, and honest about what is missing.
 */
interface Props {
  slot: string
  className?: string
  priority?: boolean
}

export function Figure({ slot, className = '', priority = false }: Props) {
  const spec = imageSlots[slot]
  if (!spec) throw new Error(`Unknown image slot: ${slot}`)

  if (spec.src) {
    return (
      <img
        src={spec.src}
        alt={spec.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full object-cover ${className}`}
        style={{ aspectRatio: spec.ratio }}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={spec.alt}
      data-image-placeholder={spec.key}
      className={`w-full bg-navy-900 flex items-end p-4 ${className}`}
      style={{ aspectRatio: spec.ratio }}
    >
      <span className="font-mono text-xs text-cyan-500/80 leading-snug">
        {spec.subject}
      </span>
    </div>
  )
}
