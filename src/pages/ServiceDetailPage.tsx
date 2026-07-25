import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Bus,
  Clock,
  Droplets,
  Lightbulb,
  MapPin,
  Megaphone,
  Phone,
  Road,
  Trash2,
  Wifi,
  Zap,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useApp } from '../context/AppContext'
import { alerts } from '../data/alerts'
import { getMunicipality } from '../data/municipalities'
import { getServiceById } from '../data/services'
import { AlertCard } from '../components/AlertCard'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { StatusBadge, serviceTone } from '../components/StatusBadge'

const icons = {
  zap: Zap,
  droplets: Droplets,
  wifi: Wifi,
  trash: Trash2,
  bus: Bus,
  road: Road,
}

export function ServiceDetailPage() {
  const { id } = useParams()
  const { language, tr } = useApp()
  const service = id ? getServiceById(id) : undefined

  if (!service) {
    return (
      <PageContainer>
        <p className="text-navy-muted">{tr('serviceNotFound')}</p>
        <Link to="/services" className="mt-3 inline-block font-semibold text-teal">
          {tr('back')}
        </Link>
      </PageContainer>
    )
  }

  const Icon = icons[service.icon]
  const name = language === 'sq' ? service.nameSq : service.name
  const description = language === 'sq' ? service.descriptionSq : service.description
  const municipality = getMunicipality(service.municipalityId)
  const munName = municipality
    ? language === 'sq'
      ? municipality.nameSq
      : municipality.name
    : ''
  const areas = language === 'sq' ? service.affectedAreasSq : service.affectedAreas
  const tips = language === 'sq' ? service.tipsSq : service.tips
  const hours = language === 'sq' ? service.hoursSq : service.hours
  const relatedAlerts = alerts.filter((a) => service.relatedAlertIds.includes(a.id))
  const chartData = service.updates
    .slice()
    .reverse()
    .map((u, index) => ({
      name: u.time,
      updates: index + 1,
    }))

  return (
    <PageContainer className="max-w-3xl space-y-4">
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        {tr('back')}
      </Link>

      <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:rounded-3xl">
        <div className="bg-gradient-to-br from-teal to-teal-dark px-4 py-5 text-white sm:px-6 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-teal-light">{tr('cityServices')}</p>
                <h1 className="font-display text-xl font-bold break-words-safe sm:text-2xl md:text-3xl">
                  {name}
                </h1>
              </div>
            </div>
            <StatusBadge label={service.status} tone={serviceTone(service.status)} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/90">{description}</p>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          <dl className="grid gap-3 sm:grid-cols-2">
            <Meta
              icon={MapPin}
              label={tr('municipality')}
              value={munName}
            />
            <Meta
              icon={Clock}
              label={tr('lastUpdated')}
              value={service.lastUpdated}
            />
            <Meta icon={Phone} label={tr('contact')} value={service.contact} />
            <Meta icon={Clock} label={tr('serviceHours')} value={hours} />
          </dl>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">
              {tr('affectedAreas')}
            </h2>
            <ul className="mt-2 space-y-2">
              {areas.map((area) => (
                <li
                  key={area}
                  className="rounded-xl bg-page px-3 py-2.5 text-sm text-navy break-words-safe"
                >
                  {area}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy">
              {tr('liveUpdates')}
            </h2>
            <ol className="mt-3 space-y-3">
              {service.updates.map((update) => (
                <li
                  key={`${update.time}-${update.message}`}
                  className="flex gap-3 rounded-xl bg-page px-3 py-3"
                >
                  <span className="shrink-0 text-xs font-semibold text-teal">
                    {update.time}
                  </span>
                  <p className="min-w-0 text-sm text-navy-muted break-words-safe">
                    {language === 'sq' ? update.messageSq : update.message}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-4 h-40 min-w-0 overflow-hidden rounded-2xl bg-page p-2 sm:p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={24} />
                  <Tooltip />
                  <Bar dataKey="updates" fill="#0d9488" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-semibold text-navy">
              <Lightbulb className="h-5 w-5 text-teal" aria-hidden />
              {tr('residentTips')}
            </h2>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-navy-muted">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/report"
              state={{ category: service.reportCategory }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal py-3.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              <Megaphone className="h-4 w-4" aria-hidden />
              {tr('reportIssue')}
            </Link>
            <Link
              to="/services"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-100 py-3.5 text-sm font-semibold text-navy hover:bg-slate-200"
            >
              {tr('viewAlerts')}
            </Link>
          </div>
        </div>
      </article>

      {relatedAlerts.length > 0 ? (
        <section>
          <SectionHeader title={tr('relatedAlerts')} />
          <div className="space-y-3">
            {relatedAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </section>
      ) : null}
    </PageContainer>
  )
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl bg-page px-3 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs font-medium text-navy-muted">{label}</dt>
        <dd className="text-sm font-semibold text-navy break-words-safe">{value}</dd>
      </div>
    </div>
  )
}
