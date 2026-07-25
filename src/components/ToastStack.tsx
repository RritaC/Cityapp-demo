import { useApp } from '../context/AppContext'
import { X, CheckCircle2, Info, AlertCircle } from 'lucide-react'

export function ToastStack() {
  const { toasts, dismissToast } = useApp()

  if (!toasts.length) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[calc(4.5rem+env(safe-area-inset-top))] z-50 flex flex-col items-center gap-2 px-3 sm:px-4 lg:top-6"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'error'
            ? AlertCircle
            : toast.type === 'info'
              ? Info
              : CheckCircle2
        const colors =
          toast.type === 'error'
            ? 'bg-red-50 text-critical ring-red-100'
            : toast.type === 'info'
              ? 'bg-sky-50 text-info ring-sky-100'
              : 'bg-emerald-50 text-success ring-emerald-100'

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl px-4 py-3 shadow-lg ring-1 ${colors}`}
            role="status"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="rounded-lg p-1 opacity-70 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
