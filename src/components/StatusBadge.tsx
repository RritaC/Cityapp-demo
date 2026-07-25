import type { AlertType, ReportStatus, ServiceStatus, Urgency } from '../types'

type BadgeTone = 'critical' | 'warning' | 'info' | 'success' | 'neutral' | 'teal'

const toneClasses: Record<BadgeTone, string> = {
  critical: 'bg-red-50 text-critical ring-red-100',
  warning: 'bg-amber-50 text-warning ring-amber-100',
  info: 'bg-sky-50 text-info ring-sky-100',
  success: 'bg-emerald-50 text-success ring-emerald-100',
  neutral: 'bg-slate-100 text-navy-muted ring-slate-200',
  teal: 'bg-teal-soft text-teal-dark ring-teal-light',
}

interface StatusBadgeProps {
  label: string
  tone?: BadgeTone
  className?: string
}

export function StatusBadge({
  label,
  tone = 'neutral',
  className = '',
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${toneClasses[tone]} ${className}`}
    >
      {label}
    </span>
  )
}

export function alertTone(type: AlertType): BadgeTone {
  if (type === 'Critical') return 'critical'
  if (type === 'Maintenance') return 'warning'
  return 'info'
}

export function serviceTone(status: ServiceStatus): BadgeTone {
  if (status === 'Outage') return 'critical'
  if (status === 'Degraded' || status === 'Minor Delays') return 'warning'
  if (status === 'Maintenance') return 'warning'
  if (status === 'Scheduled') return 'info'
  return 'success'
}

export function urgencyTone(urgency: Urgency): BadgeTone {
  if (urgency === 'High') return 'critical'
  if (urgency === 'Medium') return 'warning'
  return 'info'
}

export function reportStatusTone(status: ReportStatus): BadgeTone {
  if (status === 'Resolved') return 'success'
  if (status === 'In Progress') return 'teal'
  if (status === 'Under Review') return 'warning'
  return 'info'
}
