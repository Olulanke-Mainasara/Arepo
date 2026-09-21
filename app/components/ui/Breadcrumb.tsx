import { Link } from 'react-router'

interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ trail, tone = 'light' }: { trail: Crumb[]; tone?: 'light' | 'dark' }) {
  const muted = tone === 'dark' ? 'text-white/60' : 'text-navy-600'
  const current = tone === 'dark' ? 'text-white' : 'text-navy-800'

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {isLast || !crumb.to ? (
                <span className={current} aria-current={isLast ? 'page' : undefined}>
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.to} className={`${muted} hover:underline`}>
                  {crumb.label}
                </Link>
              )}
              {!isLast && <span aria-hidden="true" className={muted}>/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
