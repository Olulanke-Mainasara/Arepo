import type { ReactNode } from 'react'

const sizes = {
  default: 'max-w-[1200px]',
  wide: 'max-w-[1400px]',
  prose: 'max-w-[68ch]',
} as const

interface Props {
  children: ReactNode
  size?: keyof typeof sizes
  className?: string
}

export function Container({ children, size = 'default', className = '' }: Props) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}
