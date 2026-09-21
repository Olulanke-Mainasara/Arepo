import type { Route } from './+types/products'
import { FinalCta } from '~/components/sections/FinalCta'
import { PageHero } from '~/components/sections/PageHero'
import { ProductBento } from '~/components/sections/ProductBento'
import { ProductComparison } from '~/components/sections/ProductComparison'
import { getProducts, getSectors } from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [products, sectors] = await Promise.all([getProducts(), getSectors()])
  return { products, sectors }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Software products',
    description:
      'Tracerit for transport operations, Inkara for parking and enforcement, GOSS for aviation ground handling, Cautus for trade mark management. Subscription-based online applications from Arepo.',
    path: '/products',
  })

export default function Products({ loaderData }: Route.ComponentProps) {
  const { products, sectors } = loaderData

  return (
    <>
      <PageHero
        title="Four products, built on one platform."
        lead="Arepo Solutions deliver flexible subscription-based online applications for various types of businesses. Each product below is in service with UK operators today."
        trail={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
      />
      <ProductBento products={products} sectors={sectors} heading={false} />
      <ProductComparison products={products} sectors={sectors} />
      <FinalCta
        lead="Not sure which one fits?"
        rest="Tell us what you operate and we will point you at the right one."
      />
    </>
  )
}
