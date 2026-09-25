import { Link } from 'react-router'
import { ArrowDisc } from '~/components/ui/ArrowDisc'
import { Container } from '~/components/ui/Container'
import { Figure } from '~/components/ui/Figure'
import type { Product } from '~/data/types'

/**
 * The live Products page, product by product: its banner, the pointer to
 * its own site, and its module lists under their live headings.
 *
 * The banners are 465px wide with text set into them, so they are shown
 * no wider than that.
 */
export function ProductListing({ products }: { products: Product[] }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="divide-y divide-navy-800/15 border-y border-navy-800/15">
          {products.map(product => (
            <article
              key={product.slug}
              id={product.slug}
              className="grid gap-10 py-14 lg:grid-cols-[minmax(0,29rem)_minmax(0,1fr)] lg:gap-16"
            >
              <div>
                <Figure
                  slot={product.image}
                  className="max-w-[465px] rounded-2xl"
                />
                <p className="mt-4 text-base text-navy-600">
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

              <div>
                <Link
                  to={`/products/${product.slug}`}
                  className="group flex items-start justify-between gap-6"
                >
                  <h2 className="text-h2 text-navy-800 text-balance">
                    {product.name}
                    <span className="block text-lead text-navy-600">{product.tagline}</span>
                  </h2>
                  <ArrowDisc tone="light" />
                </Link>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {product.moduleGroups.map(group => (
                    <div key={group.id}>
                      <h3 className="text-base font-medium text-navy-800">{group.title}:</h3>
                      <ul className="mt-3 space-y-2">
                        {group.items.map(item => (
                          <li key={item} className="flex gap-3 text-base text-navy-600">
                            <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-cyan-700" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 max-w-[60ch] text-lead text-navy-800">
          Through our expertise and software solutions, we provide truly
          scalable and flexible products that can be aligned to your business
          requirements.
        </p>
      </Container>
    </section>
  )
}
