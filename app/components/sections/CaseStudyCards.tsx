import { Container } from '~/components/ui/Container'
import { Figure } from '~/components/ui/Figure'
import { SectionHeading } from '~/components/ui/SectionHeading'
import type { CaseStudy, Sector } from '~/data/types'

export function CaseStudyCards({
  caseStudies,
  sectors,
}: {
  caseStudies: CaseStudy[]
  sectors: Sector[]
}) {
  const sectorName = (id: string) => sectors.find(s => s.id === id)?.name ?? id

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <SectionHeading lead="Work we have delivered." rest="Three from the record." />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {caseStudies.map(study => (
            <article key={study.id} className="border border-navy-800/15 bg-white">
              <Figure slot={study.image} />
              <div className="p-6">
                <p className="font-mono text-xs text-cyan-700">
                  {sectorName(study.sector)}
                </p>
                <h3 className="mt-3 text-h3 text-navy-800">{study.title}</h3>
                <p className="mt-2 text-base text-navy-600">{study.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
