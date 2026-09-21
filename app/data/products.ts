import type { Product } from './types'

/**
 * Every module item below is transcribed verbatim from the live Products
 * page. Do not paraphrase, reorder or add items — these are the client's
 * own product claims.
 */
export const products: Product[] = [
  {
    slug: 'tracerit',
    name: 'Tracerit®',
    tagline: 'Transport Operations Database',
    summary:
      'Software for public transport providers, helping daily operations — from the incident report on the road to the compliance record behind it.',
    sectors: ['bus-coach', 'rail'],
    hasMobileApp: false,
    site: { label: 'tracerit.com', href: 'https://www.tracerit.com' },
    image: 'product.tracerit',
    moduleGroups: [
      {
        id: 'operations',
        title: 'Daily operations',
        items: [
          'Incident and Accident management',
          'CCTV incident recording and tracking',
          'Asset management of on-vehicle hardware',
          'Driver Risk Assessment and Analysis',
          'Automated driving licence management to assist compliance',
          'Integration with customer service solutions',
        ],
      },
    ],
  },
  {
    slug: 'inkara',
    name: 'Inkara',
    tagline: 'Parking, Environmental Enforcement and Revenue Protection Software',
    summary:
      'One enforcement platform serving three different operations: car park operators, local authority environmental teams, and train and bus revenue protection.',
    sectors: ['parking-enforcement', 'rail', 'bus-coach'],
    hasMobileApp: true,
    site: { label: 'inkara.com', href: 'https://www.inkara.com' },
    image: 'product.inkara',
    moduleGroups: [
      {
        id: 'car-park-operators',
        title: 'Software for Car Park Operators',
        items: [
          'Car park pre-booking',
          'Online Sales for E-tickets and Season tickets',
          'Parking Charge Notices and Enforcement',
          'Proof of Presence Staff patrols',
          'Equipment and Estate fault management',
        ],
      },
      {
        id: 'environmental-enforcement',
        title: 'Software for Environmental Enforcement',
        items: [
          'Mobile app to issue Fixed Penalty Notices',
          'Flexible configuration providing FPN management of littering, dog fouling, fly tipping and commercial waste',
          'Back office suite for management and reporting',
          'Escalation of unpaid fines to magistrates courts',
          'Generation of Single Justice Packs and collation of evidence',
          'Integration with Google Maps for hotspot reporting',
        ],
      },
      {
        id: 'revenue-protection',
        title: 'Software for Train and Bus Revenue Protection',
        items: [
          'Mobile app to issue Unpaid Fare Notices and Travel Irregularities',
          'Integrated postcode and electoral role validation service',
          'Back office suite for management and reporting',
          'Escalation of unpaid fines to magistrates courts',
          'Generation of Single Justice Packs and collation of evidence',
        ],
      },
    ],
  },
  {
    slug: 'goss',
    name: 'GOSS',
    tagline: 'The Ground Operations Software System',
    summary:
      'Software for aviation ground services providers, built around the audit and accreditation work that keeps an operation airside.',
    sectors: ['aviation'],
    hasMobileApp: false,
    site: { label: 'ground-ops.com', href: 'https://www.ground-ops.com' },
    image: 'product.goss',
    caseStudyId: 'dnata-uk',
    moduleGroups: [
      {
        id: 'ground-operations',
        title: 'Ground operations',
        items: [
          'Incident recording for ISAGO',
          'Ramp and Flight Watch audits',
          'Centralised Standard Operating Procedures repository',
          'Operational Delay recording',
          'Airside passenger and crew transport',
        ],
      },
    ],
  },
  {
    slug: 'cautus',
    name: 'Cautus',
    tagline: 'Online Trade Mark (TM) Management',
    summary:
      'Software for Trade Mark attorneys — a single register for marks, designs, domains and patents.',
    sectors: ['ip-legal'],
    hasMobileApp: false,
    site: { label: 'cautus.co.uk', href: 'https://www.cautus.co.uk' },
    image: 'product.cautus',
    moduleGroups: [
      {
        id: 'portfolio',
        title: 'Portfolio management',
        items: [
          'Trade Mark management',
          'Design Registrations',
          'Domain Name management',
          'Patents',
        ],
      },
    ],
  },
]
