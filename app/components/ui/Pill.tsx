import type { ReactNode } from 'react'

/**
 * The hero's pill-set word: a word framed in a hairline capsule, scaled by
 * the surrounding font-size. Used once per heading so it keeps its weight.
 */
export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border border-white/25 bg-navy-900 px-[0.55em] py-[0.08em] leading-[1.2] ${className}`}
    >
      {children}
    </span>
  )
}
