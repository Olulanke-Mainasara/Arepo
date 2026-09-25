import { imageSlots } from '~/data/images'

/**
 * Reserves each slot's declared aspect ratio whether or not real
 * photography exists, so adding a `src` later causes zero layout shift.
 *
 * While `src` is undefined it renders a flat navy block carrying the
 * subject brief. Useful in review, and honest about what is missing.
 */
interface Props {
  slot: string
  className?: string
  priority?: boolean
  /**
   * Fill the positioned parent instead of reserving the declared ratio.
   * For full-bleed backgrounds, where the section sets its own height and
   * an aspect-ratio would fight it.
   */
  fill?: boolean
}

export function Figure({ slot, className = '', priority = false, fill = false }: Props) {
  const spec = imageSlots[slot]
  if (!spec) throw new Error(`Unknown image slot: ${slot}`)

  const sizing = fill ? 'absolute inset-0 h-full w-full' : 'w-full'
  const ratio = fill ? undefined : { aspectRatio: spec.ratio }

  if (spec.src) {
    return (
      <img
        src={spec.src}
        alt={fill ? '' : spec.alt}
        aria-hidden={fill || undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`object-cover ${sizing} ${className}`}
        style={ratio}
      />
    )
  }

  // Decorative backgrounds carry no alt; the heading over them says it.
  const a11y = fill
    ? { 'aria-hidden': true as const }
    : { role: 'img', 'aria-label': spec.alt }

  return (
    <div
      {...a11y}
      data-image-placeholder={spec.key}
      className={`bg-navy-900 flex items-end p-4 ${sizing} ${className}`}
      style={ratio}
    >
      <span className="text-xs text-cyan-500/80 leading-snug">
        {spec.subject}
      </span>
    </div>
  )
}
