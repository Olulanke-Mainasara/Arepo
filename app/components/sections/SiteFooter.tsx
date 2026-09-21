import { Link } from 'react-router'
import { Container } from '~/components/ui/Container'
import { Wordmark } from '~/components/ui/Wordmark'
import { company } from '~/data/company'
import { footerCompany, footerLegal } from '~/data/navigation'
import type { NavItem } from '~/data/types'

/**
 * Deferred destinations render as plain text, never as links pointed at
 * "/". A link that silently goes somewhere other than its label is worse
 * than no link.
 */
function FooterLink({ item }: { item: NavItem }) {
  if (item.status === 'deferred') {
    return <span className="text-white/35">{item.label}</span>
  }

  if (item.status === 'external') {
    return (
      <a href={item.to} rel="noreferrer" className="text-white/70 hover:text-cyan-500">
        {item.label}
      </a>
    )
  }

  return (
    <Link to={item.to} className="text-white/70 hover:text-cyan-500">
      {item.label}
    </Link>
  )
}

function Column({ heading, items }: { heading: string; items: NavItem[] }) {
  return (
    <div>
      <h2 className="text-base font-medium text-white">{heading}</h2>
      <ul className="mt-4 flex flex-col gap-2 text-base">
        {items.map(item => (
          <li key={item.label}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const { address, accreditation } = company

  return (
    <footer className="on-dark bg-navy-950 text-white">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark tone="dark" />
            <a
              href={company.phoneHref}
              className="mt-6 block font-mono text-h3 text-cyan-500 hover:text-cyan-400"
            >
              {company.phone}
            </a>
          </div>

          <Column heading="Company" items={footerCompany} />
          <Column heading="Legal" items={footerLegal} />

          <div>
            <h2 className="text-base font-medium text-white">Find us</h2>
            <address className="mt-4 not-italic text-base text-white/70 leading-relaxed">
              {address.street}
              <br />
              {address.locality}, {address.region}
              <br />
              {address.postcode}
              <br />
              {address.country}
            </address>
          </div>
        </div>

        <div className="border-t border-white/15 py-6">
          <p className="font-mono text-xs text-white/50 leading-relaxed">
            © {new Date().getFullYear()} {company.legalName} · {accreditation.standard} ·
            Certificate {accreditation.certificateNumber} · Trading since {company.foundedYear}
          </p>
        </div>
      </Container>
    </footer>
  )
}
