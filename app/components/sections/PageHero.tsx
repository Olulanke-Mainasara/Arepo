import type { ReactNode } from 'react'
import { Breadcrumb } from '~/components/ui/Breadcrumb'
import { Container } from '~/components/ui/Container'

interface Crumb {
  label: string
  to?: string
}

export function PageHero({
  title,
  lead,
  trail,
  children,
}: {
  title: string
  lead: string
  trail?: Crumb[]
  children?: ReactNode
}) {
  return (
    <section className="on-dark bg-navy-900 pt-[calc(var(--header-h)+4rem)] pb-16 text-white lg:pt-[calc(var(--header-h)+5rem)] lg:pb-20">
      <Container>
        {trail && (
          <div className="mb-8">
            <Breadcrumb trail={trail} tone="dark" />
          </div>
        )}
        <h1 className="text-h1 max-w-[20ch] text-balance">{title}</h1>
        <p className="mt-5 max-w-[56ch] text-lead text-white/80">{lead}</p>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  )
}
