import type { CaseStudy } from './types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'bespoke-software',
    title: 'Bespoke software',
    summary: 'A tailor-made database system built around an operator’s own business rules rather than adapted to someone else’s.',
    sector: 'bus-coach',
    image: 'case.bespoke',
  },
  {
    id: 'legacy-upgrade',
    title: 'Legacy software upgrade',
    summary: 'Replacing an unsupported legacy system without losing the data or the process built around it.',
    sector: 'rail',
    image: 'case.legacy',
  },
  {
    id: 'dnata-uk',
    title: 'Aviation services — dnata UK',
    summary: 'Ground operations software supporting ISAGO accreditation across a UK ground handling operation.',
    sector: 'aviation',
    image: 'case.aviation',
  },
]
