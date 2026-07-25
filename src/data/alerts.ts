import type { Alert } from '../types'

export const alerts: Alert[] = [
  {
    id: 'alert-water-centre',
    type: 'Critical',
    title: 'Water Interruption in Prishtina Centre',
    titleSq: 'Ndërprerje e ujit në Qendër të Prishtinës',
    location: 'Agim Ramadani Street, District 4',
    municipalityId: 'prishtina',
    time: '14:20',
    description:
      'A main pipe failure has affected water supply. Emergency crews have been dispatched. Estimated restoration time is 4–6 hours.',
    descriptionSq:
      'Një dëmtim i tubacionit kryesor ka ndikuar furnizimin me ujë. Ekuipat e emergjencës janë dërguar. Koha e vlerësuar e rivendosjes është 4–6 orë.',
    estimatedRestoration: '4–6 hours',
  },
  {
    id: 'alert-electricity-lakrishte',
    type: 'Maintenance',
    title: 'Electricity Maintenance in Lakrishte',
    titleSq: 'Mirëmbajtje e energjisë elektrike në Lakrishte',
    location: 'Lakrishte',
    municipalityId: 'prishtina',
    time: '10:00',
    description:
      'Planned grid optimisation work is scheduled from 11:00 to 13:30. Residents may experience brief interruptions.',
    descriptionSq:
      'Punimet e planifikuara për optimizimin e rrjetit janë të planifikuara nga ora 11:00 deri në 13:30. Banorët mund të përjetojnë ndërprerje të shkurtra.',
  },
  {
    id: 'alert-waste-district2',
    type: 'Information',
    title: 'Waste Collection Schedule Updated',
    titleSq: 'Orari i mbledhjes së mbeturinave është përditësuar',
    location: 'District 2',
    municipalityId: 'prishtina',
    time: '08:30',
    description:
      'Evening collection will begin at 19:00. Please place bins at the designated collection points before 18:45.',
    descriptionSq:
      'Mbledhja e mbrëmjes do të fillojë në ora 19:00. Ju lutemi vendosni koshat në pikat e caktuara para orës 18:45.',
  },
  {
    id: 'alert-transit-istog',
    type: 'Information',
    title: 'Bus Route 5 Minor Delays',
    titleSq: 'Vonesa të vogla në linjën e autobusit 5',
    location: 'Istog – Peja corridor',
    municipalityId: 'istog',
    time: '09:15',
    description:
      'Route 5 is running 10–15 minutes behind schedule due to roadworks near the municipal centre.',
    descriptionSq:
      'Linja 5 po vonohet 10–15 minuta për shkak të punimeve rrugore pranë qendrës komunale.',
  },
  {
    id: 'alert-wifi-decan',
    type: 'Maintenance',
    title: 'Public Wi-Fi Upgrade in Deçan Square',
    titleSq: 'Përmirësim i Wi-Fi publike në Sheshin e Deçanit',
    location: 'Deçan Square',
    municipalityId: 'decan',
    time: '07:45',
    description:
      'Public Wi-Fi access points are being upgraded until 16:00. Temporary outages are expected.',
    descriptionSq:
      'Pikat e qasjes Wi-Fi publike po përmirësohen deri në ora 16:00. Priten ndërprerje të përkohshme.',
  },
]

export function getAlertById(id: string): Alert | undefined {
  return alerts.find((a) => a.id === id)
}
