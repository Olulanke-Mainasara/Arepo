import type { Testimonial } from './types'

/**
 * Intentionally empty. The live site links to a testimonials page but none
 * of its copy was captured, and inventing client quotes is not acceptable.
 * Sections consuming this must render nothing while it is empty.
 * Populate from the client's testimonials page before launch.
 */
export const testimonials: Testimonial[] = []
