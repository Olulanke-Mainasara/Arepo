import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Wordmark } from '~/components/ui/Wordmark'
import { company } from '~/data/company'
import { primaryNav } from '~/data/navigation'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Transparent over the dark top of every page; white once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  // The open drawer is white, so the bar above it goes solid with it.
  const solid = scrolled || open
  // The home hero sets the wordmark at display size, so the header's copy
  // waits until the hero starts to scroll away. `invisible` also takes it
  // out of the tab order and the accessibility tree while hidden.
  const showLogo = solid || pathname !== '/'

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    const state = solid
      ? isActive
        ? 'text-navy-800'
        : 'text-navy-600 hover:text-navy-800'
      : isActive
        ? 'text-white'
        : 'text-white/75 hover:text-white'
    const underline = isActive ? 'underline underline-offset-8 decoration-cyan-500 decoration-2' : ''
    return `text-base transition-colors duration-200 ${state} ${underline}`
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ease-out ${
        solid ? 'border-navy-800/10 bg-white' : 'on-dark border-transparent bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-(--header-h) items-center justify-between gap-6">
          <div
            className={`transition-[opacity,visibility] duration-300 ease-out ${
              showLogo ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            <Wordmark tone={solid ? 'light' : 'dark'} className="h-11 lg:h-12" />
          </div>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
            {primaryNav.map(item => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button to="/contact" variant={solid ? 'solid' : 'on-navy'}>
              Get in touch
            </Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className={`lg:hidden rounded-[0.625rem] border px-4 py-2 text-base transition-colors duration-200 ${
              solid ? 'border-navy-800 text-navy-800' : 'border-white/60 text-white'
            }`}
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
          className="lg:hidden fixed inset-x-0 top-(--header-h) bottom-0 bg-white border-t border-navy-800/10 overflow-y-auto"
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
              className="block py-4 text-h3 tabular-nums text-cyan-700"
            >
              {company.phone}
            </a>
          </Container>
        </div>
      )}
    </header>
  )
}
