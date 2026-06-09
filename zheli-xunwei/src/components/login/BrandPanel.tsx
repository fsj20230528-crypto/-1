import { Sailboat } from 'lucide-react'
import { TreasureChest } from './TreasureChest'

export function BrandPanel() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-black/10 shadow-sm">
      <div className="absolute inset-0 z-0 zlxw-ink-bg" />
      <div className="absolute inset-0 z-0 bg-warm-apricot/35 backdrop-blur-[1px]" />

      <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
        <header className="flex items-start justify-between">
          <div>
            <div className="font-display text-3xl tracking-[0.18em] text-text-primary">浙里寻味</div>
            <div className="mt-1 text-sm text-text-secondary">江南烟火 · 现代寻宝</div>
          </div>
          <div className="relative h-12 w-12 rounded-xl border border-primary/40 bg-primary/15">
            <div className="absolute inset-2 rounded-lg bg-primary/20" />
          </div>
        </header>

        <section className="mt-8 flex flex-1 items-center justify-center">
          <div className="relative">
            <TreasureChest mode="login" />
          </div>
        </section>

        <footer className="mt-6 flex items-end justify-between">
          <p className="max-w-[22ch] text-sm leading-relaxed text-sauce-red">一张地图，吃遍浙江百县千味</p>
          <div className="text-xs text-text-muted">浙里寻味 · 2026</div>
        </footer>
      </div>

      <div className="pointer-events-none absolute right-5 top-6 z-10">
        <div className="relative h-10 w-12">
          <div className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white/40 blur-[1px] animate-steam" />
          <div className="absolute left-5 top-0 h-3 w-3 rounded-full bg-white/35 blur-[1px] animate-steam" style={{ animationDelay: '200ms' }} />
          <div className="absolute left-8 top-2 h-3 w-3 rounded-full bg-white/30 blur-[1px] animate-steam" style={{ animationDelay: '520ms' }} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex items-center gap-2 text-primary/70 animate-drift">
        <Sailboat className="h-5 w-5" />
        <div className="h-[2px] w-10 rounded-full bg-primary/35" />
      </div>
    </div>
  )
}
