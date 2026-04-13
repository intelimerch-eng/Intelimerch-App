import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'
import { Mail, ArrowLeft } from 'lucide-react'

export default function VerifyAccount() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(60)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) { setExpired(true); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft])

  const handleOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) document.getElementById(`otp-${i+1}`)?.focus()
  }

  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  const resend = () => { setTimeLeft(60); setExpired(false); setOtp(['','','','','','']) }

  return (
    <AuthCard>
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-500 hover:text-gray-700">
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Verify account</h1>

      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
          <Mail size={22} className="text-primary" />
        </div>
      </div>

      <p className="text-sm text-gray-600 text-center mb-5">
        We've sent a code to{' '}
        <span className="font-semibold text-gray-900">a*****@example.com</span>
      </p>

      <p className="text-xs font-medium text-gray-600 text-center mb-3">Enter OTP</p>
      <div className="flex justify-center gap-2 mb-4">
        {otp.map((v, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            maxLength={1}
            value={v}
            onChange={e => handleOtp(i, e.target.value)}
            className="w-11 h-12 border border-gray-200 rounded-xl text-center text-lg font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        ))}
      </div>

      <p className="text-xs text-center text-gray-500 mb-4">
        ⏱ Time remaining:{' '}
        <span className="text-primary font-semibold">{fmt(timeLeft)}</span>
      </p>

      <button onClick={() => navigate('/dashboard')} className="btn-primary mb-3">
        {expired ? 'Verify OTP' : 'Verify Account'}
      </button>

      {expired ? (
        <button onClick={resend} className="text-primary font-semibold text-sm text-center w-full">
          Resend OTP
        </button>
      ) : (
        <p className="text-xs text-gray-500 text-center">
          Didn't receive code? Resend in: {fmt(timeLeft)}
        </p>
      )}
    </AuthCard>
  )
}
