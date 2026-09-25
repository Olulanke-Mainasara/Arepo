import type { ReactNode } from 'react'

/**
 * The opening of a dark section, set like the home hero: a large heading
 * carrying one pill-set word on the left, the supporting line on the right.
 *
 * `rest` is the heading's second sentence, dropped to half strength. It
 * does the orienting job an all-caps kicker label would, without shouting.
 */
interface Props {
  heading: ReactNode
  rest?: string
  children?: ReactNode
}

export function SectionIntro({ heading, rest, children }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-16">
      <h2 className="max-w-[20ch] text-h1 leading-[1.2] text-balance text-white">
        {heading}
        {rest && (
          <>
            {' '}
            <span className="text-white/45">{rest}</span>
          </>
        )}
      </h2>
      {children && <div className="text-base text-white/65 lg:pb-2">{children}</div>}
    </div>
  )
}
