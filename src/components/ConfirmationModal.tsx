import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ConfirmationModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  onClose: () => void
  onConfirm?: () => void
  children?: ReactNode
}

export function ConfirmationModal({
  open,
  title,
  description,
  confirmLabel = 'OK',
  onClose,
  onConfirm,
  children,
}: ConfirmationModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close dialog backdrop"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-navy-muted hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 id="confirm-title" className="font-display text-xl font-semibold text-navy pr-8">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-navy-muted">{description}</p>
        {children}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              onConfirm?.()
              onClose()
            }}
            className="rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
