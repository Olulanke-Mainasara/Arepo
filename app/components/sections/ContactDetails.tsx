import { Figure } from '~/components/ui/Figure'
import { company } from '~/data/company'

export function ContactDetails() {
  const { address, phone, phoneHref, nearestStation, legalName } = company

  return (
    <div className="on-dark bg-navy-800 p-8 text-white lg:p-10">
      <h2 className="text-h2">Get in touch</h2>

      <a
        href={phoneHref}
        className="mt-6 block font-mono text-h3 text-cyan-500 hover:text-cyan-400"
      >
        {phone}
      </a>

      <div className="mt-8">
        <h3 className="text-base font-medium">Visit us</h3>
        <address className="mt-2 not-italic text-base leading-relaxed text-white/80">
          {legalName}
          <br />
          {address.street}
          <br />
          {address.locality}, {address.region}
          <br />
          {address.postcode}
          <br />
          {address.country}
        </address>
        <p className="mt-3 font-mono text-xs text-white/60">
          Nearest station: {nearestStation}
        </p>
      </div>

      {/* A static figure, deliberately — no third-party map script, no API key. */}
      <div className="mt-8">
        <Figure slot="contact.location" className="border border-white/15" />
      </div>
    </div>
  )
}
