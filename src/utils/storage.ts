import type { Language, Report, UserPreferences } from '../types'

const REPORTS_KEY = 'urbanpulse-reports'
const PREFS_KEY = 'urbanpulse-preferences'

export const defaultPreferences: UserPreferences = {
  language: 'en',
  municipalityId: 'prishtina',
  district: 'District 4',
  publicServiceAlerts: true,
  jobRecommendations: true,
  eventRecommendations: true,
  alertCategories: ['Critical', 'Maintenance', 'Information'],
  savedEventIds: [],
  savedOpportunityIds: [],
}

export const sampleReports: Report[] = [
  {
    id: 'UP-2026-0087',
    municipalityId: 'prishtina',
    category: 'Street Lighting',
    location: 'Near Mother Teresa Square, District 1',
    description:
      'Two street lights near the pedestrian crossing have been dark for three nights, making the walkway unsafe after sunset.',
    urgency: 'Medium',
    status: 'In Progress',
    anonymous: false,
    submittedAt: '2026-07-18T09:30:00.000Z',
  },
  {
    id: 'UP-2026-0093',
    municipalityId: 'istog',
    category: 'Waste',
    location: 'Behind the municipal market',
    description:
      'Overflowing communal bins have not been emptied for several days. Odour and spillover are affecting nearby shops.',
    urgency: 'High',
    status: 'Under Review',
    anonymous: false,
    submittedAt: '2026-07-20T15:10:00.000Z',
  },
]

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function loadPreferences(): UserPreferences {
  const stored = safeParse<Partial<UserPreferences> | null>(
    localStorage.getItem(PREFS_KEY),
    null,
  )
  if (!stored) return { ...defaultPreferences }
  return {
    ...defaultPreferences,
    ...stored,
    alertCategories: stored.alertCategories ?? defaultPreferences.alertCategories,
    savedEventIds: stored.savedEventIds ?? [],
    savedOpportunityIds: stored.savedOpportunityIds ?? [],
  }
}

export function savePreferences(prefs: UserPreferences): void {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
}

export function loadReports(): Report[] {
  const stored = localStorage.getItem(REPORTS_KEY)
  if (!stored) {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(sampleReports))
    return [...sampleReports]
  }
  return safeParse<Report[]>(stored, [...sampleReports])
}

export function saveReports(reports: Report[]): void {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports))
}

export function generateReportId(existing: Report[]): string {
  const year = new Date().getFullYear()
  const nums = existing
    .map((r) => {
      const match = r.id.match(/UP-\d{4}-(\d+)/)
      return match ? Number(match[1]) : 0
    })
    .filter(Boolean)
  const next = (nums.length ? Math.max(...nums) : 141) + 1
  return `UP-${year}-${String(next).padStart(4, '0')}`
}

export function resetDemoData(): {
  preferences: UserPreferences
  reports: Report[]
} {
  const preferences = { ...defaultPreferences }
  const reports = [...sampleReports]
  savePreferences(preferences)
  saveReports(reports)
  return { preferences, reports }
}

export function formatDate(iso: string, language: Language): string {
  const date = new Date(iso)
  return date.toLocaleDateString(language === 'sq' ? 'sq-AL' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatEventDate(dateStr: string, language: Language): string {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString(language === 'sq' ? 'sq-AL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
