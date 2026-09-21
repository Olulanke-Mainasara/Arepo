import type { Capability, Guarantee, ProcessStep, ServicePillar } from './types'

/**
 * Transcribed verbatim from the "Guaranteed" panel on the live Services page.
 */
export const guarantees: Guarantee[] = [
  { title: 'Rapid Development', detail: 'Auto-generated database applications' },
  { title: 'Reliable & Flexible', detail: 'Automated development processes' },
  { title: 'Scalable & Robust', detail: 'Easily manages changes in your business requirements' },
  { title: 'Efficiently Evolve', detail: 'Designed and built for change' },
  { title: 'Optimised For Growth', detail: 'New features added regularly' },
  { title: 'No Unforeseen Costs', detail: 'Fixed price confidence' },
]

/**
 * Titles are the live home page's "Online Databases" column, verbatim.
 * The detail lines are written for this redesign; the live site gives none.
 */
export const capabilities: Capability[] = [
  { title: 'Bespoke software solutions', detail: 'Built to your operation, not adapted to it' },
  { title: 'Business rules analysis', detail: 'Your process, encoded and enforced' },
  { title: 'Integration and migration', detail: 'Moving data off the systems you are leaving' },
  { title: 'Data security and encryption', detail: 'Appropriate to the data you hold' },
  { title: 'Legacy system upgrades', detail: 'Replacing what has outlasted its support' },
  { title: 'Disaster recovery', detail: 'Centralised data you can actually restore' },
]

export const servicePillars: ServicePillar[] = [
  {
    id: 'online-databases',
    title: 'Online Databases',
    body: 'Browser-based database solutions at a fraction of the time and cost traditionally associated with bespoke development, built on the Arepo Platform.',
    points: ['Value for money', 'Revenue enhancements', 'Cost savings'],
    image: 'service.databases',
  },
  {
    id: 'bespoke-software',
    title: 'Bespoke Software',
    body: 'Tailor-made solutions delivered on time and within budget, using tried and tested rapid application development techniques.',
    points: ['Initial consultancy', 'System development', 'Installation, training and support'],
    image: 'service.bespoke',
  },
  {
    id: 'legacy-systems',
    title: 'Legacy Systems',
    body: 'Replacing business spreadsheets, local databases and systems that have outlasted their support — without losing the data or the process.',
    points: ['Back office applications', 'Data centralisation', 'Improved disaster recovery'],
    image: 'service.legacy',
  },
  {
    id: 'cms-integration',
    title: 'CMS Integration',
    body: 'Managing content across intranets and public-facing web sites, combined with the database and back office processes behind them.',
    points: ['Intranets', 'Public web sites', 'E-commerce and call centre sales'],
    image: 'service.cms',
  },
]

/**
 * Derived from the live Services page: "a complete range of software
 * development services from initial consultancy and system development
 * through to installation, training and support".
 */
export const processSteps: ProcessStep[] = [
  { n: 1, title: 'Consultancy', body: 'We map the operation and the business rules before anything is built.' },
  { n: 2, title: 'System development', body: 'Rapid application development on the Arepo Platform, with working software early.' },
  { n: 3, title: 'Installation', body: 'Deployed on your servers or provided as a hosted solution.' },
  { n: 4, title: 'Training', body: 'Your team is trained on the system they will actually use.' },
  { n: 5, title: 'Support', body: 'Ongoing maintenance, with future development simply and cost-effectively managed.' },
]
