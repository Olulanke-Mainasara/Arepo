import type { Client } from './types'

/**
 * The eleven clients shown on the live home page logo wall. No logo image
 * files were supplied, so these render as type. Ask the client for SVGs.
 */
export const clients: Client[] = [
  { name: 'First Bus', note: 'Bus operator' },
  { name: 'Go-Ahead', note: 'Transport group' },
  { name: 'Arriva', note: 'Transport group' },
  { name: 'Stagecoach', note: 'Transport group' },
  { name: 'Metropolitan Police', note: 'Police force' },
  { name: 'Transport UK London Bus', note: 'Bus operator' },
  { name: 'Metroline', note: 'Bus operator' },
  { name: 'Saba', note: 'Car park operator' },
  { name: 'LNER', note: 'Train operator' },
  { name: 'Briffa', note: 'IP law firm' },
  { name: 'Dor&Co', note: 'Restaurants, hotels, lounges and catering' },
]
