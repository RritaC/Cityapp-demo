import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LanguageSelector } from './LanguageSelector'
import { MunicipalitySelector } from './MunicipalitySelector'

export function AppHeader() {
  const { tr, setSearchOpen } = useApp()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md safe-top">
      <div className="mx-auto flex max-w-6xl min-w-0 items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 shrink lg:invisible lg:pointer-events-none lg:w-0 lg:overflow-hidden"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal text-white shadow-sm sm:h-9 sm:w-9">
            <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" aria-hidden>
              <path
                d="M5 18V8l7-3.5L19 8v10l-7 3.5L5 18z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="11" r="2" fill="#99F6E4" />
            </svg>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-sm font-bold text-navy sm:text-base md:text-lg">
              {tr('appName')}
            </span>
            <span className="block text-[11px] font-medium text-teal">
              {tr('appSubtitle')}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <MunicipalitySelector
            compact
            className="hidden max-w-[8.5rem] min-[420px]:inline-flex sm:max-w-[10rem] md:max-w-none"
          />
          <LanguageSelector className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-xl bg-slate-100 p-2 text-navy hover:bg-teal-soft hover:text-teal sm:p-2.5"
            aria-label={tr('search')}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/profile"
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-navy text-xs font-semibold text-white ring-2 ring-teal-light sm:h-9 sm:w-9 sm:text-sm"
            aria-label={tr('profile')}
          >
            G
          </Link>
        </div>
      </div>
    </header>
  )
}
