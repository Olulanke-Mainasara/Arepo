import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'
import type { ProcessStep } from '~/data/types'

/**
 * Oversized numerals set in the mono face, so they read as operational
 * sequence rather than decoration.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null)
  useReveal(ref, { stagger: 0.08 })

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          lead="Consultancy through to support."
          rest="The same five steps, every engagement."
        />

        <ol ref={ref} className="mt-12 border-t border-navy-800/15">
          {steps.map(step => (
            <li
              key={step.n}
              data-reveal
              className="grid gap-4 border-b border-navy-800/15 py-8 sm:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr] lg:gap-10"
            >
              <span className="font-mono text-display leading-none text-cyan-700">
                {String(step.n).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-h3 text-navy-800">{step.title}</h3>
                <p className="mt-2 max-w-[54ch] text-base text-navy-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
