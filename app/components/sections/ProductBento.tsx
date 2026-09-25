import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowDisc } from '~/components/ui/ArrowDisc'
import { Container } from '~/components/ui/Container'
import { Pill } from '~/components/ui/Pill'
import { SectionIntro } from '~/components/ui/SectionIntro'
import { useReveal } from '~/lib/motion'
import type { Product, Sector } from '~/data/types'

/**
 * Asymmetric bento after the Supabase reference, on the hero's dark wall.
 * Tracerit, the widest-reaching product, takes a two-by-two feature tile;
 * Inkara spans two columns; the two specialists take one each. That fills
 * a four-by-two grid exactly. The feature tile lists Tracerit's modules.
 */
export function ProductBento({ products, sectors }: { products: Product[]; sectors: Sector[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  const sectorName = (id: string) => sectors.find(s => s.id === id)?.name ?? id

  const layout: Record<string, string> = {
    tracerit: 'md:col-span-2 lg:row-span-2 bg-navy-800',
    inkara: 'md:col-span-2 bg-navy-900',
  }

  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <SectionIntro
          heading={
            <>
              Our software <Pill>products</Pill>
            </>
          }
        >
          <p>
            Arepo Solutions deliver flexible subscription-based online
            applications for various types of businesses.
          </p>
          <Link
            to="/products"
            className="group mt-4 inline-flex items-center gap-2 text-white underline-offset-4 hover:underline"
          >
            All products
            <span aria-hidden="true" className="text-cyan-500 transition-transform duration-200 ease-out group-hover:translate-x-1">
              →
            </span>
          </Link>
        </SectionIntro>

        <div ref={ref} className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => {
            const featured = product.slug === 'tracerit'

            return (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                data-reveal
                className={`group flex flex-col justify-between gap-10 rounded-3xl border border-white/10 p-7 transition-colors duration-200 ease-out hover:border-cyan-500/50 lg:p-9 ${
                  layout[product.slug] ?? 'bg-navy-900'
                }`}
              >
                <div>
                  <span className="text-sm tabular-nums text-cyan-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`mt-6 text-white ${featured ? 'text-display leading-none' : 'text-h2'}`}>
                    {product.name}
                  </h3>
                  <p className="mt-3 text-base text-white/60">{product.tagline}</p>
                  <p className={`mt-5 text-white/85 ${featured ? 'max-w-[42ch] text-lead' : 'text-base'}`}>
                    {product.summary}
                  </p>
                  {featured && (
                    <ul className="mt-8 max-w-[44ch] border-t border-white/10">
                      {product.moduleGroups[0].items.map(item => (
                        <li key={item} className="flex gap-3 border-b border-white/10 py-2.5 text-base text-white/75">
                          <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-cyan-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-end justify-between gap-6">
                  <ul className="flex flex-wrap gap-2" aria-label="Sectors">
                    {product.sectors.map(id => (
                      <li
                        key={id}
                        className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75"
                      >
                        {sectorName(id)}
                      </li>
                    ))}
                  </ul>
                  <ArrowDisc />
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
