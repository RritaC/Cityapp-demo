import type { Municipality } from '../types'

export const municipalities: Municipality[] = [
  {
    id: 'prishtina',
    name: 'Prishtina',
    nameSq: 'Prishtinë',
    region: 'Central Kosovo',
  },
  {
    id: 'prizren',
    name: 'Prizren',
    nameSq: 'Prizren',
    region: 'Southern Kosovo',
  },
  {
    id: 'peja',
    name: 'Peja',
    nameSq: 'Pejë',
    region: 'Western Kosovo',
  },
  {
    id: 'gjakova',
    name: 'Gjakova',
    nameSq: 'Gjakovë',
    region: 'Western Kosovo',
  },
  {
    id: 'mitrovica',
    name: 'Mitrovica',
    nameSq: 'Mitrovicë',
    region: 'Northern Kosovo',
  },
  {
    id: 'gjilan',
    name: 'Gjilan',
    nameSq: 'Gjilan',
    region: 'Eastern Kosovo',
  },
  {
    id: 'ferizaj',
    name: 'Ferizaj',
    nameSq: 'Ferizaj',
    region: 'Southern Kosovo',
  },
  {
    id: 'podujeva',
    name: 'Podujeva',
    nameSq: 'Podujevë',
    region: 'Northern Kosovo',
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
  {
    id: 'vushtrri',
    name: 'Vushtrri',
    nameSq: 'Vushtrri',
    region: 'Northern Kosovo',
  },
  {
    id: 'suhareka',
    name: 'Suhareka',
    nameSq: 'Suharekë',
    region: 'Southern Kosovo',
  },
  {
    id: 'lipjan',
    name: 'Lipjan',
    nameSq: 'Lipjan',
    region: 'Central Kosovo',
  },
  {
    id: 'obiliq',
    name: 'Obiliq',
    nameSq: 'Obiliq',
    region: 'Central Kosovo',
  },
  {
    id: 'drenas',
    name: 'Drenas',
    nameSq: 'Drenas',
    region: 'Central Kosovo',
  },
]

export function getMunicipality(id: string): Municipality | undefined {
  return municipalities.find((m) => m.id === id)
}
