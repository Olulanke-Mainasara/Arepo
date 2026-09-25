/**
 * The two-tone sentence device. One sentence, two weights of emphasis.
 * This replaces the all-caps kicker label used by the reference designs:
 * it does the same orienting job without shouting a category name.
 */
interface Props {
  lead: string
  rest: string
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ lead, rest, tone = 'light', as: Tag = 'h2', className = '' }: Props) {
  const leadColor = tone === 'dark' ? 'text-white' : 'text-navy-800'
  // cyan-500 only ever appears here under tone="dark", i.e. on a navy ground.
  const restColor = tone === 'dark' ? 'text-cyan-500' : 'text-navy-600'

  return (
    <Tag className={`text-h2 max-w-[24ch] text-balance ${className}`}>
      <span className={leadColor}>{lead}</span>{' '}
      <span className={restColor}>{rest}</span>
    </Tag>
  )
}
