import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'
import type { ProcessStep } from '~/data/types'

/**
 * The live "Our Unique Approach" page: three numbered sections, verbatim.
 * Oversized numerals so they read as a sequence rather than decoration.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null)
  useReveal(ref, { stagger: 0.08 })

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          lead="Our unique approach."
          rest="Designed to evolve with your business."
        />

        <ol ref={ref} className="mt-12 border-t border-navy-800/15">
          {steps.map(step => (
            <li
              key={step.n}
              data-reveal
              className="grid gap-4 border-b border-navy-800/15 py-8 sm:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr] lg:gap-10"
            >
              <span className="text-display tabular-nums leading-none text-cyan-700">
                {String(step.n).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-h3 text-navy-800">{step.title}</h3>
                <p className="mt-2 max-w-[68ch] text-base text-navy-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
