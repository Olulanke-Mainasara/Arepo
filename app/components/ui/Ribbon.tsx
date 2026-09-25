/* ---------------------------------------------------------------------------
 * The ribbon of light from the home hero, drawn in flat cyan strokes. Each
 * band is a bundle of cubic curves interpolated between two edge curves in
 * a 1600×1000 space. The fold band's edges swap order between its start and
 * end, so its strands cross mid-way and read as a twist.
 *
 * Layers are marked `data-drift`, so a section that calls useDrift() sets
 * them swaying. The parent must be positioned.
 * ------------------------------------------------------------------------ */

type Point = [number, number]
type Edge = [Point, Point, Point, Point]

interface Strand {
  d: string
  opacity: number
}

function strands(from: Edge, to: Edge, count: number, opacity: (t: number) => number): Strand[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    const [p0, p1, p2, p3] = from.map((p, k) =>
      [0, 1].map(axis => (p[axis] + (to[k][axis] - p[axis]) * t).toFixed(1)).join(' '),
    )
    return { d: `M${p0} C${p1} ${p2} ${p3}`, opacity: Number(opacity(t).toFixed(3)) }
  })
}

const mainBand = strands(
  [[430, 1010], [720, 560], [1000, 290], [1610, 240]],
  [[930, 1010], [1100, 760], [1280, 540], [1610, 660]],
  44,
  // Brightest at the crest, falling away towards the lower edge.
  t => (t === 0 ? 0.95 : 0.1 + 0.55 * (1 - t) ** 2),
)

const foldBand = strands(
  [[560, 1010], [820, 640], [1120, 420], [1610, 560]],
  [[760, 1010], [900, 620], [1060, 330], [1610, 300]],
  24,
  t => 0.08 + 0.34 * Math.sin(Math.PI * t),
)

export function Ribbon() {
  return (
    <>
      <RibbonLayer band={mainBand} crest />
      <RibbonLayer band={foldBand} />
    </>
  )
}

/** `crest` draws the band's first strand heavier, as its lit upper edge. */
function RibbonLayer({ band, crest = false }: { band: Strand[]; crest?: boolean }) {
  return (
    <div data-drift aria-hidden="true" className="absolute inset-0 will-change-transform">
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full text-cyan-500"
        fill="none"
        stroke="currentColor"
      >
        {band.map((strand, i) => (
          <path
            key={i}
            d={strand.d}
            strokeOpacity={strand.opacity}
            strokeWidth={crest && i === 0 ? 2 : 1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  )
}
