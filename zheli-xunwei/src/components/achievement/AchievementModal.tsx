import { Award, Sparkles, X } from 'lucide-react'

type Props = {
  open: boolean
  title: string
  description: string
  onClose: () => void
}

export function AchievementModal({ open, title, description, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <button type="button" className="absolute inset-0 bg-black/30" onClick={onClose} aria-label="关闭成就弹窗" />
      <div className="relative w-full max-w-sm animate-pop-in overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="absolute inset-0 z-0 zlxw-ink-bg opacity-35" />
        <div className="relative z-10 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sauce-red/10 text-sauce-red">
            <Award className="h-7 w-7" />
          </div>
          <h3 className="mt-4 font-display text-2xl tracking-[0.1em] text-primary">{title}</h3>
          <p className="mt-2 text-sm text-text-secondary">{description}</p>

          <div className="mt-5 flex items-center justify-center gap-2 text-[#d9c07a]">
            <Sparkles className="h-5 w-5" />
            <Sparkles className="h-4 w-4" />
            <Sparkles className="h-5 w-5" />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98]"
          >
            收下徽章
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

