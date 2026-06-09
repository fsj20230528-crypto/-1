import { Heart, Map, MapPin, NotebookPen, Settings } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/', label: '地图', icon: Map },
  { to: '/checkins', label: '打卡', icon: MapPin },
  { to: '/favorites', label: '收藏', icon: Heart },
  { to: '/diary', label: '日记', icon: NotebookPen },
  { to: '/settings', label: '设置', icon: Settings },
]

export function MobileTabBar() {
  const location = useLocation()
  const show = !location.pathname.startsWith('/login') && !location.pathname.startsWith('/loading')

  if (!show) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-black/10 bg-white/90 px-2 py-2 backdrop-blur md:hidden">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            `flex w-full flex-col items-center justify-center gap-1 rounded-xl py-1 text-xs transition-all duration-300 ease-in-out ${
              isActive ? 'text-sauce-red' : 'text-text-secondary'
            } active:scale-[0.98]`
          }
          end={t.to === '/'}
        >
          <t.icon className="h-5 w-5" />
          <span className="leading-none">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

