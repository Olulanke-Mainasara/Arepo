import { Container } from '~/components/ui/Container'
import { Figure } from '~/components/ui/Figure'
import type { ServicePillar } from '~/data/types'

/**
 * Alternating image/text band. Odd rows flip on large screens; below lg
 * the image always precedes the text so reading order stays sensible.
 */
export function FeatureRow({ pillar, index }: { pillar: ServicePillar; index: number }) {
  const flipped = index % 2 === 1

  return (
    <section className={index % 2 === 1 ? 'bg-paper py-16 lg:py-24' : 'bg-white py-16 lg:py-24'}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Figure
            slot={pillar.image}
            className={flipped ? 'lg:order-2' : ''}
          />

          <div className={flipped ? 'lg:order-1' : ''}>
            <h2 className="text-h2 text-navy-800 max-w-[18ch] text-balance">{pillar.title}</h2>
            <p className="mt-4 max-w-[54ch] text-lead text-navy-600">{pillar.body}</p>

            <ul className="mt-8 border-t border-navy-800/15">
              {pillar.points.map(point => (
                <li
                  key={point}
                  className="border-b border-navy-800/15 py-3 text-base text-navy-800"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
