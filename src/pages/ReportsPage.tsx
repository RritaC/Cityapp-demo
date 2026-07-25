import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getMunicipality } from '../data/municipalities'
import { formatDate } from '../utils/storage'
import { EmptyState } from '../components/EmptyState'
import { PageContainer } from '../components/PageContainer'
import {
  StatusBadge,
  reportStatusTone,
  urgencyTone,
} from '../components/StatusBadge'

export function ReportsPage() {
  const { tr, reports, language } = useApp()

  const statusLabel = (status: string) => {
    if (status === 'Received') return tr('received')
    if (status === 'Under Review') return tr('underReview')
    if (status === 'In Progress') return tr('inProgress')
    return tr('resolved')
  }

  return (
    <PageContainer className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            {tr('myReports')}
          </h1>
          <p className="mt-1 text-sm text-navy-muted">
            {reports.length} {tr('results').toLowerCase()}
          </p>
        </div>
        <Link
          to="/report"
          className="rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
        >
          {tr('reportIssue')}
        </Link>
      </div>

      {!reports.length ? (
        <EmptyState
          title={tr('noReports')}
          description={tr('noReportsHint')}
          action={
            <Link
              to="/report"
              className="rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white"
            >
              {tr('reportIssue')}
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {reports.map((report) => {
            const municipality = getMunicipality(report.municipalityId)
            return (
              <li
                key={report.id}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                      {report.id}
                    </p>
                    <h2 className="mt-1 font-display text-lg font-semibold text-navy">
                      {report.category}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge
                      label={statusLabel(report.status)}
                      tone={reportStatusTone(report.status)}
                    />
                    <StatusBadge
                      label={
                        report.urgency === 'Low'
                          ? tr('low')
                          : report.urgency === 'Medium'
                            ? tr('medium')
                            : tr('high')
                      }
                      tone={urgencyTone(report.urgency)}
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-navy-muted">
                  {report.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {report.location}
                  </span>
                  <span>
                    {municipality
                      ? language === 'sq'
                        ? municipality.nameSq
                        : municipality.name
                      : ''}
                  </span>
                  <span>
                    {tr('date')}: {formatDate(report.submittedAt, language)}
                  </span>
                  {report.anonymous ? (
                    <span className="font-medium text-navy">{tr('submitAnonymously')}</span>
                  ) : null}
                </div>
                {report.imageDataUrl ? (
                  <img
                    src={report.imageDataUrl}
                    alt={`Attachment for report ${report.id}`}
                    className="mt-3 h-36 w-full rounded-xl object-cover"
                  />
                ) : null}
              </li>
            )
          })}
        </ul>
      )}
    </PageContainer>
  )
}
