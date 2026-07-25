interface FilterChipsProps<T extends string> {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  getLabel: (value: T) => string
  ariaLabel: string
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  getLabel,
  ariaLabel,
}: FilterChipsProps<T>) {
  return (
    <div className="-mx-3 px-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
      <div className="scroll-x" role="tablist" aria-label={ariaLabel}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={value === option}
            onClick={() => onChange(option)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition sm:px-4 ${
              value === option
                ? 'bg-teal text-white'
                : 'bg-white text-navy-muted ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {getLabel(option)}
          </button>
        ))}
      </div>
    </div>
  )
}
