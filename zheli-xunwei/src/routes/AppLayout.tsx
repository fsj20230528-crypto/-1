import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Drawer } from '../components/common/Drawer'
import { Sidebar } from '../components/layout/Sidebar'
import { MobileTabBar } from '../components/layout/MobileTabBar'
import { MapView } from '../components/map/MapView'

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const drawerOpen = location.pathname !== '/'

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-bg-paper">
      <Sidebar />
      <main className="relative flex h-dvh min-w-0 flex-1">
        <MapView drawerOpen={drawerOpen} />
      </main>
      <MobileTabBar />

      <Drawer open={drawerOpen} onClose={() => navigate('/')} fullScreenOnMd>
        <Outlet />
      </Drawer>
    </div>
  )
}

