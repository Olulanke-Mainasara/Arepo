import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import { SiteFooter } from '~/components/sections/SiteFooter'
import { SiteHeader } from '~/components/sections/SiteHeader'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { jsonLdScript, organizationJsonLd } from '~/lib/seo'
import './app.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <Container className="py-24">
      <p className="font-mono text-xs text-cyan-700">{is404 ? '404' : 'Error'}</p>
      <h1 className="mt-4 text-h1 text-navy-800 max-w-[18ch]">
        {is404 ? 'That page isn’t here.' : 'Something went wrong.'}
      </h1>
      <p className="mt-4 text-lead text-navy-600 max-w-[52ch]">
        {is404
          ? 'The page you asked for doesn’t exist. It may have moved, or the link may be out of date.'
          : 'Sorry — an unexpected error occurred. Please try again, or call us.'}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button to="/">Back to home</Button>
        <Button to="/products" variant="outline">
          Browse products
        </Button>
      </div>
    </Container>
  )
}
