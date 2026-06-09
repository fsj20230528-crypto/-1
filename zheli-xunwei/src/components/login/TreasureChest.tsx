import { Box, Sparkles, Utensils, Coffee, Soup } from 'lucide-react'
import { useEffect, useState } from 'react'

type Mode = 'login' | 'loading'

export function TreasureChest({ mode }: { mode: Mode }) {
  const [burst, setBurst] = useState(mode === 'loading')

  useEffect(() => {
    if (mode !== 'loading') return
    const t = window.setTimeout(() => setBurst(false), 1200)
    return () => window.clearTimeout(t)
  }, [mode])

  useEffect(() => {
    if (mode !== 'loading') return
    const t = window.setTimeout(() => setBurst(true), 520)
    return () => window.clearTimeout(t)
  }, [mode])

  const trigger = () => {
    if (mode !== 'login') return
    setBurst(true)
    window.setTimeout(() => setBurst(false), 900)
  }

  return (
    <button
      type="button"
      className="relative h-[132px] w-[160px] select-none rounded-2xl border border-primary/25 bg-white/40 shadow-sm transition-all duration-300 ease-in-out hover:bg-white/55 active:scale-[0.98]"
      onClick={trigger}
      aria-label="宝箱"
    >
      <div className="absolute inset-0 rounded-2xl zlxw-ink-bg opacity-45" />

      <div className="absolute left-1/2 top-[54%] z-10 -translate-x-1/2 -translate-y-1/2">
        <div className={`relative ${mode === 'login' ? 'animate-float' : ''}`}>
          <div
            className={`absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9c07a]/30 blur-xl transition-all duration-300 ease-in-out ${
              burst ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
            }`}
          />
          <Box className="h-16 w-16 text-primary" />
        </div>
      </div>

      <div className={`pointer-events-none absolute inset-0 z-20 transition-all duration-300 ease-in-out ${burst ? 'opacity-100' : 'opacity-0'}`}>
        <Sparkles className="absolute left-[22%] top-[22%] h-5 w-5 text-[#d9c07a]" />
        <Sparkles className="absolute right-[18%] top-[30%] h-4 w-4 text-[#d9c07a]" />
        <Sparkles className="absolute left-[40%] bottom-[18%] h-4 w-4 text-[#d9c07a]" />

        <div className={`absolute left-[22%] top-[34%] ${burst ? 'translate-y-0' : 'translate-y-2'} transition-all duration-300 ease-in-out`}>
          <Utensils className="h-5 w-5 text-sauce-red" />
        </div>
        <div className={`absolute left-[44%] top-[16%] ${burst ? 'translate-y-0' : 'translate-y-2'} transition-all duration-300 ease-in-out delay-75`}>
          <Coffee className="h-5 w-5 text-primary" />
        </div>
        <div className={`absolute right-[20%] top-[38%] ${burst ? 'translate-y-0' : 'translate-y-2'} transition-all duration-300 ease-in-out delay-150`}>
          <Soup className="h-5 w-5 text-bamboo-green" />
        </div>
      </div>
    </button>
  )
}

