import { Container } from '~/components/ui/Container'
import type { ServicePillar } from '~/data/types'

/**
 * One of the live site's service pages as a band: its title and copy on
 * the left, the list it introduces on the right. Bands alternate white and
 * paper so each service reads as its own section.
 */
export function FeatureRow({ pillar, index }: { pillar: ServicePillar; index: number }) {
  return (
    <section
      id={pillar.id}
      className={index % 2 === 1 ? 'bg-paper py-16 lg:py-24' : 'bg-white py-16 lg:py-24'}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="max-w-[18ch] text-h2 text-balance text-navy-800">{pillar.title}</h2>
            <div className="mt-4 max-w-[58ch] space-y-4 text-lead text-navy-600">
              {pillar.body.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-base font-medium text-navy-800">{pillar.pointsIntro}</p>
            <ul className="mt-4 border-t border-navy-800/15">
              {pillar.points.map(point => (
                <li
                  key={point}
                  className="flex gap-3 border-b border-navy-800/15 py-3 text-base text-navy-800"
                >
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-cyan-700" />
                  {point}
                </li>
              ))}
            </ul>
            {pillar.closing && (
              <p className="mt-6 max-w-[58ch] text-base text-navy-600">{pillar.closing}</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
