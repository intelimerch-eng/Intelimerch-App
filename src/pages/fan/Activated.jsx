import { useNavigate } from 'react-router-dom'
import MobileShell from '../../components/MobileShell'
import { Check, Smartphone } from 'lucide-react'

export default function Activated() {
  const navigate = useNavigate()
  return (
    <MobileShell bg="bg-teal-50">
      <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
        {/* Ripple circles */}
        <div className="relative flex items-center justify-center mb-10">
          <div className="absolute w-40 h-40 rounded-full border-2 border-teal-300/40" />
          <div className="absolute w-28 h-28 rounded-full border-2 border-teal-400/50" />
          <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Check size={30} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-5xl font-black text-gray-900 leading-tight mb-2">
          YOU'RE<br />ACTIVATED
        </h1>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-xs">
          Your merch is now registered and tied to you. Welcome to the inside
        </p>

        <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-center mb-4">
            <Smartphone size={40} className="text-gray-700" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">Scan again to unlock your perks</h3>
          <p className="text-sm text-gray-500">Hold your phone near the NFC tag</p>
        </div>
      </div>
    </MobileShell>
  )
}
