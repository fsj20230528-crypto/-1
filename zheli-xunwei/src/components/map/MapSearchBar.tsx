import { Search, SlidersHorizontal } from 'lucide-react'

export function MapSearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="absolute right-4 top-4 z-20 w-[min(420px,calc(100vw-2rem))]">
      <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white/90 px-3 py-2 shadow-sm backdrop-blur transition-all duration-300 ease-in-out focus-within:border-primary">
        <Search className="h-4 w-4 text-text-muted" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索县市 / 美食"
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
          aria-label="筛选"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

