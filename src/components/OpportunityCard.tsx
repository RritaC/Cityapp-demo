import { Link } from 'react-router-dom'
import { Bookmark, Building2, Calendar, MapPin } from 'lucide-react'
import type { Opportunity } from '../types'
import { useApp } from '../context/AppContext'
import { formatEventDate } from '../utils/storage'
import { StatusBadge } from './StatusBadge'

interface OpportunityCardProps {
  opportunity: Opportunity
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { language, tr, isOpportunitySaved, toggleSavedOpportunity } = useApp()
  const title = language === 'sq' ? opportunity.titleSq : opportunity.title
  const short =
    language === 'sq'
      ? opportunity.shortDescriptionSq
      : opportunity.shortDescription
  const saved = isOpportunitySaved(opportunity.id)

  return (
    <article className="flex min-w-0 flex-col rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-slate-100 sm:p-4">
      <div className="mb-2">
        <StatusBadge label={opportunity.type} tone="teal" />
      </div>
      <h3 className="font-display text-base font-semibold leading-snug text-navy break-words-safe">
        {title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-navy-muted">{short}</p>
      <ul className="mt-3 space-y-1.5 text-xs text-navy-muted">
        <li className="flex min-w-0 items-start gap-1.5">
          <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
          <span className="break-words-safe">{opportunity.organisation}</span>
        </li>
        <li className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
          {opportunity.location}
        </li>
        <li className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
          {tr('deadline')}: {formatEventDate(opportunity.deadline, language)}
        </li>
      </ul>
      <div className="mt-auto flex gap-2 pt-4">
        <Link
          to={`/opportunity/${opportunity.id}`}
          className="min-w-0 flex-1 rounded-xl bg-teal px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-teal-dark"
        >
          {tr('viewDetails')}
        </Link>
        <button
          type="button"
          onClick={() => toggleSavedOpportunity(opportunity.id)}
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
    </article>
  )
}
