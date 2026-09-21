import { Link } from 'react-router'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Figure } from '~/components/ui/Figure'
import type { Sector } from '~/data/types'

/**
 * Full-bleed darkened photography with a left-aligned headline at regular
 * weight, after the Conntour reference.
 *
 * The live element in the hero is a sector selector rather than a
 * decorative search box. Each option is a real <Link>, so it works in the
 * prerendered HTML before hydration and is crawlable as internal linking.
 */
export function Hero({ sectors }: { sectors: Sector[] }) {
  return (
    <section className="on-dark relative isolate bg-navy-950 text-white overflow-hidden">
      <Figure slot="home.hero" fill priority className="opacity-40" />
      {/* Flat scrim, not a gradient. */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-950/65" />

      <Container className="relative py-24 lg:py-32">
        <h1 className="text-display max-w-[17ch] text-balance">
          Online database solutions for the operations that move people.
        </h1>

        <p className="mt-6 max-w-[54ch] text-lead text-white/80">
          Arepo builds web-based database software for UK transport — bus, rail,
          aviation, parking and enforcement. Trading since 1998, ISO 9001:2015
          registered, fixed price.
        </p>

        <div className="mt-12">
          <p id="sector-label" className="text-lead text-white/80">
            I run&hellip;
          </p>
          <div
            role="group"
            aria-labelledby="sector-label"
            className="mt-4 flex flex-wrap gap-3"
          >
            {sectors.map(sector => (
              <Link
                key={sector.id}
                to={`/products/${sector.primary}`}
                className="border border-cyan-500 px-4 py-2.5 text-base text-cyan-500 transition-colors hover:bg-cyan-500 hover:text-navy-950"
              >
                {sector.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button to="/products" variant="on-navy">
            See the products
          </Button>
          <Button to="/contact" variant="ghost-on-navy">
            Talk to us
          </Button>
        </div>
      </Container>
    </section>
  )
}
