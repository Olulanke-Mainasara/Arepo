import type { Route } from './+types/about'
import { AccreditationBlock } from '~/components/sections/AccreditationBlock'
import { CaseStudyCards } from '~/components/sections/CaseStudyCards'
import { ClientGrid } from '~/components/sections/ClientGrid'
import { FinalCta } from '~/components/sections/FinalCta'
import { PageHero } from '~/components/sections/PageHero'
import { ProcessSteps } from '~/components/sections/ProcessSteps'
import { StatBand } from '~/components/sections/StatBand'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Figure } from '~/components/ui/Figure'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { company, yearsTrading } from '~/data/company'
import {
  getCaseStudies,
  getClients,
  getProcessSteps,
  getProducts,
  getSectors,
} from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [clients, caseStudies, sectors, steps, products] = await Promise.all([
    getClients(),
    getCaseStudies(),
    getSectors(),
    getProcessSteps(),
    getProducts(),
  ])
  return { clients, caseStudies, sectors, steps, products }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'About Arepo',
    description:
      'Formed in London in 1998, Arepo Solutions builds affordable web-based database solutions for the transport industry, using its own Rapid Application Development platform. ISO 9001:2015 registered.',
    path: '/about',
  })

export default function About({ loaderData }: Route.ComponentProps) {
  const { clients, caseStudies, sectors, steps, products } = loaderData

  const stats = [
    { value: String(yearsTrading()), label: 'Years trading' },
    { value: String(clients.length), label: 'Named clients' },
    { value: String(products.length), label: 'Products in service' },
    { value: company.accreditation.standard, label: 'Quality management' },
  ]

  return (
    <>
      <PageHero
        title="An experienced UK software development company."
        lead="Arepo Solutions specialises in providing affordable web-based solutions for the transport industry."
        trail={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="space-y-5 text-lead text-navy-600">
              <p>
                <span className="text-navy-800">
                  Formed in London in 1998,
                </span>{' '}
                Arepo have developed successful software solutions for a large
                number of clients, ranging from individuals and start-ups to
                blue-chip multinational companies.
              </p>
              <p>
                During that time we have refined the process of designing and
                deploying database solutions through our fully featured Rapid
                Application Development tool — the Arepo Platform.
              </p>
              <p>
                Using this technology allows us to offer browser-based database
                solutions at a fraction of the time and cost traditionally
                associated with bespoke solutions. That makes it an attractive
                option both for new applications and for upgrading legacy
                systems.
              </p>
              <p className="text-navy-800">
                With Arepo, customers can outsource everything from the initial
                development of their web databases through to ongoing
                maintenance and support — with the advantage that any future
                development can be simply and cost-effectively managed.
              </p>
            </div>

            <Figure slot="about.story" className="border border-navy-800/15" />
          </div>
        </Container>
      </section>

      <StatBand stats={stats} tone="light" />
      <ProcessSteps steps={steps} />
      <ClientGrid clients={clients} />
      <CaseStudyCards caseStudies={caseStudies} sectors={sectors} />
      <AccreditationBlock />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            lead="We hire people who like operational problems."
            rest="There is no open listing right now — write to us anyway."
          />
          <div className="mt-8">
            <Button to="/contact" variant="outline">
              Get in touch about careers
            </Button>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  )
}
