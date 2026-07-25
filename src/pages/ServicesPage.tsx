import { useMemo, useState } from 'react'
import type { AlertType } from '../types'
import { useApp } from '../context/AppContext'
import { alerts } from '../data/alerts'
import { services } from '../data/services'
import { AlertCard } from '../components/AlertCard'
import { FilterChips } from '../components/FilterChips'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { ServiceCard } from '../components/ServiceCard'

const filters = ['All', 'Critical', 'Maintenance', 'Information'] as const

export function ServicesPage() {
  const { tr } = useApp()
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')

  const filtered = useMemo(
    () =>
      filter === 'All' ? alerts : alerts.filter((a) => a.type === (filter as AlertType)),
    [filter],
  )

  const filterLabel = (f: (typeof filters)[number]) => {
    if (f === 'All') return tr('all')
    if (f === 'Critical') return tr('critical')
    if (f === 'Maintenance') return tr('maintenance')
    return tr('information')
  }

  return (
    <PageContainer className="space-y-5 sm:space-y-6">
      <div className="min-w-0">
        <h1 className="font-display text-xl font-bold text-navy sm:text-2xl md:text-3xl">
          {tr('publicServices')}
        </h1>
        <p className="mt-1 text-sm text-navy-muted">{tr('demoModeHint')}</p>
      </div>

      <section className="min-w-0">
        <SectionHeader title={tr('cityServices')} />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="min-w-0 space-y-3">
        <SectionHeader title={tr('liveFeed')} />
        <FilterChips
          options={filters}
          value={filter}
          onChange={setFilter}
          getLabel={filterLabel}
          ariaLabel={tr('filters')}
        />
        <div className="space-y-3">
          {filtered.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>
    </PageContainer>
  )
}
