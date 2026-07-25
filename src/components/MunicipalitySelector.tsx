import { ChevronDown } from 'lucide-react'
import type { MunicipalityId } from '../types'
import { municipalities } from '../data/municipalities'
import { useApp } from '../context/AppContext'

interface MunicipalitySelectorProps {
  className?: string
  compact?: boolean
}

export function MunicipalitySelector({
  className = '',
  compact = false,
}: MunicipalitySelectorProps) {
  const { language, municipalityId, setMunicipalityId, tr } = useApp()

  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <span className="sr-only">{tr('municipality')}</span>
      <select
        value={municipalityId}
        onChange={(e) => setMunicipalityId(e.target.value as MunicipalityId)}
        className={`appearance-none rounded-xl bg-white pr-8 font-medium text-navy shadow-sm ring-1 ring-slate-200 hover:ring-teal focus:ring-2 focus:ring-teal max-w-full truncate ${
          compact ? 'max-w-[8.75rem] py-1.5 pl-2.5 text-xs sm:max-w-[10rem]' : 'py-2 pl-3 text-sm'
        }`}
        aria-label={tr('selectMunicipality')}
      >
        {municipalities.map((m) => (
          <option key={m.id} value={m.id}>
            {language === 'sq' ? m.nameSq : m.name}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 h-4 w-4 text-navy-muted"
        aria-hidden
      />
    </label>
  )
}
