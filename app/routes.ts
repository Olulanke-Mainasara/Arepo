import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('services', 'routes/services.tsx'),
  route('products', 'routes/products.tsx'),
  route('products/:slug', 'routes/product.tsx'),
  route('about', 'routes/about.tsx'),
  route('contact', 'routes/contact.tsx'),
] satisfies RouteConfig
