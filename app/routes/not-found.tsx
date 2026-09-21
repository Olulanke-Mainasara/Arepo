import type { Route } from './+types/not-found'
import { PageHero } from '~/components/sections/PageHero'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { buildMeta } from '~/lib/seo'

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: 'Page not found',
    description: 'The page you asked for does not exist.',
    path: '/404',
  })

export default function NotFound() {
  return (
    <>
      <PageHero
        title="That page isn’t here."
        lead="The page you asked for doesn’t exist. It may have moved, or the link may be out of date."
      />
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="flex flex-wrap gap-4">
            <Button to="/">Back to home</Button>
            <Button to="/products" variant="outline">
              Browse products
            </Button>
            <Button to="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
