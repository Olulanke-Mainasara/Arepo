import { useState } from 'react'
import { Container } from '~/components/ui/Container'
import { Pill } from '~/components/ui/Pill'
import { SectionIntro } from '~/components/ui/SectionIntro'
import type { Testimonial } from '~/data/types'

/**
 * Quotes from the live testimonials pages. Renders nothing while there
 * are none.
 *
 * Every quote sits in the same grid cell, so the section is always as tall
 * as the longest one and the page never jumps between slides. The hidden
 * ones are `invisible`, which also takes them out of the accessibility
 * tree.
 */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0)

  if (testimonials.length === 0) return null

  const go = (delta: number) =>
    setIndex(i => (i + delta + testimonials.length) % testimonials.length)

  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <SectionIntro
          heading={
            <>
              What our <Pill>customers</Pill> say
            </>
          }
        />

        <div className="mt-14 grid rounded-3xl border border-white/10 bg-navy-900 p-7 lg:p-12">
          {testimonials.map((testimonial, i) => (
            <figure
              key={testimonial.organisation}
              className={`col-start-1 row-start-1 flex flex-col justify-between gap-10 transition-opacity duration-300 ease-out ${
                i === index ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
            >
              <blockquote className="max-w-[48ch] text-h3 leading-[1.4] text-pretty">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="text-base">
                <span className="block text-white">{testimonial.organisation}</span>
                <span className="block text-white/60">{testimonial.attribution}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {testimonials.length > 1 && (
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-12 place-items-center rounded-full border border-white/30 text-base transition-colors duration-200 ease-out hover:border-cyan-500 hover:text-cyan-500"
            >
              <span aria-hidden="true">&larr;</span>
              <span className="sr-only">Previous testimonial</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-12 place-items-center rounded-full border border-white/30 text-base transition-colors duration-200 ease-out hover:border-cyan-500 hover:text-cyan-500"
            >
              <span aria-hidden="true">&rarr;</span>
              <span className="sr-only">Next testimonial</span>
            </button>
            <p className="text-sm tabular-nums text-white/50" aria-live="polite">
              {index + 1} / {testimonials.length}
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
