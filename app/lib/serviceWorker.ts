/**
 * Registers the service worker: app/sw.js, written to build/client/sw.js
 * by scripts/build-sw.mjs. Production only, as the dev server has no
 * sw.js. Waits for the load event so precaching the site doesn't compete
 * with the page's own first requests.
 */
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

  const register = () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.error('Service worker registration failed:', error)
    })
  }

  if (document.readyState === 'complete') register()
  else window.addEventListener('load', register, { once: true })
}
