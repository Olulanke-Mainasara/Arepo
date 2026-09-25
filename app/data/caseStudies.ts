import type { CaseStudy } from './types'

/** Summaries are the opening sentences of the live case study pages. */
export const caseStudies: CaseStudy[] = [
  {
    id: 'bespoke-software',
    kind: 'Bespoke software development',
    title: 'Meteor Parking Ltd',
    summary:
      'Meteor Parking, a leader in the UK car park industry, required an online e-commerce solution to sell permits and other tickets at train station car parks.',
    sector: 'parking-enforcement',
  },
  {
    id: 'legacy-upgrade',
    kind: 'Legacy upgrade',
    title: 'Revenue Protection Support Services',
    summary:
      'Arepo have developed a new online database for Revenue Protection Support Services, a subsidiary of Southeastern Railway, to help manage the collection of train companies’ ticket revenues.',
    sector: 'rail',
  },
  {
    id: 'dnata-uk',
    kind: 'Airport operations audits and checklists',
    title: 'dnata UK',
    summary:
      'The UK operations of dnata began recording and managing all incidents using the Incident and Accident Management GOSS modules in 2010.',
    sector: 'aviation',
  },
]
