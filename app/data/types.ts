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
}

export interface Client {
  name: string
  note: string
  /**
   * The logo as served on the live site, at its native pixel size, and
   * `mono`, the same pixels as a white-on-transparent PNG for dark tiles.
   */
  logo: { src: string; mono: string; width: number; height: number }
}

/** One of the three columns under the live home page's introduction. */
export interface Offering {
  id: string
  title: string
  image: ImageKey
  items: { label: string; to?: string }[]
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
  body: string[]
  /** The sentence that introduces `points` on the live page. */
  pointsIntro: string
  points: string[]
  closing?: string
}

export interface Testimonial {
  quote: string
  attribution: string
  organisation: string
}

export interface CaseStudy {
  id: string
  /** The kind of work, from the live case study's heading. */
  kind: string
  title: string
  summary: string
  sector: SectorId
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
  /** How to find the office, from the live "How to find us" page. */
  directions: string
  supportEmail: string
  accreditation: { standard: string; certificateNumber: string }
  privacyPolicyHref: string
}
