import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { DesktopSidebar } from './DesktopSidebar'
import { FloatingReportButton } from './FloatingReportButton'
import { MobileNavigation } from './MobileNavigation'
import { SearchModal } from './SearchModal'
import { ToastStack } from './ToastStack'
import { useApp } from '../context/AppContext'

export function Layout() {
  const { tr } = useApp()

  return (
    <div className="min-h-dvh max-w-[100vw] overflow-x-clip bg-page">
      <DesktopSidebar />
      <div className="min-w-0 lg:pl-64 xl:pl-72">
        <AppHeader />
        <main className="min-w-0 pb-[calc(5.75rem+env(safe-area-inset-bottom))] lg:pb-10">
          <Outlet />
        </main>
        <footer className="hidden border-t border-slate-200 px-6 py-4 text-center text-xs text-navy-muted lg:block xl:px-8">
          <span className="font-semibold text-teal">{tr('demoMode')}</span>
          {' · '}
          {tr('eagleCredit')}
        </footer>
      </div>
      <MobileNavigation />
      <FloatingReportButton />
      <SearchModal />
      <ToastStack />
    </div>
  )
}
