import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DrawerHeader } from '../../components/common/DrawerHeader'
import { AchievementModal } from '../../components/achievement/AchievementModal'
import { useToast } from '../../contexts/ToastContext'
import { mockAchievements, mockCheckins, mockRegions } from '../../mock/data'
import { playDing } from '../../utils/sound'

export function CheckinsPage() {
  const navigate = useNavigate()
  const { pushToast } = useToast()
  const [records, setRecords] = useState(mockCheckins)
  const [showAchievement, setShowAchievement] = useState(false)

  const stats = useMemo(() => {
    const checked = records.filter((r) => r.checked)
    const days = new Set(checked.map((r) => r.checkedAt.slice(0, 10))).size
    return {
      cities: new Set(checked.map((r) => r.city)).size,
      foods: checked.length,
      days,
    }
  }, [records])

  const totalTargets = 11
  const progress = Math.min(1, stats.cities / totalTargets)

  return (
    <div className="flex h-dvh w-full flex-col">
      <DrawerHeader title="我的美食打卡" onClose={() => navigate('/')} />

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs text-text-muted">已打卡县市</div>
            <div className="mt-1 font-mono text-2xl font-semibold text-text-primary">{stats.cities}</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs text-text-muted">已品尝美食</div>
            <div className="mt-1 font-mono text-2xl font-semibold text-text-primary">{stats.foods}</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-xs text-text-muted">打卡天数</div>
            <div className="mt-1 font-mono text-2xl font-semibold text-text-primary">{stats.days}</div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-text-primary">寻味进度</div>
            <div className="font-mono text-xs text-text-muted">{Math.round(progress * 100)}%</div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-bg-paper">
            <div className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out" style={{ width: `${progress * 100}%` }} />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-text-primary">迷你浙江地图</div>
              <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-warm-apricot/45 p-3">
                <div className="relative h-[220px] w-full">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    <path
                      d="M18 20 C30 12, 44 12, 54 20 C62 16, 76 20, 82 32 C88 46, 78 64, 62 70 C48 78, 32 76, 24 62 C16 50, 14 30, 18 20 Z"
                      fill="none"
                      stroke="#5B8C85"
                      strokeWidth="1.6"
                      strokeDasharray="3 3"
                    />
                  </svg>
                  {mockRegions.map((r) => (
                    <div
                      key={r.id}
                      className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                        r.checked ? 'border-white bg-sauce-red' : 'border-primary/40 bg-white/70'
                      }`}
                      style={{ left: `${r.x}%`, top: `${r.y}%` }}
                      title={r.name}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 text-xs text-text-secondary">已打卡地区以酱红高亮</div>
            </div>
          </div>

          <div className="xl:col-span-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-text-primary">打卡列表</div>
              <div className="mt-3 flex flex-col gap-3">
                {records.map((r) => (
                  <div key={r.id} className="flex items-start justify-between gap-3 rounded-2xl border border-black/10 bg-bg-paper/60 p-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-text-primary">
                        {r.city} · {r.foodName}
                      </div>
                      <div className="mt-0.5 text-xs text-text-secondary">{r.shopName}</div>
                      <div className="mt-1 font-mono text-xs text-text-muted">{r.checked ? r.checkedAt : '未打卡'}</div>
                    </div>
                    {r.checked ? (
                      <div className="shrink-0 rounded-xl bg-bamboo-green/15 px-3 py-2 text-xs font-semibold text-bamboo-green">已打卡</div>
                    ) : (
                      <button
                        type="button"
                        className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98]"
                        onClick={() => {
                          const now = new Date()
                          const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(
                            now.getHours(),
                          ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
                          setRecords((prev) => prev.map((x) => (x.id === r.id ? { ...x, checked: true, checkedAt: stamp } : x)))
                          playDing()
                          pushToast({ type: 'success', message: '打卡成功！成就徽章已点亮' })
                          setShowAchievement(true)
                        }}
                      >
                        标记打卡
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-text-primary">成就徽章墙</div>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {mockAchievements.map((a) => (
              <div
                key={a.id}
                className={`rounded-2xl border p-3 transition-all duration-300 ease-in-out ${
                  a.achieved ? 'border-bamboo-green/40 bg-bamboo-green/10' : 'border-black/10 bg-bg-paper/60'
                }`}
              >
                <div className={`text-sm font-semibold ${a.achieved ? 'text-bamboo-green' : 'text-text-secondary'}`}>{a.title}</div>
                <div className="mt-1 text-xs text-text-muted">{a.description}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <AchievementModal
        open={showAchievement}
        title="初探江南"
        description="完成一次打卡，新的宝藏已收入囊中。"
        onClose={() => setShowAchievement(false)}
      />
    </div>
  )
}

