import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  widthClassName?: string
  fullScreenOnMd?: boolean
}

export function Drawer({ open, onClose, children, widthClassName, fullScreenOnMd }: Props) {
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    if (!mounted) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mounted, onClose])

  if (!mounted) return null

  const w = widthClassName ?? (fullScreenOnMd ? 'w-full md:w-full xl:w-[80%]' : 'w-full xl:w-[80%]')

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        aria-label="关闭侧边页"
        className={`absolute inset-0 bg-black/20 transition-all duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <section
        className={`absolute right-0 top-0 h-dvh ${w} overflow-hidden rounded-none bg-bg-paper shadow-sm transition-all duration-300 ease-in-out ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
        } md:rounded-l-2xl`}
        onTransitionEnd={() => {
          if (!open) setMounted(false)
        }}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </section>
    </div>
  )
}

