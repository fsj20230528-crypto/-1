import type { LucideIcon } from 'lucide-react'

type Props = {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  icon?: LucideIcon
  right?: React.ReactNode
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  maxLength?: number
  error?: string
  type?: string
}

export function TextField({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  icon: Icon,
  right,
  inputMode,
  maxLength,
  error,
  type,
}: Props) {
  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1 text-xs font-semibold text-text-secondary">
          {label}
        </div>
      ) : null}
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm transition-all duration-300 ease-in-out focus-within:border-primary ${
          error ? 'border-sauce-red/60' : 'border-black/10'
        }`}
      >
        {Icon ? <Icon className="h-4 w-4 text-text-muted" /> : null}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          type={type ?? 'text'}
        />
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {error ? <div className="mt-1 text-xs text-sauce-red">{error}</div> : null}
    </div>
  )
}

