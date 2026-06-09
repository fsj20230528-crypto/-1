import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BrandPanel } from '../components/login/BrandPanel'
import { LoginForm } from '../components/login/LoginForm'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <main className="min-h-dvh w-full bg-bg-paper">
      <div className="mx-auto grid min-h-dvh w-full max-w-[1200px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-10 md:gap-8 md:px-6 md:py-10">
        <section className="md:col-span-6">
          <BrandPanel />
        </section>
        <section className="md:col-span-4">
          <LoginForm />
        </section>
      </div>
    </main>
  )
}

