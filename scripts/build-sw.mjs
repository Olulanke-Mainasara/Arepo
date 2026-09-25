import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

/**
 * Writes build/client/sw.js from app/sw.js, with the precache list taken
 * from what was actually built, the same way build-sitemap.mjs reads the
 * build. The Vite PWA plugins can't do this for React Router: they run
 * before the prerendered HTML exists, so they would miss every page.
 *
 * The version is a hash of every file's contents, so a deploy that
 * changes anything installs a new worker, and one that changes nothing
 * does not.
 */
const ROOT = new URL('../build/client', import.meta.url).pathname
const SOURCE = new URL('../app/sw.js', import.meta.url)
const PLACEHOLDER = 'self.__PRECACHE'

/** Not needed offline, or the worker itself. */
const SKIP = new Set(['sw.js', 'sitemap.xml', 'robots.txt'])

function walk(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, found)
    else if (!entry.startsWith('.') && !entry.endsWith('.map')) found.push(full)
  }
  return found
}

/** about/index.html is served, and linked, as /about. */
function toUrl(rel) {
  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`
  return `/${rel}`
}

const hash = createHash('sha256')
let bytes = 0

const urls = walk(ROOT)
  .map(file => ({ file, rel: relative(ROOT, file).split(sep).join('/') }))
  .filter(({ rel }) => !SKIP.has(rel))
  .map(({ file, rel }) => ({ file, url: toUrl(rel) }))
  .sort((a, b) => a.url.localeCompare(b.url))
  .map(({ file, url }) => {
    const contents = readFileSync(file)
    bytes += contents.length
    hash.update(url).update(contents)
    return url
  })

const version = hash.digest('hex').slice(0, 12)
const source = readFileSync(SOURCE, 'utf8')
if (source.split(PLACEHOLDER).length !== 2) {
  throw new Error(`app/sw.js must contain ${PLACEHOLDER} exactly once`)
}

writeFileSync(
  join(ROOT, 'sw.js'),
  source.replace(PLACEHOLDER, JSON.stringify({ version, urls })),
)
console.log(
  `sw.js written, version ${version}: ${urls.length} files, ${(bytes / 1024 / 1024).toFixed(1)}MB precached`,
)
