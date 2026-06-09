import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export type ToastItem = {
  id: string
  type: ToastType
  message: string
}

type ToastContextValue = {
  toasts: ToastItem[]
  pushToast: (toast: Omit<ToastItem, 'id'> & { durationMs?: number }) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timers = useRef<Map<string, number>>(new Map())

  const dismissToast = useCallback((id: string) => {
    const t = timers.current.get(id)
    if (t) window.clearTimeout(t)
    timers.current.delete(id)
    setToasts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast: Omit<ToastItem, 'id'> & { durationMs?: number }) => {
      const id = `t_${Date.now()}_${Math.random().toString(16).slice(2)}`
      const item: ToastItem = { id, type: toast.type, message: toast.message }
      setToasts((prev) => [...prev, item].slice(-3))

      const duration = toast.durationMs ?? 1500
      const timer = window.setTimeout(() => dismissToast(id), duration)
      timers.current.set(id, timer)
    },
    [dismissToast],
  )

  const value = useMemo<ToastContextValue>(() => ({ toasts, pushToast, dismissToast }), [toasts, pushToast, dismissToast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

