import { Heart, MessageCircle, Plus, Send, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DrawerHeader } from '../../components/common/DrawerHeader'
import { useToast } from '../../contexts/ToastContext'
import { mockDiaryComments, mockDiaryPosts } from '../../mock/data'
import type { DiaryPost } from '../../types'

type Tab = '作品' | '评论'

export function DiaryPage() {
  const navigate = useNavigate()
  const { pushToast } = useToast()
  const [tab, setTab] = useState<Tab>('作品')
  const [posts, setPosts] = useState(mockDiaryPosts)
  const [composeOpen, setComposeOpen] = useState(false)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftContent, setDraftContent] = useState('')

  const publish = () => {
    const title = draftTitle.trim()
    const content = draftContent.trim()
    if (!title || !content) {
      pushToast({ type: 'error', message: '请补全标题与正文' })
      return
    }
    const next: DiaryPost = {
      id: `p_${Date.now()}`,
      title,
      content,
      createdAt: new Date().toISOString().slice(0, 10),
      likes: 0,
      comments: 0,
    }
    setPosts((p) => [next, ...p])
    setDraftTitle('')
    setDraftContent('')
    setComposeOpen(false)
    pushToast({ type: 'success', message: '发布成功' })
  }

  return (
    <div className="flex h-dvh w-full flex-col">
      <DrawerHeader title="我的美食日记" onClose={() => navigate('/')} />

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        <div className="flex gap-2">
          {(['作品', '评论'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ease-in-out active:scale-[0.98] ${
                tab === k ? 'bg-sauce-red text-white' : 'bg-white text-text-secondary hover:bg-bg-paper'
              }`}
            >
              我的{k}
            </button>
          ))}
        </div>

        {tab === '作品' ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((p) => (
              <article key={p.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <div className="h-36 bg-gradient-to-br from-warm-apricot/70 via-white/60 to-primary/10" />
                <div className="p-4">
                  <div className="text-sm font-semibold text-text-primary">{p.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-text-secondary">{p.content}</div>
                  <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                    <span>{p.createdAt}</span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-4 w-4" /> {p.likes}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" /> {p.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {mockDiaryComments.map((c) => (
              <div key={c.id} className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                <div className="text-xs text-text-muted">评论于《{c.postTitle}》</div>
                <div className="mt-2 text-sm text-text-primary">{c.content}</div>
                <div className="mt-3 font-mono text-xs text-text-muted">{c.createdAt}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {tab === '作品' ? (
        <button
          type="button"
          onClick={() => setComposeOpen(true)}
          className="fixed bottom-20 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sauce-red text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-sauce-red/90 active:scale-[0.98] md:bottom-6"
          aria-label="发布新日记"
        >
          <Plus className="h-5 w-5" />
        </button>
      ) : null}

      {composeOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setComposeOpen(false)} aria-label="关闭发布页" />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <div className="font-display text-xl tracking-[0.08em] text-primary">发布日记</div>
              <button
                type="button"
                onClick={() => setComposeOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-all duration-300 ease-in-out hover:bg-bg-paper active:scale-[0.98]"
                aria-label="关闭"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <label className="text-xs font-semibold text-text-secondary">标题</label>
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none transition-all duration-300 ease-in-out focus:border-primary"
                placeholder="比如：西湖夜色与东坡肉"
              />

              <label className="mt-4 block text-xs font-semibold text-text-secondary">正文</label>
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="mt-2 h-28 w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none transition-all duration-300 ease-in-out focus:border-primary"
                placeholder="写下今天的寻味瞬间..."
              />

              <button
                type="button"
                onClick={publish}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                发布
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

