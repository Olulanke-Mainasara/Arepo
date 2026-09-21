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
 * See spec section 9 for the deferred route list.
 */
export const footerCompany: NavItem[] = [
  { label: 'About Us', to: '/about', status: 'live' },
  { label: 'Contact Us', to: '/contact', status: 'live' },
  { label: 'Careers', to: '/about', status: 'live' },
  { label: 'Sitemap', to: '', status: 'deferred' },
]

export const footerLegal: NavItem[] = [
  { label: 'Disclaimer', to: '', status: 'deferred' },
  { label: 'Privacy', to: company.privacyPolicyHref, status: 'external' },
  { label: 'Terms and Conditions', to: '', status: 'deferred' },
  { label: 'Cookie Policy', to: '', status: 'deferred' },
]
