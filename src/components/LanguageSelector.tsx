import type { Language } from '../types'
import { useApp } from '../context/AppContext'

interface LanguageSelectorProps {
  className?: string
}

export function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, tr } = useApp()

  return (
    <div
      className={`inline-flex rounded-xl bg-slate-100 p-1 ${className}`}
      role="group"
      aria-label={tr('language')}
    >
      {([
        { id: 'sq' as Language, label: 'Shqip' },
        { id: 'en' as Language, label: 'EN' },
      ]).map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLanguage(opt.id)}
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
            language === opt.id
              ? 'bg-white text-teal shadow-sm'
              : 'text-navy-muted hover:text-navy'
          }`}
          aria-pressed={language === opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
