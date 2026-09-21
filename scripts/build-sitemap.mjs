import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

/**
 * Derives the sitemap from what was actually built, by walking
 * build/client for prerendered index.html files. Reading the build
 * output rather than a hand-kept list means the sitemap cannot claim a
 * URL that does not exist, or miss one that does.
 */
const SITE_URL = 'https://www.arepo.co.uk'
const ROOT = new URL('../build/client', import.meta.url).pathname

function walk(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walk(full, found)
    } else if (entry === 'index.html') {
      found.push(full)
    }
  }
  return found
}

const paths = walk(ROOT)
  .map(file => {
    const rel = relative(ROOT, file).replace(/index\.html$/, '').replace(/\/$/, '')
    return rel === '' ? '/' : `/${rel}`
  })
  .filter(p => !p.startsWith('/assets'))
  .sort()

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    p => `  <url>
    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(ROOT, 'sitemap.xml'), xml)
console.log(`sitemap.xml written with ${paths.length} URLs:`)
for (const p of paths) console.log(`  ${p}`)
