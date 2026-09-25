import type { Route } from './+types/home'
import { CapabilityGrid } from '~/components/sections/CapabilityGrid'
import { FinalCta } from '~/components/sections/FinalCta'
import { Hero } from '~/components/sections/Hero'
import { LogoWall } from '~/components/sections/LogoWall'
import { OfferingColumns } from '~/components/sections/OfferingColumns'
import { PlatformSection } from '~/components/sections/PlatformSection'
import { ProductBento } from '~/components/sections/ProductBento'
import { StatBand } from '~/components/sections/StatBand'
import { TestimonialCarousel } from '~/components/sections/TestimonialCarousel'
import { companyStats } from '~/data/company'
import {
  getCapabilities,
  getClients,
  getGuarantees,
  getOfferings,
  getProducts,
  getSectors,
  getTestimonials,
} from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [offerings, sectors, products, clients, guarantees, capabilities, testimonials] =
    await Promise.all([
      getOfferings(),
      getSectors(),
      getProducts(),
      getClients(),
      getGuarantees(),
      getCapabilities(),
      getTestimonials(),
    ])

  return { offerings, sectors, products, clients, guarantees, capabilities, testimonials }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Online database solutions',
    description:
      'Arepo Solutions is an experienced UK based software development company that specialises in providing affordable web-based solutions for the transport industry. ISO 9001:2015 registered.',
    path: '/',
  })

export default function Home({ loaderData }: Route.ComponentProps) {
  const { offerings, sectors, products, clients, guarantees, capabilities, testimonials } =
    loaderData

  return (
    <>
      <Hero />
      <LogoWall clients={clients} />
      <OfferingColumns offerings={offerings} />
      <PlatformSection guarantees={guarantees} />
      <StatBand stats={companyStats(products.length)} />
      <ProductBento products={products} sectors={sectors} />
      <CapabilityGrid capabilities={capabilities} />
      <TestimonialCarousel testimonials={testimonials} />
      <FinalCta />
    </>
  )
}
