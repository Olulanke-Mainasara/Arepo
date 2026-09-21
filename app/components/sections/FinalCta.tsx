import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { company } from '~/data/company'

export function FinalCta({
  lead = 'Tell us what your operation needs.',
  rest = 'We will tell you what it costs — and that is what it costs.',
}: {
  lead?: string
  rest?: string
}) {
  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <h2 className="text-h1 max-w-[20ch] text-balance">
          <span className="text-white">{lead}</span>{' '}
          <span className="text-cyan-500">{rest}</span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button to="/contact" variant="on-navy">
            Start a conversation
          </Button>
          <a
            href={company.phoneHref}
            className="font-mono text-h3 text-cyan-500 hover:text-cyan-400"
          >
            {company.phone}
          </a>
        </div>
      </Container>
    </section>
  )
}
