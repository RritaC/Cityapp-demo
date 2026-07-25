import type { CityService, UrbanVital } from '../types'

export const services: CityService[] = [
  {
    id: 'electricity',
    name: 'Electricity',
    nameSq: 'Energjia elektrike',
    status: 'Operational',
    municipalityId: 'prishtina',
    lastUpdated: '14:05',
    description:
      'Power supply is stable across most districts. Planned maintenance in Lakrishte from 11:00–13:30.',
    descriptionSq:
      'Furnizimi me energji është i qëndrueshëm në shumicën e lagjeve. Mirëmbajtje e planifikuar në Lakrishte nga 11:00–13:30.',
    icon: 'zap',
    affectedAreas: ['Lakrishte (planned window)', 'District 3 stable', 'City centre stable'],
    affectedAreasSq: ['Lakrishte (dritare e planifikuar)', 'Lagjia 3 e qëndrueshme', 'Qendra e qytetit e qëndrueshme'],
    tips: [
      'Unplug sensitive devices during the maintenance window.',
      'Check this page after 13:30 for confirmation that work is complete.',
      'Report unexpected outages outside Lakrishte via Report Issue.',
    ],
    tipsSq: [
      'Shkëputni pajisjet e ndjeshme gjatë dritares së mirëmbajtjes.',
      'Kontrolloni këtë faqe pas orës 13:30 për konfirmimin e përfundimit.',
      'Raportoni ndërprerje të papritura jashtë Lakrishte përmes Raporto Problemin.',
    ],
    contact: 'KEDS Contact Centre · 0800 123 45',
    hours: 'Crew response: 24/7 · Info desk: 08:00–20:00',
    hoursSq: 'Përgjigje ekuipazhi: 24/7 · Info: 08:00–20:00',
    updates: [
      {
        time: '14:05',
        message: 'Grid load normal outside the Lakrishte maintenance zone.',
        messageSq: 'Ngarkesa e rrjetit normale jashtë zonës së mirëmbajtjes në Lakrishte.',
      },
      {
        time: '10:00',
        message: 'Residents notified about planned optimisation work 11:00–13:30.',
        messageSq: 'Banorët u njoftuan për punimet e planifikuara 11:00–13:30.',
      },
    ],
    relatedAlertIds: ['alert-electricity-lakrishte'],
    reportCategory: 'Electricity',
  },
  {
    id: 'water',
    name: 'Water',
    nameSq: 'Uji',
    status: 'Outage',
    municipalityId: 'prishtina',
    lastUpdated: '14:20',
    description:
      'Water interruption in Prishtina Centre due to a main pipe failure on Agim Ramadani Street.',
    descriptionSq:
      'Ndërprerje e ujit në Qendër të Prishtinës për shkak të dëmtimit të tubacionit në rrugën Agim Ramadani.',
    icon: 'droplets',
    affectedAreas: ['Agim Ramadani Street', 'District 4', 'Parts of the city centre'],
    affectedAreasSq: ['Rruga Agim Ramadani', 'Lagjia 4', 'Pjesë të qendrës së qytetit'],
    tips: [
      'Store drinking water for the next 4–6 hours if you are in District 4.',
      'Avoid opening taps frequently — pressure may return suddenly.',
      'Emergency water points will be announced if restoration exceeds 6 hours.',
    ],
    tipsSq: [
      'Ruani ujë të pijshëm për 4–6 orët e ardhshme nëse jeni në Lagjen 4.',
      'Shmangni hapjen e shpeshtë të rubineteve — presioni mund të kthehet papritur.',
      'Pikat e ujit të emergjencës do të njoftohen nëse rivendosja tejkalon 6 orë.',
    ],
    contact: 'Regional Water Company Prishtina · 038 200 200',
    hours: 'Emergency crews on site · Updates every 60 minutes',
    hoursSq: 'Ekuipat e emergjencës në vend · Përditësime çdo 60 minuta',
    updates: [
      {
        time: '14:20',
        message: 'Main pipe failure confirmed. Estimated restoration 4–6 hours.',
        messageSq: 'Dëmtimi i tubacionit kryesor u konfirmua. Rivendosja e vlerësuar 4–6 orë.',
      },
      {
        time: '13:50',
        message: 'Low pressure reports received from District 4 residents.',
        messageSq: 'Raporte për presion të ulët nga banorët e Lagjes 4.',
      },
    ],
    relatedAlertIds: ['alert-water-centre'],
    reportCategory: 'Water',
  },
  {
    id: 'wifi',
    name: 'Public Wi-Fi',
    nameSq: 'Wi-Fi publike',
    status: 'Operational',
    municipalityId: 'prishtina',
    lastUpdated: '13:40',
    description:
      'Free municipal Wi-Fi is available in Mother Teresa Square, libraries, and youth centres.',
    descriptionSq:
      'Wi-Fi falas komunale është e disponueshme në Sheshin Nënë Tereza, biblioteka dhe qendra rinore.',
    icon: 'wifi',
    affectedAreas: ['Mother Teresa Square', 'City Library', 'Youth Centre Prishtina'],
    affectedAreasSq: ['Sheshi Nënë Tereza', 'Biblioteka e Qytetit', 'Qendra Rinore Prishtinë'],
    tips: [
      'Connect to the network named UrbanPulse-Free and accept the guest portal.',
      'Speeds are best for browsing, messaging, and light study use.',
      'Report dead zones with the Public Wi-Fi category in Report Issue.',
    ],
    tipsSq: [
      'Lidhuni me rrjetin UrbanPulse-Free dhe pranoni portalin e mysafirëve.',
      'Shpejtësitë janë më të mira për shfletim, mesazhe dhe studim të lehtë.',
      'Raportoni zona pa sinjal me kategorinë Wi-Fi në Raporto Problemin.',
    ],
    contact: 'Municipal ICT Desk · wifi@prishtina.demo',
    hours: 'Network monitoring: 07:00–22:00',
    hoursSq: 'Monitorimi i rrjetit: 07:00–22:00',
    updates: [
      {
        time: '13:40',
        message: 'All central access points online. Average speed within target range.',
        messageSq: 'Të gjitha pikat qendrore online. Shpejtësia mesatare brenda objektivit.',
      },
      {
        time: '09:00',
        message: 'Morning health check completed for square and library hotspots.',
        messageSq: 'Kontrolli i mëngjesit u përfundua për pikat në shesh dhe bibliotekë.',
      },
    ],
    relatedAlertIds: ['alert-wifi-decan'],
    reportCategory: 'Accessibility',
  },
  {
    id: 'waste',
    name: 'Waste Collection',
    nameSq: 'Mbledhja e mbeturinave',
    status: 'Scheduled',
    municipalityId: 'prishtina',
    lastUpdated: '08:30',
    description:
      'Evening collection for District 2 begins at 19:00. Recycling routes operate on schedule.',
    descriptionSq:
      'Mbledhja e mbrëmjes për Lagjen 2 fillon në ora 19:00. Linjat e riciklimit operojnë sipas orarit.',
    icon: 'trash',
    affectedAreas: ['District 2 (evening route)', 'Recycling points citywide'],
    affectedAreasSq: ['Lagjia 2 (linja e mbrëmjes)', 'Pikat e riciklimit në qytet'],
    tips: [
      'Place bins at designated points before 18:45.',
      'Separate paper, plastic, and glass where recycling containers are available.',
      'Do not leave bags beside full communal bins — report overflow instead.',
    ],
    tipsSq: [
      'Vendosni koshat në pikat e caktuara para orës 18:45.',
      'Ndani letër, plastikë dhe qelq ku ka kontejnerë riciklimi.',
      'Mos lini qese pranë koshave të mbushura — raportoni tejmbushjen.',
    ],
    contact: 'Municipal Waste Service · 038 555 120',
    hours: 'Collection windows: 06:00–10:00 and 19:00–22:00',
    hoursSq: 'Dritaret e mbledhjes: 06:00–10:00 dhe 19:00–22:00',
    updates: [
      {
        time: '08:30',
        message: 'District 2 evening schedule updated — collection starts at 19:00.',
        messageSq: 'Orari i mbrëmjes për Lagjen 2 u përditësua — fillon në 19:00.',
      },
      {
        time: '07:15',
        message: 'Morning routes completed on schedule in Districts 1 and 3.',
        messageSq: 'Linjat e mëngjesit u përfunduan sipas orarit në Lagjet 1 dhe 3.',
      },
    ],
    relatedAlertIds: ['alert-waste-district2'],
    reportCategory: 'Waste',
  },
  {
    id: 'transit',
    name: 'Public Transport',
    nameSq: 'Transporti publik',
    status: 'Minor Delays',
    municipalityId: 'prishtina',
    lastUpdated: '13:55',
    description:
      'Urban bus lines are operating with minor delays of 5–12 minutes during peak hours.',
    descriptionSq:
      'Linjat urbane të autobusëve po operojnë me vonesa të vogla 5–12 minuta gjatë orëve të pikut.',
    icon: 'bus',
    affectedAreas: ['Urban lines 1–7', 'Istog–Peja corridor (Route 5)'],
    affectedAreasSq: ['Linjat urbane 1–7', 'Koridori Istog–Pejë (Linja 5)'],
    tips: [
      'Allow 10–15 extra minutes during afternoon peak.',
      'Real-time stop boards in the centre show the next three arrivals.',
      'Report missing stops or accessibility issues via Report Issue.',
    ],
    tipsSq: [
      'Lëreni 10–15 minuta shtesë gjatë pikut të pasdites.',
      'Tabelat në kohë reale në qendër tregojnë tre mbërritjet e ardhshme.',
      'Raportoni ndalesa të munguara ose probleme qasjeje përmes Raporto Problemin.',
    ],
    contact: 'Urban Traffic · 038 200 300',
    hours: 'Service: 05:30–23:00 · Dispatch: 24/7',
    hoursSq: 'Shërbimi: 05:30–23:00 · Dispeçeri: 24/7',
    updates: [
      {
        time: '13:55',
        message: 'Peak delays averaging 8 minutes on central corridors.',
        messageSq: 'Vonesat e pikut mesatarisht 8 minuta në koridoret qendrore.',
      },
      {
        time: '09:15',
        message: 'Route 5 delayed 10–15 minutes near Istog municipal centre works.',
        messageSq: 'Linja 5 vonohet 10–15 minuta pranë punimeve në qendrën e Istogut.',
      },
    ],
    relatedAlertIds: ['alert-transit-istog'],
    reportCategory: 'Public Transport',
  },
  {
    id: 'roads',
    name: 'Road Maintenance',
    nameSq: 'Mirëmbajtja e rrugëve',
    status: 'Maintenance',
    municipalityId: 'prishtina',
    lastUpdated: '12:10',
    description:
      'Resurfacing works continue on Bill Clinton Boulevard. Expect single-lane traffic until Friday.',
    descriptionSq:
      'Punimet e asfaltimit vazhdojnë në Bulevardin Bill Clinton. Pritet trafik me një korsi deri të premten.',
    icon: 'road',
    affectedAreas: ['Bill Clinton Boulevard', 'Side access near the boulevard'],
    affectedAreasSq: ['Bulevardi Bill Clinton', 'Hyrjet anësore pranë bulevardit'],
    tips: [
      'Use alternative routes via Agim Ramadani or Mother Teresa Boulevard when possible.',
      'Expect slower traffic between 09:00 and 16:00 on weekdays.',
      'Report potholes or damaged signs with the Roads category.',
    ],
    tipsSq: [
      'Përdorni rruge alternative përmes Agim Ramadanit ose Bulevardit Nënë Tereza.',
      'Pritet trafik më i ngadalshëm mes orës 09:00 dhe 16:00 gjatë javës.',
      'Raportoni gropa ose shenja të dëmtuara me kategorinë Rrugë.',
    ],
    contact: 'Municipal Roads Directorate · 038 200 400',
    hours: 'Worksite hours: 08:00–17:00 (Mon–Fri)',
    hoursSq: 'Orari i punimeve: 08:00–17:00 (Hën–Pre)',
    updates: [
      {
        time: '12:10',
        message: 'Northbound lane closed for resurfacing; southbound remains open.',
        messageSq: 'Korsia drejt veriut e mbyllur për asfaltim; ajo drejt jugut mbetet e hapur.',
      },
      {
        time: '08:00',
        message: 'Crews mobilised for continued boulevard resurfacing.',
        messageSq: 'Ekuipat u mobilizuan për vazhdimin e asfaltimit të bulevardit.',
      },
    ],
    relatedAlertIds: [],
    reportCategory: 'Roads',
  },
]

export const urbanVitals: UrbanVital[] = [
  {
    id: 'traffic',
    label: 'Traffic Flow',
    labelSq: 'Rrjedha e trafikut',
    value: 'Moderate',
    valueSq: 'Mesatare',
    tone: 'moderate',
  },
  {
    id: 'power',
    label: 'Power Grid',
    labelSq: 'Rrjeti elektrik',
    value: 'Stable',
    valueSq: 'I qëndrueshëm',
    tone: 'good',
  },
  {
    id: 'water',
    label: 'Water Pressure',
    labelSq: 'Presioni i ujit',
    value: 'Low',
    valueSq: 'I ulët',
    tone: 'low',
  },
  {
    id: 'waste',
    label: 'Waste Collection',
    labelSq: 'Mbledhja e mbeturinave',
    value: 'Scheduled',
    valueSq: 'Sipas orarit',
    tone: 'good',
  },
  {
    id: 'transit',
    label: 'Public Transport',
    labelSq: 'Transporti publik',
    value: 'Minor Delays',
    valueSq: 'Vonesa të vogla',
    tone: 'moderate',
  },
]

export function getServiceById(id: string): CityService | undefined {
  return services.find((s) => s.id === id)
}
