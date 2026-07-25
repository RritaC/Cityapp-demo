import { NavLink } from 'react-router-dom'
import {
  Briefcase,
  CalendarDays,
  Home,
  LayoutGrid,
  UserRound,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const links = [
  { to: '/', key: 'home' as const, icon: Home },
  { to: '/services', key: 'services' as const, icon: LayoutGrid },
  { to: '/events', key: 'events' as const, icon: CalendarDays },
  { to: '/jobs', key: 'jobs' as const, icon: Briefcase },
  { to: '/profile', key: 'profile' as const, icon: UserRound },
]

export function MobileNavigation() {
  const { tr } = useApp()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden safe-bottom"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between gap-0.5 px-1 pt-1">
        {links.map(({ to, key, icon: Icon }) => (
          <li key={to} className="min-w-0 flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center gap-0.5 rounded-xl px-0.5 py-2 text-[10px] font-semibold leading-tight transition sm:text-[11px] ${
                  isActive
                    ? 'bg-teal-soft text-teal-dark'
                    : 'text-navy-muted hover:text-navy'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="w-full truncate text-center">{tr(key)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
