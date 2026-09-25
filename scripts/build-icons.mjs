import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

/**
 * Renders the PWA icons in public/ from the traced logo in logoPaths.ts:
 * the white letters and the cyan full stop on brand navy. Run it by hand
 * (npm run icons) after the logo vector changes; the PNGs are committed.
 *
 * Rasterises with headless Chrome, so it needs Chrome installed. Set
 * CHROME to its binary if it is not at the default macOS path.
 */
const CHROME =
  process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ROOT = new URL('..', import.meta.url).pathname
const PUBLIC = join(ROOT, 'public')

const source = readFileSync(join(ROOT, 'app/components/ui/logoPaths.ts'), 'utf8')
const path = name => source.match(new RegExp(`${name} =\\s*'([^']+)'`))[1]
const LETTERS = path('LETTERS')
const DOT = path('DOT')

const NAVY = '#002D56'
const WHITE = '#FFFFFF'
const CYAN = '#00BCE4'

/**
 * The letters and dot span x 3.1–196.9. Vertically the icon centres on
 * y 27, between the x-height's middle and the box's: centring the whole
 * box, "p" descender included, sits the letters visibly high.
 */
const LEFT = 3.1
const WIDTH = 193.8
const CENTRE_Y = 27

/** `width` is the wordmark's share of the canvas. Maskable icons need
 * theirs inside the central 80% circle, so they run narrower. */
const ICONS = [
  { file: 'icon-192.png', size: 192, width: 0.7 },
  { file: 'icon-512.png', size: 512, width: 0.7 },
  { file: 'icon-maskable-512.png', size: 512, width: 0.6 },
  { file: 'apple-touch-icon.png', size: 180, width: 0.68 },
]

function svg(size, width) {
  const k = (size * width) / WIDTH
  const x = size / 2 - k * (LEFT + WIDTH / 2)
  const y = size / 2 - k * CENTRE_Y
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${NAVY}"/>
  <g transform="translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${k.toFixed(5)})">
    <path d="${LETTERS}" fill="${WHITE}" fill-rule="evenodd"/>
    <path d="${DOT}" fill="${CYAN}"/>
  </g>
</svg>`
}

const work = mkdtempSync(join(tmpdir(), 'arepo-icons-'))
try {
  for (const { file, size, width } of ICONS) {
    const page = join(work, `${size}-${width}.html`)
    writeFileSync(
      page,
      `<!doctype html><style>html,body{margin:0}svg{display:block}</style>${svg(size, width)}`,
    )
    execFileSync(CHROME, [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${size},${size}`,
      `--screenshot=${join(PUBLIC, file)}`,
      `file://${page}`,
    ], { stdio: 'ignore' })
    console.log(`public/${file}  ${size}×${size}`)
  }
} finally {
  rmSync(work, { recursive: true, force: true })
}
