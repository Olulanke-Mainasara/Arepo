/**
 * The round arrow a card link carries in its corner. It fills and tips
 * up-right while its `group` parent is hovered. `tone` is the surface it
 * sits on.
 */
const tones = {
  navy: 'border-white/20 text-white group-hover:border-cyan-500 group-hover:bg-cyan-500 group-hover:text-navy-950',
  cyan: 'border-navy-950/30 group-hover:bg-navy-950 group-hover:text-cyan-500',
  light: 'border-navy-800/25 text-navy-800 group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-white',
} as const

export function ArrowDisc({ tone = 'navy' }: { tone?: keyof typeof tones }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-out ${tones[tone]}`}
    >
      <span className="transition-transform duration-200 ease-out group-hover:-rotate-45">→</span>
    </span>
  )
}
