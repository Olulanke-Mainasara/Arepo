import type { Company } from './types'

/**
 * foundedYear is 1998, per the live About page ("Formed in London in 1998").
 * The live footer badge claims "25 YEARS / 1999-2024", which contradicts it
 * and is stale regardless. Year counts are derived from foundedYear so the
 * discrepancy cannot recur. Confirm the correct year with the client.
 */
export const company: Company = {
  name: 'Arepo',
  legalName: 'Arepo Solutions Ltd',
  tagline: 'online database solutions',
  foundedYear: 1998,
  phone: '+44 (0)20 7280 4390',
  phoneHref: 'tel:+442072804390',
  address: {
    street: 'Unit W107, Vox Studios, 1–45 Durham Street',
    locality: 'Vauxhall',
    region: 'London',
    postcode: 'SE11 5JH',
    country: 'United Kingdom',
  },
  nearestStation: 'Vauxhall',
  accreditation: { standard: 'ISO 9001:2015', certificateNumber: '20042411' },
  privacyPolicyHref: 'https://www.arepo.co.uk/privacy',
}

export const yearsTrading = (now = new Date()): number =>
  now.getFullYear() - company.foundedYear
