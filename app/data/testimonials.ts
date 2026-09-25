import type { Testimonial } from './types'

/**
 * Verbatim from the live testimonials pages (arepo.com/products/
 * product-testimonials and arepo.com/services/testimonials), with their
 * attributions as published. One per product, plus Aviance on the
 * platform itself. The Arriva and dnata quotes stop before the live
 * versions end; a sentence cut from the middle of a quote is marked "…".
 * Only a doubled "a" in the Foot Anstey quote is corrected.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Tracerit has transformed the way that we interact with our staff and is a positive tool that allows us to both recognise our high performing staff but also to intervene when staff require our support to improve. The costs associated with the system are greatly outweighed by the benefits that we have seen and I wonder now how we managed without it! The Tracerit system is a fantastic tool that has helped our business to achieve a 10% reduction in incidents in under 12 months.',
    attribution: 'Alex Jones, Operations Director',
    organisation: 'Arriva London',
  },
  {
    quote:
      'GOSS is a superb software solution for us, which helps us maintain our ISAGO accreditation year on year. It has been completely customized to our business needs, and the ongoing support is both immediate and excellent.',
    attribution: 'Adam Flowers, Systems and Compliance Manager',
    organisation: 'dnata',
  },
  {
    quote:
      'We have worked with Arepo for some time and have always found them to be an extremely attentive and responsive supplier. … It has definitely felt like a true joint effort and Arepo could not have been more accommodating in providing a seamless transition to our Inkara solution.',
    attribution: 'Head of Revenue Protection',
    organisation: 'Train Operating Company client',
  },
  {
    quote:
      'Out of all the TM management software available we selected Cautus because it is intuitive and cost effective. Delivery as a hosted application was also a big plus. John and the Arepo team are very dependable, reacting to service requests quickly and effectively.',
    attribution: 'Matthew Gingell',
    organisation: 'Foot Anstey',
  },
  {
    quote:
      'Having two custom-built database-driven websites based upon the Arepo Platform, I would highly recommend not just the Arepo Platform itself, which is a superb fully-featured web database tool, but also the high quality of service provided by all the friendly Arepo staff.',
    attribution: 'Eric Gainey, Health and Safety Manager',
    organisation: 'Aviance UK',
  },
]
