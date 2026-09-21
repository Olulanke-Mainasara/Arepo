import { Container } from '~/components/ui/Container'
import { company } from '~/data/company'

export function AccreditationBlock() {
  const { accreditation, legalName, foundedYear } = company

  return (
    <section className="on-dark bg-navy-900 py-16 text-white lg:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-h3 text-cyan-500">{accreditation.standard}</p>
            <p className="mt-2 text-base text-white/70">Quality management standard</p>
          </div>
          <div>
            <p className="font-mono text-h3 text-cyan-500">
              {accreditation.certificateNumber}
            </p>
            <p className="mt-2 text-base text-white/70">Certificate number</p>
          </div>
          <div>
            <p className="font-mono text-h3 text-cyan-500">{foundedYear}</p>
            <p className="mt-2 text-base text-white/70">
              {legalName} formed in London
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
