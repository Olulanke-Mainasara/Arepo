import type { Sector } from './types'

export const sectors: Sector[] = [
  {
    id: 'bus-coach',
    name: 'Bus & Coach',
    problem: 'Incidents, CCTV requests and driver licence compliance across a live fleet.',
    primary: 'tracerit',
    secondary: 'inkara',
  },
  {
    id: 'rail',
    name: 'Rail',
    problem: 'Unpaid fare notices, evidence packs and escalation to magistrates courts.',
    primary: 'inkara',
    secondary: 'tracerit',
  },
  {
    id: 'aviation',
    name: 'Aviation',
    problem: 'ISAGO accreditation, ramp audits and operational delay recording.',
    primary: 'goss',
  },
  {
    id: 'parking-enforcement',
    name: 'Parking & Enforcement',
    problem: 'Charge notices, patrols, fixed penalties and estate faults.',
    primary: 'inkara',
  },
  {
    id: 'ip-legal',
    name: 'IP & Legal',
    problem: 'Trade mark, design, domain and patent portfolios in one register.',
    primary: 'cautus',
  },
]
