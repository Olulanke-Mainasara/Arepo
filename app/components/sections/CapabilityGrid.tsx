import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'
import type { Capability } from '~/data/types'

export function CapabilityGrid({ capabilities }: { capabilities: Capability[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <SectionHeading
          lead="And when nothing off the shelf fits."
          rest="We build the database your operation actually needs."
        />

        <div ref={ref} className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(capability => (
            <div key={capability.title} data-reveal className="border-t border-navy-800/20 pt-4">
              <h3 className="text-h3 text-navy-800">{capability.title}</h3>
              <p className="mt-2 text-base text-navy-600">{capability.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
