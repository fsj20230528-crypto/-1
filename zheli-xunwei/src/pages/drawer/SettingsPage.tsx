import { LogOut, Save, Shield, User2, Bell, Info } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DrawerHeader } from '../../components/common/DrawerHeader'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'

type SectionKey = 'profile' | 'password' | 'notify' | 'privacy' | 'about'

const sections: Array<{ key: SectionKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: 'profile', label: '个人信息', icon: User2 },
  { key: 'password', label: '修改密码', icon: Shield },
  { key: 'notify', label: '通知设置', icon: Bell },
  { key: 'privacy', label: '隐私设置', icon: Shield },
  { key: 'about', label: '关于我们', icon: Info },
]

export function SettingsPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { pushToast } = useToast()

  const [active, setActive] = useState<SectionKey>('profile')
  const [nickname, setNickname] = useState(user?.nickname ?? '')
  const [bio, setBio] = useState(user?.bio ?? '')

  return (
    <div className="flex h-dvh w-full flex-col">
      <DrawerHeader title="账号设置" onClose={() => navigate('/')} />

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <aside className="xl:col-span-2">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              {sections.map((s) => {
                const Icon = s.icon
                const isActive = active === s.key
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setActive(s.key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-300 ease-in-out active:scale-[0.98] ${
                      isActive ? 'bg-sauce-red text-white' : 'text-text-secondary hover:bg-bg-paper'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{s.label}</span>
                  </button>
                )
              })}

              <div className="my-3 h-px bg-black/10" />
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/login', { replace: true })
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-sauce-red transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
              >
                <LogOut className="h-5 w-5" />
                退出登录
              </button>
            </div>
          </aside>

          <section className="xl:col-span-3">
            {active === 'profile' ? (
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-text-primary">个人信息</div>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <User2 className="h-7 w-7" />
                  </div>
                  <button
                    type="button"
                    className="rounded-xl bg-bg-paper px-4 py-2 text-sm font-semibold text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper/70 active:scale-[0.98]"
                    onClick={() => pushToast({ type: 'info', message: '头像更换（模拟）' })}
                  >
                    更换头像
                  </button>
                </div>

                <div className="mt-5">
                  <label className="text-xs font-semibold text-text-secondary">昵称</label>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none transition-all duration-300 ease-in-out focus:border-primary"
                    placeholder="输入昵称"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-text-secondary">手机号</label>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-bg-paper/60 px-3 py-2">
                    <div className="font-mono text-sm text-text-primary">{user?.phoneMasked ?? '***'}</div>
                    <button
                      type="button"
                      className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-text-secondary shadow-sm transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
                      onClick={() => pushToast({ type: 'info', message: '更换手机号（模拟）' })}
                    >
                      更换
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-text-secondary">个人简介</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-2 h-24 w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none transition-all duration-300 ease-in-out focus:border-primary"
                    placeholder="写一句你的寻味宣言"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => pushToast({ type: 'success', message: '已保存（模拟）' })}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98]"
                >
                  <Save className="h-4 w-4" />
                  保存
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="font-display text-xl tracking-[0.08em] text-primary">该模块为占位展示</div>
                <p className="mt-2 text-sm text-text-secondary">后续可在这里接入真实 API 与更完整的表单校验。</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

