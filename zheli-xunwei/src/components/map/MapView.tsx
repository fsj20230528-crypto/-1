import { useMemo, useState } from 'react'
import { mockRegions } from '../../mock/data'
import type { MapRegion } from '../../types'
import { MapControls } from './MapControls'
import { MapHoverCard } from './MapHoverCard'
import { MapMarker } from './MapMarker'
import { MapSearchBar } from './MapSearchBar'

export function MapView({ drawerOpen }: { drawerOpen: boolean }) {
  const [hovered, setHovered] = useState<MapRegion | null>(null)
  const [burstId, setBurstId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [scale, setScale] = useState(1)

  const regions = useMemo(() => {
    const q = query.trim()
    if (!q) return mockRegions
    return mockRegions.filter((r) => r.name.includes(q) || r.foodName.includes(q))
  }, [query])

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-warm-apricot">
        <div className="absolute inset-0 opacity-70 zlxw-ink-bg" />
      </div>

      <div className={`relative h-full w-full ${drawerOpen ? 'pointer-events-none' : ''}`}>
        <div
          className="absolute left-0 top-0 h-full w-full"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 600" className="h-full w-full">
              <path
                d="M170 110 C250 60, 340 70, 420 120 C520 80, 650 120, 690 220 C740 340, 650 460, 520 500 C400 560, 260 520, 200 420 C130 320, 120 200, 170 110 Z"
                fill="none"
                stroke="#333333"
                strokeWidth="3"
                strokeDasharray="8 10"
              />
            </svg>
          </div>

          {regions.map((r) => (
            <MapMarker
              key={r.id}
              region={r}
              activeBurst={burstId === r.id}
              onHover={(next) => setHovered(next)}
              onLeave={() => setHovered((p) => (p?.id === r.id ? null : p))}
              onClick={() => {
                setBurstId(r.id)
                window.setTimeout(() => setBurstId((p) => (p === r.id ? null : p)), 900)
              }}
            />
          ))}
        </div>

        <MapSearchBar value={query} onChange={setQuery} />
        <MapControls scale={scale} onScaleChange={setScale} onReset={() => { setScale(1); setQuery('') }} />
        {hovered ? <MapHoverCard region={hovered} /> : null}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-paper/90 to-transparent md:hidden" />
    </section>
  )
}
