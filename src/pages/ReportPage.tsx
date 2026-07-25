import { useApp } from '../context/AppContext'
import { PageContainer } from '../components/PageContainer'
import { ReportForm } from '../components/ReportForm'

export function ReportPage() {
  const { tr } = useApp()

  return (
    <PageContainer className="max-w-2xl space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          {tr('reportIssue')}
        </h1>
        <p className="mt-1 text-sm text-navy-muted">
          {tr('demoModeHint')}
        </p>
      </div>
      <ReportForm />
    </PageContainer>
  )
}
