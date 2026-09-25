import { useEffect } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import { SiteFooter } from '~/components/sections/SiteFooter'
import { SiteHeader } from '~/components/sections/SiteHeader'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { jsonLdScript, organizationJsonLd } from '~/lib/seo'
import { registerServiceWorker } from '~/lib/serviceWorker'
import './app.css'

/**
 * The live site's favicon: the square full stop from the wordmark. The
 * installed-app icons are the whole wordmark (scripts/build-icons.mjs).
 */
export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* navy-950, the colour at the top of every page, under the transparent header. */}
        <meta name="theme-color" content="#000F1C" />
        <meta name="apple-mobile-web-app-title" content="Arepo" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-2 focus:left-2 focus:bg-white focus:text-navy-800 focus:px-4 focus:py-3 focus:border focus:border-navy-800"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  useEffect(registerServiceWorker, [])
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404

  // Dark, like every other page top, so the transparent header reads over it.
  return (
    <section className="on-dark bg-navy-950 pt-[calc(var(--header-h)+6rem)] pb-24 text-white">
      <Container>
        <p className="text-xs text-cyan-500">{is404 ? '404' : 'Error'}</p>
        <h1 className="mt-4 text-h1 max-w-[18ch]">
          {is404 ? 'That page isn’t here.' : 'Something went wrong.'}
        </h1>
        <p className="mt-4 text-lead text-white/70 max-w-[52ch]">
          {is404
            ? 'The page you asked for doesn’t exist. It may have moved, or the link may be out of date.'
            : 'Sorry, an unexpected error occurred. Please try again, or call us.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button to="/" variant="on-navy">
            Back to home
          </Button>
          <Button to="/products" variant="ghost-on-navy">
            Browse products
          </Button>
        </div>
      </Container>
    </section>
  )
}
