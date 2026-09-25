import { useRef } from 'react'
import { Container } from '~/components/ui/Container'
import { Pill } from '~/components/ui/Pill'
import type { Client } from '~/data/types'
import { useReveal } from '~/lib/motion'

/**
 * The live home page's clients, as a checkerboard: the heading on the
 * left, centred against the grid, and on the right their logos on dark
 * tiles set corner to corner.
 *
 * Each tile shows the white mono logo (see clients.ts). On hover the tile
 * turns white and the logo crossfades to the colour original, which is
 * drawn on white, so it sits on the tile as it was designed to. Both are
 * capped at the files' native pixel size.
 */

/**
 * The tiles' [row, column] cells on a 4-column, 6-row grid, in reading
 * order: one colour of the checkerboard, less its bottom-left cell. One
 * cell per client, so a twelfth client takes that last cell back.
 */
const CELLS = [
  [0, 1], [0, 3],
  [1, 0], [1, 2],
  [2, 1], [2, 3],
  [3, 0], [3, 2],
  [4, 1], [4, 3],
  [5, 2],
] as const

const LOGO =
  'absolute inset-0 m-auto h-auto max-h-[36%] w-auto max-w-[68%] transition-opacity duration-200 ease-out'

export function LogoWall({ clients }: { clients: Client[] }) {
  const ref = useRef<HTMLUListElement>(null)
  useReveal(ref, { stagger: 0.04, y: 0 })

  return (
    <section className="on-dark border-t border-white/10 bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-4 lg:items-center lg:gap-0">
          <div className="lg:col-span-2">
            <h2 className="max-w-[16ch] text-h1 leading-[1.2] text-balance">
              Trusted across transport and <Pill>beyond</Pill>
            </h2>
            <p className="mt-5 max-w-[40ch] text-base text-white/60">
              Our clients range from individuals and start-ups to blue-chip
              multi-national companies.
            </p>
          </div>

          <ul ref={ref} className="grid grid-cols-4 lg:col-span-2">
            {clients.slice(0, CELLS.length).map((client, i) => {
              const [row, col] = CELLS[i]
              const { src, mono, width, height } = client.logo
              return (
                <li
                  key={client.name}
                  data-reveal
                  className="group relative aspect-4/3 bg-navy-900 transition-colors duration-200 ease-out hover:bg-white"
                  style={{ gridRow: row + 1, gridColumn: col + 1 }}
                >
                  <img
                    src={mono}
                    alt={client.name}
                    width={width}
                    height={height}
                    loading="lazy"
                    decoding="async"
                    className={`${LOGO} opacity-60 group-hover:opacity-0`}
                  />
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    width={width}
                    height={height}
                    loading="lazy"
                    decoding="async"
                    className={`${LOGO} opacity-0 group-hover:opacity-100`}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
