import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  return (
    <Container className="py-20">
      <div ref={ref}>
        <SectionHeading
          as="h1"
          lead="Online database solutions."
          rest="Built for the operations that move people."
          className="[&]:max-w-[24ch]"
        />
        <p data-reveal className="mt-6 text-lead text-navy-600">Reveal target</p>
      </div>
    </Container>
  )
}
