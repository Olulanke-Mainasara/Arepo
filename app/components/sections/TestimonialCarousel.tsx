import { useState } from 'react'
import { Container } from '~/components/ui/Container'
import type { Testimonial } from '~/data/types'

/**
 * Renders nothing while there are no testimonials — which is the current
 * state. The live site links to a testimonials page but none of its copy
 * was captured, and fabricating quotes attributed to real transport
 * operators is not acceptable. Populate data/testimonials.ts to enable.
 */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0)

  if (testimonials.length === 0) return null

  const current = testimonials[index]
  const go = (delta: number) =>
    setIndex(i => (i + delta + testimonials.length) % testimonials.length)

  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <figure>
          <blockquote className="text-h2 max-w-[28ch] text-balance">
            “{current.quote}”
          </blockquote>
          <figcaption className="mt-6 font-mono text-sm text-white/60">
            {current.attribution} · {current.organisation}
          </figcaption>
        </figure>

        {testimonials.length > 1 && (
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="border border-white/30 px-4 py-2 text-base hover:border-cyan-500 hover:text-cyan-500"
            >
              <span aria-hidden="true">&larr;</span>
              <span className="sr-only">Previous testimonial</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="border border-white/30 px-4 py-2 text-base hover:border-cyan-500 hover:text-cyan-500"
            >
              <span aria-hidden="true">&rarr;</span>
              <span className="sr-only">Next testimonial</span>
            </button>
            <p className="font-mono text-xs text-white/50" aria-live="polite">
              {index + 1} / {testimonials.length}
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
