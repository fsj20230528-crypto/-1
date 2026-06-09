import { Lock, Phone } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { digitsOnly, formatPhone344, isValidCNPhone, isValidCode6 } from '../../utils/format'
import { TextField } from '../common/TextField'

export function LoginForm() {
  const { login } = useAuth()
  const { pushToast } = useToast()
  const navigate = useNavigate()

  const [phoneDigits, setPhoneDigits] = useState('')
  const [phoneDisplay, setPhoneDisplay] = useState('')
  const [codeDigits, setCodeDigits] = useState('')
  const [countdown, setCountdown] = useState(0)

  const [errors, setErrors] = useState<{ phone?: string; code?: string }>({})

  useEffect(() => {
    setPhoneDisplay(formatPhone344(phoneDigits))
  }, [phoneDigits])

  useEffect(() => {
    if (countdown <= 0) return
    const t = window.setInterval(() => setCountdown((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(t)
  }, [countdown])

  const canGetCode = useMemo(() => isValidCNPhone(phoneDigits) && countdown === 0, [phoneDigits, countdown])

  const onGetCode = () => {
    if (!isValidCNPhone(phoneDigits)) {
      setErrors((p) => ({ ...p, phone: '请输入正确的手机号' }))
      return
    }
    setErrors((p) => ({ ...p, phone: undefined }))
    setCountdown(60)
    pushToast({ type: 'info', message: '验证码已发送（模拟）', durationMs: 1200 })
  }

  const onSubmit = async () => {
    const next: typeof errors = {}
    if (!isValidCNPhone(phoneDigits)) next.phone = '请输入正确的手机号'
    if (!isValidCode6(codeDigits)) next.code = '请输入 6 位数字验证码'
    setErrors(next)
    if (next.phone || next.code) return

    await login(phoneDigits, codeDigits)
    pushToast({ type: 'success', message: '欢迎回来，美食探险家' })
    window.setTimeout(() => navigate('/loading', { replace: true }), 1500)
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-sm md:p-10">
      <h2 className="text-xl font-bold text-gray-800">开启你的浙江美食寻宝之旅</h2>
      <div className="mt-6 flex flex-col gap-4">
        <TextField
          value={phoneDisplay}
          onChange={(v) => setPhoneDigits(digitsOnly(v))}
          icon={Phone}
          placeholder="手机号"
          inputMode="numeric"
          maxLength={13}
          error={errors.phone}
          onBlur={() => setErrors((p) => ({ ...p, phone: phoneDigits ? (isValidCNPhone(phoneDigits) ? undefined : '请输入正确的手机号') : undefined }))}
        />
        <TextField
          value={codeDigits}
          onChange={(v) => setCodeDigits(digitsOnly(v).slice(0, 6))}
          icon={Lock}
          placeholder="验证码"
          inputMode="numeric"
          maxLength={6}
          error={errors.code}
          right={
            <button
              type="button"
              onClick={onGetCode}
              disabled={!canGetCode}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ease-in-out active:scale-[0.98] ${
                canGetCode ? 'bg-warm-apricot text-primary-dark hover:bg-warm-apricot/80' : 'bg-bg-paper text-text-muted'
              }`}
            >
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </button>
          }
        />

        <button
          type="button"
          onClick={onSubmit}
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-primary-dark active:animate-[press-down_120ms_ease-out_both]"
        >
          登录
        </button>

        <div className="mt-1 text-xs text-text-muted">
          登录即代表你同意{' '}
          <button type="button" className="text-text-secondary underline underline-offset-4 hover:text-primary transition-all duration-300 ease-in-out">
            《用户协议》
          </button>
        </div>
      </div>
    </div>
  )
}

