import { useMemo, useState } from 'react'
import type { EventCategory } from '../types'
import { useApp } from '../context/AppContext'
import { eventCategories, events } from '../data/events'
import { EmptyState } from '../components/EmptyState'
import { EventCard } from '../components/EventCard'
import { FilterChips } from '../components/FilterChips'
import { PageContainer } from '../components/PageContainer'

const allCategories = ['All', ...eventCategories] as const

export function EventsPage() {
  const { tr } = useApp()
  const [category, setCategory] = useState<(typeof allCategories)[number]>('All')

  const filtered = useMemo(() => {
    if (category === 'All') return events
    return events.filter((e) => e.category === category)
  }, [category])

  const categoryLabel = (c: (typeof allCategories)[number]) => {
    if (c === 'All') return tr('all')
    const map: Record<EventCategory, string> = {
      Children: tr('children'),
      Youth: tr('youth'),
      Adults: tr('adults'),
      Technology: tr('technology'),
      Culture: tr('culture'),
      Environment: tr('environment'),
      Sports: tr('sports'),
      Education: tr('education'),
    }
    return map[c]
  }

  return (
    <PageContainer className="space-y-4">
      <div className="min-w-0">
        <h1 className="font-display text-xl font-bold text-navy sm:text-2xl md:text-3xl">
          {tr('events')}
        </h1>
        <p className="mt-1 text-sm text-navy-muted">{tr('communityEvents')}</p>
      </div>

      <FilterChips
        options={allCategories}
        value={category}
        onChange={setCategory}
        getLabel={categoryLabel}
        ariaLabel={tr('category')}
      />

      {!filtered.length ? (
        <EmptyState title={tr('noEvents')} description={tr('noEventsHint')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
