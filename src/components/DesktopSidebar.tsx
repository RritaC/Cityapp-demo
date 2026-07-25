import { NavLink } from 'react-router-dom'
import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  Home,
  LayoutGrid,
  Megaphone,
  UserRound,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LanguageSelector } from './LanguageSelector'
import { MunicipalitySelector } from './MunicipalitySelector'

const links = [
  { to: '/', key: 'home' as const, icon: Home },
  { to: '/services', key: 'services' as const, icon: LayoutGrid },
  { to: '/events', key: 'events' as const, icon: CalendarDays },
  { to: '/jobs', key: 'jobs' as const, icon: Briefcase },
  { to: '/report', key: 'reportIssue' as const, icon: Megaphone },
  { to: '/reports', key: 'myReports' as const, icon: ClipboardList },
  { to: '/profile', key: 'profile' as const, icon: UserRound },
]

export function DesktopSidebar() {
  const { tr } = useApp()

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white xl:w-72">
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-slate-100 px-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path
              d="M5 18V8l7-3.5L19 8v10l-7 3.5L5 18z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="11" r="2" fill="#99F6E4" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-navy">{tr('appName')}</p>
          <p className="text-[11px] font-medium text-teal">{tr('appSubtitle')}</p>
        </div>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Sidebar">
        {links.map(({ to, key, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? 'bg-teal-soft text-teal-dark'
                  : 'text-navy-muted hover:bg-slate-50 hover:text-navy'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden />
            <span className="truncate">{tr(key)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 space-y-3 border-t border-slate-100 p-4">
        <MunicipalitySelector className="w-full [&_select]:w-full" />
        <LanguageSelector />
        <p className="text-[11px] leading-relaxed text-navy-muted">
          <span className="font-semibold text-teal">{tr('demoMode')}</span>
          <br />
          {tr('demoModeHint')}
        </p>
      </div>
    </aside>
  )
}
