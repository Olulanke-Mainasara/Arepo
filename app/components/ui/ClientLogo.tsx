import type { Client } from '~/data/types'

/**
 * A client logo as the live site serves it: a small bitmap, capped at its
 * native pixel size and at 48px tall.
 *
 * `decorative` for a logo whose name is printed beside it.
 */
export function ClientLogo({ client, decorative = false }: { client: Client; decorative?: boolean }) {
  const { src, width, height } = client.logo

  return (
    <img
      src={src}
      alt={decorative ? '' : client.name}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="h-auto max-h-12 w-auto object-contain"
      style={{ maxWidth: `min(100%, ${width}px)` }}
    />
  )
}
