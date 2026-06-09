import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { UIProvider } from './contexts/UIContext'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { ToastViewport } from './components/common/ToastViewport'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AppLayout } from './routes/AppLayout'
import { LoadingPage } from './pages/LoadingPage'
import { LoginPage } from './pages/LoginPage'
import { CheckinsPage } from './pages/drawer/CheckinsPage'
import { DiaryPage } from './pages/drawer/DiaryPage'
import { FavoritesPage } from './pages/drawer/FavoritesPage'
import { SettingsPage } from './pages/drawer/SettingsPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <UIProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route index element={null} />
                    <Route path="checkins" element={<CheckinsPage />} />
                    <Route path="favorites" element={<FavoritesPage />} />
                    <Route path="diary" element={<DiaryPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/loading" element={<ProtectedRoute />}>
                  <Route index element={<LoadingPage />} />
                </Route>
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </BrowserRouter>
            <ToastViewport />
          </ToastProvider>
        </UIProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
