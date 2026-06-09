import { ChevronLeft, MapPin, Heart, NotebookPen, Settings, Utensils } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useUI } from '../../contexts/UIContext'

const items = [
  { to: '/checkins', label: '📍 我的打卡', icon: MapPin },
  { to: '/favorites', label: '❤️ 我的收藏', icon: Heart },
  { to: '/diary', label: '📝 美食日记', icon: NotebookPen },
  { to: '/settings', label: '⚙️ 账号设置', icon: Settings },
]

export function Sidebar() {
  const { user } = useAuth()
  const { sidebarCollapsed, setSidebarCollapsed } = useUI()

  return (
    <aside
      className={`relative hidden h-dvh shrink-0 flex-col bg-primary/95 text-white transition-all duration-300 ease-in-out md:flex ${
        sidebarCollapsed ? 'w-[60px]' : 'w-[240px]'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <div className={`flex items-center gap-3 overflow-hidden ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          {!sidebarCollapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{user?.nickname ?? '美食探险家'}</div>
              <div className="truncate text-xs text-white/80">{user?.level ?? '初级美食探险家'}</div>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden h-9 w-9 items-center justify-center rounded-xl text-white/90 transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98] md:inline-flex"
          aria-label="收起/展开导航栏"
        >
          <ChevronLeft className={`h-4 w-4 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-1 px-2">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `group relative flex h-14 items-center gap-3 rounded-xl px-3 text-sm transition-all duration-300 ease-in-out ${
                isActive ? 'bg-sauce-red text-white' : 'text-white/95 hover:bg-primary-dark'
              } ${sidebarCollapsed ? 'justify-center' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out ${
                    isActive ? 'bg-white' : 'bg-transparent group-hover:bg-sauce-red'
                  }`}
                />
                <it.icon className="h-5 w-5" />
                {!sidebarCollapsed ? <span className="truncate">{it.label}</span> : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-4 text-xs text-white/60">{sidebarCollapsed ? '©' : '浙里寻味 © 2026'}</div>
    </aside>
  )
}

