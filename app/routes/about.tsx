import type { Route } from './+types/about'
import { Link } from 'react-router'
import { AccreditationBlock } from '~/components/sections/AccreditationBlock'
import { CaseStudyCards } from '~/components/sections/CaseStudyCards'
import { ClientGrid } from '~/components/sections/ClientGrid'
import { FinalCta } from '~/components/sections/FinalCta'
import { PageHero } from '~/components/sections/PageHero'
import { ProcessSteps } from '~/components/sections/ProcessSteps'
import { StatBand } from '~/components/sections/StatBand'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { companyStats } from '~/data/company'
import {
  getCapabilities,
  getCaseStudies,
  getClients,
  getProcessSteps,
  getProducts,
  getSectors,
} from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [clients, caseStudies, sectors, steps, products, services] = await Promise.all([
    getClients(),
    getCaseStudies(),
    getSectors(),
    getProcessSteps(),
    getProducts(),
    getCapabilities(),
  ])
  return { clients, caseStudies, sectors, steps, products, services }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'About Arepo',
    description:
      'Formed in London in 1998, Arepo Solutions builds affordable web-based database solutions for the transport industry, using its own Rapid Application Development platform. ISO 9001:2015 registered.',
    path: '/about',
  })

export default function About({ loaderData }: Route.ComponentProps) {
  const { clients, caseStudies, sectors, steps, products, services } = loaderData

  return (
    <>
      <PageHero
        title="About Arepo"
        lead="Arepo Solutions is an experienced UK based software development company that specialises in providing affordable web-based solutions for the transport industry."
        trail={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16 lg:items-start">
            <div className="space-y-5 text-lead text-navy-600">
              <p>
                <span className="text-navy-800">Formed in London in 1998</span>{' '}
                Arepo have developed successful software solutions for a large
                number of clients ranging from individuals and start-ups to
                blue-chip multi-national companies. During this time we have
                refined the process of designing and deploying database
                solutions through our fully featured Rapid Application
                Development tool, the Arepo Platform.
              </p>
              <p>
                Using this technology allows us to offer browser-based database
                solutions at a fraction of the time and cost traditionally
                associated with bespoke solutions. This provides an attractive
                solution for both new applications and for upgrading legacy
                systems.
              </p>
              <p>
                With Arepo, customers can outsource everything from the initial
                development of their web databases, through to ongoing
                maintenance and support, with the advantage that any future
                development can be simply and cost-effectively managed.
              </p>
              <p className="text-navy-800">
                If you have a web development or online database requirement
                then please{' '}
                <Link to="/contact" className="underline underline-offset-4 hover:text-cyan-700">
                  get in touch
                </Link>
                !
              </p>
            </div>

            <aside
              aria-labelledby="our-services"
              className="on-dark rounded-3xl bg-navy-900 p-7 text-white lg:p-9"
            >
              <h2 id="our-services" className="text-h3">
                Our Services
              </h2>
              <ul className="mt-6 space-y-5">
                {services.map(service => (
                  <li key={service.title}>
                    <p className="text-lg text-cyan-500">{service.title}</p>
                    <p className="text-base text-white/75">{service.detail}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <StatBand stats={companyStats(products.length)} tone="light" />
      <ProcessSteps steps={steps} />
      <ClientGrid clients={clients} />
      <CaseStudyCards caseStudies={caseStudies} sectors={sectors} />
      <AccreditationBlock />

      <section id="careers" className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              lead="Careers with Arepo Solutions."
              rest="Our office is situated in Vox Studios, within 5 minutes walk of Vauxhall Station."
            />
            <div className="space-y-5 text-lead text-navy-600">
              <p>
                The office provides a relaxed atmosphere to get on with what
                we’re great at: delivering online software for the transport
                industry. With a client list that includes the leading
                transport and parking providers in the UK, you’ll get to work
                on leading-edge projects that make a difference to each and
                every client.
              </p>
              <p>
                Working in a small team, your voice will always be heard. Arepo
                is always looking at how we can improve our approach in
                everything that we do, whether it is the Arepo Platform,
                hardware, web interfaces or mobile applications.
              </p>
              <p className="text-navy-800">
                If you like our approach and can see the benefits of a
                sustainable web solution, please get in touch and let us know
                how you could make a difference.
              </p>
              <div className="pt-3">
                <Button to="/contact" variant="outline">
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  )
}
