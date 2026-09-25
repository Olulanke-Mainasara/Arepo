import type { Route } from './+types/product'
import { Link } from 'react-router'
import { FinalCta } from '~/components/sections/FinalCta'
import { PageHero } from '~/components/sections/PageHero'
import { Accordion } from '~/components/ui/Accordion'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Figure } from '~/components/ui/Figure'
import { SectionHeading } from '~/components/ui/SectionHeading'
import {
  getCaseStudyById,
  getProductBySlug,
  getProducts,
  getSectors,
} from '~/lib/content'
import { buildMeta, jsonLdScript, softwareApplicationJsonLd } from '~/lib/seo'

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProductBySlug(params.slug)
  if (!product) throw new Response('Not Found', { status: 404 })

  const [sectors, all] = await Promise.all([getSectors(), getProducts()])
  const caseStudy = product.caseStudyId
    ? await getCaseStudyById(product.caseStudyId)
    : null

  return {
    product,
    sectors,
    caseStudy,
    others: all.filter(p => p.slug !== product.slug),
  }
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) {
    return buildMeta({
      title: 'Product not found',
      description: 'The requested product could not be found.',
      path: '/products',
    })
  }

  const { product } = loaderData
  return buildMeta({
    title: `${product.name}: ${product.tagline}`,
    description: product.summary,
    path: `/products/${product.slug}`,
  })
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { product, sectors, caseStudy, others } = loaderData
  const served = sectors.filter(s => product.sectors.includes(s.id))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(softwareApplicationJsonLd(product)),
        }}
      />

      <PageHero
        title={product.name}
        lead={product.tagline}
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href={product.site.href} variant="on-navy">
            Visit {product.site.label}
          </Button>
          <ul className="flex flex-wrap gap-2">
            {served.map(sector => (
              <li
                key={sector.id}
                className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/70"
              >
                {sector.name}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:items-center lg:gap-16">
            <div>
              <p className="max-w-[40ch] text-h3 text-navy-800">{product.summary}</p>
              <p className="mt-6 text-base text-navy-600">
                <span className="font-medium text-navy-800">For more information</span>{' '}
                about {product.name.replace('®', '')} please visit{' '}
                <a
                  href={product.site.href}
                  rel="noreferrer"
                  target="_blank"
                  className="text-cyan-700 underline underline-offset-4 hover:text-navy-800"
                >
                  www.{product.site.label}
                </a>
              </p>
            </div>
            <Figure slot={product.image} priority className="max-w-[465px] rounded-2xl lg:justify-self-end" />
          </div>

          <div className="mt-16">
            <SectionHeading lead={`${product.name.replace('®', '')} modules.`} rest={product.tagline} />

            <div className="mt-8">
              <Accordion
                defaultOpenId={product.moduleGroups[0]?.id}
                items={product.moduleGroups.map(group => ({
                  id: group.id,
                  title: group.title,
                  children: (
                    <ul className="max-w-[60ch] space-y-2">
                      {group.items.map(item => (
                        <li
                          key={item}
                          className="border-l-2 border-cyan-700 pl-4 text-base text-navy-600"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ),
                }))}
              />
            </div>
          </div>
        </Container>
      </section>

      {caseStudy && (
        <section className="bg-white py-16 lg:py-24">
          <Container>
            <div className="rounded-3xl border border-navy-800/15 p-8 lg:p-12">
              <p className="text-sm text-cyan-700">Case study: {caseStudy.kind}</p>
              <h2 className="mt-3 max-w-[18ch] text-h2 text-navy-800">{caseStudy.title}</h2>
              <p className="mt-4 max-w-[60ch] text-lead text-navy-600">{caseStudy.summary}</p>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-paper py-16 lg:py-24">
        <Container>
          <SectionHeading lead="Also from Arepo." rest="Built on the same platform." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map(other => (
              <Link
                key={other.slug}
                to={`/products/${other.slug}`}
                className="group border border-navy-800/15 bg-white p-6 transition-colors hover:border-navy-800"
              >
                <h3 className="text-h3 text-navy-800">{other.name}</h3>
                <p className="mt-2 text-base text-navy-600">{other.tagline}</p>
                <p className="mt-4 text-xs text-cyan-700 group-hover:underline">
                  Read more &rarr;
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta
        lead="Please contact Arepo for further information"
        rest={`or to arrange a demonstration of ${product.name.replace('®', '')}.`}
      />
    </>
  )
}
