import { Container } from '~/components/ui/Container'
import { SectionHeading } from '~/components/ui/SectionHeading'

export default function Home() {
  return (
    <Container className="py-20">
      <SectionHeading
        as="h1"
        lead="Online database solutions."
        rest="Built for the operations that move people."
      />
    </Container>
  )
}
