import { Link } from 'react-router-dom'
import {
  Bus,
  ChevronRight,
  Droplets,
  Road,
  Trash2,
  Wifi,
  Zap,
} from 'lucide-react'
import type { CityService } from '../types'
import { useApp } from '../context/AppContext'
import { getMunicipality } from '../data/municipalities'
import { StatusBadge, serviceTone } from './StatusBadge'

const icons = {
  zap: Zap,
  droplets: Droplets,
  wifi: Wifi,
  trash: Trash2,
  bus: Bus,
  road: Road,
}

interface ServiceCardProps {
  service: CityService
  compact?: boolean
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const { language, tr } = useApp()
  const Icon = icons[service.icon]
  const municipality = getMunicipality(service.municipalityId)
  const name = language === 'sq' ? service.nameSq : service.name

  return (
    <Link
      to={`/service/${service.id}`}
      className="group flex min-w-0 flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-teal-light sm:p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal sm:h-10 sm:w-10">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        </div>
        <StatusBadge label={service.status} tone={serviceTone(service.status)} />
      </div>
      <h3 className="mt-3 font-display text-sm font-semibold leading-snug text-navy break-words-safe sm:text-base">
        {name}
      </h3>
      {!compact ? (
        <>
          <p className="mt-1 truncate text-xs text-navy-muted">
            {municipality
              ? language === 'sq'
                ? municipality.nameSq
                : municipality.name
              : ''}
          </p>
          <p className="mt-2 text-xs text-navy-muted">
            {tr('lastUpdated')}: {service.lastUpdated}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:gap-1.5">
            {tr('viewDetails')}
            <ChevronRight className="h-4 w-4" />
          </span>
        </>
      ) : (
        <p className="mt-1 truncate text-xs text-navy-muted">{service.status}</p>
      )}
    </Link>
  )
}
