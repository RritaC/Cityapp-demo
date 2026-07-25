import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { AlertType, Language, MunicipalityId } from '../types'
import { useApp } from '../context/AppContext'
import { events } from '../data/events'
import { municipalities } from '../data/municipalities'
import { opportunities } from '../data/opportunities'
import { EmptyState } from '../components/EmptyState'
import { LanguageSelector } from '../components/LanguageSelector'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'

export function ProfilePage() {
  const {
    tr,
    language,
    preferences,
    reports,
    updatePreferences,
    setLanguage,
    resetDemo,
    showToast,
  } = useApp()

  const savedEvents = events.filter((e) =>
    preferences.savedEventIds.includes(e.id),
  )
  const savedOpps = opportunities.filter((o) =>
    preferences.savedOpportunityIds.includes(o.id),
  )

  const toggleAlertCategory = (category: AlertType) => {
    const current = preferences.alertCategories
    const next = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category]
    updatePreferences({ alertCategories: next })
    showToast(tr('toastPrefsSaved'), 'info')
  }

  return (
    <PageContainer className="max-w-3xl space-y-6">
      <section className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">
          G
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">
            {tr('guestUser')}
          </h1>
          <p className="text-sm text-navy-muted">{tr('guestAccount')}</p>
          <p className="mt-1 text-xs font-semibold text-teal">{tr('demoMode')}</p>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <SectionHeader title={tr('account')} />
        <ProfileRow label={tr('personalInfo')}>
          <ul className="space-y-1 text-sm text-navy-muted">
            <li>
              <span className="font-medium text-navy">{tr('name')}:</span>{' '}
              {tr('guestUser')}
            </li>
            <li>
              <span className="font-medium text-navy">{tr('email')}:</span>{' '}
              {tr('guestEmail')}
            </li>
            <li className="pt-1 text-xs leading-relaxed">{tr('notSignedIn')}</li>
          </ul>
        </ProfileRow>
        <ProfileRow label={tr('securityPrivacy')}>
          <p className="text-sm text-navy-muted">{tr('securityNote')}</p>
        </ProfileRow>
      </section>

      <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <SectionHeader title={tr('preferences')} />
        <div>
          <p className="mb-2 text-sm font-semibold text-navy">
            {tr('displayLanguage')}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSelector />
            <div className="flex gap-2">
              {([
                { id: 'sq' as Language, label: 'Shqip' },
                { id: 'en' as Language, label: 'English' },
              ]).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setLanguage(opt.id)
                    showToast(tr('toastPrefsSaved'), 'info')
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold ring-1 ${
                    language === opt.id
                      ? 'bg-teal-soft text-teal-dark ring-teal-light'
                      : 'bg-white text-navy-muted ring-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ToggleRow
          label={tr('publicServiceAlerts')}
          checked={preferences.publicServiceAlerts}
          onChange={(checked) => {
            updatePreferences({ publicServiceAlerts: checked })
            showToast(tr('toastPrefsSaved'), 'info')
          }}
        />
        <ToggleRow
          label={tr('jobRecommendations')}
          checked={preferences.jobRecommendations}
          onChange={(checked) => {
            updatePreferences({ jobRecommendations: checked })
            showToast(tr('toastPrefsSaved'), 'info')
          }}
        />
        <ToggleRow
          label={tr('eventRecommendations')}
          checked={preferences.eventRecommendations}
          onChange={(checked) => {
            updatePreferences({ eventRecommendations: checked })
            showToast(tr('toastPrefsSaved'), 'info')
          }}
        />
      </section>

      <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <SectionHeader title={tr('myCity')} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">
            {tr('municipality')}
          </span>
          <select
            value={preferences.municipalityId}
            onChange={(e) => {
              updatePreferences({
                municipalityId: e.target.value as MunicipalityId,
              })
              showToast(tr('toastPrefsSaved'), 'info')
            }}
            className="w-full rounded-xl bg-slate-50 px-3 py-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-teal"
          >
            {municipalities.map((m) => (
              <option key={m.id} value={m.id}>
                {language === 'sq' ? m.nameSq : m.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">
            {tr('district')}
          </span>
          <input
            type="text"
            value={preferences.district}
            onChange={(e) => updatePreferences({ district: e.target.value })}
            onBlur={() => showToast(tr('toastPrefsSaved'), 'info')}
            className="w-full rounded-xl bg-slate-50 px-3 py-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-teal"
          />
        </label>
        <div>
          <p className="mb-2 text-sm font-semibold text-navy">
            {tr('preferredAlertCategories')}
          </p>
          <div className="flex flex-wrap gap-2">
            {(['Critical', 'Maintenance', 'Information'] as AlertType[]).map(
              (cat) => {
                const active = preferences.alertCategories.includes(cat)
                const label =
                  cat === 'Critical'
                    ? tr('critical')
                    : cat === 'Maintenance'
                      ? tr('maintenance')
                      : tr('information')
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleAlertCategory(cat)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${
                      active
                        ? 'bg-teal text-white ring-teal'
                        : 'bg-white text-navy-muted ring-slate-200'
                    }`}
                    aria-pressed={active}
                  >
                    {label}
                  </button>
                )
              },
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <SectionHeader title={tr('activity')} />

        <div>
          <h3 className="mb-2 text-sm font-semibold text-navy">
            {tr('savedEvents')}
          </h3>
          {!savedEvents.length ? (
            <EmptyState
              title={tr('emptySavedEvents')}
              description={tr('noEventsHint')}
            />
          ) : (
            <ul className="space-y-2">
              {savedEvents.map((event) => (
                <li key={event.id}>
                  <Link
                    to={`/event/${event.id}`}
                    className="block rounded-xl bg-page px-3 py-3 text-sm font-medium text-navy hover:bg-teal-soft"
                  >
                    {language === 'sq' ? event.titleSq : event.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-navy">
            {tr('savedOpportunities')}
          </h3>
          {!savedOpps.length ? (
            <EmptyState
              title={tr('emptySavedOpps')}
              description={tr('noOpportunitiesHint')}
            />
          ) : (
            <ul className="space-y-2">
              {savedOpps.map((opp) => (
                <li key={opp.id}>
                  <Link
                    to={`/opportunity/${opp.id}`}
                    className="block rounded-xl bg-page px-3 py-3 text-sm font-medium text-navy hover:bg-teal-soft"
                  >
                    {language === 'sq' ? opp.titleSq : opp.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-navy">
            {tr('myReports')}
          </h3>
          <Link
            to="/reports"
            className="block rounded-xl bg-page px-3 py-3 text-sm font-medium text-teal hover:bg-teal-soft"
          >
            {reports.length} {tr('myReports').toLowerCase()} →
          </Link>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <SectionHeader title={tr('aboutDemo')} />
        <p className="text-sm text-navy-muted">{tr('eagleCredit')}</p>
        <button
          type="button"
          onClick={resetDemo}
          className="w-full rounded-xl bg-slate-100 py-3 text-sm font-semibold text-navy hover:bg-slate-200"
        >
          {tr('resetDemo')}
        </button>
      </section>
    </PageContainer>
  )
}

function ProfileRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl bg-page px-4 py-3">
      <h3 className="mb-2 text-sm font-semibold text-navy">{label}</h3>
      {children}
    </div>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl bg-page px-4 py-3">
      <span className="text-sm font-medium text-navy">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded accent-teal"
      />
    </label>
  )
}
