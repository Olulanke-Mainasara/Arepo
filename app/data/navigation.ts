import type { NavItem } from './types'
import { company } from './company'

export const primaryNav: NavItem[] = [
  { label: 'Services', to: '/services', status: 'live' },
  { label: 'Products', to: '/products', status: 'live' },
  { label: 'About Us', to: '/about', status: 'live' },
  { label: 'Contact Us', to: '/contact', status: 'live' },
]

/**
 * `deferred` items render as plain text, never as links. A link that
 * silently goes somewhere other than its label is worse than no link.
 *
 * The legal pages exist only on the live site so far, so they link there.
 * Rebuild them here and point these at the new routes.
 */
export const footerCompany: NavItem[] = [
  { label: 'About Us', to: '/about', status: 'live' },
  { label: 'Contact Us', to: '/contact', status: 'live' },
  { label: 'Careers', to: '/about#careers', status: 'live' },
  { label: 'Sitemap', to: '', status: 'deferred' },
]

export const footerLegal: NavItem[] = [
  { label: 'Disclaimer', to: 'https://www.arepo.com/about-us/disclaimer', status: 'external' },
  { label: 'Privacy', to: company.privacyPolicyHref, status: 'external' },
  { label: 'Terms and Conditions', to: 'https://www.arepo.com/about-us/terms', status: 'external' },
  { label: 'Cookie Policy', to: 'https://www.arepo.com/home/new-cookie-policy', status: 'external' },
]
