import React from 'react'

type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="min-h-dvh w-full bg-bg-paper text-text-primary">
        <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-3xl tracking-[0.18em] text-primary">浙里寻味</h1>
          <p className="mt-4 text-sm text-text-secondary">页面遇到了一点小波澜，请返回首页再试一次。</p>
          <a
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98]"
          >
            返回首页
          </a>
        </div>
      </main>
    )
  }
}

