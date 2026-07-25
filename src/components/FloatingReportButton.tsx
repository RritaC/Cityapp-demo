import { Link, useLocation } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function FloatingReportButton() {
  const { tr } = useApp()
  const { pathname } = useLocation()

  if (
    pathname === '/report' ||
    pathname.startsWith('/event/') ||
    pathname.startsWith('/opportunity/') ||
    pathname.startsWith('/alert/') ||
    pathname.startsWith('/service/')
  ) {
    return null
  }

  return (
    <Link
      to="/report"
      className="fixed z-20 inline-flex items-center justify-center gap-2 rounded-full bg-teal text-sm font-semibold text-white shadow-lg shadow-teal/30 hover:bg-teal-dark bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-3 h-12 w-12 sm:right-4 sm:h-auto sm:w-auto sm:px-4 sm:py-3.5 lg:bottom-8 lg:right-8"
      aria-label={tr('reportIssue')}
    >
      <Plus className="h-5 w-5 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{tr('reportIssue')}</span>
    </Link>
  )
}
