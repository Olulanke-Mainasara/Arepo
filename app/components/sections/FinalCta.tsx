import { useRef } from 'react'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Ribbon } from '~/components/ui/Ribbon'
import { company } from '~/data/company'
import { useDrift } from '~/lib/motion'

/**
 * Closes every page the way the home hero opens it: the same ribbon of
 * light rising across the wall, the ask set above it. The default ask is
 * the live home page's.
 */
export function FinalCta({
  lead = 'Whatever your business is,',
  rest = 'get in touch to find out how Arepo can help.',
}: {
  lead?: string
  rest?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useDrift(ref)

  return (
    <section
      ref={ref}
      className="on-dark relative isolate overflow-hidden border-t border-white/10 bg-navy-950 text-white"
    >
      <Ribbon />

      <Container className="relative min-h-144 py-20 lg:min-h-176 lg:py-28">
        <h2 className="max-w-[20ch] text-h1 leading-[1.15] text-balance">
          <span className="text-white">{lead}</span>{' '}
          <span className="text-cyan-500">{rest}</span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button to="/contact" variant="on-navy">
            Start a conversation
          </Button>
          <a
            href={company.phoneHref}
            className="inline-flex items-center rounded-[0.625rem] border border-white/25 bg-navy-900 px-5 py-3 text-base tabular-nums text-white transition-colors duration-200 ease-out hover:border-cyan-500 hover:text-cyan-400"
          >
            {company.phone}
          </a>
        </div>
      </Container>
    </section>
  )
}
