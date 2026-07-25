import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { alerts } from '../data/alerts'
import { events } from '../data/events'
import { opportunities } from '../data/opportunities'
import { services } from '../data/services'
import { EmptyState } from './EmptyState'

export function SearchModal() {
  const { searchOpen, setSearchOpen, language, tr } = useApp()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      window.setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, setSearchOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null

    const match = (...values: string[]) =>
      values.some((v) => v.toLowerCase().includes(q))

    return {
      services: services.filter((s) =>
        match(s.name, s.nameSq, s.description, s.descriptionSq, s.status),
      ),
      alerts: alerts.filter((a) =>
        match(a.title, a.titleSq, a.description, a.descriptionSq, a.location, a.type),
      ),
      events: events.filter((e) =>
        match(
          e.title,
          e.titleSq,
          e.shortDescription,
          e.shortDescriptionSq,
          e.location,
          e.category,
        ),
      ),
      opportunities: opportunities.filter((o) =>
        match(
          o.title,
          o.titleSq,
          o.organisation,
          o.shortDescription,
          o.shortDescriptionSq,
          o.type,
          o.location,
        ),
      ),
    }
  }, [query])

  if (!searchOpen) return null

  const total =
    results == null
      ? -1
      : results.services.length +
        results.alerts.length +
        results.events.length +
        results.opportunities.length

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-navy/40 p-0 sm:items-start sm:p-4 sm:pt-20"
      role="dialog"
      aria-modal="true"
      aria-label={tr('search')}
    >
      <button
        type="button"
        className="absolute inset-0 hidden sm:block"
        aria-label={tr('close')}
        onClick={() => setSearchOpen(false)}
      />
      <div className="relative flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[80vh] sm:rounded-2xl">
        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-3 safe-top sm:px-4">
          <Search className="h-5 w-5 shrink-0 text-navy-muted" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr('searchPlaceholder')}
            className="min-w-0 flex-1 bg-transparent text-base text-navy outline-none placeholder:text-slate-400"
            aria-label={tr('search')}
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="rounded-lg p-2 text-navy-muted hover:bg-slate-100"
            aria-label={tr('close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:max-h-[60vh]">
          {!query.trim() ? (
            <p className="py-8 text-center text-sm text-navy-muted">
              {tr('searchPlaceholder')}
            </p>
          ) : total === 0 ? (
            <EmptyState
              title={tr('noSearchResults')}
              description={tr('noSearchResultsHint')}
              icon={Search}
            />
          ) : results ? (
            <div className="space-y-5">
              <ResultGroup
                title={tr('services')}
                items={results.services.map((s) => ({
                  id: s.id,
                  to: `/service/${s.id}`,
                  label: language === 'sq' ? s.nameSq : s.name,
                  meta: s.status,
                }))}
                onNavigate={() => setSearchOpen(false)}
              />
              <ResultGroup
                title={tr('alerts')}
                items={results.alerts.map((a) => ({
                  id: a.id,
                  to: `/alert/${a.id}`,
                  label: language === 'sq' ? a.titleSq : a.title,
                  meta: a.type,
                }))}
                onNavigate={() => setSearchOpen(false)}
              />
              <ResultGroup
                title={tr('events')}
                items={results.events.map((e) => ({
                  id: e.id,
                  to: `/event/${e.id}`,
                  label: language === 'sq' ? e.titleSq : e.title,
                  meta: e.category,
                }))}
                onNavigate={() => setSearchOpen(false)}
              />
              <ResultGroup
                title={tr('opportunities')}
                items={results.opportunities.map((o) => ({
                  id: o.id,
                  to: `/opportunity/${o.id}`,
                  label: language === 'sq' ? o.titleSq : o.title,
                  meta: o.type,
                }))}
                onNavigate={() => setSearchOpen(false)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ResultGroup({
  title,
  items,
  onNavigate,
}: {
  title: string
  items: { id: string; to: string; label: string; meta: string }[]
  onNavigate: () => void
}) {
  if (!items.length) return null
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy-muted">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.to}
              onClick={onNavigate}
              className="flex min-w-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-teal-soft"
            >
              <span className="min-w-0 text-sm font-medium text-navy break-words-safe">
                {item.label}
              </span>
              <span className="shrink-0 text-xs text-navy-muted">{item.meta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
