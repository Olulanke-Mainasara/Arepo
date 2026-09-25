import { Link } from 'react-router'
import { DOT, LETTERS } from '~/components/ui/logoPaths'
import { company } from '~/data/company'

/**
 * The header logo: the live site's image.jpeg, letter for letter. The
 * letters and dot are the traced vector, so they stay sharp and can
 * change colour; the tagline beneath is too fine to trace, so it is the
 * source's own pixels, cut into a transparent strip in two colours.
 *
 * `tone` is the surface it sits on. Both tagline strips are always
 * present and cross-fade, so switching tone never waits on a download.
 */
interface Props {
  tone?: 'light' | 'dark'
  className?: string
}

export function Wordmark({ tone = 'light', className = '' }: Props) {
  const dark = tone === 'dark'

  return (
    <Link to="/" className={`block ${className}`} aria-label={`${company.legalName}, home`}>
      <svg
        viewBox="3 2.8 194 74.4"
        aria-hidden="true"
        className={`block h-full w-auto transition-colors duration-300 ease-out ${
          dark ? 'text-white' : 'text-navy-800'
        }`}
        style={{ aspectRatio: '194 / 74.4' }}
      >
        <path d={LETTERS} fill="currentColor" fillRule="evenodd" />
        <path d={DOT} className="fill-cyan-500" />
        <image
          href="/images/logo/tagline-on-light.png"
          x="0"
          y="62"
          width="200"
          height="18"
          className={`transition-opacity duration-300 ease-out ${dark ? 'opacity-0' : 'opacity-100'}`}
        />
        <image
          href="/images/logo/tagline-on-dark.png"
          x="0"
          y="62"
          width="200"
          height="18"
          className={`transition-opacity duration-300 ease-out ${dark ? 'opacity-100' : 'opacity-0'}`}
        />
      </svg>
    </Link>
  )
}

/**
 * The letters and cut-corner full stop alone, scaled by the parent's
 * font-size: 3.1em wide, the width the home hero is laid out around.
 * Letters take the current text colour.
 */
export function WordmarkType({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="3.1 2.85 193.8 58.9"
      role="img"
      aria-label="arepo"
      className={`block h-auto ${className}`}
      style={{ width: '3.1em', aspectRatio: '193.8 / 58.9' }}
    >
      <path d={LETTERS} fill="currentColor" fillRule="evenodd" />
      <path d={DOT} className="fill-cyan-500" />
    </svg>
  )
}
