import { useMemo, useState } from 'react'
import type { OpportunityType } from '../types'
import { useApp } from '../context/AppContext'
import { opportunities, opportunityTypes } from '../data/opportunities'
import { EmptyState } from '../components/EmptyState'
import { FilterChips } from '../components/FilterChips'
import { OpportunityCard } from '../components/OpportunityCard'
import { PageContainer } from '../components/PageContainer'

const allTypes = ['All', ...opportunityTypes] as const

export function JobsPage() {
  const { tr } = useApp()
  const [filter, setFilter] = useState<(typeof allTypes)[number]>('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return opportunities
    return opportunities.filter((o) => o.type === filter)
  }, [filter])

  const filterLabel = (f: (typeof allTypes)[number]) => {
    if (f === 'All') return tr('all')
    const map: Record<OpportunityType, string> = {
      Internships: tr('internships'),
      Volunteering: tr('volunteering'),
      Scholarships: tr('scholarships'),
      'Municipal Jobs': tr('municipalJobs'),
      'Youth Programmes': tr('youthProgrammes'),
      'Kosovo–U.S. Opportunities': tr('kosovoUs'),
    }
    return map[f]
  }

  return (
    <PageContainer className="space-y-4">
      <div className="min-w-0">
        <h1 className="font-display text-xl font-bold text-navy sm:text-2xl md:text-3xl">
          {tr('jobsOpportunities')}
        </h1>
        <p className="mt-1 text-sm text-navy-muted">{tr('exploreOpportunities')}</p>
      </div>

      <FilterChips
        options={allTypes}
        value={filter}
        onChange={setFilter}
        getLabel={filterLabel}
        ariaLabel={tr('filters')}
      />

      {!filtered.length ? (
        <EmptyState
          title={tr('noOpportunities')}
          description={tr('noOpportunitiesHint')}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
