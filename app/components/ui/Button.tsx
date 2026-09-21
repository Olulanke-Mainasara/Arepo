import type { ReactNode } from 'react'
import { Link } from 'react-router'

/**
 * Flat fills only — no gradient, no shadow.
 * `on-navy` is the only variant using brand cyan as a surface, and it
 * pairs with navy-950 text at 8.58:1.
 */
const variants = {
  solid: 'bg-navy-800 text-white hover:bg-navy-700',
  outline: 'border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white',
  'on-navy': 'bg-cyan-500 text-navy-950 hover:bg-cyan-400',
  'ghost-on-navy': 'border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-navy-950',
} as const

const base =
  'inline-flex items-center justify-center gap-2 px-5 py-3 text-base font-medium transition-colors duration-150'

interface Props {
  children: ReactNode
  variant?: keyof typeof variants
  /** Internal route — renders a react-router Link. */
  to?: string
  /** External URL — renders an anchor with rel="noreferrer". */
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
  'aria-busy'?: boolean
}

export function Button({
  children,
  variant = 'solid',
  to,
  href,
  type = 'button',
  onClick,
  disabled,
  className = '',
  ...rest
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} rel="noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-60 disabled:cursor-not-allowed`}
      {...rest}
    >
      {children}
    </button>
  )
}
