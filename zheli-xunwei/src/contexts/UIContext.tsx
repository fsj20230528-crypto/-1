import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type UIContextValue = {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (next: boolean) => void
  isMdUp: boolean
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMdUp, setIsMdUp] = useState(() => window.matchMedia('(min-width: 768px)').matches)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const onChange = () => setIsMdUp(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (isMdUp && window.matchMedia('(max-width: 1199px)').matches) setSidebarCollapsed(true)
    if (!isMdUp) setSidebarCollapsed(false)
  }, [isMdUp])

  const value = useMemo<UIContextValue>(() => ({ sidebarCollapsed, setSidebarCollapsed, isMdUp }), [sidebarCollapsed, isMdUp])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}

