import { useNavigate } from 'react-router-dom'
import MobileShell from '../../components/MobileShell'
import { Play } from 'lucide-react'

export default function VideoPerk() {
  const navigate = useNavigate()
  return (
    <MobileShell>
      <button onClick={() => navigate('/fan/perks')} className="text-sm text-gray-500 mb-5">← Back</button>
      <div className="card">
        <p className="text-xs font-bold text-primary mb-1">Exclusive</p>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Behind-The-Scenes Video</h2>
        <p className="text-sm text-gray-500 mb-4">Summer Drop Shoot  unreleased footage, just for you.</p>

        <div className="relative bg-purple-300 rounded-2xl h-52 flex items-center justify-center mb-4">
          <button className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Play size={24} className="text-white ml-1" />
          </button>
        </div>

        <button className="btn-primary rounded-full py-3.5 font-bold">Watch Now</button>
      </div>
    </MobileShell>
  )
}
