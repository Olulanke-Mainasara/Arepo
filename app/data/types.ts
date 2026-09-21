export type ProductSlug = 'tracerit' | 'inkara' | 'goss' | 'cautus'
export type SectorId = 'bus-coach' | 'rail' | 'aviation' | 'parking-enforcement' | 'ip-legal'
export type ImageKey = string

export interface ModuleGroup {
  id: string
  title: string
  items: string[]
}

export interface Product {
  slug: ProductSlug
  name: string
  tagline: string
  summary: string
  sectors: SectorId[]
  moduleGroups: ModuleGroup[]
  hasMobileApp: boolean
  site: { label: string; href: string }
  image: ImageKey
  caseStudyId?: string
}

export interface Sector {
  id: SectorId
  name: string
  problem: string
  primary: ProductSlug
  secondary?: ProductSlug
}

export interface Client {
  name: string
  note: string
}

export interface Guarantee {
  title: string
  detail: string
}

export interface Capability {
  title: string
  detail: string
}

export interface ProcessStep {
  n: number
  title: string
  body: string
}

export interface ServicePillar {
  id: string
  title: string
  body: string
  points: string[]
  image: ImageKey
}

export interface Testimonial {
  quote: string
  attribution: string
  organisation: string
}

export interface CaseStudy {
  id: string
  title: string
  summary: string
  sector: SectorId
  image: ImageKey
}

export interface NavItem {
  label: string
  to: string
  status: 'live' | 'deferred' | 'external'
}

export interface ImageSlot {
  key: ImageKey
  ratio: string
  subject: string
  alt: string
  src?: string
}

export interface Company {
  name: string
  legalName: string
  tagline: string
  foundedYear: number
  phone: string
  phoneHref: string
  address: {
    street: string
    locality: string
    region: string
    postcode: string
    country: string
  }
  nearestStation: string
  accreditation: { standard: string; certificateNumber: string }
  privacyPolicyHref: string
}
