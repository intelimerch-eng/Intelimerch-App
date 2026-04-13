import { useState } from 'react'
import { Camera, Eye, EyeOff } from 'lucide-react'

export default function Profile() {
  const [tab, setTab] = useState('profile')
  const [showPw, setShowPw] = useState({ cur: false, new: false, confirm: false })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account</h1>
        <p className="text-gray-500 text-sm">Hey Jenny 👋, Manage your profile and settings</p>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {['profile', 'security'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${tab === t ? 'bg-primary text-white' : 'text-gray-500'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'profile' ? (
        <div className="card max-w-2xl">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-100">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
                JM
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                <Camera size={13} className="text-white" />
              </button>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Jennifer Michaels</h2>
            <p className="text-sm text-gray-500">@Jenny · Lagos, NG</p>
          </div>

          <div className="space-y-5">
            <Field label="Full Name" placeholder="e.g. Jennifer" />
            <Field label="User Name" placeholder="e.g @jenny" />
            <Field label="Email" placeholder="@youremail.com" type="email" />
            <Field label="Location" placeholder="e.g Lagos, Nigeria" />
            <button className="btn-primary w-auto px-8">Save Changes</button>
          </div>
        </div>
      ) : (
        <div className="card max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
          <div className="space-y-5">
            <PasswordField label="Current Password" show={showPw.cur} onToggle={() => setShowPw(s => ({ ...s, cur: !s.cur }))} />
            <PasswordField label="New Password" show={showPw.new} onToggle={() => setShowPw(s => ({ ...s, new: !s.new }))} />
            <PasswordField label="Confirm New Password" show={showPw.confirm} onToggle={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))} />
            <button className="btn-primary w-auto px-8">Update Password</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">{label}</label>
      <input type={type} className="input-field" placeholder={placeholder} />
    </div>
  )
}

function PasswordField({ label, show, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">{label}</label>
      <div className="relative">
        <input type={show ? 'text' : 'password'} className="input-field pr-10" defaultValue="**********" />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    </div>
  )
}
