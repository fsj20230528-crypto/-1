import { LocateFixed, Maximize2, Minus, Plus } from 'lucide-react'

type Props = {
  scale: number
  onScaleChange: (next: number) => void
  onReset: () => void
}

export function MapControls({ scale, onScaleChange, onReset }: Props) {
  return (
    <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
      <div className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white/90 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={() => onScaleChange(Math.min(1.6, Number((scale + 0.1).toFixed(2))))}
          className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
          aria-label="放大"
        >
          <Plus className="h-4 w-4" />
        </button>
        <div className="h-px bg-black/10" />
        <button
          type="button"
          onClick={() => onScaleChange(Math.max(0.9, Number((scale - 0.1).toFixed(2))))}
          className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
          aria-label="缩小"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white/90 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
          aria-label="定位"
        >
          <LocateFixed className="h-4 w-4" />
        </button>
        <div className="h-px bg-black/10" />
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
          aria-label="全屏"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

