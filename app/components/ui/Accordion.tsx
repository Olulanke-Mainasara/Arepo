import type { ReactNode } from 'react'

/**
 * Native details/summary: keyboard and screen-reader behaviour comes
 * free, and the content still renders into the prerendered HTML, so
 * product module lists stay indexable when collapsed.
 */
interface Item {
  id: string
  title: string
  children: ReactNode
}

interface Props {
  items: Item[]
  defaultOpenId?: string
  /** Shared name makes the group mutually exclusive. Omit to allow many open. */
  exclusive?: boolean
  tone?: 'light' | 'dark'
}

export function Accordion({ items, defaultOpenId, exclusive = false, tone = 'light' }: Props) {
  const divide = tone === 'dark' ? 'divide-white/15' : 'divide-navy-800/15'
  const marker = tone === 'dark' ? 'text-cyan-500' : 'text-cyan-700'

  return (
    <div className={`divide-y ${divide} border-y ${tone === 'dark' ? 'border-white/15' : 'border-navy-800/15'}`}>
      {items.map(item => (
        <details
          key={item.id}
          name={exclusive ? 'accordion' : undefined}
          open={item.id === defaultOpenId}
          className="group py-5"
        >
          <summary className="cursor-pointer list-none flex items-start justify-between gap-6 text-h3">
            <span>{item.title}</span>
            <span
              aria-hidden="true"
              className={`shrink-0 transition-transform duration-200 group-open:rotate-45 ${marker}`}
            >
              +
            </span>
          </summary>
          <div className="pt-4">{item.children}</div>
        </details>
      ))}
    </div>
  )
}
