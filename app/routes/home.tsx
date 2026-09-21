import { Accordion } from '~/components/ui/Accordion'
import { Breadcrumb } from '~/components/ui/Breadcrumb'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Field, controlClass } from '~/components/ui/Field'
import { Figure } from '~/components/ui/Figure'
import { SectionHeading } from '~/components/ui/SectionHeading'
import { StatFigure } from '~/components/ui/StatFigure'

export default function Home() {
  return (
    <Container>
      <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Smoke' }]} />
      <SectionHeading lead="Twenty-eight years in transport." rest="Four products, one platform." as="h1" />
      <StatFigure value="1998" label="Founded" />
      <Button to="/contact">Get in touch</Button>
      <Button variant="on-navy" href="https://example.com">External</Button>
      <Figure slot="home.hero" priority />
      <Accordion items={[{ id: 'a', title: 'Group', children: <p>Body</p> }]} defaultOpenId="a" />
      <Field id="name" label="Name" required hint="As it should appear">
        {a11y => <input {...a11y} className={controlClass} />}
      </Field>
    </Container>
  )
}
