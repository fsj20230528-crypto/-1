import { Utensils } from 'lucide-react'
import type { MapRegion } from '../../types'

export function MapHoverCard({ region }: { region: MapRegion }) {
  return (
    <div
      className="pointer-events-none absolute z-30 w-[220px] -translate-x-1/2 -translate-y-[calc(100%+14px)] animate-fade-in"
      style={{ left: `${region.x}%`, top: `${region.y}%` }}
    >
      <div className="rounded-2xl border border-black/10 bg-white/90 p-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Utensils className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-text-primary">{region.name} · {region.foodName}</div>
            <div className="mt-0.5 truncate text-xs text-text-muted">{region.checked ? '已打卡' : '未打卡'}</div>
          </div>
        </div>
        <div className="mt-2 text-xs leading-relaxed text-text-secondary">{region.slogan}</div>
      </div>
      <div className="mx-auto h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-white/90 drop-shadow-sm" />
    </div>
  )
}

