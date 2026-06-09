import { HeartOff, MapPin, MessageSquareText, Store, Utensils } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DrawerHeader } from '../../components/common/DrawerHeader'
import { useToast } from '../../contexts/ToastContext'
import { mockFavorites } from '../../mock/data'
import type { FavoriteType } from '../../types'

const tabs: Array<{ key: '全部' | FavoriteType; label: string }> = [
  { key: '全部', label: '全部' },
  { key: '店铺', label: '店铺' },
  { key: '美食', label: '美食' },
  { key: '地区', label: '地区' },
  { key: '帖子', label: '帖子' },
]

const iconByType: Record<FavoriteType, React.ComponentType<{ className?: string }>> = {
  店铺: Store,
  美食: Utensils,
  地区: MapPin,
  帖子: MessageSquareText,
}

export function FavoritesPage() {
  const navigate = useNavigate()
  const { pushToast } = useToast()

  const [active, setActive] = useState<(typeof tabs)[number]['key']>('全部')
  const [items, setItems] = useState(mockFavorites)

  const list = useMemo(() => {
    if (active === '全部') return items
    return items.filter((x) => x.type === active)
  }, [active, items])

  return (
    <div className="flex h-dvh w-full flex-col">
      <DrawerHeader title="我的收藏" onClose={() => navigate('/')} />

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ease-in-out active:scale-[0.98] ${
                active === t.key ? 'bg-sauce-red text-white' : 'bg-white text-text-secondary hover:bg-bg-paper'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
            <div className="font-display text-2xl tracking-[0.12em] text-primary">还没有收藏任何内容</div>
            <p className="mt-2 text-sm text-text-secondary">去地图上点点宝箱，或把心动的内容收入囊中。</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-6 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98]"
            >
              去探索
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.map((x) => {
              const Icon = iconByType[x.type]
              return (
                <article key={x.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                  <div className="flex h-32 items-center justify-center bg-warm-apricot/70">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-text-primary">{x.title}</div>
                        <div className="mt-1 text-xs leading-relaxed text-text-secondary">{x.summary}</div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-sauce-red transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
                        onClick={() => {
                          setItems((prev) => prev.filter((p) => p.id !== x.id))
                          pushToast({ type: 'info', message: '已取消收藏' })
                        }}
                        aria-label="取消收藏"
                      >
                        <HeartOff className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                      <span>收藏于 {x.savedAt}</span>
                      <span className="rounded-lg bg-bg-paper px-2 py-1">{x.type}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
