import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  Language,
  MunicipalityId,
  Report,
  ToastMessage,
  UserPreferences,
} from '../types'
import { t, type TranslationKey } from '../i18n/translations'
import {
  generateReportId,
  loadPreferences,
  loadReports,
  resetDemoData,
  savePreferences,
  saveReports,
} from '../utils/storage'

interface AppContextValue {
  preferences: UserPreferences
  reports: Report[]
  language: Language
  municipalityId: MunicipalityId
  toasts: ToastMessage[]
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  tr: (key: TranslationKey) => string
  setLanguage: (language: Language) => void
  setMunicipalityId: (id: MunicipalityId) => void
  updatePreferences: (patch: Partial<UserPreferences>) => void
  addReport: (report: Omit<Report, 'id' | 'status' | 'submittedAt'>) => Report
  toggleSavedEvent: (id: string) => void
  toggleSavedOpportunity: (id: string) => void
  isEventSaved: (id: string) => boolean
  isOpportunitySaved: (id: string) => boolean
  showToast: (message: string, type?: ToastMessage['type']) => void
  dismissToast: (id: string) => void
  resetDemo: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    loadPreferences(),
  )
  const [reports, setReports] = useState<Report[]>(() => loadReports())
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    savePreferences(preferences)
  }, [preferences])

  useEffect(() => {
    saveReports(reports)
  }, [reports])

  const tr = useCallback(
    (key: TranslationKey) => t(key, preferences.language),
    [preferences.language],
  )

  const showToast = useCallback(
    (message: string, type: ToastMessage['type'] = 'success') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setToasts((prev) => [...prev, { id, message, type }])
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 3200)
    },
    [],
  )

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const updatePreferences = useCallback((patch: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...patch }))
  }, [])

  const setLanguage = useCallback(
    (language: Language) => {
      setPreferences((prev) => ({ ...prev, language }))
    },
    [],
  )

  const setMunicipalityId = useCallback((municipalityId: MunicipalityId) => {
    setPreferences((prev) => ({ ...prev, municipalityId }))
  }, [])

  const addReport = useCallback(
    (input: Omit<Report, 'id' | 'status' | 'submittedAt'>) => {
      const report: Report = {
        ...input,
        id: generateReportId(reports),
        status: 'Received',
        submittedAt: new Date().toISOString(),
      }
      setReports((prev) => [report, ...prev])
      return report
    },
    [reports],
  )

  const toggleSavedEvent = useCallback(
    (id: string) => {
      setPreferences((prev) => {
        const exists = prev.savedEventIds.includes(id)
        const savedEventIds = exists
          ? prev.savedEventIds.filter((item) => item !== id)
          : [...prev.savedEventIds, id]
        return { ...prev, savedEventIds }
      })
      const exists = preferences.savedEventIds.includes(id)
      showToast(exists ? tr('toastUnsaved') : tr('toastSaved'))
    },
    [preferences.savedEventIds, showToast, tr],
  )

  const toggleSavedOpportunity = useCallback(
    (id: string) => {
      setPreferences((prev) => {
        const exists = prev.savedOpportunityIds.includes(id)
        const savedOpportunityIds = exists
          ? prev.savedOpportunityIds.filter((item) => item !== id)
          : [...prev.savedOpportunityIds, id]
        return { ...prev, savedOpportunityIds }
      })
      const exists = preferences.savedOpportunityIds.includes(id)
      showToast(exists ? tr('toastUnsaved') : tr('toastSaved'))
    },
    [preferences.savedOpportunityIds, showToast, tr],
  )

  const isEventSaved = useCallback(
    (id: string) => preferences.savedEventIds.includes(id),
    [preferences.savedEventIds],
  )

  const isOpportunitySaved = useCallback(
    (id: string) => preferences.savedOpportunityIds.includes(id),
    [preferences.savedOpportunityIds],
  )

  const resetDemo = useCallback(() => {
    const restored = resetDemoData()
    setPreferences(restored.preferences)
    setReports(restored.reports)
    showToast(tr('toastDemoReset'), 'info')
  }, [showToast, tr])

  const value = useMemo<AppContextValue>(
    () => ({
      preferences,
      reports,
      language: preferences.language,
      municipalityId: preferences.municipalityId,
      toasts,
      searchOpen,
      setSearchOpen,
      tr,
      setLanguage,
      setMunicipalityId,
      updatePreferences,
      addReport,
      toggleSavedEvent,
      toggleSavedOpportunity,
      isEventSaved,
      isOpportunitySaved,
      showToast,
      dismissToast,
      resetDemo,
    }),
    [
      preferences,
      reports,
      toasts,
      searchOpen,
      tr,
      setLanguage,
      setMunicipalityId,
      updatePreferences,
      addReport,
      toggleSavedEvent,
      toggleSavedOpportunity,
      isEventSaved,
      isOpportunitySaved,
      showToast,
      dismissToast,
      resetDemo,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
