import type { Product } from './types'

/**
 * Every module item and group title below is transcribed verbatim from the
 * live Products page. Do not paraphrase, reorder or add items: these are
 * the client's own product claims.
 *
 * Summaries come from the live Products page's "Online databases for"
 * panel. Inkara has no panel entry, so its summary joins the three
 * operations its module lists are headed with.
 */
export const products: Product[] = [
  {
    slug: 'tracerit',
    name: 'Tracerit®',
    tagline: 'Transport Operations Database',
    summary:
      'Manage the incident & accident process, log CCTV requests and asset management of ancillary hardware.',
    sectors: ['bus-coach', 'rail'],
    hasMobileApp: false,
    site: { label: 'tracerit.com', href: 'https://www.tracerit.com' },
    image: 'product.tracerit',
    moduleGroups: [
      {
        id: 'operations',
        title: 'Software for Public Transport providers, helping daily operations',
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
      'Software for Car Park Operators, Environmental Enforcement, and Train and Bus Revenue Protection.',
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
          'Flexible configuration providing FPN management of: Littering, Dog Fouling, Fly tipping, Commercial Waste',
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
      'Modular software assisting ISAGO accreditation, RIDDOR, delay reporting and lounge access.',
    sectors: ['aviation'],
    hasMobileApp: false,
    site: { label: 'ground-ops.com', href: 'https://www.ground-ops.com' },
    image: 'product.goss',
    caseStudyId: 'dnata-uk',
    moduleGroups: [
      {
        id: 'ground-operations',
        title: 'Software for aviation ground services providers',
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
      'Easily manage a portfolio of Trade Marks, domain names, designs and patents.',
    sectors: ['ip-legal'],
    hasMobileApp: false,
    site: { label: 'cautus.co.uk', href: 'https://www.cautus.co.uk' },
    image: 'product.cautus',
    moduleGroups: [
      {
        id: 'portfolio',
        title: 'Software for Trade Mark (TM) Attorneys',
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
