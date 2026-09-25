import { caseStudies } from '~/data/caseStudies'
import { clients } from '~/data/clients'
import { company } from '~/data/company'
import { offerings } from '~/data/offerings'
import { products } from '~/data/products'
import { sectors } from '~/data/sectors'
import { capabilities, guarantees, processSteps, servicePillars } from '~/data/services'
import { testimonials } from '~/data/testimonials'
import type {
  Capability,
  CaseStudy,
  Client,
  Company,
  Guarantee,
  Offering,
  ProcessStep,
  Product,
  Sector,
  ServicePillar,
  Testimonial,
} from '~/data/types'

/**
 * The CMS seam.
 *
 * Every getter is async despite resolving a local array. Route loaders
 * await them, so replacing these bodies with real fetches changes this
 * file and nothing else. No component signature moves.
 */

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find(p => p.slug === slug) ?? null
}

export async function getSectors(): Promise<Sector[]> {
  return sectors
}

export async function getClients(): Promise<Client[]> {
  return clients
}

export async function getOfferings(): Promise<Offering[]> {
  return offerings
}

export async function getServicePillars(): Promise<ServicePillar[]> {
  return servicePillars
}

export async function getGuarantees(): Promise<Guarantee[]> {
  return guarantees
}

export async function getCapabilities(): Promise<Capability[]> {
  return capabilities
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return processSteps
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  return caseStudies.find(c => c.id === id) ?? null
}

export async function getCompany(): Promise<Company> {
  return company
}
