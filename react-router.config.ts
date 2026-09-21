import type { Config } from '@react-router/dev/config'

export default {
  ssr: false,
  prerender: [
    '/',
    '/services',
    '/products',
    '/products/tracerit',
    '/products/inkara',
    '/products/goss',
    '/products/cautus',
    '/about',
    '/contact',
  ],
} satisfies Config
