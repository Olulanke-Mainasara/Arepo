import { Container } from '~/components/ui/Container'
import { StatFigure } from '~/components/ui/StatFigure'

interface Stat {
  value: string
  label: string
}

export function StatBand({
  stats,
  tone = 'dark',
}: {
  stats: Stat[]
  tone?: 'light' | 'dark'
}) {
  if (tone === 'light') {
    return (
      <section className="bg-paper py-16">
        <Container>
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label}>
                <StatFigure value={stat.value} label={stat.label} tone={tone} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  // Dark: set at the hero tagline's scale, each figure hung from a rule.
  // Four across only from xl, where "9001:2015" fits a column at h1 size.
  // No top padding: on the home page it closes the platform section.
  return (
    <section className="on-dark bg-navy-950 pb-20 text-white lg:pb-28">
      <Container>
        <dl className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col-reverse items-center justify-end gap-3 border-t border-white/15 pt-5 text-center">
              <dt className="text-base text-white/60">{stat.label}</dt>
              <dd className="text-h1 leading-none tabular-nums text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
