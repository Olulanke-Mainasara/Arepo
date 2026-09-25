import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../app/app.css', import.meta.url), 'utf8')
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9A-Fa-f]{6});/g)].map(m => [m[1], m[2]]),
)
tokens.white = '#FFFFFF'

const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const lum = h => {
  const [r, g, b] = rgb(h).map(v => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

// [foreground, background, minimum, why]
const rules = [
  ['navy-800', 'white', 4.5, 'body text on light'],
  ['navy-600', 'white', 4.5, 'secondary text on light'],
  ['cyan-700', 'white', 4.5, 'the only cyan allowed as text on light'],
  ['cyan-500', 'navy-800', 4.5, 'brand cyan as text on brand navy'],
  ['cyan-400', 'navy-950', 4.5, 'bright accent on deepest ground'],
  ['white', 'navy-800', 4.5, 'reversed text on brand navy'],
  ['white', 'navy-950', 4.5, 'reversed text on deepest ground'],
  ['navy-800', 'paper', 4.5, 'body text on the light band'],
]

let failed = 0
for (const [fg, bg, min, why] of rules) {
  if (!tokens[fg] || !tokens[bg]) {
    console.error(`MISSING token: ${fg} or ${bg}`)
    failed++
    continue
  }
  const r = ratio(tokens[fg], tokens[bg])
  const ok = r >= min
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${fg.padEnd(9)} on ${bg.padEnd(9)} ${r.toFixed(2).padStart(5)}:1  (min ${min})  - ${why}`)
}

// The defect this guard exists to prevent regressing.
const brandCyanOnWhite = ratio(tokens['cyan-500'], '#FFFFFF')
console.log(`\nnote  brand cyan-500 on white is ${brandCyanOnWhite.toFixed(2)}:1, never use as text on light`)

if (failed) console.error(`\n${failed} contrast rule(s) failed`)
process.exit(failed ? 1 : 0)
