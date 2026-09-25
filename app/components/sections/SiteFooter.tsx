import { Link } from 'react-router'
import { BinaryMark } from '~/components/ui/BinaryMark'
import { Container } from '~/components/ui/Container'
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
  const { address, accreditation, supportEmail } = company

  return (
    <footer className="on-dark border-t border-white/10 bg-navy-950 text-white">
      <Container>
        <div className="grid gap-14 py-16 lg:grid-cols-[auto_1fr] lg:gap-20 lg:py-20">
          <BinaryMark className="text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)]" />

          <div className="grid content-start gap-10 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <h2 className="text-base font-medium text-white">Sales &amp; Support</h2>
              <a
                href={company.phoneHref}
                className="mt-4 block text-base tabular-nums text-cyan-500 hover:text-cyan-400"
              >
                {company.phone}
              </a>
              <h2 className="mt-6 text-base font-medium text-white">Contact Support</h2>
              <a
                href={`mailto:${supportEmail}`}
                className="mt-4 block text-base text-white/70 hover:text-cyan-500"
              >
                {supportEmail}
              </a>
            </div>

            <Column heading="Company" items={footerCompany} />
            <Column heading="Legal" items={footerLegal} />

            <div>
              <h2 className="text-base font-medium text-white">Address</h2>
              <address className="mt-4 not-italic text-base text-white/70 leading-relaxed">
                {company.legalName}
                <br />
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
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-xs leading-relaxed text-white/50 lg:flex-row lg:justify-between lg:gap-10">
          <p>
            Arepo Solutions are specialists in providing online software
            solutions for the transport industry.
          </p>
          <p className="tabular-nums">
            © {new Date().getFullYear()} {company.legalName} · {accreditation.standard} Registered ·
            Certificate Number: {accreditation.certificateNumber}
          </p>
        </div>
      </Container>
    </footer>
  )
}
