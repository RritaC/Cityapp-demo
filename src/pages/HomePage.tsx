import { Link } from 'react-router-dom'
import {
  Briefcase,
  CalendarDays,
  CloudSun,
  Megaphone,
  Wind,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { alerts } from '../data/alerts'
import { events } from '../data/events'
import { getMunicipality } from '../data/municipalities'
import { opportunities } from '../data/opportunities'
import { services, urbanVitals } from '../data/services'
import { AlertCard } from '../components/AlertCard'
import { EventCard } from '../components/EventCard'
import { OpportunityCard } from '../components/OpportunityCard'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { ServiceCard } from '../components/ServiceCard'
import { MunicipalitySelector } from '../components/MunicipalitySelector'
import { LanguageSelector } from '../components/LanguageSelector'

const vitalTone: Record<string, string> = {
  good: 'text-success',
  moderate: 'text-warning',
  low: 'text-critical',
  alert: 'text-critical',
}

export function HomePage() {
  const { tr, language, municipalityId } = useApp()
  const municipality = getMunicipality(municipalityId)
  const munName = municipality
    ? language === 'sq'
      ? municipality.nameSq
      : municipality.name
    : ''
  const importantAlert = alerts[0]
  const previewEvents = events.slice(0, 3)
  const previewOpps = opportunities.slice(0, 3)

  return (
    <PageContainer className="space-y-5 sm:space-y-6 pt-1 sm:pt-2">
      <section className="flex min-w-0 flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-xl font-bold text-navy break-words-safe sm:text-2xl md:text-3xl">
            {tr('greeting')}
          </h1>
          <p className="mt-1 text-sm text-navy-muted sm:text-base">
            {munName}, {tr('kosovo')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 min-[420px]:hidden">
          <MunicipalitySelector compact />
          <LanguageSelector className="sm:hidden" />
        </div>
        <LanguageSelector className="hidden min-[420px]:inline-flex sm:hidden" />
      </section>

      <section className="relative overflow-hidden rounded-2xl bg-navy text-white shadow-md sm:rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80"
          alt="City skyline representing Prishtina and Kosovo municipalities"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/70 to-teal-dark/60" />
        <div className="relative grid gap-4 p-4 sm:grid-cols-3 sm:p-6">
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-teal-light">{tr('weather')}</p>
            <div className="mt-2 flex items-center gap-3">
              <CloudSun className="h-9 w-9 shrink-0 text-teal-light sm:h-10 sm:w-10" aria-hidden />
              <div>
                <p className="font-display text-3xl font-bold sm:text-4xl">24°C</p>
                <p className="text-sm text-white/80">{tr('mostlySunny')}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15">
            <div className="flex items-center gap-2 text-sm text-teal-light">
              <Wind className="h-4 w-4 shrink-0" aria-hidden />
              {tr('airQuality')}
            </div>
            <p className="mt-2 font-display text-xl font-semibold sm:text-2xl">
              {tr('good')}, 32
            </p>
          </div>
        </div>
      </section>

      <section className="min-w-0">
        <SectionHeader title={tr('importantAlert')} actionLabel={tr('viewAll')} actionTo="/services" />
        <AlertCard alert={importantAlert} featured />
      </section>

      <section className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-5">
        <SectionHeader title={tr('urbanVitals')} />
        <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {urbanVitals.map((vital) => {
            const serviceId =
              vital.id === 'traffic'
                ? 'roads'
                : vital.id === 'power'
                  ? 'electricity'
                  : vital.id
            return (
              <li key={vital.id} className="min-w-0">
                <Link
                  to={`/service/${serviceId}`}
                  className="flex min-w-0 items-center justify-between gap-2 rounded-xl bg-page px-3 py-3 transition hover:bg-teal-soft"
                >
                  <span className="min-w-0 truncate text-sm text-navy-muted">
                    {language === 'sq' ? vital.labelSq : vital.label}
                  </span>
                  <span
                    className={`shrink-0 text-sm font-semibold ${vitalTone[vital.tone]}`}
                  >
                    {language === 'sq' ? vital.valueSq : vital.value}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="min-w-0">
        <SectionHeader title={tr('cityServices')} actionLabel={tr('viewAll')} actionTo="/services" />
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} compact />
          ))}
        </div>
      </section>

      <section className="min-w-0">
        <SectionHeader title={tr('communityEvents')} actionLabel={tr('viewAll')} actionTo="/events" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {previewEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="min-w-0">
        <SectionHeader
          title={tr('recentOpportunities')}
          actionLabel={tr('viewAll')}
          actionTo="/jobs"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {previewOpps.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>

      <section className="min-w-0">
        <SectionHeader title={tr('quickActions')} />
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          <QuickAction to="/report" label={tr('reportIssue')} icon={Megaphone} />
          <QuickAction to="/services" label={tr('viewAlerts')} icon={CloudSun} />
          <QuickAction to="/events" label={tr('findEvents')} icon={CalendarDays} />
          <QuickAction to="/jobs" label={tr('exploreOpportunities')} icon={Briefcase} />
        </div>
      </section>

      <p className="px-2 pb-2 text-center text-xs leading-relaxed text-navy-muted lg:hidden">
        <span className="font-semibold text-teal">{tr('demoMode')}</span>
        {' · '}
        {tr('eagleCredit')}
      </p>
    </PageContainer>
  )
}

function QuickAction({
  to,
  label,
  icon: Icon,
}: {
  to: string
  label: string
  icon: typeof Megaphone
}) {
  return (
    <Link
      to={to}
      className="flex min-w-0 flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 text-center shadow-sm ring-1 ring-slate-100 transition hover:ring-teal-light sm:px-3"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-soft text-teal">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="text-[11px] font-semibold leading-snug text-navy break-words-safe sm:text-sm">
        {label}
      </span>
    </Link>
  )
}
