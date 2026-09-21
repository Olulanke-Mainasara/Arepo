import type { Route } from './+types/home'
import { CapabilityGrid } from '~/components/sections/CapabilityGrid'
import { FinalCta } from '~/components/sections/FinalCta'
import { Hero } from '~/components/sections/Hero'
import { LogoWall } from '~/components/sections/LogoWall'
import { PlatformSection } from '~/components/sections/PlatformSection'
import { ProductBento } from '~/components/sections/ProductBento'
import { SectorGrid } from '~/components/sections/SectorGrid'
import { StatBand } from '~/components/sections/StatBand'
import { TestimonialCarousel } from '~/components/sections/TestimonialCarousel'
import { company, yearsTrading } from '~/data/company'
import {
  getCapabilities,
  getClients,
  getGuarantees,
  getProducts,
  getSectors,
  getTestimonials,
} from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [sectors, products, clients, guarantees, capabilities, testimonials] =
    await Promise.all([
      getSectors(),
      getProducts(),
      getClients(),
      getGuarantees(),
      getCapabilities(),
      getTestimonials(),
    ])

  return { sectors, products, clients, guarantees, capabilities, testimonials }
}

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Online database solutions',
    description:
      'Arepo Solutions builds web-based database software for the UK transport industry — bus, rail, aviation, parking and enforcement. Trading since 1998, ISO 9001:2015 registered.',
    path: '/',
  })

export default function Home({ loaderData }: Route.ComponentProps) {
  const { sectors, products, clients, guarantees, capabilities, testimonials } =
    loaderData

  const stats = [
    { value: String(yearsTrading()), label: 'Years trading' },
    { value: company.accreditation.standard, label: 'Quality management' },
    { value: String(clients.length), label: 'Named clients' },
    { value: String(products.length), label: 'Products in service' },
  ]

  return (
    <>
      <Hero sectors={sectors} />
      <LogoWall clients={clients} />
      <SectorGrid sectors={sectors} products={products} />
      <PlatformSection guarantees={guarantees} />
      <StatBand stats={stats} />
      <ProductBento products={products} sectors={sectors} />
      <CapabilityGrid capabilities={capabilities} />
      <TestimonialCarousel testimonials={testimonials} />
      <FinalCta />
    </>
  )
}
