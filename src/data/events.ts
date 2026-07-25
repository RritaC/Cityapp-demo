import type { CityEvent } from '../types'

export const events: CityEvent[] = [
  {
    id: 'evt-youth-collaboration',
    title: 'Kosovo–U.S. Youth Collaboration Forum',
    titleSq: 'Forumi i Bashkëpunimit Rinor Kosovë–SHBA',
    date: '2026-10-10',
    time: '14:00',
    location: 'Tech Park Prishtina',
    municipalityId: 'prishtina',
    category: 'Technology',
    audience: 'Youth',
    audienceSq: 'Të rinj',
    organiser: 'EAGLE Kosovo & UrbanPulse Team',
    description:
      'A youth-led forum presenting UrbanPulse Kosovo, EAGLE experiences, civic innovation, and opportunities for collaboration between Kosovo and the United States. Students will share demos, discuss municipal digital services, and connect with mentors from both Kosovo and U.S. partner organisations.',
    descriptionSq:
      'Një forum i udhëhequr nga të rinjtë që prezanton UrbanPulse Kosovo, përvojat e EAGLE, inovacionin qytetar dhe mundësitë e bashkëpunimit mes Kosovës dhe Shteteve të Bashkuara. Studentët do të ndajnë demo, do të diskutojnë shërbimet dixhitale komunale dhe do të lidhen me mentorë nga organizata partnere në Kosovë dhe SHBA.',
    shortDescription:
      'Youth-led forum on civic innovation and Kosovo–U.S. collaboration.',
    shortDescriptionSq:
      'Forum rinor për inovacion qytetar dhe bashkëpunim Kosovë–SHBA.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    featured: true,
  },
  {
    id: 'evt-innovation-day',
    title: 'Youth Innovation Day',
    titleSq: 'Dita e Inovacionit Rinor',
    date: '2026-09-18',
    time: '10:00',
    location: 'Tech Park Prishtina',
    municipalityId: 'prishtina',
    category: 'Technology',
    audience: 'Youth',
    audienceSq: 'Të rinj',
    organiser: 'Innovation Centre Kosovo',
    description:
      'A full-day programme of workshops, startup pitches, and mentoring sessions focused on digital solutions for Kosovo municipalities. Open to secondary school and university students.',
    descriptionSq:
      'Një program njëditor me punëtori, prezantime startup-esh dhe sesione mentorimi të fokusuara në zgjidhje dixhitale për komunat e Kosovës. I hapur për nxënës të shkollave të mesme dhe studentë universitarë.',
    shortDescription:
      'Workshops and pitches for digital municipal solutions.',
    shortDescriptionSq:
      'Punëtori dhe prezantime për zgjidhje dixhitale komunale.',
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
  },
  {
    id: 'evt-coding-workshop',
    title: 'Coding Workshop',
    titleSq: 'Punëtori e Programimit',
    date: '2026-08-22',
    time: '16:00',
    location: 'American Corner Prishtina',
    municipalityId: 'prishtina',
    category: 'Education',
    audience: 'Youth & Adults',
    audienceSq: 'Të rinj & të rritur',
    organiser: 'American Corner Prishtina',
    description:
      'Hands-on introduction to web development with React and TypeScript. Participants will build a small civic-themed mini project and learn about open-source collaboration.',
    descriptionSq:
      'Hyrje praktike në zhvillimin e uebit me React dhe TypeScript. Pjesëmarrësit do të ndërtojnë një mini-projekt me temë qytetare dhe do të mësojnë për bashkëpunimin open-source.',
    shortDescription:
      'Hands-on React & TypeScript workshop at American Corner.',
    shortDescriptionSq:
      'Punëtori praktike React & TypeScript në American Corner.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  },
  {
    id: 'evt-cleanup-istog',
    title: 'Community Clean-Up',
    titleSq: 'Pastrim Komunitar',
    date: '2026-09-05',
    time: '09:00',
    location: 'Istog River Path',
    municipalityId: 'istog',
    category: 'Environment',
    audience: 'All ages',
    audienceSq: 'Të gjitha moshat',
    organiser: 'Municipality of Istog & Local Youth Council',
    description:
      'Join neighbours for a morning clean-up along the river path and public parks. Gloves and bags provided. Volunteers receive a community participation certificate.',
    descriptionSq:
      'Bashkohuni me fqinjët për një pastrim të mëngjesit përgjatë shtegut të lumit dhe parqeve publike. Dorezat dhe qeset ofrohen. Vullnetarët marrin certifikatë pjesëmarrjeje.',
    shortDescription:
      'Morning clean-up along Istog river paths and parks.',
    shortDescriptionSq:
      'Pastrim i mëngjesit përgjatë shtigjeve dhe parqeve të Istogut.',
    image:
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
  },
  {
    id: 'evt-heritage-decan',
    title: 'Cultural Heritage Workshop',
    titleSq: 'Punëtori e Trashëgimisë Kulturore',
    date: '2026-08-30',
    time: '11:00',
    location: 'Cultural Centre Deçan',
    municipalityId: 'decan',
    category: 'Culture',
    audience: 'Adults & Youth',
    audienceSq: 'Të rritur & të rinj',
    organiser: 'Municipality of Deçan',
    description:
      'Explore local crafts, storytelling, and heritage preservation practices. Includes a guided visit focused on community history and cultural landmarks around Deçan.',
    descriptionSq:
      'Eksploroni zanatet lokale, tregimet dhe praktikat e ruajtjes së trashëgimisë. Përfshin një vizitë të udhëhequr të fokusuar në historinë e komunitetit dhe monumentet kulturore rreth Deçanit.',
    shortDescription:
      'Crafts, storytelling, and heritage preservation in Deçan.',
    shortDescriptionSq:
      'Zanate, tregime dhe ruajtje e trashëgimisë në Deçan.',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
  },
  {
    id: 'evt-sports-fk',
    title: 'Youth Sports Day',
    titleSq: 'Dita e Sportit Rinor',
    date: '2026-09-12',
    time: '15:00',
    location: 'Municipal Stadium Fushë Kosovë',
    municipalityId: 'fushe-kosove',
    category: 'Sports',
    audience: 'Youth & Children',
    audienceSq: 'Të rinj & fëmijë',
    organiser: 'Municipality of Fushë Kosovë',
    description:
      'Friendly tournaments in football, basketball, and athletics. Families welcome. Registration opens at 14:00 at the stadium entrance.',
    descriptionSq:
      'Turne miqësore në futboll, basketboll dhe atletikë. Familjet janë të mirëseardhura. Regjistrimi hapet në ora 14:00 te hyrja e stadiumit.',
    shortDescription:
      'Friendly tournaments for youth and children in Fushë Kosovë.',
    shortDescriptionSq:
      'Turne miqësore për të rinj dhe fëmijë në Fushë Kosovë.',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=800&q=80',
  },
]

export const eventCategories = [
  'Children',
  'Youth',
  'Adults',
  'Technology',
  'Culture',
  'Environment',
  'Sports',
  'Education',
] as const

export function getEventById(id: string): CityEvent | undefined {
  return events.find((e) => e.id === id)
}
