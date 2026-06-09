import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="min-h-dvh w-full bg-bg-paper text-text-primary">
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl tracking-[0.18em] text-primary">浙里寻味</h1>
        <p className="mt-3 text-sm text-text-secondary">这页走丢了，去地图上继续寻宝吧。</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98]"
        >
          返回主界面
        </Link>
      </div>
    </main>
  )
}

