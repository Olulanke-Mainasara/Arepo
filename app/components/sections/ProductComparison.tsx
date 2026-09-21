import { Link } from 'react-router'
import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'
import type { Product, Sector } from '~/data/types'

/**
 * The side-by-side view a procurement officer wants and the live site
 * never provides.
 *
 * Columns carry only what Arepo actually publishes. There is deliberately
 * no deployment column: the live site states deployment in general terms
 * ("deployed on your servers or provided as hosted solutions") and never
 * per product, so filling that column would mean inventing it.
 *
 * Below md the table scrolls inside a focusable region so keyboard users
 * can reach the overflow.
 */
export function ProductComparison({
  products,
  sectors,
}: {
  products: Product[]
  sectors: Sector[]
}) {
  const sectorName = (id: string) => sectors.find(s => s.id === id)?.name ?? id

  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <SectionHeading
          lead="Side by side."
          rest="What each product covers, in one view."
        />

        <div
          role="region"
          aria-label="Product comparison"
          tabIndex={0}
          className="mt-10 overflow-x-auto border border-navy-800/15 bg-white"
        >
          <table className="w-full min-w-[56rem] border-collapse text-left">
            <caption className="sr-only">
              Arepo products compared by sectors served, module groups, mobile
              app availability and product web site.
            </caption>
            <thead>
              <tr className="border-b border-navy-800/20">
                <th scope="col" className="p-4 text-base font-medium text-navy-800">
                  Product
                </th>
                <th scope="col" className="p-4 text-base font-medium text-navy-800">
                  Sectors served
                </th>
                <th scope="col" className="p-4 text-base font-medium text-navy-800">
                  Module groups
                </th>
                <th scope="col" className="p-4 text-base font-medium text-navy-800">
                  Mobile app
                </th>
                <th scope="col" className="p-4 text-base font-medium text-navy-800">
                  Live site
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.slug} className="border-b border-navy-800/10 last:border-b-0">
                  <th scope="row" className="p-4 align-top">
                    <Link
                      to={`/products/${product.slug}`}
                      className="text-h3 text-navy-800 hover:text-cyan-700 hover:underline"
                    >
                      {product.name}
                    </Link>
                    <span className="mt-1 block text-sm font-normal text-navy-600">
                      {product.tagline}
                    </span>
                  </th>
                  <td className="p-4 align-top font-mono text-sm text-navy-600">
                    {product.sectors.map(sectorName).join(', ')}
                  </td>
                  <td className="p-4 align-top font-mono text-sm text-navy-600">
                    {product.moduleGroups.length}
                    {product.moduleGroups.length === 1 ? ' group' : ' groups'}
                    {' · '}
                    {product.moduleGroups.reduce((n, g) => n + g.items.length, 0)} modules
                  </td>
                  <td className="p-4 align-top font-mono text-sm text-navy-600">
                    {product.hasMobileApp ? 'Yes' : 'No'}
                  </td>
                  <td className="p-4 align-top font-mono text-sm">
                    <a
                      href={product.site.href}
                      rel="noreferrer"
                      target="_blank"
                      className="text-cyan-700 hover:underline"
                    >
                      {product.site.label}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}
