import { Container } from '~/components/ui/Container'
import type { Client } from '~/data/types'

/**
 * No logo image files were supplied, so client names are set as type.
 * Ask the client for SVGs — this wall is their strongest asset and it
 * currently sits below the fold as unaligned bitmaps.
 *
 * The visible marquee is aria-hidden and duplicated for a seamless loop;
 * the accessible copy is the real list beneath it.
 */
export function LogoWall({ clients }: { clients: Client[] }) {
  return (
    <section className="on-dark bg-navy-950 border-t border-white/10 py-12 text-white">
      <Container>
        <h2 className="text-base text-white/60">
          Trusted by the operators who run Britain’s transport network
        </h2>
      </Container>

      <div className="relative mt-8 overflow-hidden" aria-hidden="true">
        <div className="marquee flex w-max gap-12 px-6">
          {[0, 1].map(copy => (
            <ul key={copy} className="flex shrink-0 items-center gap-12">
              {clients.map(client => (
                <li
                  key={client.name}
                  className="font-mono text-sm whitespace-nowrap text-white/55"
                >
                  {client.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {clients.map(client => (
          <li key={client.name}>
            {client.name} — {client.note}
          </li>
        ))}
      </ul>
    </section>
  )
}
