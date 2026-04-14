import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'
import { HelpCircle, MessageSquare, Mail, ArrowLeft, Home } from 'lucide-react'

export default function ForgotPassword() {
  const navigate = useNavigate()
  return (
    <AuthCard>
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center">
          <HelpCircle size={28} className="text-gray-500" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Forgot Password?</h1>
      <p className="text-gray-500 text-sm text-center mb-6">No worries, we'll help you reset it.</p>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-0 mb-6">
        <StepCircle num={1} active label="Email" />
        <div className="h-px w-10 bg-gray-200" />
        <StepCircle num={2} label="Verify" />
        <div className="h-px w-10 bg-gray-200" />
        <StepCircle num={3} label="Reset" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email or Phone</label>
          <input className="input-field" placeholder="Enter your email or phone" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/verify')}
            className="border border-gray-800 text-gray-800 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-gray-50 transition-all"
          >
            <MessageSquare size={16} /> Send OTP
          </button>
          <button
            onClick={() => navigate('/verify')}
            className="btn-primary"
          >
            <Mail size={16} /> Send Link
          </button>
        </div>

        <button onClick={() => navigate('/signin')} className="flex items-center gap-2 text-sm text-gray-700 font-medium mx-auto hover:text-gray-900">
          <ArrowLeft size={16} /> Back to Login
        </button>

        <p className="text-center text-sm text-gray-500">
          <Home size={13} className="inline text-primary mr-1" />
          <em>Need help? </em>
          <span className="text-primary font-semibold cursor-pointer">Contact Support</span>
        </p>
      </div>
    </AuthCard>
  )
}

function StepCircle({ num, active, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
        active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
      }`}>
        {num}
      </div>
      <span className={`text-xs font-medium ${active ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
    </div>
  )
}
