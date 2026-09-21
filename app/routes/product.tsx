import type { Route } from './+types/product'

export default function Product({ params }: Route.ComponentProps) {
  return <h1>{params.slug}</h1>
}
