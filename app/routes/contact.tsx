import type { Route } from './+types/contact'
import { ContactDetails } from '~/components/sections/ContactDetails'
import { ContactForm } from '~/components/sections/ContactForm'
import { PageHero } from '~/components/sections/PageHero'
import { Container } from '~/components/ui/Container'
import { buildMeta } from '~/lib/seo'

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Contact us',
    description:
      'Talk to Arepo Solutions about database software for your operation. Call +44 (0)20 7280 4390 or send a message. Offices in Vauxhall, London.',
    path: '/contact',
  })

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contact Us"
        lead="Please use the contact form below to get in touch with Arepo Solutions."
        trail={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
      />

      <section className="bg-paper py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14 lg:items-start">
            <div className="rounded-3xl bg-white p-8 lg:p-10">
              <ContactForm />
            </div>
            <ContactDetails />
          </div>
        </Container>
      </section>
    </>
  )
}
