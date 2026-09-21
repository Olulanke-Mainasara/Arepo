import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Wordmark } from '~/components/ui/Wordmark'
import { company } from '~/data/company'
import { primaryNav } from '~/data/navigation'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      // Focus trap.
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    drawerRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-base transition-colors ${isActive ? 'text-navy-800 underline underline-offset-8 decoration-cyan-500 decoration-2' : 'text-navy-600 hover:text-navy-800'}`

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-navy-800/10">
      <Container>
        <div className="flex items-center justify-between gap-6 py-4">
          <Wordmark />

          <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
            {primaryNav.map(item => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button to="/contact">Get in touch</Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="lg:hidden border border-navy-800 px-4 py-2 text-base"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(v => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          ref={drawerRef}
          className="lg:hidden fixed inset-x-0 top-[var(--header-h,73px)] bottom-0 bg-white border-t border-navy-800/10 overflow-y-auto"
        >
          <Container>
            <nav aria-label="Main" className="flex flex-col py-4">
              {primaryNav.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-4 text-h3 text-navy-800 border-b border-navy-800/10"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <a
              href={company.phoneHref}
              onClick={() => setOpen(false)}
              className="block py-4 font-mono text-h3 text-cyan-700"
            >
              {company.phone}
            </a>
          </Container>
        </div>
      )}
    </header>
  )
}
