/**
 * The service worker. Not bundled by Vite: scripts/build-sw.mjs copies it
 * to build/client/sw.js after the build, filling in the placeholder below
 * with the build's own file list and a hash of it.
 *
 * Every file the build emits is precached on install (about 2.5MB), so
 * the whole site, pages, .data, scripts, fonts and images, works offline.
 *
 * - Pages and .data: network first, so a deploy shows up on the next visit.
 *   Offline, or with no answer in NETWORK_TIMEOUT, the precached copy.
 * - Everything else precached: cache first. Scripts and fonts are hashed,
 *   and images change only with a deploy, which installs a new worker.
 *
 * Network responses are never written back into the cache. The precache
 * is one build, whole, so an offline page never loads a script from a
 * different build than its HTML.
 */
const { version, urls } = self.__PRECACHE
const PRECACHED = new Set(urls)
const CACHE = `arepo-${version}`

/** Served for pages that were not prerendered; it routes client-side. */
const SPA_FALLBACK = '/__spa-fallback.html'
const NETWORK_TIMEOUT = 3000

self.addEventListener('install', event => {
  event.waitUntil(precache().then(() => self.skipWaiting()))
})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      await self.registration.navigationPreload?.enable()
      const stale = (await caches.keys()).filter(k => k.startsWith('arepo-') && k !== CACHE)
      await Promise.all(stale.map(k => caches.delete(k)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    const network = Promise.resolve(event.preloadResponse).then(
      preloaded => preloaded ?? fetch(request),
    )
    event.respondWith(networkFirst(event, network, pageKey(url.pathname)))
  } else if (url.pathname.endsWith('.data')) {
    // Keyed by path alone: React Router adds ?_routes=, which a static
    // host ignores, so every variant is the same file.
    event.respondWith(networkFirst(event, fetch(request), url.pathname))
  } else if (PRECACHED.has(url.pathname)) {
    event.respondWith(cacheFirst(request, url.pathname))
  }
})

async function precache() {
  const cache = await caches.open(CACHE)
  await Promise.all(
    urls.map(async url => {
      // A hashed asset is the same file in every build that names it, so
      // an older cache's copy saves the download.
      const kept = url.startsWith('/assets/') && (await caches.match(url))
      if (kept) return cache.put(url, kept)

      const response = await fetch(url, { cache: 'reload' })
      if (!response.ok) throw new Error(`Precache failed: ${url} (${response.status})`)
      await cache.put(url, await unredirect(response))
    }),
  )
}

/**
 * Hosts differ on /about vs /about/, and browsers refuse to answer a
 * navigation with a response that was redirected. Rebuilding the
 * response drops the redirect flag and keeps the body and headers.
 */
async function unredirect(response) {
  if (!response.redirected) return response
  const { status, statusText, headers } = response
  return new Response(await response.blob(), { status, statusText, headers })
}

/** The precache key for a page: its prerendered path, else the SPA fallback. */
function pageKey(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return PRECACHED.has(path) ? path : SPA_FALLBACK
}

async function fromCache(key) {
  const cache = await caches.open(CACHE)
  return cache.match(key)
}

async function cacheFirst(request, key) {
  return (await fromCache(key)) ?? fetch(request)
}

async function networkFirst(event, network, key) {
  // Keep the worker alive until the request settles, even when the cache
  // answers first, and swallow the rejection that is handled below.
  event.waitUntil(network.catch(() => {}))

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Network timeout')), NETWORK_TIMEOUT),
  )
  try {
    return await Promise.race([network, timeout])
  } catch {
    // No cached copy: wait on the network after all, or fail as it does.
    return (await fromCache(key)) ?? network
  }
}
