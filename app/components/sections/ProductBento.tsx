import { useRef } from 'react'
import { Link } from 'react-router'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { useReveal } from '~/lib/motion'
import type { Product, Sector } from '~/data/types'

/**
 * Asymmetric bento after the Supabase reference: the two products with
 * the widest sector coverage take two columns each, the two specialists
 * take one. Flat bordered cards, no shadows.
 */
export function ProductBento({
  products,
  sectors,
  heading = true,
}: {
  products: Product[]
  sectors: Sector[]
  heading?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  const sectorName = (id: string) => sectors.find(s => s.id === id)?.name ?? id
  const isWide = (slug: string) => slug === 'tracerit' || slug === 'inkara'

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        {heading && (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              lead="Four products in service."
              rest="Each one built for a specific operation."
            />
            <Link to="/products" className="font-mono text-xs text-cyan-700 hover:underline">
              Compare all four &rarr;
            </Link>
          </div>
        )}

        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-4">
          {products.map(product => (
            <Link
              key={product.slug}
              to={`/products/${product.slug}`}
              data-reveal
              className={`group flex flex-col justify-between gap-8 border border-navy-800/15 p-8 transition-colors hover:border-navy-800 ${
                isWide(product.slug) ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div>
                <h3 className="text-h3 text-navy-800">{product.name}</h3>
                <p className="mt-1 text-base text-navy-600">{product.tagline}</p>
                <p className="mt-4 text-base text-navy-800">{product.summary}</p>
              </div>

              <div>
                <ul className="flex flex-wrap gap-2">
                  {product.sectors.map(id => (
                    <li
                      key={id}
                      className="border border-navy-800/20 px-2 py-1 font-mono text-xs text-navy-600"
                    >
                      {sectorName(id)}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-xs text-cyan-700 group-hover:underline">
                  {product.site.label} &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
