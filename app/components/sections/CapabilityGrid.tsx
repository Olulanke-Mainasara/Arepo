import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { Pill } from '~/components/ui/Pill'
import { SectionIntro } from '~/components/ui/SectionIntro'
import { useReveal } from '~/lib/motion'
import type { Capability } from '~/data/types'

/**
 * The live About page's "Our Services" panel, set as one rounded table
 * ruled by hairlines rather than separate cards, so it reads as a list of
 * services, not another row of things to click.
 */
export function CapabilityGrid({ capabilities }: { capabilities: Capability[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <SectionIntro
          heading={
            <>
              Our <Pill>services</Pill>
            </>
          }
        >
          Whatever IT solution your business needs, Arepo provides a complete
          range of software development services from initial consultancy and
          system development through to installation, training and support.
        </SectionIntro>

        <div
          ref={ref}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((capability, i) => (
            // The cell stays opaque and its contents fade in, so the hairline
            // backing never shows through a half-revealed cell.
            <div key={capability.title} className="bg-navy-950 p-7 lg:p-9">
              <div data-reveal className="flex h-full flex-col gap-10">
                <span className="text-sm tabular-nums text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="flex items-baseline gap-3 text-h3 text-white">
                    <span aria-hidden="true" className="size-[0.3em] shrink-0 bg-cyan-500" />
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-base text-white/60">{capability.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
