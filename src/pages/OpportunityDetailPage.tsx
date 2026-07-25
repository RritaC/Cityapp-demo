import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Bookmark,
  Building2,
  Calendar,
  MapPin,
  Tag,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getOpportunityById } from '../data/opportunities'
import { formatEventDate } from '../utils/storage'
import { PageContainer } from '../components/PageContainer'
import { StatusBadge } from '../components/StatusBadge'

export function OpportunityDetailPage() {
  const { id } = useParams()
  const {
    language,
    tr,
    isOpportunitySaved,
    toggleSavedOpportunity,
    showToast,
  } = useApp()
  const opportunity = id ? getOpportunityById(id) : undefined

  if (!opportunity) {
    return (
      <PageContainer>
        <p className="text-navy-muted">Opportunity not found.</p>
        <Link to="/jobs" className="mt-3 inline-block font-semibold text-teal">
          {tr('back')}
        </Link>
      </PageContainer>
    )
  }

  const title = language === 'sq' ? opportunity.titleSq : opportunity.title
  const description =
    language === 'sq' ? opportunity.descriptionSq : opportunity.description
  const requirements =
    language === 'sq' ? opportunity.requirementsSq : opportunity.requirements
  const saved = isOpportunitySaved(opportunity.id)

  return (
    <PageContainer className="max-w-3xl space-y-4">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        {tr('back')}
      </Link>

      <article className="space-y-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
        <StatusBadge label={opportunity.type} tone="teal" />
        <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-navy-muted sm:text-base">
          {description}
        </p>

        <dl className="grid gap-3 sm:grid-cols-2">
          <Meta icon={Building2} label={tr('organisation')} value={opportunity.organisation} />
          <Meta icon={MapPin} label={tr('location')} value={opportunity.location} />
          <Meta
            icon={Calendar}
            label={tr('deadline')}
            value={formatEventDate(opportunity.deadline, language)}
          />
          <Meta icon={Tag} label={tr('type')} value={opportunity.type} />
        </dl>

        <div>
          <h2 className="font-display text-lg font-semibold text-navy">
            {tr('requirements')}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-navy-muted">
            {requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={() => showToast(tr('interestSent'))}
            className="flex-1 rounded-xl bg-teal py-3.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            {tr('applyInterest')}
          </button>
          <button
            type="button"
            onClick={() => toggleSavedOpportunity(opportunity.id)}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold ring-1 ${
              saved
                ? 'bg-teal-soft text-teal-dark ring-teal-light'
                : 'bg-white text-navy ring-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
            {saved ? tr('saved') : tr('save')}
          </button>
        </div>
      </article>
    </PageContainer>
  )
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-page px-3 py-3">
      <Icon className="mt-0.5 h-4 w-4 text-teal" aria-hidden />
      <div>
        <dt className="text-xs font-medium text-navy-muted">{label}</dt>
        <dd className="text-sm font-semibold text-navy">{value}</dd>
      </div>
    </div>
  )
}
