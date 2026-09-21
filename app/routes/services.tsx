import type { Route } from './+types/services'
import { FeatureRow } from '~/components/sections/FeatureRow'
import { FinalCta } from '~/components/sections/FinalCta'
import { PageHero } from '~/components/sections/PageHero'
import { PlatformSection } from '~/components/sections/PlatformSection'
import { ProcessSteps } from '~/components/sections/ProcessSteps'
import { Container } from '~/components/ui/Container'
import { getGuarantees, getProcessSteps, getServicePillars } from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [pillars, guarantees, steps] = await Promise.all([
    getServicePillars(),
    getGuarantees(),
    getProcessSteps(),
  ])
  return { pillars, guarantees, steps }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Software development services',
    description:
      'Bespoke database systems and web applications for transport operators — consultancy, development, installation, training and support. Fixed price, no unforeseen costs.',
    path: '/services',
  })

export default function Services({ loaderData }: Route.ComponentProps) {
  const { pillars, guarantees, steps } = loaderData

  return (
    <>
      <PageHero
        title="Whatever IT solution your business needs."
        lead="A complete range of software development services, from initial consultancy and system development through to installation, training and support."
        trail={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      <section className="bg-white py-16 lg:py-20">
        <Container size="prose">
          <div className="space-y-5 text-lead text-navy-600">
            <p>
              Many of the solutions we deliver combine an{' '}
              <span className="text-navy-800">online database</span> with back
              office processes and public-facing web sites.
            </p>
            <p>
              With a proven track record delivering bespoke database systems and
              web applications, Arepo’s service is a means of building
              tailor-made solutions on time and within budget, using tried and
              tested rapid application development techniques.
            </p>
            <p className="text-navy-800">
              If your business needs a software application that combines the
              savings of an off-the-shelf product with the flexibility of a
              bespoke solution, that is the gap Arepo exists to fill.
            </p>
          </div>
        </Container>
      </section>

      {pillars.map((pillar, index) => (
        <FeatureRow key={pillar.id} pillar={pillar} index={index} />
      ))}

      <ProcessSteps steps={steps} />
      <PlatformSection guarantees={guarantees} />
      <FinalCta
        lead="Tell us what the operation needs."
        rest="We will scope it, price it, and hold that price."
      />
    </>
  )
}
