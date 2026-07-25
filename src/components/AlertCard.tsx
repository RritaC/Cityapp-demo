import { Link } from 'react-router-dom'
import { AlertTriangle, Clock, MapPin } from 'lucide-react'
import type { Alert } from '../types'
import { useApp } from '../context/AppContext'
import { StatusBadge, alertTone } from './StatusBadge'

interface AlertCardProps {
  alert: Alert
  featured?: boolean
}

export function AlertCard({ alert, featured = false }: AlertCardProps) {
  const { language, tr } = useApp()
  const title = language === 'sq' ? alert.titleSq : alert.title
  const description = language === 'sq' ? alert.descriptionSq : alert.description
  const typeLabel =
    alert.type === 'Critical'
      ? tr('critical')
      : alert.type === 'Maintenance'
        ? tr('maintenance')
        : tr('information')

  return (
    <Link
      to={`/alert/${alert.id}`}
      className={`block min-w-0 rounded-2xl bg-white p-3.5 shadow-sm ring-1 transition hover:shadow-md sm:p-4 ${
        featured || alert.type === 'Critical'
          ? 'ring-red-100 hover:ring-red-200'
          : 'ring-slate-100 hover:ring-teal-light'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            alert.type === 'Critical'
              ? 'bg-red-50 text-critical'
              : alert.type === 'Maintenance'
                ? 'bg-amber-50 text-warning'
                : 'bg-sky-50 text-info'
          }`}
        >
          <AlertTriangle className="h-4 w-4" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <StatusBadge label={typeLabel} tone={alertTone(alert.type)} />
            <span className="inline-flex items-center gap-1 text-xs text-navy-muted">
              <Clock className="h-3 w-3" />
              {alert.time}
            </span>
          </div>
          <h3 className="font-display text-base font-semibold leading-snug text-navy break-words-safe">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-navy-muted">{description}</p>
          <p className="mt-2 inline-flex min-w-0 items-start gap-1 text-xs text-navy-muted">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
            <span className="break-words-safe">{alert.location}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
