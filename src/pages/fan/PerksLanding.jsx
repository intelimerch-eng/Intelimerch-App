import { useNavigate } from 'react-router-dom'
import MobileShell from '../../components/MobileShell'
import { Video, Link2, Music, Play } from 'lucide-react'

const perks = [
  { type: 'Exclusive', title: 'Behind-The-Scenes Video', cta: 'Watch', arrow: true, icon: Video, iconBg: 'bg-red-50', iconColor: 'text-red-400', isNew: true, route: '/fan/perks/video' },
  { type: 'Discount', title: '10% Off Next Purchase', cta: 'Get Code', arrow: true, icon: Link2, iconBg: 'bg-purple-50', iconColor: 'text-purple-400', isNew: false, route: '/fan/perks/discount' },
  { type: 'Audio', title: 'Exclusive EP — 4 Tracks', cta: 'Listen', arrow: true, icon: Music, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500', isNew: false, route: '/fan/perks/audio' },
]

export default function PerksLanding() {
  const navigate = useNavigate()
  return (
    <MobileShell>
      {/* Hero video banner */}
      <div className="relative rounded-2xl overflow-hidden mb-5 h-44 bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Play size={20} className="text-white ml-1" />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-0.5">Summer Drop '25</h2>
      <p className="text-sm text-gray-500 mb-5">Exclusive content unlocked for this piece. Thank you for being part of the movement.</p>

      <button className="btn-primary rounded-full py-3.5 font-bold mb-6">Claim Your Perk</button>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-bold text-gray-900">Hey Jenny 👋 Welcome back</p>
          <p className="text-sm text-gray-500">Your Perks (6 Unlocked)</p>
        </div>
      </div>

      <div className="space-y-3">
        {perks.map((perk, i) => (
          <button key={i} onClick={() => navigate(perk.route)}
            className="w-full card text-left hover:shadow-md transition-shadow relative">
            {perk.isNew && (
              <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-md">NEW</span>
            )}
            <div className={`w-10 h-10 ${perk.iconBg} rounded-xl flex items-center justify-center mb-3`}>
              <perk.icon size={18} className={perk.iconColor} />
            </div>
            <p className="text-xs text-gray-400 mb-0.5">{perk.type}</p>
            <p className="font-bold text-gray-900 mb-2">{perk.title}</p>
            <span className="text-primary font-semibold text-sm">{perk.cta} →</span>
          </button>
        ))}
      </div>
    </MobileShell>
  )
}
