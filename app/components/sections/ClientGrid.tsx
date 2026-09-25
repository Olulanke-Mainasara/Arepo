import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { ClientLogo } from '~/components/ui/ClientLogo'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'
import type { Client } from '~/data/types'

/**
 * The full client list for the About page: each logo in colour, as the
 * live site serves it, with the name and what the client does.
 */
export function ClientGrid({ clients }: { clients: Client[] }) {
  const ref = useRef<HTMLUListElement>(null)
  useReveal(ref, { stagger: 0.04 })

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          lead="Our Clients."
          rest="Our clients range from individuals and start-ups to blue-chip multi-national companies."
        />

        <ul ref={ref} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map(client => (
            <li
              key={client.name}
              data-reveal
              className="flex flex-col gap-6 rounded-2xl border border-navy-800/15 p-6"
            >
              <div className="flex h-14 items-center">
                <ClientLogo client={client} decorative />
              </div>
              <div>
                <p className="text-h3 text-navy-800">{client.name}</p>
                <p className="mt-1 text-xs text-navy-600">{client.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
