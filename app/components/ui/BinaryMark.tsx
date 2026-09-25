import { Link } from 'react-router'
import { DOT, LETTERS } from '~/components/ui/logoPaths'
import { company } from '~/data/company'

/**
 * The live site's side graphic: "arepo" spelt in 8-bit ASCII, one byte per
 * row, fading row by row down into the wordmark it spells, so the code
 * reads as coming out of the letters. Where the original fades with a
 * gradient, each row here is one flat step of cyan, fainter than the last.
 *
 * Drawn in the wordmark's own coordinates (see logoPaths.ts). The digits
 * sit on an 8-column grid spanning the letters, "a" to "o", so the rows
 * line up with the wordmark exactly. Everything scales from the link's
 * font-size: the mark is 4.5em wide.
 */
const ROWS = ['01100001', '01110010', '01100101', '01110000', '01101111']
const STRENGTH = [1, 0.72, 0.48, 0.28, 0.12]

/** The letters' left and right edges, and the top of the x-height. */
const LEFT = 3.1
const RIGHT = 183.9
const TOP = 3

/** Digit size, row pitch and the last row's gap above the letters, in logo units. */
const SIZE = 36
const PITCH = 33.5
const GAP = 5

const CELL = (RIGHT - LEFT) / 8
const lastBaseline = TOP - GAP
const baseline = (row: number) => lastBaseline - (ROWS.length - 1 - row) * PITCH

// Room above the first baseline for the digits' height (~0.72em).
const VIEW_TOP = Math.floor(baseline(0) - SIZE * 0.75)
const VIEW_HEIGHT = 61.75 - VIEW_TOP

export function BinaryMark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" aria-label={`${company.legalName}, home`} className={`inline-block ${className}`}>
      <svg
        viewBox={`3.1 ${VIEW_TOP} 193.8 ${VIEW_HEIGHT}`}
        aria-hidden="true"
        className="block h-auto"
        style={{ width: '4.5em', aspectRatio: `193.8 / ${VIEW_HEIGHT}` }}
      >
        <g className="fill-cyan-500 font-extrabold" fontSize={SIZE} textAnchor="middle">
          {ROWS.map((row, r) => (
            <g key={row} fillOpacity={STRENGTH[r]}>
              {[...row].map((bit, i) => (
                <text key={i} x={LEFT + (i + 0.5) * CELL} y={baseline(r)}>
                  {bit}
                </text>
              ))}
            </g>
          ))}
        </g>
        <path d={LETTERS} className="fill-white" fillRule="evenodd" />
        <path d={DOT} className="fill-cyan-500" />
      </svg>
    </Link>
  )
}
