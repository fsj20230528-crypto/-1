import { X } from 'lucide-react'
import { useToast } from '../../contexts/ToastContext'

const tone: Record<string, string> = {
  success: 'border-bamboo-green/40 bg-white text-text-primary',
  error: 'border-sauce-red/40 bg-white text-text-primary',
  info: 'border-primary/35 bg-white text-text-primary',
}

export function ToastViewport() {
  const { toasts, dismissToast } = useToast()

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-3 shadow-sm ${tone[t.type]} animate-pop-in`}
          role="status"
          aria-live="polite"
        >
          <div className="min-w-0 flex-1 text-sm leading-relaxed">{t.message}</div>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-text-muted transition-all duration-300 ease-in-out hover:bg-bg-paper hover:text-text-primary active:scale-[0.98]"
            onClick={() => dismissToast(t.id)}
            aria-label="关闭提示"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

