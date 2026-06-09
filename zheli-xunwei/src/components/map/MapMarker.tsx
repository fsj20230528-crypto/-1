import { Box, Sparkles, Utensils } from 'lucide-react'
import type { MapRegion } from '../../types'

type Props = {
  region: MapRegion
  activeBurst: boolean
  onHover: (r: MapRegion) => void
  onLeave: () => void
  onClick: () => void
}

export function MapMarker({ region, activeBurst, onHover, onLeave, onClick }: Props) {
  return (
    <button
      type="button"
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${region.x}%`, top: `${region.y}%` }}
      onMouseEnter={() => onHover(region)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(region)}
      onBlur={onLeave}
      onClick={onClick}
      aria-label={region.name}
    >
      <div className="relative flex flex-col items-center gap-1">
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300 ease-in-out active:scale-[0.98] ${
            region.checked
              ? 'border-sauce-red/30 bg-sauce-red/15 text-sauce-red'
              : 'border-black/15 bg-white/70 text-text-muted group-hover:border-primary/40 group-hover:text-primary'
          }`}
        >
          {region.checked ? <Utensils className="h-5 w-5" /> : <Box className="h-5 w-5" />}
          <div className={`pointer-events-none absolute inset-0 ${activeBurst ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-in-out`}>
            <Sparkles className="absolute -left-1 -top-1 h-4 w-4 text-[#d9c07a]" />
            <Sparkles className="absolute -right-1 top-2 h-3 w-3 text-[#d9c07a]" />
            <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9c07a]/25 blur-lg" />
          </div>
        </div>
        <div className="rounded-lg bg-white/70 px-2 py-0.5 text-xs text-text-secondary shadow-sm backdrop-blur transition-all duration-300 ease-in-out group-hover:bg-white/90">
          {region.name}
        </div>
      </div>
    </button>
  )
}

