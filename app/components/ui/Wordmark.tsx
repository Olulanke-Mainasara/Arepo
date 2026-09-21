import { Link } from 'react-router'
import { company } from '~/data/company'

/**
 * Reproduces the existing Arepo mark: heavy lowercase wordmark in navy
 * with a square cyan full stop, tagline beneath.
 *
 * This is an approximation set in Archivo — the original vector was not
 * supplied. Request the logo SVG from the client and swap this out; the
 * component boundary means nothing else changes.
 */
interface Props {
  tone?: 'light' | 'dark'
  showTagline?: boolean
}

export function Wordmark({ tone = 'light', showTagline = true }: Props) {
  const ink = tone === 'dark' ? 'text-white' : 'text-navy-800'
  const sub = tone === 'dark' ? 'text-white/60' : 'text-navy-600'

  return (
    <Link to="/" className="inline-block group" aria-label={`${company.legalName} — home`}>
      <span className={`flex items-end gap-[0.1em] text-[1.75rem] leading-none font-display ${ink}`}>
        <span style={{ fontWeight: 800, letterSpacing: '-0.045em' }}>arepo</span>
        <span
          aria-hidden="true"
          className="bg-cyan-500 mb-[0.12em]"
          style={{ width: '0.19em', height: '0.19em' }}
        />
      </span>
      {showTagline && (
        <span className={`mt-1 hidden sm:block text-[0.6875rem] tracking-wide ${sub}`}>
          {company.tagline}
        </span>
      )}
    </Link>
  )
}
