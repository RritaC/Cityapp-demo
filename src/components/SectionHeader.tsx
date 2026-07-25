import { Link } from 'react-router-dom'

interface SectionHeaderProps {
  title: string
  actionLabel?: string
  actionTo?: string
  subtitle?: string
}

export function SectionHeader({
  title,
  actionLabel,
  actionTo,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-3 flex min-w-0 items-end justify-between gap-2 sm:gap-3">
      <div className="min-w-0">
        <h2 className="font-display text-base font-semibold text-navy break-words-safe sm:text-lg md:text-xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 text-sm text-navy-muted">{subtitle}</p>
        ) : null}
      </div>
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="shrink-0 text-sm font-semibold text-teal hover:text-teal-dark"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
