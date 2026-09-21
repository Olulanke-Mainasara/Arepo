import { useRef } from 'react'
import { Link } from 'react-router'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'
import type { Product, Sector } from '~/data/types'

/**
 * Sector-led entry: visitors arrive identifying by what they operate, not
 * by product name. Each card states the operational problem in the
 * sector's own language and routes to the product that answers it.
 */
export function SectorGrid({
  sectors,
  products,
}: {
  sectors: Sector[]
  products: Product[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  const nameOf = (slug: string) => products.find(p => p.slug === slug)?.name ?? slug

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <SectionHeading
          lead="Five operations, four products."
          rest="Start with what you run, not with what we call it."
        />

        <div ref={ref} className="mt-12 grid gap-px bg-navy-800/15 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map(sector => (
            <Link
              key={sector.id}
              to={`/products/${sector.primary}`}
              data-reveal
              className="group flex flex-col justify-between gap-8 bg-paper p-8 transition-colors hover:bg-white"
            >
              <div>
                <h3 className="text-h3 text-navy-800">{sector.name}</h3>
                <p className="mt-3 text-base text-navy-600">{sector.problem}</p>
              </div>
              <p className="font-mono text-xs text-cyan-700 group-hover:underline">
                {nameOf(sector.primary)}
                {sector.secondary ? ` + ${nameOf(sector.secondary)}` : ''} &rarr;
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
