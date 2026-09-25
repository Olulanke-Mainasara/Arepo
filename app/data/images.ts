import type { ImageSlot } from './types'

/**
 * The image manifest.
 *
 * Each slot declares the aspect ratio it reserves, what the image shows,
 * and the alt text that ships with it. <Figure> still renders a flat navy
 * placeholder at the declared ratio for a slot without `src`, so a new
 * slot can be laid out before its image arrives.
 *
 * The home offering photos are Unsplash photographs (Unsplash License,
 * free for commercial use), cropped square at 1200px. The product banners
 * are the live site's own, 465×156 with text set into them; replace them
 * with larger originals when the client can supply them.
 */
export const imageSlots: Record<string, ImageSlot> = {
  // Unsplash 77MVcLrz2MU, by Intrepid
  'home.expertise': {
    key: 'home.expertise',
    ratio: '1 / 1',
    subject: 'A red London double-decker bus at night, bound for Clapham Junction',
    alt: 'A red London double-decker bus at night, bound for Clapham Junction',
    src: '/images/home/expertise-bus-night.jpg',
  },
  // Unsplash fYcF0JlMz6g, by Raul Gonzalez Escobar
  'home.products-for': {
    key: 'home.products-for',
    ratio: '1 / 1',
    subject: 'An airliner nose-on above the chevrons of its pushback tug, under a blue sky',
    alt: 'An airliner on the apron, coupled to its pushback tug',
    src: '/images/home/products-aircraft-pushback.jpg',
  },
  // Unsplash zFYUsLk_50Y, by Massimo Botturi
  'home.online-databases': {
    key: 'home.online-databases',
    ratio: '1 / 1',
    subject: 'A server rack in a data centre, patched with blue cables and lit by green status lights',
    alt: 'A data centre server rack, patched with blue cables',
    src: '/images/home/online-databases-server-rack.jpg',
  },
  'product.tracerit': {
    key: 'product.tracerit',
    ratio: '465 / 156',
    subject: 'A double-decker bus in city traffic, designed for public transport, bus, coach, taxi and minicab, and rail',
    alt: 'Tracerit, designed for public transport, bus, coach, taxi and minicab, and rail',
    src: '/images/products/tracerit.jpg',
  },
  'product.inkara': {
    key: 'product.inkara',
    ratio: '465 / 156',
    subject: 'A car park, with solutions for car park operators, airport and valet parking, retail parking, integrated transport and park and ride',
    alt: 'Inkara, solutions for car park operators, airport car parking, valet parking operators, retail parking, integrated transport and park and ride',
    src: '/images/products/inkara.jpg',
  },
  'product.goss': {
    key: 'product.goss',
    ratio: '465 / 156',
    subject: 'Ground crew loading baggage on an airport apron, with the GOSS applications listed',
    alt: 'GOSS applications: accidents and incidents, ISAGO auditing, delay reporting, voucher redemption and airside transfers',
    src: '/images/products/goss.jpg',
  },
  'product.cautus': {
    key: 'product.cautus',
    ratio: '465 / 156',
    subject: 'A dictionary definition of intellectual property, with the Cautus applications listed',
    alt: 'Cautus applications: trade marks, design registrations, domain names and other marks',
    src: '/images/products/cautus.jpg',
  },
}
