import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '../types'
import { mockUser } from '../mock/data'
import { maskPhone } from '../utils/format'
import { readLocalStorageJson, removeLocalStorage, writeLocalStorageJson } from '../utils/storage'

type AuthState = {
  token: string
  user: User
}

type AuthContextValue = {
  isAuthenticated: boolean
  user: User | null
  login: (phoneDigits: string, codeDigits: string) => Promise<void>
  logout: () => void
}

const AUTH_KEY = 'zlxw_auth_v1'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState | null>(() => readLocalStorageJson<AuthState>(AUTH_KEY))

  useEffect(() => {
    if (!state) return
    writeLocalStorageJson(AUTH_KEY, state)
  }, [state])

  const value = useMemo<AuthContextValue>(() => {
    return {
      isAuthenticated: Boolean(state?.token),
      user: state?.user ?? null,
      login: async (phoneDigits, _codeDigits) => {
        const user: User = {
          ...mockUser,
          phoneMasked: maskPhone(phoneDigits),
        }
        setState({ token: `mock_${Date.now()}`, user })
      },
      logout: () => {
        removeLocalStorage(AUTH_KEY)
        setState(null)
      },
    }
  }, [state])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
