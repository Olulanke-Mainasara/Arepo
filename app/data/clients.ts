import type { Client } from './types'

/**
 * The eleven clients on the live home page, in its order, with the logo
 * files it serves (downloaded from arepo.com into public/images/clients).
 * They are small bitmaps on white, so they are shown at no more than
 * their native size. Ask the client for SVGs.
 *
 * The mono PNGs in clients/mono are derived from the same files: ink
 * distance from white becomes white alpha. The Metropolitan Police and
 * Dor&Co badges are white type on a block, so for those the white type is
 * kept and the block dropped.
 */
const logo = (file: string, width: number, height: number) => ({
  src: `/images/clients/${file}`,
  mono: `/images/clients/mono/${file.replace(/\.\w+$/, '.png')}`,
  width,
  height,
})

export const clients: Client[] = [
  { name: 'First Bus', note: 'Bus operator', logo: logo('first-bus.png', 200, 48) },
  { name: 'Go-Ahead', note: 'Transport group', logo: logo('go-ahead.jpg', 152, 57) },
  { name: 'Arriva', note: 'Transport group', logo: logo('arriva.jpg', 120, 41) },
  { name: 'Stagecoach', note: 'Transport group', logo: logo('stagecoach.jpg', 150, 37) },
  { name: 'Metropolitan Police', note: 'Police force', logo: logo('metropolitan-police.jpg', 150, 39) },
  { name: 'Transport UK London Bus', note: 'Bus operator', logo: logo('transport-uk.jpg', 175, 52) },
  { name: 'Metroline', note: 'Bus operator', logo: logo('metroline.png', 135, 50) },
  { name: 'Saba', note: 'Car park operator', logo: logo('saba.jpg', 146, 55) },
  { name: 'LNER', note: 'Train operator', logo: logo('lner.jpg', 109, 50) },
  { name: 'Briffa', note: 'IP law firm', logo: logo('briffa.jpg', 120, 32) },
  { name: 'Dor&Co', note: 'Restaurants, hotels, lounges and catering', logo: logo('doco.gif', 120, 57) },
]
