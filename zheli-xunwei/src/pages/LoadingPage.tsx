import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TreasureChest } from '../components/login/TreasureChest'

export function LoadingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = window.setTimeout(() => navigate('/', { replace: true }), 1500)
    return () => window.clearTimeout(t)
  }, [navigate])

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-bg-paper">
      <div className="absolute inset-0 z-0 zlxw-ink-bg" />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          <TreasureChest mode="loading" />
        </div>
        <h1 className="mt-6 font-display text-3xl tracking-[0.18em] text-primary">浙里寻味</h1>
        <p className="mt-3 text-sm text-text-secondary">正在加载美食宝藏...</p>
      </div>
    </main>
  )
}

