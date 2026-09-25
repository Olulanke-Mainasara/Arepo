import { company } from '~/data/company'
import type { Product } from '~/data/types'

export const SITE_URL = 'https://www.arepo.com'

export interface PageMeta {
  title: string
  description: string
  path: string
}

export function buildMeta({ title, description, path }: PageMeta) {
  const url = `${SITE_URL}${path}`
  const full =
    path === '/'
      ? `${company.legalName} | ${company.tagline}`
      : `${title} | ${company.name}`

  return [
    { title: full },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:title', content: full },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: company.legalName },
    { property: 'og:locale', content: 'en_GB' },
  ]
}

/**
 * Serialises JSON-LD for injection into a <script> tag.
 *
 * Escaping `<` prevents a value containing "</script>" from closing the
 * tag early. Today every value is a hardcoded constant, but this data is
 * the first thing a CMS would start feeding, so the guard goes in now.
 */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.legalName,
    url: SITE_URL,
    telephone: company.phone,
    foundingDate: String(company.foundedYear),
    description:
      'UK software development company building web-based database solutions for the transport industry.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.region,
      postalCode: company.address.postcode,
      addressCountry: 'GB',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: company.accreditation.standard,
      identifier: company.accreditation.certificateNumber,
    },
  }
}

export function softwareApplicationJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web browser',
    description: product.summary,
    url: `${SITE_URL}/products/${product.slug}`,
    publisher: { '@type': 'Organization', name: company.legalName },
  }
}
