import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'
import type { Client } from '~/data/types'

/**
 * The full, static client list — unlike the home page marquee. Names are
 * set as type because no logo files were supplied; request SVGs.
 */
export function ClientGrid({ clients }: { clients: Client[] }) {
  const ref = useRef<HTMLUListElement>(null)
  useReveal(ref, { stagger: 0.04 })

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          lead="From start-ups to blue-chip multinationals."
          rest="These are the operations running Arepo software."
        />

        <ul ref={ref} className="mt-12 grid gap-px bg-navy-800/15 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map(client => (
            <li key={client.name} data-reveal className="bg-white p-6">
              <p className="text-h3 text-navy-800">{client.name}</p>
              <p className="mt-1 font-mono text-xs text-navy-600">{client.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
