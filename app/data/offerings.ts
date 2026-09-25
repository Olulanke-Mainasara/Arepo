import type { Offering } from './types'

/**
 * The three columns under the live home page's introduction, verbatim,
 * each paired with a photograph of its subject.
 * "Products for" items link to the product that answers them.
 */
export const offerings: Offering[] = [
  {
    id: 'expertise',
    title: 'Expertise',
    image: 'home.expertise',
    items: [
      { label: 'Public transport' },
      { label: 'Aviation services' },
      { label: 'Parking and security' },
      { label: 'E-commerce' },
      { label: 'Back office applications' },
      { label: 'Mobile apps' },
    ],
  },
  {
    id: 'products-for',
    title: 'Products for',
    image: 'home.products-for',
    items: [
      { label: 'Transport Operations', to: '/products/tracerit' },
      { label: 'Aviation ground operations', to: '/products/goss' },
      { label: 'Car park management', to: '/products/inkara' },
      { label: 'Trade Mark management', to: '/products/cautus' },
    ],
  },
  {
    id: 'online-databases',
    title: 'Online Databases',
    image: 'home.online-databases',
    items: [
      { label: 'Bespoke software solutions' },
      { label: 'Business rules analysis' },
      { label: 'Integration and migration' },
      { label: 'Data security and encryption' },
      { label: 'Legacy system upgrades' },
      { label: 'Disaster recovery' },
    ],
  },
]
