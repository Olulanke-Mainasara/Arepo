import { useRef } from 'react'
import { Link } from 'react-router'
import { Container } from '~/components/ui/Container'
import { Pill } from '~/components/ui/Pill'
import { SectionIntro } from '~/components/ui/SectionIntro'
import { useReveal } from '~/lib/motion'
import type { Guarantee } from '~/data/types'

/**
 * The live home page's account of the Arepo Platform, beside the
 * "Guaranteed" panel that the live site repeats down the right of its
 * inner pages: six concrete commitments, stated plainly.
 */
export function PlatformSection({ guarantees }: { guarantees: Guarantee[] }) {
  const ref = useRef<HTMLUListElement>(null)
  useReveal(ref, { stagger: 0.05 })

  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <SectionIntro
          heading={
            <>
              Our unique <Pill>approach</Pill>
            </>
          }
        />

        <div className="mt-14 grid gap-3 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-12 rounded-3xl border border-white/10 bg-navy-800 p-7 lg:col-span-7 lg:p-10">
            <div>
              <p className="max-w-[26ch] text-h2 leading-[1.2] text-balance">
                We’re proud of the IT solutions we produce in collaboration with
                clients that keep coming back to Arepo as their on-line business
                needs evolve.
              </p>
              <p className="mt-6 max-w-[48ch] text-lead leading-relaxed text-white/70">
                IT services are provided as bespoke software development or by
                clients using our range of hosted software products. Arepo’s
                approach is underpinned by our Rapid Application Development
                tool, the Arepo Platform, providing customers with truly
                cost-effective, flexible and reliable web-based database
                solutions.
              </p>
            </div>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 self-start text-base text-white underline-offset-4 hover:underline"
            >
              About Arepo
              <span aria-hidden="true" className="text-cyan-500 transition-transform duration-200 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-navy-900 p-7 lg:col-span-5 lg:p-9">
            <h3 className="text-h3 text-white">Guaranteed</h3>
            <ul ref={ref} className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {guarantees.map(guarantee => (
                <li key={guarantee.title} data-reveal className="flex gap-4 py-4">
                  <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-cyan-500" />
                  <div>
                    <p className="text-lg text-white">{guarantee.title}</p>
                    <p className="text-base text-white/60">{guarantee.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
