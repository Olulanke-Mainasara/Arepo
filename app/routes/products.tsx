import type { Route } from './+types/products'
import { FinalCta } from '~/components/sections/FinalCta'
import { PageHero } from '~/components/sections/PageHero'
import { ProductListing } from '~/components/sections/ProductListing'
import { getProducts } from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  return { products: await getProducts() }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Our software products',
    description:
      'Tracerit for transport operations, Inkara for parking and enforcement, GOSS for aviation ground handling, Cautus for trade mark management. Subscription-based online applications from Arepo.',
    path: '/products',
  })

export default function Products({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData

  return (
    <>
      <PageHero
        title="Our Software Products"
        lead="Arepo Solutions deliver flexible subscription-based online applications for various types of businesses. Our Software As A Service (SaaS) products include Tracerit, Inkara, GOSS and Cautus."
        trail={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
      />
      <ProductListing products={products} />
      <FinalCta
        lead="Our online database solutions process large volumes of data every day,"
        rest="helping many businesses manage their operational needs."
      />
    </>
  )
}
