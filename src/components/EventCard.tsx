import { Link } from 'react-router-dom'
import { Bookmark, Calendar, Clock, MapPin } from 'lucide-react'
import type { CityEvent } from '../types'
import { useApp } from '../context/AppContext'
import { getMunicipality } from '../data/municipalities'
import { formatEventDate } from '../utils/storage'
import { StatusBadge } from './StatusBadge'

interface EventCardProps {
  event: CityEvent
}

export function EventCard({ event }: EventCardProps) {
  const { language, tr, isEventSaved, toggleSavedEvent } = useApp()
  const title = language === 'sq' ? event.titleSq : event.title
  const short =
    language === 'sq' ? event.shortDescriptionSq : event.shortDescription
  const municipality = getMunicipality(event.municipalityId)
  const saved = isEventSaved(event.id)

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <img
          src={event.image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {event.featured ? (
          <div className="absolute left-3 top-3">
            <StatusBadge label={tr('featured')} tone="teal" />
          </div>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <StatusBadge label={event.category} tone="teal" />
        </div>
        <h3 className="font-display text-base font-semibold leading-snug text-navy break-words-safe">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-navy-muted">{short}</p>
        <ul className="mt-3 space-y-1.5 text-xs text-navy-muted">
          <li className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
            {formatEventDate(event.date, language)}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
            {event.time}
          </li>
          <li className="flex min-w-0 items-start gap-1.5">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
            <span className="break-words-safe">
              {event.location}
              {municipality
                ? ` · ${language === 'sq' ? municipality.nameSq : municipality.name}`
                : ''}
            </span>
          </li>
        </ul>
        <div className="mt-auto flex gap-2 pt-4">
          <Link
            to={`/event/${event.id}`}
            className="min-w-0 flex-1 rounded-xl bg-teal px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-teal-dark"
          >
            {tr('details')}
          </Link>
          <button
            type="button"
            onClick={() => toggleSavedEvent(event.id)}
            className={`inline-flex shrink-0 items-center justify-center rounded-xl px-3 py-2.5 ring-1 ${
              saved
                ? 'bg-teal-soft text-teal-dark ring-teal-light'
                : 'bg-white text-navy-muted ring-slate-200 hover:bg-slate-50'
            }`}
            aria-label={saved ? tr('saved') : tr('save')}
            aria-pressed={saved}
          >
            <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  )
}
