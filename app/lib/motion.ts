import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Motion rules for this site:
 *
 * - Every timeline is built inside gsap.matchMedia(), and the
 *   prefers-reduced-motion branch applies FINAL state rather than
 *   disabling the effect. Disabling would leave content invisible.
 * - Initial opacity comes from GSAP's fromTo, never from CSS. The routes
 *   are prerendered, so anything hidden in CSS would be invisible to a
 *   visitor whose JS has not run — and to anything reading the HTML.
 * - ScrollTrigger is registered inside the effect, not at module scope:
 *   these modules are evaluated during build-time prerendering where
 *   there is no window.
 * - No pinning, no scroll-jacking, no parallax. Procurement buyers skim.
 */

let registered = false

function ensureRegistered() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

interface RevealOptions {
  stagger?: number
  y?: number
  start?: string
}

/**
 * Reveals descendants marked `data-reveal` as the container scrolls in.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  { stagger = 0.06, y = 12, start = 'top 85%' }: RevealOptions = {},
) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    ensureRegistered()

    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
    if (targets.length === 0) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(targets, { opacity: 1, y: 0 })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start, once: true },
        },
      )
    })

    return () => mm.revert()
  }, [ref, stagger, y, start])
}

/**
 * Counts an integer up when it scrolls into view. The reduced-motion
 * branch writes the final value straight in.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, to: number) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    ensureRegistered()

    const mm = gsap.matchMedia()
    const final = String(to)

    mm.add('(prefers-reduced-motion: reduce)', () => {
      el.textContent = final
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const counter = { value: 0 }
      gsap.to(counter, {
        value: to,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.value))
        },
        onComplete: () => {
          el.textContent = final
        },
      })
    })

    return () => mm.revert()
  }, [ref, to])
}
