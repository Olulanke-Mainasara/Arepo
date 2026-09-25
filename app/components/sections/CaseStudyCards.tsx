import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import type { CaseStudy, Sector } from '~/data/types'

/** The live site's three case studies, each opened with its first line. */
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
        <SectionHeading lead="Case studies." rest="As diverse as Arepo’s customers." />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {caseStudies.map(study => (
            <article
              key={study.id}
              className="flex flex-col gap-6 rounded-3xl border border-navy-800/15 bg-white p-7"
            >
              <p className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-navy-800/20 px-3 py-1 text-navy-600">
                  {sectorName(study.sector)}
                </span>
                <span className="rounded-full border border-navy-800/20 px-3 py-1 text-navy-600">
                  {study.kind}
                </span>
              </p>
              <div>
                <h3 className="text-h3 text-navy-800">{study.title}</h3>
                <p className="mt-2 text-base text-navy-600">{study.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
