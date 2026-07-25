import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Bookmark,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getEventById } from '../data/events'
import { getMunicipality } from '../data/municipalities'
import { formatEventDate } from '../utils/storage'
import { ConfirmationModal } from '../components/ConfirmationModal'
import { PageContainer } from '../components/PageContainer'
import { StatusBadge } from '../components/StatusBadge'

export function EventDetailPage() {
  const { id } = useParams()
  const { language, tr, isEventSaved, toggleSavedEvent } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const event = id ? getEventById(id) : undefined

  if (!event) {
    return (
      <PageContainer>
        <p className="text-navy-muted">Event not found.</p>
        <Link to="/events" className="mt-3 inline-block text-teal font-semibold">
          {tr('back')}
        </Link>
      </PageContainer>
    )
  }

  const title = language === 'sq' ? event.titleSq : event.title
  const description = language === 'sq' ? event.descriptionSq : event.description
  const audience = language === 'sq' ? event.audienceSq : event.audience
  const municipality = getMunicipality(event.municipalityId)
  const saved = isEventSaved(event.id)

  return (
    <PageContainer className="max-w-3xl space-y-4">
      <Link
        to="/events"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        {tr('back')}
      </Link>

      <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="relative aspect-[16/9] bg-slate-200">
          <img
            src={event.image}
            alt={title}
            className="h-full w-full object-cover"
          />
          {event.featured ? (
            <div className="absolute left-4 top-4">
              <StatusBadge label={tr('featured')} tone="teal" />
            </div>
          ) : null}
        </div>
        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={event.category} tone="teal" />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-navy-muted sm:text-base">
            {description}
          </p>

          <dl className="grid gap-3 sm:grid-cols-2">
            <InfoRow
              icon={Calendar}
              label={tr('date')}
              value={formatEventDate(event.date, language)}
            />
            <InfoRow icon={Clock} label={tr('time')} value={event.time} />
            <InfoRow
              icon={MapPin}
              label={tr('venue')}
              value={`${event.location}${
                municipality
                  ? ` · ${language === 'sq' ? municipality.nameSq : municipality.name}`
                  : ''
              }`}
            />
            <InfoRow icon={Building2} label={tr('organiser')} value={event.organiser} />
            <InfoRow icon={Users} label={tr('audience')} value={audience} />
          </dl>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex-1 rounded-xl bg-teal py-3.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              {tr('register')}
            </button>
            <button
              type="button"
              onClick={() => toggleSavedEvent(event.id)}
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
        </div>
      </article>

      <ConfirmationModal
        open={modalOpen}
        title={tr('confirmRegistration')}
        description={tr('confirmRegistrationBody')}
        confirmLabel={tr('done')}
        onClose={() => setModalOpen(false)}
      />
    </PageContainer>
  )
}

function InfoRow({
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
