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
    title: `${product.name} — ${product.tagline}`,
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
                className="border border-white/30 px-2 py-1 font-mono text-xs text-white/70"
              >
                {sector.name}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <Figure slot={product.image} priority />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <p className="max-w-[56ch] text-lead text-navy-800">{product.summary}</p>

          <div className="mt-12">
            <SectionHeading
              lead="What it does."
              rest={
                product.moduleGroups.length > 1
                  ? 'Grouped by the operation it serves.'
                  : 'Module by module.'
              }
            />

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

      <section className="bg-paper py-16 lg:py-24">
        <Container>
          <SectionHeading lead="Who it is for." rest="The operations running it today." />
          <div className="mt-8 grid gap-px bg-navy-800/15 sm:grid-cols-2 lg:grid-cols-3">
            {served.map(sector => (
              <div key={sector.id} className="bg-paper p-6">
                <h3 className="text-h3 text-navy-800">{sector.name}</h3>
                <p className="mt-2 text-base text-navy-600">{sector.problem}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {caseStudy && (
        <section className="bg-white py-16 lg:py-24">
          <Container>
            <div className="grid items-center gap-10 border border-navy-800/15 p-8 lg:grid-cols-2 lg:gap-14">
              <Figure slot={caseStudy.image} />
              <div>
                <p className="font-mono text-xs text-cyan-700">Case study</p>
                <h2 className="mt-3 text-h2 text-navy-800 max-w-[18ch]">
                  {caseStudy.title}
                </h2>
                <p className="mt-4 max-w-[52ch] text-base text-navy-600">
                  {caseStudy.summary}
                </p>
              </div>
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
                <p className="mt-4 font-mono text-xs text-cyan-700 group-hover:underline">
                  Read more &rarr;
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta
        lead={`Want to see ${product.name} against your own data?`}
        rest="We will walk you through it."
      />
    </>
  )
}
