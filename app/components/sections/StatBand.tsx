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
  const dark = tone === 'dark'

  return (
    <section
      className={
        dark
          ? 'on-dark bg-navy-900 border-t border-white/10 py-16'
          : 'bg-paper py-16'
      }
    >
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
