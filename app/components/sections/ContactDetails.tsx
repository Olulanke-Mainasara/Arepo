import { company } from '~/data/company'

/** The live Contact page's "Get in touch" panel and "How to find us" note. */
export function ContactDetails() {
  const { address, phone, phoneHref, legalName, supportEmail, directions } = company

  return (
    <div className="on-dark rounded-3xl bg-navy-800 p-8 text-white lg:p-10">
      <h2 className="text-h2">Get in touch</h2>

      <address className="mt-6 not-italic text-base leading-relaxed text-white/80">
        <span className="text-lg text-cyan-500">{legalName}</span>
        <br />
        {address.street}
        <br />
        {address.locality}, {address.region}
        <br />
        {address.postcode}
      </address>

      <h3 className="mt-8 text-base font-medium">Sales &amp; Support</h3>
      <a
        href={phoneHref}
        className="mt-1 block text-h3 tabular-nums text-cyan-500 hover:text-cyan-400"
      >
        {phone}
      </a>

      <h3 className="mt-6 text-base font-medium">Contact Support</h3>
      <a href={`mailto:${supportEmail}`} className="mt-1 block text-base text-white/80 hover:text-cyan-400">
        {supportEmail}
      </a>

      <h3 className="mt-8 text-base font-medium">How to find us</h3>
      <p className="mt-1 text-base text-white/70">{directions}</p>
    </div>
  )
}
