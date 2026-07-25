import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useApp } from '../context/AppContext'
import { getAlertById } from '../data/alerts'
import { getMunicipality } from '../data/municipalities'
import { PageContainer } from '../components/PageContainer'
import { StatusBadge, alertTone } from '../components/StatusBadge'

export function AlertDetailPage() {
  const { id } = useParams()
  const { language, tr } = useApp()
  const alert = id ? getAlertById(id) : undefined

  if (!alert) {
    return (
      <PageContainer>
        <p className="text-navy-muted">Alert not found.</p>
        <Link to="/services" className="mt-3 inline-block font-semibold text-teal">
          {tr('back')}
        </Link>
      </PageContainer>
    )
  }

  const title = language === 'sq' ? alert.titleSq : alert.title
  const description = language === 'sq' ? alert.descriptionSq : alert.description
  const municipality = getMunicipality(alert.municipalityId)
  const typeLabel =
    alert.type === 'Critical'
      ? tr('critical')
      : alert.type === 'Maintenance'
        ? tr('maintenance')
        : tr('information')

  const chartData = [
    { name: 'Reports', value: alert.type === 'Critical' ? 18 : 6 },
    { name: 'Crews', value: alert.type === 'Critical' ? 4 : 2 },
    { name: 'Updates', value: 3 },
  ]

  return (
    <PageContainer className="max-w-3xl space-y-4">
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        {tr('back')}
      </Link>

      <article className="space-y-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
        <StatusBadge label={typeLabel} tone={alertTone(alert.type)} />
        <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-navy-muted sm:text-base">
          {description}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl bg-page px-3 py-3">
            <MapPin className="mt-0.5 h-4 w-4 text-teal" aria-hidden />
            <div>
              <p className="text-xs text-navy-muted">{tr('location')}</p>
              <p className="text-sm font-semibold text-navy">{alert.location}</p>
              {municipality ? (
                <p className="text-xs text-navy-muted">
                  {language === 'sq' ? municipality.nameSq : municipality.name}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-page px-3 py-3">
            <Clock className="mt-0.5 h-4 w-4 text-teal" aria-hidden />
            <div>
              <p className="text-xs text-navy-muted">{tr('time')}</p>
              <p className="text-sm font-semibold text-navy">{alert.time}</p>
              {alert.estimatedRestoration ? (
                <p className="text-xs text-navy-muted">
                  {tr('estimatedRestoration')}: {alert.estimatedRestoration}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-page p-4">
          <h2 className="mb-3 font-display text-base font-semibold text-navy">
            {tr('relatedService')}
          </h2>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={28} />
                <Tooltip />
                <Bar dataKey="value" fill="#0d9488" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </article>
    </PageContainer>
  )
}
