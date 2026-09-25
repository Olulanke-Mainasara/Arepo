import type { Route } from './+types/services'
import { Link } from 'react-router'
import { FeatureRow } from '~/components/sections/FeatureRow'
import { FinalCta } from '~/components/sections/FinalCta'
import { PageHero } from '~/components/sections/PageHero'
import { PlatformSection } from '~/components/sections/PlatformSection'
import { Container } from '~/components/ui/Container'
import { getGuarantees, getServicePillars } from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [pillars, guarantees] = await Promise.all([getServicePillars(), getGuarantees()])
  return { pillars, guarantees }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Software development services',
    description:
      'Whatever IT solution your business needs, Arepo provides a complete range of software development services from initial consultancy and system development through to installation, training and support.',
    path: '/services',
  })

export default function Services({ loaderData }: Route.ComponentProps) {
  const { pillars, guarantees } = loaderData

  return (
    <>
      <PageHero
        title="Software Development Services"
        lead="Whatever IT solution your business needs, Arepo provides a complete range of software development services from initial consultancy and system development through to installation, training and support."
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
              So, if your business needs a software application which combines
              the savings of an off-the-shelf product with the flexibility of a
              bespoke solution, please{' '}
              <Link to="/contact" className="underline underline-offset-4 hover:text-cyan-700">
                get in touch
              </Link>{' '}
              with Arepo or call us on 020 7280 4390.
            </p>
          </div>
        </Container>
      </section>

      {pillars.map((pillar, index) => (
        <FeatureRow key={pillar.id} pillar={pillar} index={index} />
      ))}

      <PlatformSection guarantees={guarantees} />
      <FinalCta
        lead="If you have a web development or online database requirement,"
        rest="then please get in touch!"
      />
    </>
  )
}
