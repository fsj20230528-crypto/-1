import { X } from 'lucide-react'

export function DrawerHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-black/10 bg-white/70 px-6 py-5 backdrop-blur">
      <h2 className="font-display text-2xl tracking-[0.08em] text-primary">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
        aria-label="关闭"
      >
        <X className="h-4 w-4" />
      </button>
    </header>
  )
}

