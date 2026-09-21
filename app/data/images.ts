import type { ImageSlot } from './types'

/**
 * The image manifest. No photography has been sourced for this build.
 *
 * Each slot declares the aspect ratio it reserves, the subject a real photo
 * should show, and the alt text that ships with it. <Figure> renders a flat
 * navy placeholder at the declared ratio while `src` is undefined, so adding
 * a real file later causes no layout shift.
 *
 * To add real photography: drop the file in app/assets/, import it, and set
 * `src` on the matching slot. Nothing else changes.
 */
export const imageSlots: Record<string, ImageSlot> = {
  'home.hero': {
    key: 'home.hero',
    ratio: '16 / 9',
    subject: 'Bus depot at dusk, vehicles parked in rows, interior lights on',
    alt: 'A bus depot at dusk with vehicles parked in rows',
  },
  'home.platform': {
    key: 'home.platform',
    ratio: '4 / 3',
    subject: 'Operations control room, staff at multi-screen workstations',
    alt: 'An operations control room with staff at multi-screen workstations',
  },
  'product.tracerit': {
    key: 'product.tracerit',
    ratio: '21 / 9',
    subject: 'Double-decker buses in city traffic',
    alt: 'Double-decker buses in city traffic',
  },
  'product.inkara': {
    key: 'product.inkara',
    ratio: '21 / 9',
    subject: 'Multi-storey car park deck with marked bays',
    alt: 'A multi-storey car park deck with marked bays',
  },
  'product.goss': {
    key: 'product.goss',
    ratio: '21 / 9',
    subject: 'Airport apron, ground crew loading baggage beside an aircraft',
    alt: 'Ground crew loading baggage beside an aircraft on an airport apron',
  },
  'product.cautus': {
    key: 'product.cautus',
    ratio: '21 / 9',
    subject: 'Law office desk with document files and a laptop',
    alt: 'Document files and a laptop on a law office desk',
  },
  'service.databases': {
    key: 'service.databases',
    ratio: '3 / 2',
    subject: 'Close-up of a database schema on a monitor',
    alt: 'A database schema displayed on a monitor',
  },
  'service.bespoke': {
    key: 'service.bespoke',
    ratio: '3 / 2',
    subject: 'Two people reviewing a process diagram on a whiteboard',
    alt: 'Two people reviewing a process diagram on a whiteboard',
  },
  'service.legacy': {
    key: 'service.legacy',
    ratio: '3 / 2',
    subject: 'Server rack in a small comms room',
    alt: 'A server rack in a small comms room',
  },
  'service.cms': {
    key: 'service.cms',
    ratio: '3 / 2',
    subject: 'A public transport information web page on a tablet',
    alt: 'A public transport information web page displayed on a tablet',
  },
  'about.story': {
    key: 'about.story',
    ratio: '4 / 3',
    subject: 'Exterior of a London office building in Vauxhall',
    alt: 'The exterior of a London office building',
  },
  'case.bespoke': {
    key: 'case.bespoke',
    ratio: '3 / 2',
    subject: 'Depot office with staff at desks',
    alt: 'A depot office with staff working at desks',
  },
  'case.legacy': {
    key: 'case.legacy',
    ratio: '3 / 2',
    subject: 'Railway platform with a departure board',
    alt: 'A railway platform with a departure board',
  },
  'case.aviation': {
    key: 'case.aviation',
    ratio: '3 / 2',
    subject: 'Baggage handling belt loader beside an aircraft',
    alt: 'A baggage handling belt loader beside an aircraft',
  },
  'contact.location': {
    key: 'contact.location',
    ratio: '4 / 3',
    subject: 'Street map of the Vauxhall area of London',
    alt: 'A street map of the Vauxhall area of London',
  },
}
