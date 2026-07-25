import type { Municipality } from '../types'

export const municipalities: Municipality[] = [
  {
    id: 'prishtina',
    name: 'Prishtina',
    nameSq: 'Prishtinë',
    region: 'Central Kosovo',
  },
  {
    id: 'istog',
    name: 'Istog',
    nameSq: 'Istog',
    region: 'Western Kosovo',
  },
  {
    id: 'decan',
    name: 'Deçan',
    nameSq: 'Deçan',
    region: 'Western Kosovo',
  },
  {
    id: 'fushe-kosove',
    name: 'Fushë Kosovë',
    nameSq: 'Fushë Kosovë',
    region: 'Central Kosovo',
  },
]

export function getMunicipality(id: string): Municipality | undefined {
  return municipalities.find((m) => m.id === id)
}
